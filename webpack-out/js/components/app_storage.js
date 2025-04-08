/*
 * A generic class that holds the application storage
 */
define(['backbone', 'underscore', 'js/components/api_query', 'js/mixins/hardened', 'js/mixins/dependon'], function (Backbone, _, ApiQuery, Hardened, Dependon) {
  var AppStorage = Backbone.Model.extend({
    activate: function activate(beehive) {
      this.setBeeHive(beehive);

      _.bindAll(this, 'onPaperSelection', 'onBulkPaperSelection');

      var pubsub = this.getPubSub();
      pubsub.subscribe(pubsub.PAPER_SELECTION, this.onPaperSelection);
      pubsub.subscribe(pubsub.BULK_PAPER_SELECTION, this.onBulkPaperSelection);
    },
    initialize: function initialize() {
      this.on('change:selectedPapers', function (model) {
        this._updateNumSelected();

        if (this.hasPubSub()) var pubsub = this.getPubSub();
        pubsub.publish(pubsub.STORAGE_PAPER_UPDATE, this.getNumSelectedPapers());
      });
    },

    /**
     * functions related to remembering/removing the
     * current query object
     * @param apiQuery
     */
    setCurrentQuery: function setCurrentQuery(apiQuery) {
      if (!apiQuery) apiQuery = new ApiQuery();

      if (!(apiQuery instanceof ApiQuery)) {
        throw new Error('You must save ApiQuery instance');
      }

      this.set('currentQuery', apiQuery); // save to storage

      if (this.getBeeHive().hasService('PersistentStorage')) {
        this.getBeeHive().getService('PersistentStorage').set('currentQuery', apiQuery.toJSON());
      } // provide this query to sentry


      window.getSentry(function (sentry) {
        var currentQuery = apiQuery.toJSON();
        Object.keys(currentQuery).forEach(function (key) {
          if (!key.startsWith('__') || key === 'fq') {
            sentry.setTag("query.".concat(key), currentQuery[key].join(' | '));
          }
        });
      });
    },
    setCurrentNumFound: function setCurrentNumFound(numFound) {
      this.set('numFound', numFound);
    },
    getCurrentQuery: function getCurrentQuery() {
      return this.get('currentQuery');
    },
    hasCurrentQuery: function hasCurrentQuery() {
      return this.has('currentQuery');
    },

    /**
     * Functions to remember save bibcodes (that were
     * selected by an user)
     *
     * @returns {*}
     */
    hasSelectedPapers: function hasSelectedPapers() {
      return !!_.keys(this.get('selectedPapers')).length;
    },
    getSelectedPapers: function getSelectedPapers() {
      return _.keys(this.get('selectedPapers') || {});
    },
    clearSelectedPapers: function clearSelectedPapers() {
      this.set('selectedPapers', {});
    },
    addSelectedPapers: function addSelectedPapers(identifiers) {
      var data = _.clone(this.get('selectedPapers') || {});

      var updated = false;

      if (_.isArray(identifiers)) {
        _.each(identifiers, function (idx) {
          if (!data[idx]) {
            data[idx] = true;
            updated = true;
          }
        });
      } else if (!data[identifiers]) {
        data[identifiers] = true;
        updated = true;
      }

      if (updated) this.set('selectedPapers', data);
    },
    isPaperSelected: function isPaperSelected(identifier) {
      if (_.isArray(identifier)) throw new Error('Identifier must be a string or a number');
      var data = this.get('selectedPapers') || {};
      return !!data[identifier];
    },
    removeSelectedPapers: function removeSelectedPapers(identifiers) {
      var data = _.clone(this.get('selectedPapers') || {});

      if (_.isArray(identifiers)) {
        _.each(identifiers, function (i) {
          delete data[i];
        });
      } else if (identifiers) {
        delete data[identifiers];
      } else {
        data = {};
      }

      this.set('selectedPapers', data);
    },
    getNumSelectedPapers: function getNumSelectedPapers() {
      return this._numSelectedPapers || 0;
    },
    _updateNumSelected: function _updateNumSelected() {
      this._numSelectedPapers = _.keys(this.get('selectedPapers') || {}).length;
    },
    onPaperSelection: function onPaperSelection(data) {
      if (this.isPaperSelected(data)) {
        this.removeSelectedPapers(data);
      } else {
        this.addSelectedPapers(data);
      }
    },
    onBulkPaperSelection: function onBulkPaperSelection(bibs, flag) {
      if (flag == 'remove') {
        this.removeSelectedPapers(bibs);
        return;
      }

      this.addSelectedPapers(bibs);
    },
    // this is used by the auth and user settings widgets
    setConfig: function setConfig(conf) {
      this.set('dynamicConfig', conf);
    },
    getConfigCopy: function getConfigCopy() {
      return JSON.parse(JSON.stringify(this.get('dynamicConfig')));
    },
    setDocumentTitle: function setDocumentTitle(title) {
      this.set('documentTitle', title);
    },
    getDocumentTitle: function getDocumentTitle() {
      return this.get('documentTitle');
    },
    hardenedInterface: {
      getNumSelectedPapers: 'getNumSelectedPapers',
      isPaperSelected: 'isPaperSelected',
      hasSelectedPapers: 'hasSelectedPapers',
      getSelectedPapers: 'getSelectedPapers',
      clearSelectedPapers: 'clearSelectedPapers',
      getCurrentQuery: 'getCurrentQuery',
      hasCurrentQuery: 'hasCurrentQuery',
      setDocumentTitle: 'setDocumentTitle',
      getDocumentTitle: 'getDocumentTitle',
      getConfigCopy: 'get read-only copy of dynamic config',
      set: 'set a value into app storage',
      get: 'get a val from app storage'
    }
  });

  _.extend(AppStorage.prototype, Hardened, Dependon.BeeHive);

  return AppStorage;
});
