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

/***/ "./src/js/components/api_query.js":
/*!****************************************!*\
  !*** ./src/js/components/api_query.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*\n A facade: api query exposing only the set of functions that we allow. This is\n the module that you want to load in the application (do not load the concrete\n implementaions, such as solr_params !)\n\n Put in your config:\n map: {\n 'your/module': {\n 'api_query_impl': 'js/components/specific_impl_of_the_api_query'\n }\n },\n\n */\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ \"./src/libs/backbone.js\"), __webpack_require__(/*! underscore */ \"./node_modules/underscore/underscore-umd.js\"), __webpack_require__(/*! js/components/solr_params */ \"./src/js/components/solr_params.js\"), __webpack_require__(/*! js/components/facade */ \"./src/js/components/facade.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone, _, ApiQueryImplementation, Facade) {\n  var hardenedInterface = {\n    add: 'add values',\n    set: 'set (replace existing)',\n    get: 'get values',\n    has: 'has a key',\n    hasVal: 'more specific `has` using _.isEmpty',\n    url: 'url string of the params',\n    load: 'loads query as a string',\n    clear: 'clears all values',\n    unset: 'removes a key',\n    toJSON: 'values back as JSON object',\n    clone: 'make a copy',\n    isLocked: true,\n    lock: true,\n    unlock: true,\n    pairs: 'get all values as pairs',\n    keys: 'as keys',\n    values: 'only values',\n    hasChanged: 'whether this object has modification (since its creation)',\n    previousAttributes: 'get all changed attributes',\n    previous: 'previous values for a given attribute'\n  };\n\n  var ApiQuery = function ApiQuery(data, options) {\n    // Facade pattern, we want to expose only limited API\n    // despite the fact that the underlying instance has\n    // all power of the Backbone.Model\n    if (data instanceof ApiQueryImplementation) {\n      this.innerQuery = new Facade(hardenedInterface, data);\n    } else {\n      this.innerQuery = new Facade(hardenedInterface, new ApiQueryImplementation(data, options));\n    }\n  };\n\n  var toInsert = {};\n\n  _.each(_.keys(hardenedInterface), function (element, index, list) {\n    toInsert[element] = function () {\n      return this.innerQuery[element].apply(this.innerQuery, arguments);\n    };\n  });\n\n  _.extend(ApiQuery.prototype, toInsert, {\n    clone: function clone() {\n      var clone = this.innerQuery.clone.apply(this.innerQuery, arguments);\n      return new ApiQuery(clone);\n    },\n    load: function load() {\n      var clone = this.innerQuery.load.apply(this.innerQuery, arguments);\n      return new ApiQuery(clone);\n    }\n  });\n\n  return ApiQuery;\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//# sourceURL=webpack://bumblebee/./src/js/components/api_query.js?");

/***/ }),

