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

/***/ "./src/js/components/facade.js":
/*!*************************************!*\
  !*** ./src/js/components/facade.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**\n * Created by rchyla on 3/16/14. inspiration: http://jsfiddle.net/pajtai/GD5qR/35/\n */\n\n/*\n * // Interface\n *  var remoteInterface = {\n *    on: 'turn on'\n *  };\n *  // Implementation\n *  var htmlRemote = {\n *    on: function() { console.log(\"remote on\"); return this; }\n *  };\n *  // Protecting the implementation\n *  var htmlInterface = new Facade(remoteInterface, htmlRemote);\n *\n */\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ \"./node_modules/underscore/underscore-umd.js\"), __webpack_require__(/*! js/components/facade */ \"./src/js/components/facade.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, Facade) {\n  // The Facade encapsulates objectIn according to the description\n  // The exposed facade is guaranteed to have exactly the functions described in description.\n  var Facade = function Facade(description, objectIn) {\n    var facade; // TODO: add enforce of \"new\"\n\n    facade = {};\n    this.mixIn(description, objectIn, facade); // TODO: check that \"mixIn\" is not taken\n\n    facade.mixIn = this.mixIn;\n    return facade;\n  };\n\n  Facade.prototype.mixIn = function (description, objectIn, facade) {\n    var property;\n    var propertyValue;\n    facade = facade || this;\n\n    for (property in description) {\n      propertyValue = description[property];\n\n      if (property in objectIn) {\n        var p = objectIn[property];\n\n        if (typeof propertyValue === 'function') {\n          // redefining the method\n          facade[property] = _.bind(propertyValue, objectIn);\n        } else if (typeof p === 'function') {\n          // exposing the method\n          facade[property] = _.bind(p, objectIn);\n        } else if (_.isUndefined(p)) {// pass\n        } else if (_.isString(p) || _.isNumber(p) || _.isBoolean(p) || _.isDate(p) || _.isNull(p) || _.isRegExp(p)) {\n          // build getter method\n          facade['get' + property.substring(0, 1).toUpperCase() + property.substring(1)] = _.bind(function () {\n            return this.ctx[this.name];\n          }, {\n            ctx: objectIn,\n            name: property\n          });\n          facade[property] = p; // copy the value (it is immutable anyways)\n        } else if (p.hasOwnProperty('__facade__') && p.__facade__) {\n          // exposing internal facade\n          facade[property] = p;\n        } else if (_.isObject(p) && 'getHardenedInstance' in p) {\n          // builds a facade\n          facade[property] = p.getHardenedInstance();\n        } else {\n          throw new Error(\"Sorry, you can't wrap '\" + property + \"': \" + p);\n        }\n      } else if (typeof propertyValue === 'function') {\n        facade[property] = _.bind(propertyValue, objectIn);\n      } else {\n        throw new Error('Unknown key: ' + property + '(' + propertyValue + ')');\n      }\n    }\n\n    if (objectIn) {\n      // .name is not supported in IE\n      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name\n      facade.__facade__ = Boolean(objectIn.constructor ? objectIn.constructor.name ? objectIn.constructor.name : true : true);\n    } else {\n      facade.__facade__ = true;\n    } // TODO:rca - shall we use?\n    // if (Object.freeze)\n    //  facade = Object.freeze(facade);\n\n\n    return facade;\n  };\n\n  return Facade;\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//# sourceURL=webpack://bumblebee/./src/js/components/facade.js?");

/***/ }),

