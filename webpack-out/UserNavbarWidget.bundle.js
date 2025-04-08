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

/***/ "./src/js/widgets/user_navbar/nav_template.html":
/*!******************************************************!*\
  !*** ./src/js/widgets/user_navbar/nav_template.html ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var Handlebars = __webpack_require__(/*! ../../../../node_modules/handlebars/runtime.js */ \"./node_modules/handlebars/runtime.js\");\nfunction __default(obj) { return obj && (obj.__esModule ? obj[\"default\"] : obj); }\nmodule.exports = (Handlebars[\"default\"] || Handlebars).template({\"1\":function(container,depth0,helpers,partials,data) {\n    return \" class=\\\"active\\\" \";\n},\"compiler\":[8,\">= 4.3.0\"],\"main\":function(container,depth0,helpers,partials,data) {\n    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {\n        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {\n          return parent[propertyName];\n        }\n        return undefined\n    };\n\n  return \"<ul class=\\\"nav nav-pills user-pill-nav s-user-pill-nav\\\">\\n\\n    <li \"\n    + ((stack1 = lookupProperty(helpers,\"compare\").call(alias1,(depth0 != null ? lookupProperty(depth0,\"page\") : depth0),\"libraries-page\",{\"name\":\"compare\",\"hash\":{},\"fn\":container.program(1, data, 0),\"inverse\":container.noop,\"data\":data,\"loc\":{\"start\":{\"line\":3,\"column\":8},\"end\":{\"line\":3,\"column\":70}}})) != null ? stack1 : \"\")\n    + \">\\n        <a href=\\\"#user/libraries\\\">\\n            <i class=\\\"fa fa-book\\\" aria-hidden=\\\"true\\\"></i> ADS Libraries\\n        </a>\\n    </li>\\n    <li \"\n    + ((stack1 = lookupProperty(helpers,\"compare\").call(alias1,(depth0 != null ? lookupProperty(depth0,\"page\") : depth0),\"settings-page\",{\"name\":\"compare\",\"hash\":{},\"fn\":container.program(1, data, 0),\"inverse\":container.noop,\"data\":data,\"loc\":{\"start\":{\"line\":8,\"column\":8},\"end\":{\"line\":8,\"column\":69}}})) != null ? stack1 : \"\")\n    + \">\\n        <a href=\\\"#user/settings\\\"><i class=\\\"fa fa-cog\\\" aria-hidden=\\\"true\\\">\\n            </i> Settings\\n        </a>\\n    </li>\\n</ul>\\n\";\n},\"useData\":true});\n\n//# sourceURL=webpack://bumblebee/./src/js/widgets/user_navbar/nav_template.html?");

/***/ }),

/***/ "./src/js/widgets/user_navbar/widget.js":
/*!**********************************************!*\
  !*** ./src/js/widgets/user_navbar/widget.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! marionette */ \"./src/libs/backbone.marionette.js\"), __webpack_require__(/*! hbs!js/widgets/user_navbar/nav_template */ \"./src/js/widgets/user_navbar/nav_template.html\"), __webpack_require__(/*! js/mixins/dependon */ \"./src/js/mixins/dependon.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Marionette, NavTemplate, Dependon) {\n  var NavModel = Backbone.Model.extend({\n    defaults: function defaults() {\n      return {\n        page: undefined,\n        userName: undefined\n      };\n    }\n  });\n  var NavView = Marionette.ItemView.extend({\n    template: NavTemplate,\n    modelEvents: {\n      change: 'render'\n    }\n  });\n  var NavWidget = Marionette.Controller.extend({\n    initialize: function initialize(options) {\n      options = options || {};\n      this.model = new NavModel();\n      this.view = new NavView({\n        model: this.model\n      });\n    },\n    activate: function activate(beehive) {\n      this.setBeeHive(beehive);\n      var pubsub = beehive.getService('PubSub');\n\n      _.bindAll(this); // custom dispatchRequest function goes here\n\n\n      pubsub.subscribe(pubsub.PAGE_CHANGE, this.updateCurrentView);\n      pubsub.subscribe(pubsub.USER_ANNOUNCEMENT, this.updateUser);\n    },\n    updateCurrentView: function updateCurrentView(page) {\n      this.model.set('page', page);\n    },\n    updateUser: function updateUser(event, arg) {\n      var user = this.getBeeHive().getObject('User');\n\n      if (event == user.USER_SIGNED_IN) {\n        var userName = arg;\n\n        if (userName && userName.indexOf('@') > -1) {\n          userName = userName.split('@')[0];\n        }\n\n        this.model.set('user', userName);\n      } else if (event == user.USER_SIGNED_OUT) {\n        this.model.set('user', undefined);\n      }\n    },\n    render: function render() {\n      this.view.render();\n      return this.view.el;\n    }\n  });\n\n  _.extend(NavWidget.prototype, Dependon.BeeHive);\n\n  return NavWidget;\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//# sourceURL=webpack://bumblebee/./src/js/widgets/user_navbar/widget.js?");

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
/******/ 			"UserNavbarWidget": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], function() { return __webpack_require__("./src/js/widgets/user_navbar/widget.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;