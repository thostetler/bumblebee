import * as Sentry from '@sentry/browser';
import md5 from 'blueimp-md5';
import GenericModule from './components/generic_module';

class QueriesMap {
  static hash(value) {
    let str = '';
    if (value && typeof value !== 'string') {
      if (typeof value.toJSON === 'function') {
        // If value has a toJSON method, use it
        try {
          str = JSON.stringify(value.toJSON());
        } catch (e) {
          console.warn('[perf] Failed to call toJSON on value:', e);
          return this.INVALID_HASH;
        }
      }
      try {
        str = JSON.stringify(value);
      } catch (e) {
        console.warn('[perf] Failed to stringify value for MD5 hash:', e);
        return this.INVALID_HASH;
      }
      try {
        return md5(str);
      } catch (e) {
        console.warn('[perf] Failed to compute MD5 hash:', e);
        return str;
      }
    }
    return this.INVALID_HASH;

  }

  constructor(maxSize = 10) {
    this.map = new Map();
    this.order = [];
    this.maxSize = maxSize;
    this.INVALID_HASH = '--invalid--';
  }

  has(key) {
    return this.map.has(key);
  }

  get(query) {
    const key = QueriesMap.hash(query);
    return this.map.get(key);
  }

  add(query) {
    const key = QueriesMap.hash(query);
    // no duplicate keys allowed
    if (this.map.has(key)) return;
    // if the map is full, remove the oldest entry
    if (this.order.length >= this.maxSize) this.map.delete(this.order.pop());
    this.order.unshift(key);
    this.map.set(key, { query, time: performance.now() });
  }
}

/**
 * @type {ENUM}
 */
export const performanceEvents = {
  SEARCH_RESPONSE_RECIEVED: '[perf]:search-response-received',
  SEARCH_QUERY_SENT: '[perf]:search-query-sent',
  FACET_REQUEST_SENT: '[perf]:facet-request-sent',
  FACET_RESPONSE_RECEIVED: '[perf]:facet-response-received',
  FACET_APPLIED: '[perf]:facet-applied',
};

const MARKS = {
  APP_STARTED: 'app-started',
};

export default GenericModule.extend({
  _onSearchResponseReceived(value) {
    const queryHash = QueriesMap.hash(value.query);
    const queryType = value.type || 'unknown'; // 'auto' or 'user'
    const startMark = `search-query-sent-${queryHash}`;
    const endMark = `${startMark}-end`;
    const metricName = `search_timing`;

    try {
      performance.mark(endMark);
      performance.measure(metricName, startMark, endMark);

      const entry = performance.getEntriesByName(metricName).pop();
      if (!entry) {
        this.log(`No performance entry found for ${metricName}`);
        return;
      }

      const duration = entry.duration;

      // Send a standard Sentry measurement
      Sentry.setMeasurement('search_timing', duration, 'millisecond');

      // Start a span with metadata
      Sentry.startSpan({ name: 'search_timing', op: 'search' }, (span) => {
        span.setAttributes({
          duration,
          queryType,
          queryHash,
        });
      });

      this.log(`Search [${queryType}] query [${queryHash}] completed in ${duration.toFixed(2)} ms`);

      // Clean up
      performance.clearMarks(startMark);
      performance.clearMarks(endMark);
      performance.clearMeasures(metricName);
    } catch (err) {
      console.warn(`[perf] Failed to measure ${metricName}:`, err);
    }
  }
,
  _onFacetResponseReceived(value) {
    const startMark = `facet-request-sent-${value.id}`;
    const metricName = `facet_timing_${value.id}`;

    try {
      // Measure from startMark to now
      const endMark = `${startMark}-end`;
      performance.mark(endMark);
      performance.measure(metricName, startMark, endMark);

      const entry = performance.getEntriesByName(metricName).pop();
      if (entry) {
        const duration = entry.duration;

        // Optional: Send to Sentry
        Sentry.setMeasurement(metricName, duration, 'millisecond');
        Sentry.startSpan({ name: metricName, op: 'facet' }, (span) => {
          span.setAttributes({
            facetId: value.id,
            isInitial: value.isInitial,
            duration,
          });
        });

        this.log(`${metricName} took ${duration.toFixed(2)} ms`);
      }

      // Optional cleanup
      performance.clearMarks(startMark);
      performance.clearMarks(endMark);
      performance.clearMeasures(metricName);
    } catch (err) {
      console.warn(`[perf] Failed to measure ${metricName}:`, err);
    }
  },
  _onAppStarted() {
    const metricName = 'app_started';
    const markName = MARKS.APP_STARTED;

    // Mark the app start point
    performance.mark(markName);

    // Measure from page navigation start to app start
    performance.measure(metricName, { start: 'navigationStart', end: markName });

    const entry = performance.getEntriesByName(metricName).pop();
    if (!entry) {
      this.log(`No performance entry found for ${metricName}`);
      return;
    }

    const duration = entry.duration;

    // Report to Sentry
    Sentry.setMeasurement(metricName, duration, 'millisecond');
    Sentry.startSpan({ name: metricName, op: 'perf' }, (span) => {
      span.setAttributes({
        duration,
        startType: 'pageload',
      });
    });

    this.log(`App started at ${duration.toFixed(2)} ms from pageload`);

    // Optional cleanup
    performance.clearMarks(markName);
    performance.clearMeasures(metricName);
  },
  log(...msgs) {
    console.log('[perf]', ...msgs);
  },
  initialize() {
    this.recentQueries = new QueriesMap(10);
  },
  activate(beehive) {
    const pubsub = beehive.getHardenedInstance().getService('PubSub');
    if (!pubsub) {
      this.log('No PubSub service found in BeeHive, cannot track events.');
      return;
    }
    pubsub.subscribe(pubsub.APP_STARTED, this._onAppStarted.bind(this));
    pubsub.subscribe(pubsub.DELIVERING_RESPONSE, (...args) => {
      this.log('delivering response', ...args);
      this.onEvent.apply(this, [performanceEvents.SEARCH_RESULTS_RECEIVED, ...args]);
    });
    pubsub.subscribe(pubsub.PERF, this.onEvent.bind(this));
    pubsub.subscribe(pubsub.CUSTOM_EVENT, this.onEvent.bind(this));
  },
  onEvent(event, value) {
    this.log(event, 'args', value);
    switch (event) {
      case performanceEvents.FACET_REQUEST_SENT:
        performance.mark(`facet-request-sent-${value.id}`);
        break;

      case performanceEvents.FACET_RESPONSE_RECEIVED:
        this._onFacetResponseReceived(value);
        break;

      case performanceEvents.SEARCH_QUERY_SENT:
        this.recentQueries.add(value.query);
        performance.mark(`search-query-sent-${QueriesMap.hash(value.query)}`);
        break;

      case performanceEvents.SEARCH_RESPONSE_RECEIVED:
        this._onSearchResponseReceived(value);
        break;

      default:
        return null;
    }
  },
});
