import Backbone from 'backbone';
import GenericModule from 'js/components/generic_module';
import Hardened from 'js/mixins/hardened';
import Dependon from 'js/mixins/dependon';
  /*
   * this is used to store docs requested by results widget
   * for the use of other widgets, to reduce api requests
   * and speed loading. Right now it's only used by
   * the abstract widget.
   * */

  var DocStashController = GenericModule.extend({
    _docs: [],

    activate: function(beehive) {
      this.setBeeHive(beehive.getHardenedInstance());
      var pubsub = this.getBeeHive().getService('PubSub');
      pubsub.subscribe(pubsub.START_SEARCH, _.bind(this.emptyStash, this));
    },

    stashDocs: function(docs) {
      this._docs.push.apply(this._docs, docs);
    },

    getDocs: function() {
      return _.cloneDeep(this._docs);
    },

    emptyStash: function() {
      this._docs = [];
    },

    hardenedInterface: {
      stashDocs: 'stash docs',
      getDocs: 'getDocs',
    },
  });

  _.extend(DocStashController.prototype, Hardened, Dependon.BeeHive);

  export default DocStashController;

