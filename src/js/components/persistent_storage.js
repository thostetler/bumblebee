import GenericModule from 'js/components/generic_module';
import Mixins from 'js/mixins/dependon';
import _ from 'underscore';

const LocalStorage = GenericModule.extend({
  constructor: function(opts) {
    opts = opts || {};
    this._storeName = opts.name || 'bumblebee-storage';
    this._store = this.createStore();
    this._requestPersistentStorage();
  },

  createStore: function() {
    return {
      get: (key) => {
        try {
          const value = localStorage.getItem(this._getNamespacedKey(key));
          return value ? JSON.parse(value) : null;
        } catch (e) {
          console.error('Error getting from storage:', e);
          return null;
        }
      },
      set: (key, value) => {
        try {
          localStorage.setItem(this._getNamespacedKey(key), JSON.stringify(value));
          return true;
        } catch (e) {
          console.error('Error setting storage:', e);
          return false;
        }
      },
      remove: (key) => {
        try {
          localStorage.removeItem(this._getNamespacedKey(key));
          return true;
        } catch (e) {
          console.error('Error removing from storage:', e);
          return false;
        }
      }
    };
  },

  _requestPersistentStorage: function() {
    if (navigator.storage && navigator.storage.persist) {
      navigator.storage.persist()
        .then(granted => {
          if (granted) {
            console.log('Persistent storage permission granted');
          } else {
            console.log('Persistent storage permission denied');
          }
        })
        .catch(err => {
          console.error('Error requesting persistent storage:', err);
        });
    }
  },

  _getNamespacedKey: function(key) {
    return `${this._storeName}:${key}`;
  },

  set: function(key, value) {
    this._checkKey(key);
    this._store.set(key, value);
    this._setKey(key);
  },

  get: function(key) {
    this._checkKey(key);
    return this._store.get(key);
  },

  remove: function(key) {
    this._checkKey(key);
    this._store.remove(key);
    this._delKey(key);
  },

  clear: function() {
    const keys = this.keys();
    for (const k in keys) {
      this._store.remove(k);
    }
    this._store.set('#keys', '{}');
  },

  keys: function() {
    const keysStr = this._store.get('#keys');
    try {
      return keysStr ? JSON.parse(keysStr) : {};
    } catch (e) {
      return {};
    }
  },

  _setKey: function(key) {
    const keys = this.keys();
    keys[key] = 1;
    this._store.set('#keys', JSON.stringify(keys));
  },

  _delKey: function(key) {
    const keys = this.keys();
    delete keys[key];
    this._store.set('#keys', JSON.stringify(keys));
  },

  _checkKey: function(key) {
    if (!_.isString(key)) {
      throw new Error('key must be string, received: ' + key);
    }
  },
});

_.extend(LocalStorage.prototype, Mixins.BeeHive);

export default LocalStorage;