/***/ "./src/js/components/facade.js":
/*!*************************************!*\
  !*** ./src/js/components/facade.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**\n * Created by rchyla on 3/16/14. inspiration: http://jsfiddle.net/pajtai/GD5qR/35/\n */\n\n/*\n * // Interface\n *  var remoteInterface = {\n *    on: 'turn on'\n *  };\n *  // Implementation\n *  var htmlRemote = {\n *    on: function() { console.log(\"remote on\"); return this; }\n *  };\n *  // Protecting the implementation\n *  var htmlInterface = new Facade(remoteInterface, htmlRemote);\n *\n */\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ \"./node_modules/underscore/underscore-umd.js\"), __webpack_require__(/*! js/components/facade */ \"./src/js/components/facade.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, Facade) {\n  // The Facade encapsulates objectIn according to the description\n  // The exposed facade is guaranteed to have exactly the functions described in description.\n  var Facade = function Facade(description, objectIn) {\n    var facade; // TODO: add enforce of \"new\"\n\n    facade = {};\n    this.mixIn(description, objectIn, facade); // TODO: check that \"mixIn\" is not taken\n\n    facade.mixIn = this.mixIn;\n    return facade;\n  };\n\n  Facade.prototype.mixIn = function (description, objectIn, facade) {\n    var property;\n    var propertyValue;\n    facade = facade || this;\n\n    for (property in description) {\n      propertyValue = description[property];\n\n      if (property in objectIn) {\n        var p = objectIn[property];\n\n        if (typeof propertyValue === 'function') {\n          // redefining the method\n          facade[property] = _.bind(propertyValue, objectIn);\n        } else if (typeof p === 'function') {\n          // exposing the method\n          facade[property] = _.bind(p, objectIn);\n        } else if (_.isUndefined(p)) {// pass\n        } else if (_.isString(p) || _.isNumber(p) || _.isBoolean(p) || _.isDate(p) || _.isNull(p) || _.isRegExp(p)) {\n          // build getter method\n          facade['get' + property.substring(0, 1).toUpperCase() + property.substring(1)] = _.bind(function () {\n            return this.ctx[this.name];\n          }, {\n            ctx: objectIn,\n            name: property\n          });\n          facade[property] = p; // copy the value (it is immutable anyways)\n        } else if (p.hasOwnProperty('__facade__') && p.__facade__) {\n          // exposing internal facade\n          facade[property] = p;\n        } else if (_.isObject(p) && 'getHardenedInstance' in p) {\n          // builds a facade\n          facade[property] = p.getHardenedInstance();\n        } else {\n          throw new Error(\"Sorry, you can't wrap '\" + property + \"': \" + p);\n        }\n      } else if (typeof propertyValue === 'function') {\n        facade[property] = _.bind(propertyValue, objectIn);\n      } else {\n        throw new Error('Unknown key: ' + property + '(' + propertyValue + ')');\n      }\n    }\n\n    if (objectIn) {\n      // .name is not supported in IE\n      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name\n      facade.__facade__ = Boolean(objectIn.constructor ? objectIn.constructor.name ? objectIn.constructor.name : true : true);\n    } else {\n      facade.__facade__ = true;\n    } // TODO:rca - shall we use?\n    // if (Object.freeze)\n    //  facade = Object.freeze(facade);\n\n\n    return facade;\n  };\n\n  return Facade;\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//# sourceURL=webpack://bumblebee/./src/js/components/facade.js?");

/***/ }),