/***/ "./src/js/components/generic_module.js":
/*!*********************************************!*\
  !*** ./src/js/components/generic_module.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*\n * A generic class to be used for building modules (the Marionette.Module)\n * just complicates things. For simple things, just use this class.\n */\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ \"./src/libs/backbone.js\"), __webpack_require__(/*! underscore */ \"./node_modules/underscore/underscore-umd.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone, _) {\n  // A list of options to be attached directly to the module, if provided.\n  var moduleOptions = ['className', 'activate'];\n\n  var Module = function Module(options) {\n    var defaults;\n    options = options || {};\n    this.mid = _.uniqueId('module');\n\n    _.extend(this, _.pick(options, moduleOptions));\n\n    this.initialize.call(this, options);\n  }; // every module has the Events mixin\n\n\n  _.extend(Module.prototype, Backbone.Events, {\n    className: 'GenericModule',\n    initialize: function initialize() {},\n    destroy: function destroy() {},\n    activate: function activate(options) {\n      _.extend(this, _.pick(options, moduleOptions));\n    }\n  }); // give the module subclassing functionality\n\n\n  Module.extend = Backbone.Model.extend;\n  return Module;\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//# sourceURL=webpack://bumblebee/./src/js/components/generic_module.js?");

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

/***/ "./src/js/mixins/hardened.js":
/*!***********************************!*\
  !*** ./src/js/mixins/hardened.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**\n * Created by rchyla on 3/18/14.\n */\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ \"./node_modules/underscore/underscore-umd.js\"), __webpack_require__(/*! js/components/facade */ \"./src/js/components/facade.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, Facade) {\n  var Mixin = {\n    /*\n     * Creates a hardened instance of itself, it uses\n     * interface description from 'hardenedInterface'\n     * Implementations need to populate 'hardenedInterface'\n     * with list of properties and methods that should be exposed\n     * through the Facade\n     */\n    _getHardenedInstance: function _getHardenedInstance(iface, objectIn) {\n      if (!('hardenedInterface' in this) && !iface) {\n        throw Error('Error: this.hardenedInterface is not defined');\n      }\n\n      return new Facade(iface || ('hardenedInterface' in this ? this.hardenedInterface : {}), objectIn);\n    },\n    getHardenedInstance: function getHardenedInstance(iface) {\n      return this._getHardenedInstance(iface, this);\n    }\n  };\n  return Mixin;\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//# sourceURL=webpack://bumblebee/./src/js/mixins/hardened.js?");

/***/ }),

