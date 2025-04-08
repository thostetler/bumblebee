define(['backbone', 'js/components/generic_module', 'js/mixins/hardened', 'js/mixins/dependon'], function (Backbone, GenericModule, Hardened, Dependon) {
  /*
   * this is used to store docs requested by results widget
   * for the use of other widgets, to reduce api requests
   * and speed loading. Right now it's only used by
   * the abstract widget.
   * */
  var DocStashController = GenericModule.extend({
    _docs: [],
    activate: function activate(beehive) {
      this.setBeeHive(beehive.getHardenedInstance());
      var pubsub = this.getBeeHive().getService('PubSub');
      pubsub.subscribe(pubsub.START_SEARCH, _.bind(this.emptyStash, this));
    },
    stashDocs: function stashDocs(docs) {
      this._docs.push.apply(this._docs, docs);
    },
    getDocs: function getDocs() {
      return _.cloneDeep(this._docs);
    },
    emptyStash: function emptyStash() {
      this._docs = [];
    },
    hardenedInterface: {
      stashDocs: 'stash docs',
      getDocs: 'getDocs'
    }
  });

  _.extend(DocStashController.prototype, Hardened, Dependon.BeeHive);

  return DocStashController;
});