/***/ "./src/js/components/multi_params.js":
/*!*******************************************!*\
  !*** ./src/js/components/multi_params.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n/*\n multi_params is a generic class to store any parameters;\n it is backed by BB.Model and has all the functionality\n the values are always stored as an array of values; so\n even if you try to set strings, you will always have\n list of strings\n */\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ \"./src/libs/backbone.js\"), __webpack_require__(/*! underscore */ \"./node_modules/underscore/underscore-umd.js\"), __webpack_require__(/*! jquery */ \"./src/libs/jquery.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone, _, $) {\n  var Model = Backbone.Model.extend({\n    locked: false,\n    _checkLock: function _checkLock() {\n      if (this.locked === true) {\n        throw Error('Object locked for modifications');\n      }\n    },\n    isLocked: function isLocked() {\n      return this.locked;\n    },\n    lock: function lock() {\n      this.locked = true;\n    },\n    unlock: function unlock() {\n      this.locked = false;\n    },\n    clone: function clone() {\n      if (this.isLocked()) {\n        var c = new this.constructor(this.attributes);\n        c.lock();\n        return c;\n      }\n\n      return new this.constructor(this.attributes);\n    },\n    hasVal: function hasVal(key) {\n      return !_.isEmpty(this.get(key));\n    },\n    // we allow only strings and numbers; instead of sending\n    // signal we throw a direct error\n    _validate: function _validate(attributes, options) {\n      // check we have only numbers and/or finite numbers\n      for (var attr in attributes) {\n        if (!_.isString(attr)) {\n          throw new Error('Keys must be strings, not: ' + attr);\n        } // remove empty strings\n\n\n        var tempVal = attributes[attr];\n        tempVal = _.without(_.flatten(tempVal), '', false, null, undefined, NaN);\n\n        if (!_.isArray(tempVal)) {\n          throw new Error('Values were not converted to an Array');\n        }\n\n        if (_.isEmpty(tempVal) && options.unset !== true) {\n          throw new Error('Empty values not allowed');\n        }\n\n        if (!_.every(tempVal, function (v) {\n          return _.isString(v) || _.isNumber(v) && !_.isNaN(v);\n        })) {\n          throw new Error('Invalid value (not a string or number): ' + tempVal);\n        }\n\n        attributes[attr] = tempVal;\n      }\n\n      return true;\n    },\n    // Every value is going to be multi-valued by default\n    // in this way we can treat all objects in the same way\n    set: function set(key, val, options) {\n      this._checkLock();\n\n      var attrs;\n      if (key == null) return this; // Handle both `\"key\", value` and `{key: value}` -style arguments.\n\n      if (_typeof(key) === 'object') {\n        attrs = key;\n        options = val;\n      } else {\n        (attrs = {})[key] = val;\n      }\n\n      for (var attr in attrs) {\n        var tempVal = attrs[attr]; // convert to array if necessary\n\n        if (!_.isArray(tempVal)) {\n          attrs[attr] = _.flatten([tempVal]);\n        }\n      }\n\n      Backbone.Model.prototype.set.call(this, attrs, options);\n    },\n    unset: function unset() {\n      this._checkLock();\n\n      Backbone.Model.prototype.unset.apply(this, arguments);\n    },\n    // adds values to existing (like set, but keeps the old vals)\n    add: function add(key, val, options) {\n      this._checkLock();\n\n      var attrs;\n      if (key == null) return this; // Handle both `\"key\", value` and `{key: value}` -style arguments.\n\n      if (_typeof(key) === 'object') {\n        attrs = key;\n        options = val;\n      } else {\n        (attrs = {})[key] = val;\n      }\n\n      for (var attr in attrs) {\n        var tempVal = attrs[attr]; // convert to array if necessary\n\n        if (!_.isArray(tempVal)) {\n          tempVal = _.flatten([tempVal]);\n        }\n\n        if (this.has(attr)) {\n          tempVal = _.clone(this.get(attr)).concat(tempVal);\n        }\n\n        attrs[attr] = tempVal;\n      }\n\n      Backbone.Model.prototype.set.call(this, attrs, options);\n    },\n    // synchronization is disabled\n    sync: function sync() {\n      throw Error('MultiParams cannot be saved to server');\n    },\n\n    /*\n     * Return the url string encoding all parameters that made\n     * this query. The parameters will be sorted alphabetically\n     * by their keys and URL encoded so that they can be used\n     * in requests.\n     */\n    url: function url(whatToSort) {\n      if (!whatToSort) {\n        whatToSort = this.attributes;\n      } // sort keys alphabetically\n\n\n      var sorted = _.pairs(whatToSort).sort(function (a, b) {\n        return a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0;\n      }); // June1:rca - I need to preserve order of values (becuaes of the query modifications/updates) the logic\n      // just requires us to be careful and we need order to be preserved when the query is cloned\n      // also sort values\n      // var s = {};\n      // sorted.map(function(item) { s[item[0]] = (_.isArray(item[1]) ? item[1].sort() : item[1]) });\n      // we have to double encode certain elements\n      // sorted = _.map(sorted, function(pair) { return [pair[0], _.map(pair[1], function(v) {return (v.indexOf && v.indexOf('=') > -1) ? encodeURIComponent(v) : v })]});\n      // use traditional encoding\n      // use %20 instead of + (url encoding instead of form encoding)\n\n\n      var encoded = $.param(_.object(sorted), true);\n      encoded = encoded.replace(/\\+/g, '%20'); // Replace funky unicode quotes with normal ones\n\n      encoded = encoded.replace(/%E2%80%9[ECD]/g, '%22');\n      return encoded;\n    },\n\n    /**\n     * Parses string (urlparams) and returns it as an object\n     * @param resp\n     * @param options\n     * @returns {*}\n     */\n    parse: function parse(resp, options) {\n      if (_.isString(resp)) {\n        var attrs = {};\n        resp = decodeURI(resp);\n\n        if (resp.indexOf('?') > -1) {\n          attrs['#path'] = [resp.slice(0, resp.indexOf('?'))];\n          resp = resp.slice(resp.indexOf('?') + 1);\n        }\n\n        if (resp.indexOf('#') > -1) {\n          attrs['#hash'] = this._parse(resp.slice(resp.indexOf('#') + 1));\n          resp = resp.slice(0, resp.indexOf('#'));\n        }\n\n        attrs['#query'] = this._parse(resp);\n        return this._checkParsed(attrs);\n      }\n\n      return this._checkParsed(resp); // else return resp object\n    },\n    _parse: function _parse(resp) {\n      var attrs = {};\n      var hash;\n\n      if (!resp.trim()) {\n        return attrs;\n      }\n\n      var hashes = resp.slice(resp.indexOf('?') + 1).split('&'); // resp = decodeURIComponent(resp);\n\n      var key;\n      var value;\n\n      for (var i = 0; i < hashes.length; i++) {\n        hash = hashes[i].split('=');\n        key = decodeURIComponent(hash[0].split('+').join(' ')); // optimized: .replace(/\\+/g, \" \")\n\n        var vall = hash[1];\n\n        if (hash.length > 2) {\n          hash.shift();\n          vall = hash.join('=');\n        } // replace literal '%' with code and '+' become literal spaces\n\n\n        value = decodeURIComponent(vall.replace(/%(?!\\d|[ABCDEF]+)/gi, '%25').split('+').join(' '));\n\n        if (attrs[key] !== undefined) {\n          attrs[key].push(value);\n        } else {\n          attrs[key] = [value];\n        }\n      }\n\n      return attrs;\n    },\n    // default behaviour is just to keep the query parameters\n    // after the string was parsed, you can override it to suit other needs\n    _checkParsed: function _checkParsed(attrs) {\n      if (_.isObject(attrs)) {\n        if ('#query' in attrs) {\n          return attrs['#query'];\n        }\n      }\n\n      return attrs;\n    },\n\n    /**\n     * Re-constructs the query from the url string, returns the json attributes;\n     * cannot be used it the instance is locked\n     *\n     * @param query (String)\n     * @returns {Model}\n     */\n    load: function load(query) {\n      this._checkLock();\n\n      var vals = this.parse(query);\n      this.clear();\n      this.set(vals);\n      return this;\n    }\n  });\n  return Model;\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//# sourceURL=webpack://bumblebee/./src/js/components/multi_params.js?");

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