/***/ "./src/js/services/default_pubsub.js":
/*!*******************************************!*\
  !*** ./src/js/services/default_pubsub.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n/**\n * Provides the nervous system of the application. There may exist\n * different breeds of this animal and application can choose\n * which ones to use.\n *\n * The intended usage is this:\n *\n *   1. Applicaiton creates a PubSub [any implementation]\n *   2. Application loads modules/views and gives them this PubSub\n *      - modules/views can subscribe to the PubSub (ie. view.listenTo(PubSub)\n *      - modules can trigger events through the PubSub (ie. pubSub.trigger('name', ....))\n *   3. Application activates the PubSub and calls 'self-check'\n *      - the pubsub will check whether it contains providers that can handle\n *        all signals\n *\n *\n * All topics subscribed to are broadcasted using Backbone.Event. The modules/view have\n * no access to the Application object. The PubSub serves as a 'middleman'\n *\n * For the moment, this object is not protected (you should implement) the facade\n * that hides it. But it provides all necessary functionality to make it robust and\n * secured. Ie. only modules with approprite keys can subscribe/publish/unscubscribe\n *\n * Also, errors are caught and counted. Actions can be fired to treat offending\n * callbacks.\n * */\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ \"./src/libs/backbone.js\"), __webpack_require__(/*! underscore */ \"./node_modules/underscore/underscore-umd.js\"), __webpack_require__(/*! js/components/generic_module */ \"./src/js/components/generic_module.js\"), __webpack_require__(/*! js/components/pubsub_key */ \"./src/js/components/pubsub_key.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone, _, GenericModule, PubSubKey) {\n  // unfortunately, these methods are not part of the BB.Events class\n  // so we have to duplicate them iff we want to provide a queue which\n  // handles failed callbacks\n  // ------------------------ copied from BB ------------------------------------------\n  // Regular expression used to split event strings.\n  var eventSplitter = /\\s+/; // Implement fancy features of the Events API such as multiple event\n  // names `\"change blur\"` and jQuery-style event maps `{change: action}`\n  // in terms of the existing API.\n\n  var eventsApi = function eventsApi(obj, action, name, rest) {\n    if (!name) return true; // Handle event maps.\n\n    if (_typeof(name) === 'object') {\n      for (var key in name) {\n        obj[action].apply(obj, [key, name[key]].concat(rest));\n      }\n\n      return false;\n    } // Handle space separated event names.\n\n\n    if (eventSplitter.test(name)) {\n      var names = name.split(eventSplitter);\n\n      for (var i = 0, l = names.length; i < l; i++) {\n        obj[action].apply(obj, [names[i]].concat(rest));\n      }\n\n      return false;\n    }\n\n    return true;\n  }; // ------------------------ /copied from BB ------------------------------------------\n\n\n  var PubSub = GenericModule.extend({\n    className: 'PubSub',\n    initialize: function initialize(options) {\n      this._issuedKeys = {};\n      this.strict = true;\n      this.handleErrors = true;\n      this._errors = {};\n      this.errWarningCount = 10; // this many errors trigger warning\n\n      _.extend(this, _.pick(options, ['strict', 'handleErrors', 'errWarningCount']));\n\n      this.pubSubKey = PubSubKey.newInstance({\n        creator: {}\n      }); // this.getPubSubKey(); // the key the pubsub uses for itself\n\n      this._issuedKeys[this.pubSubKey.getId()] = this.pubSubKey.getCreator();\n      this.running = true;\n      this.debug = false;\n    },\n\n    /*\n     * when pubsub is activated it will issue signal 'pubsub.starting'\n     * and it will check whether there are events that cannot possibly\n     * by handled by some listeners\n     */\n    start: function start() {\n      this.publish(this.pubSubKey, this.OPENING_GATES);\n      this.publish(this.pubSubKey, this.OPEN_FOR_BUSINESS);\n      this.running = true;\n    },\n\n    /*\n     * Sends a signal 'pubsub.closing' to all listeners and then\n     * immediately shuts down the queue and removes any keys\n     */\n    destroy: function destroy() {\n      this.publish(this.pubSubKey, this.CLOSING_GATES);\n      this.off();\n      this.publish(this.pubSubKey, this.CLOSED_FOR_BUSINESS);\n      this.running = false;\n      this._issuedKeys = {};\n    },\n\n    /*\n     * subscribe() -> undefined or error\n     *\n     *  - key: instance of PubSubKey (it must be known\n     *         to this PubSub - so typically it is a key\n     *         issued by this PubSub)\n     *  - name: string, name of the event (can be name\n     *         accepted by Backbone)\n     *  - callback: a function to call (you cannot supply\n     *         context, so if the callback needs to be bound\n     *         use: _.bind(callback, context)\n     *\n     */\n    subscribe: function subscribe(key, name, callback) {\n      if (!this.isRunning()) {\n        throw new Error('PubSub has been closed, ignoring futher requests');\n      }\n\n      this._checkKey(key, name, callback);\n\n      if (_.isUndefined(name)) {\n        throw new Error('You tried to subscribe to undefined event. Error between chair and keyboard?');\n      }\n\n      this.on(name, callback, key); // the key becomes context\n\n      if (name.indexOf(key.getId()) == -1) this.on(name + key.getId(), callback, key); // this is for individual responses\n    },\n\n    /*\n     * subscribeOnce() -> undefined or error\n     *\n     *  Just like subscribe, but it will be removed by PubSub once\n     *  it has been called\n     *\n     *  - key: instance of PubSubKey (it must be known\n     *         to this PubSub - so typically it is a key\n     *         issued by this PubSub)\n     *  - name: string, name of the event (can be name\n     *         accepted by Backbone)\n     *  - callback: a function to call (you cannot supply\n     *         context, so if the callback needs to be bound\n     *         use: _.bind(callback, context)\n     *\n     */\n    subscribeOnce: function subscribeOnce(key, name, callback) {\n      this._checkKey(key, name, callback);\n\n      if (_.isUndefined(name)) {\n        throw new Error('You tried to subscribe to undefined event. Error between chair and keyboard?');\n      }\n\n      this.once(name, callback, key); // the key becomes context\n\n      if (name.indexOf(key.getId()) == -1) this.once(name + key.getId(), callback, key); // this is for individual responses\n    },\n\n    /*\n     * unsubscribe() -> undefined or error\n     *\n     *  - key: instance of PubSubKey (it must be known\n     *         to this PubSub - so typically it is a key\n     *         issued by this PubSub)\n     *  - name: string, name of the event (can be name\n     *         accepted by Backbone)\n     *  - callback: a function to call (you cannot supply\n     *         context, so if the callback needs to be bound\n     *         use: _.bind(callback, context)\n     *\n     *  When you supply only:\n     *   - key: all callbacks registered under this key will\n     *          be removed\n     *   - key+name: all callbacks for this key (module) and\n     *         event will be removed\n     *   - key+name+callback: the most specific call, it will\n     *         remove only one callback (if it is there)\n     *\n     */\n    unsubscribe: function unsubscribe(key, name, callback) {\n      this._checkKey(key, name, callback);\n\n      var context = key;\n\n      if (name && callback) {\n        this.off(name, callback, context);\n        this.off(name + key.getId(), callback, context);\n      } else if (name || callback) {\n        this.off(name, callback, context);\n        this.off(name + key.getId(), callback, context);\n      } else {\n        // remove all events of this subscriber\n        var names = _.keys(this._events);\n\n        var name;\n        var events;\n        var ev;\n        var i;\n        var l;\n        var k;\n        var j;\n        var toRemove = [];\n\n        for (i = 0, l = names.length; i < l; i++) {\n          name = names[i];\n\n          if (events = this._events[name]) {\n            for (j = 0, k = events.length; j < k; j++) {\n              ev = events[j];\n\n              if (ev.context === context) {\n                toRemove.push({\n                  name: name,\n                  event: ev\n                });\n              }\n            }\n          }\n        }\n\n        _.each(toRemove, function (x) {\n          this.off(x.name, x.event.callback, x.event.context);\n        }, this);\n      }\n    },\n\n    /*\n     * publish(key, event-name, arguments...) -> undef\n     *\n     * Publish the message with any set of arguments\n     * into the queue. No checking is done whether there\n     * are callbacks that can handle the event\n     */\n    publish: function publish() {\n      if (!this.isRunning()) {\n        console.error('PubSub has been closed, ignoring futher requests');\n        return;\n      }\n\n      this._checkKey(arguments[0]);\n\n      var args = Array.prototype.slice.call(arguments, 1);\n\n      if (args.length == 0 || _.isUndefined(args[0])) {\n        throw new Error('You tried to trigger undefined event. Error between chair and keyboard?');\n      } // push the key back into the arguments (it identifies the sender)\n\n\n      args.push(arguments[0]); // console.log('publishing', arguments, args);\n      // this is faster, default BB implementation\n\n      if (!this.handleErrors) {\n        return this.trigger.apply(this, args);\n      } // safer, default\n\n\n      return this.triggerHandleErrors.apply(this, args);\n    },\n    getCurrentPubSubKey: function getCurrentPubSubKey() {\n      return this.pubSubKey;\n    },\n\n    /*\n     * getPubSubKey() -> PubSubKey\n     *\n     * Returns a new instance of PubSubKey - every\n     * subscriber must obtain one instance of the key\n     * and use it for all calls to publish/(un)subscribe\n     *\n     * If this queue is running in a strict mode, the\n     * keys will be remembered and they will be checked\n     * during the calls.\n     */\n    getPubSubKey: function getPubSubKey() {\n      var k = PubSubKey.newInstance({\n        creator: this.pubSubKey\n      }); // creator identifies issuer of the key\n\n      if (this.strict) {\n        if (this._issuedKeys[k.getId()]) {\n          throw Error('The key with id', k.getId(), 'has been already registered!');\n        }\n\n        this._issuedKeys[k.getId()] = k.getCreator();\n      }\n\n      return k;\n    },\n\n    /*\n     * Says whether this PubSub is running in a strict mode\n     */\n    isStrict: function isStrict() {\n      return this.strict;\n    },\n\n    /*\n     * Checks the key - subscriber must supply it when calling\n     */\n    _checkKey: function _checkKey(key, name, callback) {\n      if (this.strict) {\n        if (_.isUndefined(key)) {\n          throw new Error('Every request must be accompanied by PubSubKey');\n        }\n\n        if (!(key instanceof PubSubKey)) {\n          throw new Error('Key must be instance of PubSubKey. ' + \"(If you are trying to pass context, you can't do that. Instead, \" + 'wrap your callback into: _.bind(callback, context))' + '\\n' + 'Perhaps the PubSub you are using is the non-protected version?');\n        }\n\n        if (!this._issuedKeys.hasOwnProperty(key.getId())) {\n          throw new Error(\"Your key is not known to us, sorry, you can't use this queue.\");\n        }\n\n        if (this._issuedKeys[key.getId()] !== key.getCreator()) {\n          throw new Error(\"Your key has wrong identity, sorry, you can't use this queue.\");\n        }\n      }\n    },\n    // Copied and modified version of the BB trigger - we deal with errors\n    // and optionally execute stuff asynchronously\n    triggerHandleErrors: function triggerHandleErrors(name) {\n      // almost the same as BB impl, but we call local triggerEvents\n      // that do error handling\n      if (!this._events) return this;\n      var args = Array.prototype.slice.call(arguments, 1);\n      if (!eventsApi(this, 'trigger', name, args)) return this;\n      var events = this._events[name];\n      var allEvents = this._events.all;\n      if (events) this.triggerEvents(events, args);\n      if (allEvents) this.triggerEvents(allEvents, arguments);\n      return this;\n    },\n    // A modified version of BB - errors will not disrupt the queue\n    triggerEvents: function triggerEvents(events, args) {\n      var ev;\n      var i = -1;\n      var l = events.length;\n      var a1 = args[0];\n      var a2 = args[1];\n      var a3 = args[2];\n\n      switch (args.length) {\n        case 0:\n          while (++i < l) {\n            try {\n              (ev = events[i]).callback.call(ev.ctx);\n            } catch (e) {\n              this.handleCallbackError(e, ev, args);\n            }\n          }\n\n          return;\n\n        case 1:\n          while (++i < l) {\n            try {\n              (ev = events[i]).callback.call(ev.ctx, a1);\n            } catch (e) {\n              this.handleCallbackError(e, ev, args);\n            }\n          }\n\n          return;\n\n        case 2:\n          while (++i < l) {\n            try {\n              (ev = events[i]).callback.call(ev.ctx, a1, a2);\n            } catch (e) {\n              this.handleCallbackError(e, ev, args);\n            }\n          }\n\n          return;\n\n        case 3:\n          while (++i < l) {\n            try {\n              (ev = events[i]).callback.call(ev.ctx, a1, a2, a3);\n            } catch (e) {\n              this.handleCallbackError(e, ev, args);\n            }\n          }\n\n          return;\n\n        default:\n          while (++i < l) {\n            try {\n              (ev = events[i]).callback.apply(ev.ctx, args);\n            } catch (e) {\n              this.handleCallbackError(e, ev, args);\n            }\n          }\n\n      }\n    },\n    // the default implementation just counts the number of errors per module (key) and\n    // triggers pubsub.many_errors\n    handleCallbackError: function handleCallbackError(e, event, args) {\n      console.warn('[PubSub] Error: ', event, args, e.message, e.stack);\n\n      if (this.debug) {\n        throw e;\n      } else {\n        console.warn(e.stack);\n      }\n\n      var kid = event.ctx.getId();\n      var nerr = this._errors[kid] = (this._errors[kid] || 0) + 1;\n\n      if (nerr % this.errWarningCount == 0) {\n        this.publish(this.pubSubKey, this.BIG_FIRE, nerr, e, event, args);\n      }\n    },\n    isRunning: function isRunning() {\n      return this.running;\n    }\n  });\n  return PubSub;\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//# sourceURL=webpack://bumblebee/./src/js/services/default_pubsub.js?");

