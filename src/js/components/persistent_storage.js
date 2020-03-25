define([
  'underscore',
  'js/components/generic_module',
  'js/mixins/dependon',
  'localforage',
], function(_, GenericModule, Mixins, localforage) {
  var namespace = 'bumblebee';

  var LocalStorage = GenericModule.extend({
    constructor: function(opts) {
      opts = opts || {};
      this._store = this.createStore(namespace + (opts.name || ''));
    },

    createStore: function(name) {
      return this._createStore(name);
    },

    _createStore: function(name) {
      const store = localforage.createInstance({
        name,
      });
      store.config({
        name: 'Bumblebee',
        description: 'This is bumblebee storage',
      });
      var keys = store.getItem('#keys');
      if (!keys) {
        store.setItem('#keys', {});
      } else {
        try {
          keys = JSON.parse(keys);
          if (!_.isObject(keys)) {
            store.setItem('#keys', {});
          }
        } catch (e) {
          store.setItem('#keys', {});
        }
      }
      return store;
    },

    set: function(key, value) {
      this._checkKey(key);
      if (!_.isString(value)) {
        value = JSON.stringify(value);
      }
      this._store.setItem(key, value);
      this._setKey(key);
    },

    get: function(key) {
      this._checkKey(key);
      var v = this._store.getItem(key);
      if (!v) return v;
      try {
        return JSON.parse(v);
      } catch (e) {
        return v;
      }
    },

    remove: function(key) {
      this._checkKey(key);
      this._store.remove(key);
      this._delKey(key);
    },

    clear: function() {
      var keys = this.getItem('#keys');

      for (var k in keys) {
        this._store.removeItem(k);
      }
      this._store.setItem('#keys', {});
    },

    keys: function() {
      return this._store.getItem('#keys');
    },

    _setKey: function(key) {
      var keys = this.keys() || {};
      keys[key] = 1;
      this._store.setItem('#keys', keys);
    },

    _delKey: function(key) {
      var keys = this.keys() || {};
      delete keys[key];
      this._store.setItem('#keys', keys);
    },

    _checkKey: function(key) {
      if (!_.isString(key)) {
        throw new Error('key must be string, received: ' + key);
      }
    },
  });

  _.extend(LocalStorage.prototype, Mixins.BeeHive);

  return LocalStorage;
});