/***/ "./src/js/components/solr_params.js":
/*!******************************************!*\
  !*** ./src/js/components/solr_params.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*\nSubclass of the multi-param with a functionality specific for\nSOLR queries. Do not use this class directly inside your app!\nInstead, import 'api_query' and configure it properly\n\n * <p>For a list of possible parameters, please consult the links below.</p>\n *\n * @see http://wiki.apache.org/solr/CoreQueryParameters\n * @see http://wiki.apache.org/solr/CommonQueryParameters\n * @see http://wiki.apache.org/solr/SimpleFacetParameters\n * @see http://wiki.apache.org/solr/HighlightingParameters\n * @see http://wiki.apache.org/solr/MoreLikeThis\n * @see http://wiki.apache.org/solr/SpellCheckComponent\n * @see http://wiki.apache.org/solr/StatsComponent\n * @see http://wiki.apache.org/solr/TermsComponent\n * @see http://wiki.apache.org/solr/TermVectorComponent\n * @see http://wiki.apache.org/solr/LocalParams\n *\n * @param properties A map of fields to set. Refer to the list of public fields.\n * @class ParameterStore\n */\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! js/components/multi_params */ \"./src/js/components/multi_params.js\"), __webpack_require__(/*! backbone */ \"./src/libs/backbone.js\"), __webpack_require__(/*! underscore */ \"./node_modules/underscore/underscore-umd.js\"), __webpack_require__(/*! jquery */ \"./src/libs/jquery.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (MultiParams, Backbone, _, $) {\n  var SolrParams = MultiParams.extend({\n    fieldsToConcatenate: [],\n    defaultOperator: ' ',\n    fieldProcessors: {\n      '*': function _(vals, self) {\n        return [vals.join(self.defaultOperator)];\n      }\n    },\n    initialize: function initialize(attributes, options) {\n      if (options) {\n        _.extend(this, _.pick(options, ['fieldsToConcatenate', 'defaultOperator', 'fieldProcessors']));\n      }\n    },\n    url: function url(resp, options) {\n      // first massage the fields, but do not touch the original values\n      // lodash has a parameter isDeep that can be set to true, but\n      // for compatibility reasons with underscore, lets' not use it\n      // the values should always be only one level deep\n      var values = _.clone(this.attributes);\n\n      var l = this.fieldsToConcatenate.length;\n      var k = '';\n\n      for (var i = 0; i < l; i++) {\n        k = this.fieldsToConcatenate[i];\n\n        if (this.has(k)) {\n          if (this.fieldProcessors[k]) {\n            values[k] = this.fieldProcessors[k](this.get(k), this);\n          } else {\n            values[k] = this.fieldProcessors['*'](this.get(k), this);\n          }\n        }\n      } // then call the default implementation of the url handling\n\n\n      return MultiParams.prototype.url.call(this, values);\n    }\n  });\n  return SolrParams;\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//# sourceURL=webpack://bumblebee/./src/js/components/solr_params.js?");

