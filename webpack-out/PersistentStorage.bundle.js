/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/components/generic_module.js":
/*!*********************************************!*\
  !*** ./src/js/components/generic_module.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*\n * A generic class to be used for building modules (the Marionette.Module)\n * just complicates things. For simple things, just use this class.\n */\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ \"./src/libs/backbone.js\"), __webpack_require__(/*! underscore */ \"./node_modules/underscore/underscore-umd.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone, _) {\n  // A list of options to be attached directly to the module, if provided.\n  var moduleOptions = ['className', 'activate'];\n\n  var Module = function Module(options) {\n    var defaults;\n    options = options || {};\n    this.mid = _.uniqueId('module');\n\n    _.extend(this, _.pick(options, moduleOptions));\n\n    this.initialize.call(this, options);\n  }; // every module has the Events mixin\n\n\n  _.extend(Module.prototype, Backbone.Events, {\n    className: 'GenericModule',\n    initialize: function initialize() {},\n    destroy: function destroy() {},\n    activate: function activate(options) {\n      _.extend(this, _.pick(options, moduleOptions));\n    }\n  }); // give the module subclassing functionality\n\n\n  Module.extend = Backbone.Model.extend;\n  return Module;\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//# sourceURL=webpack://bumblebee/./src/js/components/generic_module.js?");

/***/ }),

/***/ "./src/js/components/persistent_storage.js":
/*!*************************************************!*\
  !*** ./src/js/components/persistent_storage.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("/* module decorator */ module = __webpack_require__.nmd(module);\nvar __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ \"./node_modules/underscore/underscore-umd.js\"), __webpack_require__(/*! js/components/generic_module */ \"./src/js/components/generic_module.js\"), __webpack_require__(/*! js/mixins/dependon */ \"./src/js/mixins/dependon.js\"), __webpack_require__(/*! persist-js */ \"./src/libs/persist-js.js\"), module], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, GenericModule, Mixins, PersistJS, module) {\n  var namespace = module.config().namespace || '';\n  var LocalStorage = GenericModule.extend({\n    constructor: function constructor(opts) {\n      opts = opts || {};\n      this._store = this.createStore(namespace + (opts.name || ''));\n    },\n    createStore: function createStore(name) {\n      return this._createStore(name);\n    },\n    _createStore: function _createStore(name) {\n      var s = new PersistJS.Store(name, {\n        about: 'This is bumblebee persistent storage',\n        defer: true\n      });\n      var keys = s.get('#keys');\n\n      if (!keys) {\n        s.set('#keys', '{}');\n      } else {\n        try {\n          keys = JSON.parse(keys);\n\n          if (!_.isObject(keys)) {\n            s.set('#keys', '{}');\n          }\n        } catch (e) {\n          s.set('#keys', '{}');\n        }\n      }\n\n      return s;\n    },\n    set: function set(key, value) {\n      this._checkKey(key);\n\n      if (!_.isString(value)) {\n        value = JSON.stringify(value);\n      }\n\n      this._store.set(key, value);\n\n      this._setKey(key);\n    },\n    get: function get(key) {\n      this._checkKey(key);\n\n      var v = this._store.get(key);\n\n      if (!v) return v;\n\n      try {\n        return JSON.parse(v);\n      } catch (e) {\n        return v;\n      }\n    },\n    remove: function remove(key) {\n      this._checkKey(key);\n\n      this._store.remove(key);\n\n      this._delKey(key);\n    },\n    clear: function clear() {\n      var keys = this.get('#keys');\n\n      for (var k in keys) {\n        this._store.remove(k);\n      }\n\n      this._store.set('#keys', '{}');\n    },\n    keys: function keys() {\n      return JSON.parse(this._store.get('#keys'));\n    },\n    _setKey: function _setKey(key) {\n      var keys = this.keys() || {};\n      keys[key] = 1;\n\n      this._store.set('#keys', JSON.stringify(keys));\n    },\n    _delKey: function _delKey(key) {\n      var keys = this.keys() || {};\n      delete keys[key];\n\n      this._store.set('#keys', JSON.stringify(keys));\n    },\n    _checkKey: function _checkKey(key) {\n      if (!_.isString(key)) {\n        throw new Error('key must be string, received: ' + key);\n      }\n    }\n  });\n\n  _.extend(LocalStorage.prototype, Mixins.BeeHive);\n\n  return LocalStorage;\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//# sourceURL=webpack://bumblebee/./src/js/components/persistent_storage.js?");

/***/ }),

/***/ "./src/js/components/pubsub_events.js":
/*!********************************************!*\
  !*** ./src/js/components/pubsub_events.js ***!
  \********************************************/