/***/ }),

/***/ "./src/js/services/pubsub.js":
/*!***********************************!*\
  !*** ./src/js/services/pubsub.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**\n * Created by rchyla on 3/16/14.\n */\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ \"./src/libs/backbone.js\"), __webpack_require__(/*! underscore */ \"./node_modules/underscore/underscore-umd.js\"), __webpack_require__(/*! js/mixins/hardened */ \"./src/js/mixins/hardened.js\"), __webpack_require__(/*! pubsub_service_impl */ \"./src/js/services/default_pubsub.js\"), __webpack_require__(/*! js/components/pubsub_events */ \"./src/js/components/pubsub_events.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone, _, Hardened, PubSubImplementation, PubSubEvents) {\n  var PubSub = PubSubImplementation.extend({\n    /*\n     * Wraps itself into a Facade that can be shared with other modules\n     * (it is read-only); absolutely non-modifiable and provides the\n     * following callbacks:\n     *  - publish\n     *  - subscribe\n     *  - unsubscribe\n     *  - getPubSubKey\n     */\n    hardenedInterface: {\n      subscribe: 'register callback',\n      unsubscribe: 'deregister callback',\n      publish: 'send data to the queue',\n      getPubSubKey: 'get secret key'\n    }\n  });\n\n  _.extend(PubSub.prototype, Hardened, {\n    /**\n     * The PubSub hardened instance will expose different\n     * api - it doesn't allow modules to pass the PubSubKey\n     *\n     * @param iface\n     * @returns {*}\n     */\n    getHardenedInstance: function getHardenedInstance(iface) {\n      iface = _.clone(iface || this.hardenedInterface); // build a unique key for this instance\n\n      var ctx = {\n        key: this.getPubSubKey()\n      };\n      var self = this; // purpose of these functions is to expose simplified\n      // api (without need to pass pubsubkey explicitly)\n\n      iface.publish = function () {\n        self.publish.apply(self, [ctx.key].concat(_.toArray(arguments)));\n      };\n\n      iface.subscribe = function () {\n        self.subscribe.apply(self, [ctx.key].concat(_.toArray(arguments)));\n      };\n\n      iface.unsubscribe = function () {\n        self.unsubscribe.apply(self, [ctx.key].concat(_.toArray(arguments)));\n      };\n\n      iface.subscribeOnce = function () {\n        self.subscribeOnce.apply(self, [ctx.key].concat(_.toArray(arguments)));\n      };\n\n      iface.getCurrentPubSubKey = function () {\n        return ctx.key;\n      };\n\n      var hardened = this._getHardenedInstance(iface, this);\n\n      _.extend(hardened, PubSubEvents);\n\n      return hardened;\n    }\n  });\n\n  _.extend(PubSub.prototype, PubSubEvents);\n\n  return PubSub;\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//# sourceURL=webpack://bumblebee/./src/js/services/pubsub.js?");

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
/******/ 			"PubSub": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], function() { return __webpack_require__("./src/js/services/pubsub.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;