/***/ }),

/***/ "./src/js/mixins/dependon.js":
/*!***********************************!*\
  !*** ./src/js/mixins/dependon.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**\n * Created by rchyla on 3/13/14.\n */\n\n/*\n * This module contains a set of utilities that can be added to classes\n * to give them certain functionality\n */\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ \"./node_modules/underscore/underscore-umd.js\"), __webpack_require__(/*! js/components/pubsub_events */ \"./src/js/components/pubsub_events.js\"), __webpack_require__(/*! js/components/pubsub_key */ \"./src/js/components/pubsub_key.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, PubSubEvents, PubSubKey) {\n  var Mixin = {\n    /*\n     * BeeHive is the object that allows modules to get access to objects\n     * of the application (but we make sure these objects are protected\n     * and only application can set/change them). This mixin gives objects\n     * functions to query 'BeeHive'\n     */\n    BeeHive: {\n      // called by parents (app) to give modules access\n      setBeeHive: function setBeeHive(brundibar) {\n        if (_.isEmpty(brundibar)) throw new Error('Huh? Empty Beehive? Trying to be funny?');\n        this.__beehive = brundibar;\n      },\n      getBeeHive: function getBeeHive() {\n        if (!this.hasBeeHive()) throw new Error('The BeeHive is inactivate (or dead :<})');\n        return this.__beehive;\n      },\n      hasBeeHive: function hasBeeHive() {\n        if (this.__beehive && (this.__beehive.active || this.__beehive.__facade__ && this.__beehive.getActive())) {\n          return true;\n        }\n\n        return false;\n      },\n\n      /**\n       * Method which returns a masked instance of PubSub (unless the PubSub\n       * is already a hardened instance; which carries its own key)\n       *\n       * You can call pubsub.publish() without having to supply the pubsub key\n       * (which is what most controllers want to do; there are only some\n       * exceptions to this rule; ie. query-mediator). If you need to get\n       * access to the full PubSub (and you have it inside BeeHive) then do\n       * this.getBeeHive().getService('PubSub')\n       */\n      getPubSub: function getPubSub() {\n        if (!this.hasBeeHive()) throw new Error('The BeeHive is inactive (or dead >:})');\n        if (!this.__ctx) this.__ctx = {};\n        if (this.__ctx.pubsub) return this.__ctx.pubsub;\n\n        var pubsub = this.__beehive.getService('PubSub');\n\n        if (pubsub && pubsub.__facade__) return pubsub; // build a unique key for this instance\n\n        this.__ctx.pubsub = {\n          _key: pubsub.getPubSubKey(),\n          _exec: function _exec(name, args) {\n            args = _.toArray(args);\n            if (args[0] instanceof PubSubKey) throw Error('You have given us a PubSub key, this.publish() method does not need it.');\n            args.unshift(this._key);\n            pubsub[name].apply(pubsub, args);\n          },\n          publish: function publish() {\n            this._exec('publish', arguments);\n          },\n          subscribe: function subscribe() {\n            this._exec('subscribe', arguments);\n          },\n          subscribeOnce: function subscribeOnce() {\n            this._exec('subscribeOnce', arguments);\n          },\n          unsubscribe: function unsubscribe() {\n            this._exec('unsubscribe', arguments);\n          },\n          getCurrentPubSubKey: function getCurrentPubSubKey() {\n            return this._key;\n          }\n        };\n\n        _.extend(this.__ctx.pubsub, PubSubEvents);\n\n        return this.__ctx.pubsub;\n      },\n      hasPubSub: function hasPubSub() {\n        if (this.hasBeeHive()) return _.isObject(this.__beehive.getService('PubSub'));\n        return false;\n      }\n    },\n    App: {\n      setApp: function setApp(app) {\n        if (_.isUndefined(app)) throw new Error('App object cannot be empty');\n        this.__app = app;\n      },\n      getApp: function getApp() {\n        return this.__app;\n      },\n      hasApp: function hasApp() {\n        return !_.isEmpty(this.__app);\n      }\n    }\n  };\n  return Mixin;\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//# sourceURL=webpack://bumblebee/./src/js/mixins/dependon.js?");

