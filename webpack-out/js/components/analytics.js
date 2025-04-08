function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define([], function () {
  /*
   * Set of targets
   * each has a set of hooks which coorespond to the event label passed
   * types represents the possible event targets which can be used
   * url is a template which will be passed the incoming data
   */
  var TARGETS = {
    resolver: {
      hooks: ['toc-link-followed', 'abstract-link-followed', 'citations-link-followed', 'associated-link-followed'],
      types: ['abstract', 'citations', 'references', 'metrics', 'coreads', 'similar', 'graphics', 'associated', 'toc'],
      url: function url(_ref) {
        var bibcode = _ref.bibcode,
            target = _ref.target;
        return "link_gateway/".concat(bibcode, "/").concat(target);
      }
    }
  };
  /**
   * fire off the xhr request to the url
   *
   * @param {string} url
   * @param {object} data
   */

  var sendEvent = function sendEvent(url) {
    window.fetch(url, {
      method: 'GET'
    }).catch(function (error) {
      window.getSentry().captureMessage('Failed to send analytics event', {
        extra: {
          url: url,
          error: error.message
        }
      });
    });
  };

  var isValidEvent = function isValidEvent(_ref2) {
    var label = _ref2.label,
        target = _ref2.target;

    if (typeof label !== 'string' || typeof target !== 'string') {
      return false;
    }

    return TARGETS.resolver.hooks.includes(label) && TARGETS.resolver.types.includes(target);
  };
  /**
   * Go through the targets and fire the event if the label passed
   * matches one of the hooks specified.  Also the data.target must match one
   * of the types listed on the target config
   *
   * @param {string} label - the event label
   * @param {object} data - the event data
   */


  var adsLogger = function adsLogger(label, data) {
    var target = data ? data.target : null;
    var bibcode = data ? data.bibcode : null;

    if (bibcode !== null && isValidEvent({
      label: label,
      target: target
    })) {
      sendEvent(data.url ? data.url : TARGETS.resolver.url({
        bibcode: bibcode,
        target: target
      }));
    }
  };

  var buffer = [];
  var gaName = window.GoogleAnalyticsObject || 'ga';

  var cleanBuffer = function cleanBuffer() {
    if (window[gaName]) {
      for (var i = 0; i < buffer.length; i++) {
        window[gaName].apply(this, buffer[i]);
      }

      buffer = [];
    }
  };

  var CACHE_TIMEOUT = 300;
  /**
   * Simple debouncing mechanism with caching
   * this will store stringified version of the incoming events and provide a way to
   * check if the event has recently been cached.  With a short rolling timer to keep the timeout short to hopefully
   * only target duplicate calls.
   */

  var AnalyticsCacher = /*#__PURE__*/function () {
    function AnalyticsCacher() {
      _classCallCheck(this, AnalyticsCacher);

      this.timer = null;
      this.cache = new Set();
    }

    _createClass(AnalyticsCacher, [{
      key: "stringify",
      value: function stringify(args) {
        return JSON.stringify(args, function (key, value) {
          // filter out this cache-buster id added by GTM
          if (key === 'gtm.uniqueEventId') {
            return undefined;
          }

          return value;
        });
      }
    }, {
      key: "add",
      value: function add() {
        this._resetTimeout();

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return this.cache.add(this.stringify(args));
      }
    }, {
      key: "has",
      value: function has() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return this.cache.has(this.stringify(args));
      }
    }, {
      key: "_resetTimeout",
      value: function _resetTimeout() {
        clearTimeout(this.timer);
        this.timer = setTimeout(this._clear.bind(this), CACHE_TIMEOUT);
      }
    }, {
      key: "_clear",
      value: function _clear() {
        this.cache.clear();
      }
    }]);

    return AnalyticsCacher;
  }();

  var cacher = new AnalyticsCacher();

  var Analytics = function Analytics(action, event, type, description) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 4 ? _len3 - 4 : 0), _key3 = 4; _key3 < _len3; _key3++) {
      args[_key3 - 4] = arguments[_key3];
    }

    if (cacher.has(arguments)) {
      return;
    }

    cacher.add(arguments);
    adsLogger.apply(null, Array.prototype.slice.call(arguments, 3)); // if the action is send and the event is event, then we want to send the event to the dataLayer

    if (Array.isArray(window.dataLayer) && action === 'send' && event === 'event') {
      // some events are 'interaction' or 'error', so add that to the event name
      window.dataLayer.push({
        event: "".concat(type, "_").concat(description),
        // if the next argument is an object, we'll use that as the data, ignore an extra arguments
        value1: args[0],
        value2: args[1],
        value3: args[2]
      });
    } else if (Array.isArray(window.dataLayer) && action === 'send') {
      window.dataLayer.push({
        event: event,
        value1: type,
        value2: description,
        value3: args[0]
      });
    } else if (Array.isArray(window.dataLayer) && action === 'set') {
      window.dataLayer.push({
        event: 'config',
        value1: event,
        value2: type,
        value3: description
      });
    }
  };
  /**
   * Get the datalayer for sending events to
   * @returns {*|*[]}
   */


  Analytics.getDL = function () {
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      return window.dataLayer;
    }

    return [];
  };
  /**
   * Push a new object to the datalayer
   * @param {Object} data
   */


  Analytics.push = function (data) {
    if (cacher.has(data)) {
      return;
    }

    cacher.add(data);
    Analytics.getDL().push(data);
  };
  /**
   * Reset the datalayer
   */


  Analytics.reset = function () {
    Analytics.getDL().push(function () {
      this.reset();
    });
  };
  /**
   * set a value on the datalayer
   * @param {string} property
   * @param {unknown} value
   */


  Analytics.set = function (property, value) {
    Analytics.getDL().push(function () {
      this.set(property, value);
    });
  };
  /**
   * get a value on the datalayer
   * @param {string} property
   */


  Analytics.get = function (property) {
    var value;
    Analytics.getDL().push(function () {
      value = this.get(property);
    });
    return value;
  };

  return Analytics;
});
