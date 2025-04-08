define(['js/components/generic_module', 'js/mixins/dependon', 'js/components/api_query', 'js/components/api_request', 'js/components/api_targets', 'analytics'], function (GenericModule, Dependon, ApiQuery, ApiRequest, ApiTargets, analytics) {
  /**
   * Triggered via pubsub event, this will take a set of identifiers
   * and generate a bigquery id, then replace the current query
   * with a specified field
   *
   * example query: `similar(docs(99999))`
   */
  var SecondOrderController = GenericModule.extend({
    initialize: function initialize(options) {
      this.options = _.defaults({}, options, {
        maxQueryRows: 6000,
        transformDebounce: 1000
      }); // set up debounced transform

      if (this.options.transformDebounce) {
        this.transform = _.debounce(this.transform, this.options.transformDebounce);
      }
    },
    activate: function activate(beehive) {
      this.setBeeHive(beehive.getHardenedInstance());
      var ps = this.getBeeHive().getService('PubSub');
      ps.subscribe(ps.CUSTOM_EVENT, _.bind(this.onCustomEvent, this));
    },

    /**
     * Expecting an event in the following format
     * `second-order-search/{ field }`
     * then call the transform method
     */
    onCustomEvent: function onCustomEvent(event) {
      if (event.startsWith('second-order-search/')) {
        this.transform.apply(this, [event.split('/')[1]].concat(_.rest(arguments)));
      }
    },

    /**
     * Grab the list of currently selected papers from app storage
     */
    getSelectedIds: function getSelectedIds() {
      var storage = this.getBeeHive().getObject('AppStorage');

      if (storage && storage.getSelectedPapers) {
        return storage.getSelectedPapers() || [];
      }

      return [];
    },

    /**
     * get the current query from local storage
     */
    getCurrentQuery: function getCurrentQuery() {
      var storage = this.getBeeHive().getObject('AppStorage');

      if (storage && storage.getCurrentQuery && storage.getCurrentQuery() instanceof ApiQuery) {
        return storage.getCurrentQuery();
      }
    },

    /**
     * Grab the qid from vault by sending our list of bibcodes
     * returning a promise
     */
    getBigQueryResponse: function getBigQueryResponse(ids) {
      var ps = this.getPubSub();
      var $dd = $.Deferred(); // create vault-style bigquery query

      var bigQuery = new ApiQuery({
        bigquery: "bibcode\n".concat(ids.join('\n')),
        q: '*:*',
        fq: '{!bitset}',
        sort: 'date desc'
      }); // create request

      var request = new ApiRequest({
        target: ApiTargets.MYADS_STORAGE + '/query',
        query: bigQuery,
        options: {
          type: 'POST',
          done: function done(_ref) {
            var qid = _ref.qid;
            return $dd.resolve(qid);
          },
          fail: function fail(ev) {
            return $dd.reject(ev);
          }
        }
      });
      ps.publish(ps.EXECUTE_REQUEST, request);
      return $dd.promise();
    },

    /**
     * send a *normal* query outside of search cycle
     */
    sendQuery: function sendQuery(query) {
      var ps = this.getPubSub();
      var $dd = $.Deferred(); // create request

      var request = new ApiRequest({
        target: ApiTargets.SEARCH,
        query: query,
        options: {
          type: 'GET',
          done: function done(res) {
            return $dd.resolve(res);
          },
          fail: function fail(ev) {
            return $dd.reject(ev);
          }
        }
      });
      ps.publish(ps.EXECUTE_REQUEST, request);
      return $dd.promise();
    },

    /**
     * Checks if the passed in field is one of our defined FIELDS
     */
    validField: function validField(field) {
      return _.contains(_.values(SecondOrderController.FIELDS), field);
    },

    /**
     * send analytics event
     */
    submitAnalyticsEvent: function submitAnalyticsEvent(field) {
      analytics('send', 'event', 'interaction', 'second-order-operation', field);
    },

    /**
     * Check field, get selected ids, get qid from vault, and finally send
     * navigate to the search page, starting the search cycle
     */
    transform: function transform(field, opts) {
      if (!field || !this.validField(field)) {
        throw 'must pass in a valid field';
      }

      var options = _.defaults({}, opts, {
        onlySelected: false,
        libraryId: null,
        ids: [],
        query: null
      }); // get the selected records from appStorage


      var selectedIds = options.ids.length > 0 ? options.ids : this.getSelectedIds(); // if field is 'limit' it should generate qid from selection

      if ((selectedIds.length === 0 || !options.onlySelected) && field !== SecondOrderController.FIELDS.LIMIT && field !== SecondOrderController.FIELDS.LIBRARY && field !== SecondOrderController.FIELDS.EXCLUDE) {
        this.transformCurrentQuery(field, options.query);
      } else if (field === SecondOrderController.FIELDS.LIBRARY) {
        // if field is library, no need to make the request to vault, just start search
        this.startSearch(field, options.libraryId);
      } else {
        this.getQidAndStartSearch(field, selectedIds);
      }
    },

    /**
     * General error handler
     */
    handleError: function handleError(ev) {
      var msg = 'Error occurred';

      if (ev.responseJSON && ev.responseJSON.error) {
        msg = ev.responseJSON.error;
      }

      var ps = this.getPubSub();
      ps.publish(ps.CUSTOM_EVENT, 'second-order-search/error', {
        message: msg
      });
      throw msg;
    },

    /**
     * Wrap the current query and pull together all filter queries into
     * the selected field.
     *
     * This will navigate to the search page when done
     */
    transformCurrentQuery: function transformCurrentQuery(field, _query) {
      var ps = this.getPubSub();
      var currentQuery = _query instanceof ApiQuery ? _query : this.getCurrentQuery();

      if (!currentQuery) {
        return;
      }

      var query = currentQuery.clone();
      var q = [];
      q.push(query.get('q'));

      _.forEach(Object.keys(query.toJSON()), function (key) {
        if (key.startsWith('fq_')) {
          q.push(query.get(key));
        }
      });

      var newQuery = new ApiQuery({
        q: "".concat(field, "(").concat(q.join(' AND '), ")"),
        sort: 'score desc'
      });
      ps.publish(ps.NAVIGATE, 'search-page', {
        q: newQuery
      });
    },

    /**
     * Send the ids to vault get a qid, which we then use to generate
     * the final query.
     *
     * This will navigate to the search page when done
     */
    getQidAndStartSearch: function getQidAndStartSearch(field, ids) {
      var _this = this;

      // get the big query response from vault
      this.getBigQueryResponse(ids).then(function (qid) {
        _this.startSearch(field, qid);
      }).fail(function () {
        return _this.handleError.apply(_this, arguments);
      });
    },
    startSearch: function startSearch(field, id) {
      if (!id) {
        throw 'no id';
      }

      var newQuery;

      if (field === SecondOrderController.FIELDS.LIMIT) {
        var currentQuery = this.getCurrentQuery() || new ApiQuery(); // if field is limit, only do docs and retain the current sort

        newQuery = new ApiQuery({
          q: "docs(".concat(id, ")"),
          sort: currentQuery.get('sort') || 'score desc'
        });
      } else if (field === SecondOrderController.FIELDS.LIBRARY) {
        // if library id, use the library/ prefix with the passed in ID
        newQuery = new ApiQuery({
          q: "docs(library/".concat(id, ")"),
          sort: 'date desc'
        });
      } else if (field === SecondOrderController.FIELDS.EXCLUDE) {
        // modify current query, to negate set of docs
        var _currentQuery = this.getCurrentQuery() || new ApiQuery();

        newQuery = _currentQuery.clone();
        newQuery.set({
          q: "-docs(".concat(id, ") ").concat(_currentQuery.get('q'))
        });
      } else {
        // replace the current query with our operator
        newQuery = new ApiQuery({
          q: "".concat(field, "(docs(").concat(id, "))"),
          sort: 'score desc'
        });
      }

      var ps = this.getPubSub();
      ps.publish(ps.NAVIGATE, 'search-page', {
        q: newQuery
      });
      this.submitAnalyticsEvent(field);
    }
  });
  SecondOrderController.FIELDS = {
    USEFUL: 'useful',
    SIMILAR: 'similar',
    TRENDING: 'trending',
    REVIEWS: 'reviews',
    LIMIT: 'limit',
    LIBRARY: 'library',
    EXCLUDE: 'exclude'
  };

  _.extend(SecondOrderController.prototype, Dependon.BeeHive);

  return SecondOrderController;
});