/***/ (function(module, exports) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**\n * Created by rchyla on 3/30/14.\n */\n\n/**\n * Catalogue of PubSub events; we assume this:\n *\n *  - FC = the component lives in the 'Forbidden City'\n *         inside Application, typically this is a PubSub or Api, Mediator\n *         or any component with elevated access\n *\n *  - OC = Outer City: the suburbs of the application; these are typically\n *         UI components (behind the wall), untrusted citizens of the\n *         BumbleBee state\n *\n *  WARNING: do not use spaces; events with spaces are considered to be\n *        multiple events! (e.g. '[PubSub] New-Query' will be two events)\n *\n */\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {\n  var PubSubEvents = {\n    /**\n     * Usually called by OC's as a first step in the query processing.\n     * It means: 'user did something', we need to start reacting. The OC\n     * will build a new ApiQuery and send it together with this event\n     */\n    START_SEARCH: '[PubSub]-New-Query',\n\n    /**\n     * Called by FC's (usually: Mediator) - this is a signal to *all* OC's\n     * they should receive ApiQuery object, compare it against their\n     * own query; find diff and create a new ApiRequest (asking for a data)\n     * and send that back\n     */\n    INVITING_REQUEST: '[PubSub]-Inviting-Request',\n\n    /**\n     * Will be called by OC's, this is response to ApiQuery input.\n     */\n    DELIVERING_REQUEST: '[PubSub]-New-Request',\n\n    /**\n     * Will be called by OC's, this is one-time forget action (outside of the\n     * the search cycle); use this for any query that needs to be executed\n     * and not be tracked by search cycle\n     */\n    EXECUTE_REQUEST: '[PubSub]-Execute-Request',\n\n    /**\n     * Called from the router, the QID will be passed; the query needs to be\n     * loaded and executed\n     */\n    EXECUTE_STORED_QUERY: '[PubSub]-Execute-Stored-Query',\n\n    /**\n     * Published by FC's - typically Mediator - when a response has been retrieved\n     * for a given ApiRequest.\n     *\n     * OC's should subscribe to this event when they want to receive data\n     * from the treasury (api)\n     *\n     *  - input: ApiRequest\n     *  - output: ApiResponse\n     */\n    DELIVERING_RESPONSE: '[PubSub]-New-Response',\n\n    /**\n     * The walls of the FC are being closed; and no new requests will be served\n     */\n    CLOSING_GATES: '[PubSub]-Closing',\n\n    /**\n     * PubSub will not receive any requests any more\n     */\n    CLOSED_FOR_BUSINESS: '[PubSub]-Closed',\n\n    /**\n     * ForbiddenCity is about to receive requests\n     */\n    OPENING_GATES: '[PubSub]-Opening',\n\n    /**\n     * Called after PubSub became ready - it is fully operational\n     */\n    OPEN_FOR_BUSINESS: '[PubSub]-Ready',\n\n    /**\n     *  Set of error warnings issues by PubSub - or by some other FC's - to\n     *  deal with congestion or other problems\n     */\n    SMALL_FIRE: '[PubSub]-Problem',\n    BIG_FIRE: '[PubSub]-Big-Problem',\n    CITY_BURNING: '[PubSub]-Disaster',\n\n    /**\n     * A message containing feedback from the FC; traveling towards OC\n     * The feedback will be instance of ApiFeedback\n     */\n    FEEDBACK: '[FC]-FeedBack',\n\n    /**\n     * A message from the router requesting showing citizens of the\n     * city\n     */\n    DISPLAY_DOCUMENTS: '[Router]-Display-Documents',\n    DISPLAY_DOCUMENTS_DETAILS: '[Router]-Display-Documents-Details',\n\n    /**\n     * Used by OC to request parsed query tree - to check a query\n     * for example\n     */\n    GET_QTREE: '[FC]-GetQTree',\n    NAVIGATE: '[Router]-Navigate-With-Trigger',\n\n    /*\n     * so navigator can notify interested widgets about a change\n     * from search page to user page, for instance-- navigator cannot\n     * to this since it listens to many events including widget-show events\n     * */\n    PAGE_CHANGE: '[Navigator]Page-Changed',\n\n    /* for custom widget-to-widget events */\n    CUSTOM_EVENT: '[PubSub]-Custom-Event',\n    ARIA_ANNOUNCEMENT: '[PubSub]-Aria-Announcement',\n\n    /* anything to do with changing the state of the user, including session events */\n    USER_ANNOUNCEMENT: '[PubSub]-User-Announcement',\n\n    /**\n     * A message/action that should be displayed to the user (on prominent)\n     * place\n     */\n    ALERT: '[Alert]-Message',\n    ORCID_ANNOUNCEMENT: '[PubSub]-Orcid-Announcement',\n\n    /**\n     * Happens during the main cycle of the application birth\n     *  LOADED = when all components were successfuly loaded\n     *  BOOTSTRAPPED = + when all dynamic config was loaded\n     *  STARTING = + right before the router and history objects start()\n     *  STARTED = app is alive and handling requests\n     */\n    APP_LOADED: '[App]-Application-Loaded',\n    APP_BOOTSTRAPPED: '[App]-Application-Bootstrapped',\n    APP_STARTING: '[App]-Application-Starting',\n    APP_STARTED: '[App]-Application-Started',\n    APP_EXIT: '[App]-Exit',\n\n    /**\n     * Is triggered when user selects/deselects records\n     */\n    PAPER_SELECTION: '[User]-Paper-Selection',\n    // instead of toggling, adds all papers\n    BULK_PAPER_SELECTION: '[User]-Bulk-Paper-Selection',\n\n    /*\n     * is triggered by app storage itself when list of selected papers changes\n     * */\n    STORAGE_PAPER_UPDATE: '[User]-Paper-Update',\n    LIBRARY_CHANGE: '[PubSub]-Library-Change'\n  };\n  return PubSubEvents;\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//# sourceURL=webpack://bumblebee/./src/js/components/pubsub_events.js?");

/***/ }),

/***/ "./src/js/components/pubsub_key.js":
/*!*****************************************!*\
  !*** ./src/js/components/pubsub_key.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**\n * Created by rchyla on 3/14/14.\n */\n\n/*\n * A simple, yet important, class - every subscriber\n * to the PubSub must contain one key. This class\n * should be instantiated in a safe manner. ie.\n *\n * PubSubKey.newInstance({creator: this});\n *\n * But beware that as long as the subscriber is alive\n * reference to the creator will be saved inside\n * the key! So choose carefully whether you use this\n * functionality\n */\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ \"./node_modules/underscore/underscore-umd.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_) {\n  var PubSubKey = function PubSubKey(options) {\n    _.extend(this, options);\n  };\n\n  _.extend(PubSubKey, {\n    /*\n     * Creates a new Instances of the PubSubKey\n     * with a storage that cannot be changed.\n     * To double sign the key, you can pass\n     * an object that identifies creator of the\n     * key and test identity, eg.\n     *\n     * var creator = {};\n     * var k = PubSubKey(creator);\n     * k.getCreator() === k;\n     *\n     */\n    newInstance: function newInstance(options) {\n      var priv = {\n        id: _.has(options, 'id') ? options.id : _.uniqueId(':psk'),\n        creator: _.has(options, 'creator') ? options.creator : null\n      };\n      return new PubSubKey({\n        getId: function getId() {\n          return priv.id;\n        },\n        getCreator: function getCreator() {\n          return priv.creator;\n        }\n      });\n    }\n  });\n\n  return PubSubKey;\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//# sourceURL=webpack://bumblebee/./src/js/components/pubsub_key.js?");

