define(['underscore', 'js/components/transition'], function (_, Transition) {
  var TransitionCatalog = function TransitionCatalog(options) {
    this._catalog = {};
  };

  _.extend(TransitionCatalog.prototype, {
    add: function add(transition) {
      if (!(transition instanceof Transition)) {
        throw new Error('You can add only Transition objects');
      }

      this._catalog[transition.endpoint] = transition;
      return transition;
    },
    get: function get(name) {
      return this._catalog[name];
    },
    remove: function remove(name) {
      delete this._catalog[name];
    }
  });

  return TransitionCatalog;
});
