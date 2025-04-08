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

/***/ "./src/js/components/api_feedback.js":
/*!*******************************************!*\
  !*** ./src/js/components/api_feedback.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ \"./node_modules/underscore/underscore-umd.js\"), __webpack_require__(/*! backbone */ \"./src/libs/backbone.js\"), __webpack_require__(/*! js/mixins/hardened */ \"./src/js/mixins/hardened.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, Backbone, Hardened) {\n  var ApiFeedback = function ApiFeedback(options) {\n    _.extend(this, _.defaults(options || {}, {\n      code: 200,\n      msg: undefined\n    }));\n\n    this.setCode(this.code);\n  };\n\n  ApiFeedback.CODES = {\n    INVALID_PASSWORD: 498,\n    ACCOUNT_NOT_FOUND: 495,\n    // Account not found during signin\n    ALREADY_LOGGED_IN: 493,\n    // Already signed during signup\n    REQUIRES_LOGIN: 491,\n    TOO_MANY_CHARACTERS: 486,\n    BAD_REQUEST: 400,\n    UNAUTHORIZED: 401,\n    NOT_FOUND: 404,\n    INTERNAL_SERVER_ERROR: 500,\n    BAD_GATEWAY: 502,\n    SERVER_ERROR: 503,\n    TOO_MANY_FAILURES: 580,\n    ALL_FINE: 200,\n    KEEP_WAITING: 190,\n    TESTING: 0,\n    // Internal events\n    MAKE_SPACE: -1,\n    UNMAKE_SPACE: -1.1,\n    SEARCH_CYCLE_STARTED: -2,\n    SEARCH_CYCLE_FAILED_TO_START: -3,\n    SEARCH_CYCLE_PROGRESS: -4,\n    SEARCH_CYCLE_STOP_MONITORING: -5,\n    SEARCH_CYCLE_FINISHED: -6,\n    QUERY_ASSISTANT: -7,\n    ALERT: -8,\n    CANNOT_ROUTE: -9,\n    API_REQUEST_ERROR: -10,\n    BIBCODE_DATA_REQUESTED: -11\n  };\n  var _codes = {};\n\n  _.each(_.pairs(ApiFeedback.CODES), function (p) {\n    _codes[p[1]] = p[0];\n  });\n\n  _.extend(ApiFeedback.prototype, {\n    hardenedInterface: {\n      code: 'integer value of the code',\n      msg: 'string message',\n      toJSON: 'for cloning',\n      getApiRequest: 'to get the original request',\n      getSenderKey: 'retrieve the senders key'\n    },\n    initialize: function initialize() {},\n    toJSON: function toJSON() {\n      return {\n        code: this.code,\n        msg: this.msg\n      };\n    },\n    setCode: function setCode(c) {\n      if (!_codes[c]) {\n        throw new Error('This code is not in the list ApiCodes - please extend js/components/api_feedback first:', this.code);\n      }\n\n      this.code = c;\n    },\n    setApiRequest: function setApiRequest(apiRequest) {\n      this.req = apiRequest;\n    },\n    getApiRequest: function getApiRequest() {\n      return this.req;\n    },\n    setMsg: function setMsg(msg) {\n      this.msg = msg;\n    },\n    getSenderKey: function getSenderKey() {\n      return this.senderKey;\n    },\n    setSenderKey: function setSenderKey(key) {\n      this.senderKey = key;\n    }\n  }, Hardened);\n\n  ApiFeedback.extend = Backbone.Model.extend;\n  return ApiFeedback;\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//# sourceURL=webpack://bumblebee/./src/js/components/api_feedback.js?");

/***/ }),

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