/***/ }),

/***/ "./src/js/widgets/api_query/templates/item-view.html":
/*!***********************************************************!*\
  !*** ./src/js/widgets/api_query/templates/item-view.html ***!
  \***********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var Handlebars = __webpack_require__(/*! ../../../../../node_modules/handlebars/runtime.js */ \"./node_modules/handlebars/runtime.js\");\nfunction __default(obj) { return obj && (obj.__esModule ? obj[\"default\"] : obj); }\nmodule.exports = (Handlebars[\"default\"] || Handlebars).template({\"compiler\":[8,\">= 4.3.0\"],\"main\":function(container,depth0,helpers,partials,data) {\n    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=\"function\", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {\n        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {\n          return parent[propertyName];\n        }\n        return undefined\n    };\n\n  return \"<td class=\\\"key\\\"><input type=\\\"text\\\" name=\\\"key\\\" value=\\\"\"\n    + alias4(((helper = (helper = lookupProperty(helpers,\"key\") || (depth0 != null ? lookupProperty(depth0,\"key\") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{\"name\":\"key\",\"hash\":{},\"data\":data,\"loc\":{\"start\":{\"line\":1,\"column\":53},\"end\":{\"line\":1,\"column\":60}}}) : helper)))\n    + \"\\\"/></td>\\n<td class=\\\"value\\\"><input type=\\\"text\\\" name=\\\"value\\\" value=\\\"\"\n    + alias4(((helper = (helper = lookupProperty(helpers,\"value\") || (depth0 != null ? lookupProperty(depth0,\"value\") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{\"name\":\"value\",\"hash\":{},\"data\":data,\"loc\":{\"start\":{\"line\":2,\"column\":57},\"end\":{\"line\":2,\"column\":66}}}) : helper)))\n    + \"\\\"/></td>\\n<td> <a class=\\\"remove\\\">remove</a></td>\";\n},\"useData\":true});\n\n//# sourceURL=webpack://bumblebee/./src/js/widgets/api_query/templates/item-view.html?");

/***/ }),

/***/ "./src/js/widgets/api_query/templates/widget-view.html":
/*!*************************************************************!*\
  !*** ./src/js/widgets/api_query/templates/widget-view.html ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var Handlebars = __webpack_require__(/*! ../../../../../node_modules/handlebars/runtime.js */ \"./node_modules/handlebars/runtime.js\");\nfunction __default(obj) { return obj && (obj.__esModule ? obj[\"default\"] : obj); }\nmodule.exports = (Handlebars[\"default\"] || Handlebars).template({\"compiler\":[8,\">= 4.3.0\"],\"main\":function(container,depth0,helpers,partials,data) {\n    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {\n        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {\n          return parent[propertyName];\n        }\n        return undefined\n    };\n\n  return \"<div id=\\\"api-query\\\" class=\\\"well well-small\\\">\\n    <h5>Query Inspection</h5>\\n    <form>\\n        <input type=\\\"text\\\" placeholder=\\\"Copy&Paste serialized query here\\\" id=\\\"api-query-input\\\" value=\\\"\"\n    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,\"initialValue\") || (depth0 != null ? lookupProperty(depth0,\"initialValue\") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === \"function\" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{\"name\":\"initialValue\",\"hash\":{},\"data\":data,\"loc\":{\"start\":{\"line\":4,\"column\":102},\"end\":{\"line\":4,\"column\":118}}}) : helper)))\n    + \"\\\"/>\\n        <button id=\\\"api-query-load\\\">Load</button>\\n        <button id=\\\"api-query-add\\\">Add</button>\\n        <button id=\\\"api-query-run\\\">Run</button>\\n\\n    <table id=\\\"api-query-values\\\">\\n\\n    </table>\\n\\n    Result: <pre id=\\\"api-query-result\\\"></pre>\\n    </form>\\n</div>\";\n},\"useData\":true});\n\n//# sourceURL=webpack://bumblebee/./src/js/widgets/api_query/templates/widget-view.html?");