/***/ }),

/***/ "./src/js/mixins/dependon.js":
/*!***********************************!*\
  !*** ./src/js/mixins/dependon.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**\n * Created by rchyla on 3/13/14.\n */\n\n/*\n * This module contains a set of utilities that can be added to classes\n * to give them certain functionality\n */\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ \"./node_modules/underscore/underscore-umd.js\"), __webpack_require__(/*! js/components/pubsub_events */ \"./src/js/components/pubsub_events.js\"), __webpack_require__(/*! js/components/pubsub_key */ \"./src/js/components/pubsub_key.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, PubSubEvents, PubSubKey) {\n  var Mixin = {\n    /*\n     * BeeHive is the object that allows modules to get access to objects\n     * of the application (but we make sure these objects are protected\n     * and only application can set/change them). This mixin gives objects\n     * functions to query 'BeeHive'\n     */\n    BeeHive: {\n      // called by parents (app) to give modules access\n      setBeeHive: function setBeeHive(brundibar) {\n        if (_.isEmpty(brundibar)) throw new Error('Huh? Empty Beehive? Trying to be funny?');\n        this.__beehive = brundibar;\n      },\n      getBeeHive: function getBeeHive() {\n        if (!this.hasBeeHive()) throw new Error('The BeeHive is inactivate (or dead :<})');\n        return this.__beehive;\n      },\n      hasBeeHive: function hasBeeHive() {\n        if (this.__beehive && (this.__beehive.active || this.__beehive.__facade__ && this.__beehive.getActive())) {\n          return true;\n        }\n\n        return false;\n      },\n\n      /**\n       * Method which returns a masked instance of PubSub (unless the PubSub\n       * is already a hardened instance; which carries its own key)\n       *\n       * You can call pubsub.publish() without having to supply the pubsub key\n       * (which is what most controllers want to do; there are only some\n       * exceptions to this rule; ie. query-mediator). If you need to get\n       * access to the full PubSub (and you have it inside BeeHive) then do\n       * this.getBeeHive().getService('PubSub')\n       */\n      getPubSub: function getPubSub() {\n        if (!this.hasBeeHive()) throw new Error('The BeeHive is inactive (or dead >:})');\n        if (!this.__ctx) this.__ctx = {};\n        if (this.__ctx.pubsub) return this.__ctx.pubsub;\n\n        var pubsub = this.__beehive.getService('PubSub');\n\n        if (pubsub && pubsub.__facade__) return pubsub; // build a unique key for this instance\n\n        this.__ctx.pubsub = {\n          _key: pubsub.getPubSubKey(),\n          _exec: function _exec(name, args) {\n            args = _.toArray(args);\n            if (args[0] instanceof PubSubKey) throw Error('You have given us a PubSub key, this.publish() method does not need it.');\n            args.unshift(this._key);\n            pubsub[name].apply(pubsub, args);\n          },\n          publish: function publish() {\n            this._exec('publish', arguments);\n          },\n          subscribe: function subscribe() {\n            this._exec('subscribe', arguments);\n          },\n          subscribeOnce: function subscribeOnce() {\n            this._exec('subscribeOnce', arguments);\n          },\n          unsubscribe: function unsubscribe() {\n            this._exec('unsubscribe', arguments);\n          },\n          getCurrentPubSubKey: function getCurrentPubSubKey() {\n            return this._key;\n          }\n        };\n\n        _.extend(this.__ctx.pubsub, PubSubEvents);\n\n        return this.__ctx.pubsub;\n      },\n      hasPubSub: function hasPubSub() {\n        if (this.hasBeeHive()) return _.isObject(this.__beehive.getService('PubSub'));\n        return false;\n      }\n    },\n    App: {\n      setApp: function setApp(app) {\n        if (_.isUndefined(app)) throw new Error('App object cannot be empty');\n        this.__app = app;\n      },\n      getApp: function getApp() {\n        return this.__app;\n      },\n      hasApp: function hasApp() {\n        return !_.isEmpty(this.__app);\n      }\n    }\n  };\n  return Mixin;\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//# sourceURL=webpack://bumblebee/./src/js/mixins/dependon.js?");