/***/ "./src/js/components/hotkeys_controller.js":
/*!*************************************************!*\
  !*** ./src/js/components/hotkeys_controller.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! js/components/generic_module */ \"./src/js/components/generic_module.js\"), __webpack_require__(/*! js/mixins/dependon */ \"./src/js/mixins/dependon.js\"), __webpack_require__(/*! js/mixins/hardened */ \"./src/js/mixins/hardened.js\"), __webpack_require__(/*! js/components/api_feedback */ \"./src/js/components/api_feedback.js\"), __webpack_require__(/*! hotkeys */ \"./src/libs/hotkeys.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (GenericModule, Dependon, Hardened, ApiFeedback, hotkeys) {\n  var MODIFIER = 'alt+shift';\n\n  var mod = function mod(val) {\n    var arr = Array.isArray(val) ? val : [val];\n    return arr.map(function (key) {\n      return \"\".concat(MODIFIER, \"+\").concat(key);\n    }).join(', ');\n  };\n\n  var HOTKEYS = [{\n    hotkey: mod('a'),\n    event: 'search',\n    description: 'Focus on search bar'\n  }, {\n    hotkey: mod('left'),\n    event: 'prev',\n    description: 'Previous results page'\n  }, {\n    hotkey: mod('right'),\n    event: 'next',\n    description: 'Next results page'\n  }, {\n    hotkey: mod('down'),\n    event: 'item-next',\n    description: 'Focus on next result entry'\n  }, {\n    hotkey: mod('up'),\n    event: 'item-prev',\n    description: 'Focus on previous result entry'\n  }, {\n    hotkey: mod('s'),\n    event: 'item-select',\n    description: 'Select currently focused result entry'\n  }, {\n    hotkey: mod('`'),\n    event: 'show-help',\n    description: 'Show help dialog'\n  }];\n  var HotkeysController = GenericModule.extend({\n    initialize: function initialize() {},\n    createEvent: function createEvent(name) {\n      var ps = this.getPubSub();\n      return function (e) {\n        ps.publish(ps.CUSTOM_EVENT, name, e);\n      };\n    },\n    activate: function activate(beehive) {\n      var _this = this;\n\n      this.setBeeHive(beehive);\n      HOTKEYS.forEach(function (_ref) {\n        var hotkey = _ref.hotkey,\n            event = _ref.event;\n        hotkeys(hotkey, _this.createEvent(\"hotkey/\".concat(event)));\n      });\n      var ps = this.getPubSub();\n      ps.subscribe(ps.CUSTOM_EVENT, function (e) {\n        if (e === 'hotkey/show-help') {\n          _this.showHelpModal();\n        }\n      });\n    },\n    getHotkeys: function getHotkeys() {\n      return HOTKEYS;\n    },\n    showHelpModal: function showHelpModal() {\n      var pubsub = this.getPubSub();\n      pubsub.publish(pubsub.FEEDBACK, new ApiFeedback({\n        code: ApiFeedback.CODES.ALERT,\n        msg: this.getModalMessage(),\n        title: 'Hotkeys',\n        modal: true\n      }));\n    },\n    getModalMessage: function getModalMessage() {\n      return ['<dl style=\"display: flex; flex-flow: row wrap;\">'].concat(_toConsumableArray(HOTKEYS.map(function (_ref2) {\n        var hotkey = _ref2.hotkey,\n            description = _ref2.description;\n        var hotkeyList = hotkey.split(', ').map(function (c) {\n          return \"<code>\".concat(c, \"</code>\");\n        }).join(', ');\n        return \"\\n            <dt style=\\\"flex-basis: 40%; text-align: right; padding-right: 10px\\\">\".concat(hotkeyList, \"</dt>\\n            <dd style=\\\"flex-basis: 60%\\\">\").concat(description, \"</dd>\\n          \");\n      })), ['</dl>']).join('');\n    },\n    hardenedInterface: {}\n  });\n\n  _.extend(HotkeysController.prototype, Dependon.BeeHive, Hardened);\n\n  return HotkeysController;\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//# sourceURL=webpack://bumblebee/./src/js/components/hotkeys_controller.js?");

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

/***/ "./src/js/mixins/hardened.js":
/*!***********************************!*\
  !*** ./src/js/mixins/hardened.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**\n * Created by rchyla on 3/18/14.\n */\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ \"./node_modules/underscore/underscore-umd.js\"), __webpack_require__(/*! js/components/facade */ \"./src/js/components/facade.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, Facade) {\n  var Mixin = {\n    /*\n     * Creates a hardened instance of itself, it uses\n     * interface description from 'hardenedInterface'\n     * Implementations need to populate 'hardenedInterface'\n     * with list of properties and methods that should be exposed\n     * through the Facade\n     */\n    _getHardenedInstance: function _getHardenedInstance(iface, objectIn) {\n      if (!('hardenedInterface' in this) && !iface) {\n        throw Error('Error: this.hardenedInterface is not defined');\n      }\n\n      return new Facade(iface || ('hardenedInterface' in this ? this.hardenedInterface : {}), objectIn);\n    },\n    getHardenedInstance: function getHardenedInstance(iface) {\n      return this._getHardenedInstance(iface, this);\n    }\n  };\n  return Mixin;\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//# sourceURL=webpack://bumblebee/./src/js/mixins/hardened.js?");

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
/******/ 			"HotkeysController": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], function() { return __webpack_require__("./src/js/components/hotkeys_controller.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;