/***/ }),

/***/ "./src/js/widgets/api_query/widget.js":
/*!********************************************!*\
  !*** ./src/js/widgets/api_query/widget.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**\n * Created by rchyla on 3/19/14.\n */\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ \"./node_modules/underscore/underscore-umd.js\"), __webpack_require__(/*! jquery */ \"./src/libs/jquery.js\"), __webpack_require__(/*! backbone */ \"./src/libs/backbone.js\"), __webpack_require__(/*! marionette */ \"./src/libs/backbone.marionette.js\"), __webpack_require__(/*! js/components/api_query */ \"./src/js/components/api_query.js\"), __webpack_require__(/*! js/components/pubsub_events */ \"./src/js/components/pubsub_events.js\"), __webpack_require__(/*! hbs!js/widgets/api_query/templates/widget-view */ \"./src/js/widgets/api_query/templates/widget-view.html\"), __webpack_require__(/*! hbs!js/widgets/api_query/templates/item-view */ \"./src/js/widgets/api_query/templates/item-view.html\"), __webpack_require__(/*! js/mixins/dependon */ \"./src/js/mixins/dependon.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, $, Backbone, Marionette, ApiQuery, PubSubEvents, WidgetTemplate, ItemTemplate, Dependon) {\n  // Model\n  var KeyValue = Backbone.Model.extend({}); // Collection of data\n\n  var KeyValueCollection = Backbone.Collection.extend({\n    model: KeyValue\n  });\n  var ItemView = Marionette.ItemView.extend({\n    tagName: 'tr',\n    template: ItemTemplate,\n    events: {\n      'click .remove': 'removeItem',\n      'blur input[name=key]': 'onChange',\n      'blur input[name=value]': 'onChange'\n    },\n    onChange: function onChange(ev) {\n      var container = $(ev.target);\n\n      var attr = _.clone(this.model.attributes);\n\n      var newVal = $(ev.target).val();\n\n      if (container.attr('name') == 'key' && attr.key != newVal) {\n        this.trigger('key-changed', this.model, newVal);\n      } else if (container.attr('name') == 'value' && attr.value != newVal) {\n        this.trigger('value-changed', this.model, newVal);\n      }\n    },\n    removeItem: function removeItem(ev) {\n      this.trigger('remove-clicked', this.model);\n      return false;\n    }\n  });\n  var WidgetView = Marionette.CompositeView.extend({\n    template: WidgetTemplate,\n    childView: ItemView,\n    childViewContainer: '#api-query-values',\n    events: {\n      'click button#api-query-load': 'loadApiQuery',\n      'click button#api-query-add': 'addNewItem',\n      'click button#api-query-run': 'runApiQuery',\n      'submit form': 'loadApiQuery'\n    },\n    addNewItem: function addNewItem(ev) {\n      this.trigger('add-new-item', this);\n      return false;\n    },\n    loadApiQuery: function loadApiQuery(ev) {\n      var data = this.$el.find('input#api-query-input').val();\n\n      if (data && _.isString(data) && data.trim().length > 0) {\n        this.trigger('load-api-query', data);\n      }\n\n      return false;\n    },\n    runApiQuery: function runApiQuery(ev) {\n      var q = new ApiQuery();\n\n      _.map(this.collection.models, function (a) {\n        var attr = a.attributes;\n\n        if (attr.key) {\n          q.set(attr.key, attr.value.split('|'));\n        }\n      });\n\n      this.$el.find('#api-query-result').text(q.url());\n      this.trigger('run-api-query', q);\n      return false;\n    },\n    updateInputBox: function updateInputBox(data) {\n      this.$el.find('input#api-query-input').val(data);\n    },\n    removeKey: function removeKey(data) {\n      this.trigger('remove-key', data);\n    }\n  });\n  var WidgetController = Marionette.Controller.extend({\n    initialize: function initialize(apiQuery) {\n      if (!apiQuery || !(apiQuery instanceof ApiQuery)) {\n        apiQuery = new ApiQuery(); // empty\n      }\n\n      this.collection = new KeyValueCollection(this.getData(apiQuery));\n      this.view = new WidgetView({\n        collection: this.collection,\n        model: new KeyValue({\n          initialValue: apiQuery.url() || 'q=planet'\n        })\n      });\n      this.listenTo(this.view, 'all', this.onAll);\n      return this;\n    },\n    render: function render() {\n      this.view.render();\n      return this.view;\n    },\n    onLoad: function onLoad(apiQuery) {\n      if (this.collection) {\n        this.collection.reset(this.getData(apiQuery));\n      } else {\n        this.initialize(apiQuery);\n      }\n    },\n\n    /**\n     * This is the central function - listening to all events\n     * in this widget's views; and manipulating the models\n     * that back views\n     */\n    onAll: function onAll() {\n      // console.log('onAll', arguments[0]);\n      var event = arguments[0];\n\n      if (event == 'childview:remove-clicked') {\n        arguments[2].destroy();\n      } else if (event == 'childview:key-changed') {\n        arguments[2].set('key', arguments[3]);\n      } else if (event == 'childview:value-changed') {\n        arguments[2].set('value', arguments[3]);\n      } else if (event == 'add-new-item') {\n        arguments[1].collection.add({\n          key: '',\n          value: ''\n        });\n      } else if (event == 'load-api-query') {\n        this.onLoad(arguments[1]);\n      } else if (event == 'run-api-query') {\n        this.view.updateInputBox(arguments[1].url()); // update the input box\n\n        this.onRun(arguments[1]);\n      }\n    },\n\n    /**\n     * Function to massage input values and return what we want to\n     * pass to the model\n     *\n     * @param apiQuery\n     * @returns {*|Array}\n     */\n    getData: function getData(apiQuery) {\n      if (!apiQuery) {\n        throw Error('Wrong input!');\n      }\n\n      if (_.isString(apiQuery)) {\n        apiQuery = new ApiQuery().load(apiQuery);\n      }\n\n      var pairs = _.map(apiQuery.pairs(), function (pair) {\n        return {\n          key: pair[0],\n          value: pair[1].join('|')\n        };\n      });\n\n      return pairs;\n    },\n\n    /**\n     * The methods below are only working if you activate the widget and\n     * pass it BeeHive\n     *\n     * @param beehive\n     */\n    activate: function activate(beehive) {\n      this.setBeeHive(beehive);\n      var pubsub = this.getPubSub();\n      pubsub.subscribe('all', _.bind(this.onAllPubSub, this));\n    },\n\n    /**\n     * Catches and displays ApiQuery that has travelled through the\n     * PubSub queue\n     */\n    onAllPubSub: function onAllPubSub() {\n      var event = arguments[0];\n\n      if (event == PubSubEvents.START_SEARCH || event == PubSubEvents.INVITING_REQUEST) {\n        console.log('[debug:ApiQueryWidget]', arguments[0]); // this.onLoad(arguments[1]);\n\n        this.view.updateInputBox(arguments[1].url()); // update the input\n      }\n    },\n\n    /**\n     * Called by the UI View when 'Run' is clicked; you can override\n     * the method to provide your own impl\n     *\n     * @param ApiQuery\n     */\n    onRun: function onRun(apiQuery) {\n      if (this.hasPubSub()) {\n        this.getPubSub().publish(this.getPubSub().START_SEARCH, apiQuery);\n      }\n    }\n  });\n\n  _.extend(WidgetController.prototype, Dependon.BeeHive);\n\n  return WidgetController;\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//# sourceURL=webpack://bumblebee/./src/js/widgets/api_query/widget.js?");

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
/******/ 			"QueryDebugInfo": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], function() { return __webpack_require__("./src/js/widgets/api_query/widget.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;