/***/ }),

/***/ "./src/js/services/storage.js":
/*!************************************!*\
  !*** ./src/js/services/storage.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ \"./node_modules/underscore/underscore-umd.js\"), __webpack_require__(/*! js/components/persistent_storage */ \"./src/js/components/persistent_storage.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, PersistentStorage) {\n  // TODO:rca - make sure that the service is loaded at the bootstrap and persisted\n  // before the app exits (and that nothing can change the data inbetween; we can\n  // let them do that; but we'll not care for it\n  var Storage = PersistentStorage.extend({\n    activate: function activate(beehive) {// this.setBeeHive(beehive);\n      // var pubsub = beehive.getService('PubSub');\n      // pubsub.subscribeOnce(pubsub.getPubSubKey(), pubsub.APP_BOOTSTRAPPED, this.onAppBootstrapped);\n    },\n    onAppBootstrapped: function onAppBootstrapped() {\n      var beehive = this.getBeeHive();\n      var rconf = beehive.getObject('DynamicConfig');\n\n      if (!rconf) {\n        throw new Error('DynamicConfig is missing');\n      }\n\n      var name = rconf.namespace; // the unique id that identifies this application (it serves as a namespace)\n\n      if (!name) {\n        console.warn('Application namespace not set; persistent storage will be created without it');\n        name = '';\n      }\n\n      this._store = this._createStore(name);\n    }\n  });\n  return function () {\n    return new Storage({\n      name: 'storage-service'\n    });\n  };\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//# sourceURL=webpack://bumblebee/./src/js/services/storage.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/amd define */
/******/ 	!function() {
/******/ 		__webpack_require__.amdD = function () {
/******/ 			throw new Error('define cannot be used indirect');
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/amd options */
/******/ 	!function() {
/******/ 		__webpack_require__.amdO = {};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.nmd = function(module) {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"PersistentStorage": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkbumblebee"] = self["webpackChunkbumblebee"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	!function() {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], function() { return __webpack_require__("./src/js/services/storage.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;