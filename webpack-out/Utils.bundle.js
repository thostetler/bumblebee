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

/***/ "./src/js/components/analytics.js":
/*!****************************************!*\
  !*** ./src/js/components/analytics.js ***!
  \****************************************/
/***/ (function(module, exports) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {\n  /*\n   * Set of targets\n   * each has a set of hooks which coorespond to the event label passed\n   * types represents the possible event targets which can be used\n   * url is a template which will be passed the incoming data\n   */\n  var TARGETS = {\n    resolver: {\n      hooks: ['toc-link-followed', 'abstract-link-followed', 'citations-link-followed', 'associated-link-followed'],\n      types: ['abstract', 'citations', 'references', 'metrics', 'coreads', 'similar', 'graphics', 'associated', 'toc'],\n      url: function url(_ref) {\n        var bibcode = _ref.bibcode,\n            target = _ref.target;\n        return \"link_gateway/\".concat(bibcode, \"/\").concat(target);\n      }\n    }\n  };\n  /**\n   * fire off the xhr request to the url\n   *\n   * @param {string} url\n   * @param {object} data\n   */\n\n  var sendEvent = function sendEvent(url) {\n    window.fetch(url, {\n      method: 'GET'\n    }).catch(function (error) {\n      window.getSentry().captureMessage('Failed to send analytics event', {\n        extra: {\n          url: url,\n          error: error.message\n        }\n      });\n    });\n  };\n\n  var isValidEvent = function isValidEvent(_ref2) {\n    var label = _ref2.label,\n        target = _ref2.target;\n\n    if (typeof label !== 'string' || typeof target !== 'string') {\n      return false;\n    }\n\n    return TARGETS.resolver.hooks.includes(label) && TARGETS.resolver.types.includes(target);\n  };\n  /**\n   * Go through the targets and fire the event if the label passed\n   * matches one of the hooks specified.  Also the data.target must match one\n   * of the types listed on the target config\n   *\n   * @param {string} label - the event label\n   * @param {object} data - the event data\n   */\n\n\n  var adsLogger = function adsLogger(label, data) {\n    var target = data ? data.target : null;\n    var bibcode = data ? data.bibcode : null;\n\n    if (bibcode !== null && isValidEvent({\n      label: label,\n      target: target\n    })) {\n      sendEvent(data.url ? data.url : TARGETS.resolver.url({\n        bibcode: bibcode,\n        target: target\n      }));\n    }\n  };\n\n  var buffer = [];\n  var gaName = window.GoogleAnalyticsObject || 'ga';\n\n  var cleanBuffer = function cleanBuffer() {\n    if (window[gaName]) {\n      for (var i = 0; i < buffer.length; i++) {\n        window[gaName].apply(this, buffer[i]);\n      }\n\n      buffer = [];\n    }\n  };\n\n  var CACHE_TIMEOUT = 300;\n  /**\n   * Simple debouncing mechanism with caching\n   * this will store stringified version of the incoming events and provide a way to\n   * check if the event has recently been cached.  With a short rolling timer to keep the timeout short to hopefully\n   * only target duplicate calls.\n   */\n\n  var AnalyticsCacher = /*#__PURE__*/function () {\n    function AnalyticsCacher() {\n      _classCallCheck(this, AnalyticsCacher);\n\n      this.timer = null;\n      this.cache = new Set();\n    }\n\n    _createClass(AnalyticsCacher, [{\n      key: \"stringify\",\n      value: function stringify(args) {\n        return JSON.stringify(args, function (key, value) {\n          // filter out this cache-buster id added by GTM\n          if (key === 'gtm.uniqueEventId') {\n            return undefined;\n          }\n\n          return value;\n        });\n      }\n    }, {\n      key: \"add\",\n      value: function add() {\n        this._resetTimeout();\n\n        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n          args[_key] = arguments[_key];\n        }\n\n        return this.cache.add(this.stringify(args));\n      }\n    }, {\n      key: \"has\",\n      value: function has() {\n        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n          args[_key2] = arguments[_key2];\n        }\n\n        return this.cache.has(this.stringify(args));\n      }\n    }, {\n      key: \"_resetTimeout\",\n      value: function _resetTimeout() {\n        clearTimeout(this.timer);\n        this.timer = setTimeout(this._clear.bind(this), CACHE_TIMEOUT);\n      }\n    }, {\n      key: \"_clear\",\n      value: function _clear() {\n        this.cache.clear();\n      }\n    }]);\n\n    return AnalyticsCacher;\n  }();\n\n  var cacher = new AnalyticsCacher();\n\n  var Analytics = function Analytics(action, event, type, description) {\n    for (var _len3 = arguments.length, args = new Array(_len3 > 4 ? _len3 - 4 : 0), _key3 = 4; _key3 < _len3; _key3++) {\n      args[_key3 - 4] = arguments[_key3];\n    }\n\n    if (cacher.has(arguments)) {\n      return;\n    }\n\n    cacher.add(arguments);\n    adsLogger.apply(null, Array.prototype.slice.call(arguments, 3)); // if the action is send and the event is event, then we want to send the event to the dataLayer\n\n    if (Array.isArray(window.dataLayer) && action === 'send' && event === 'event') {\n      // some events are 'interaction' or 'error', so add that to the event name\n      window.dataLayer.push({\n        event: \"\".concat(type, \"_\").concat(description),\n        // if the next argument is an object, we'll use that as the data, ignore an extra arguments\n        value1: args[0],\n        value2: args[1],\n        value3: args[2]\n      });\n    } else if (Array.isArray(window.dataLayer) && action === 'send') {\n      window.dataLayer.push({\n        event: event,\n        value1: type,\n        value2: description,\n        value3: args[0]\n      });\n    } else if (Array.isArray(window.dataLayer) && action === 'set') {\n      window.dataLayer.push({\n        event: 'config',\n        value1: event,\n        value2: type,\n        value3: description\n      });\n    }\n  };\n  /**\n   * Get the datalayer for sending events to\n   * @returns {*|*[]}\n   */\n\n\n  Analytics.getDL = function () {\n    if (window.dataLayer && Array.isArray(window.dataLayer)) {\n      return window.dataLayer;\n    }\n\n    return [];\n  };\n  /**\n   * Push a new object to the datalayer\n   * @param {Object} data\n   */\n\n\n  Analytics.push = function (data) {\n    if (cacher.has(data)) {\n      return;\n    }\n\n    cacher.add(data);\n    Analytics.getDL().push(data);\n  };\n  /**\n   * Reset the datalayer\n   */\n\n\n  Analytics.reset = function () {\n    Analytics.getDL().push(function () {\n      this.reset();\n    });\n  };\n  /**\n   * set a value on the datalayer\n   * @param {string} property\n   * @param {unknown} value\n   */\n\n\n  Analytics.set = function (property, value) {\n    Analytics.getDL().push(function () {\n      this.set(property, value);\n    });\n  };\n  /**\n   * get a value on the datalayer\n   * @param {string} property\n   */\n\n\n  Analytics.get = function (property) {\n    var value;\n    Analytics.getDL().push(function () {\n      value = this.get(property);\n    });\n    return value;\n  };\n\n  return Analytics;\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//# sourceURL=webpack://bumblebee/./src/js/components/analytics.js?");

/***/ }),

/***/ "./src/js/components/api_query.js":
/*!****************************************!*\
  !*** ./src/js/components/api_query.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*\n A facade: api query exposing only the set of functions that we allow. This is\n the module that you want to load in the application (do not load the concrete\n implementaions, such as solr_params !)\n\n Put in your config:\n map: {\n 'your/module': {\n 'api_query_impl': 'js/components/specific_impl_of_the_api_query'\n }\n },\n\n */\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ \"./src/libs/backbone.js\"), __webpack_require__(/*! underscore */ \"./node_modules/underscore/underscore-umd.js\"), __webpack_require__(/*! js/components/solr_params */ \"./src/js/components/solr_params.js\"), __webpack_require__(/*! js/components/facade */ \"./src/js/components/facade.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone, _, ApiQueryImplementation, Facade) {\n  var hardenedInterface = {\n    add: 'add values',\n    set: 'set (replace existing)',\n    get: 'get values',\n    has: 'has a key',\n    hasVal: 'more specific `has` using _.isEmpty',\n    url: 'url string of the params',\n    load: 'loads query as a string',\n    clear: 'clears all values',\n    unset: 'removes a key',\n    toJSON: 'values back as JSON object',\n    clone: 'make a copy',\n    isLocked: true,\n    lock: true,\n    unlock: true,\n    pairs: 'get all values as pairs',\n    keys: 'as keys',\n    values: 'only values',\n    hasChanged: 'whether this object has modification (since its creation)',\n    previousAttributes: 'get all changed attributes',\n    previous: 'previous values for a given attribute'\n  };\n\n  var ApiQuery = function ApiQuery(data, options) {\n    // Facade pattern, we want to expose only limited API\n    // despite the fact that the underlying instance has\n    // all power of the Backbone.Model\n    if (data instanceof ApiQueryImplementation) {\n      this.innerQuery = new Facade(hardenedInterface, data);\n    } else {\n      this.innerQuery = new Facade(hardenedInterface, new ApiQueryImplementation(data, options));\n    }\n  };\n\n  var toInsert = {};\n\n  _.each(_.keys(hardenedInterface), function (element, index, list) {\n    toInsert[element] = function () {\n      return this.innerQuery[element].apply(this.innerQuery, arguments);\n    };\n  });\n\n  _.extend(ApiQuery.prototype, toInsert, {\n    clone: function clone() {\n      var clone = this.innerQuery.clone.apply(this.innerQuery, arguments);\n      return new ApiQuery(clone);\n    },\n    load: function load() {\n      var clone = this.innerQuery.load.apply(this.innerQuery, arguments);\n      return new ApiQuery(clone);\n    }\n  });\n\n  return ApiQuery;\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//# sourceURL=webpack://bumblebee/./src/js/components/api_query.js?");

/***/ }),

/***/ "./src/js/components/api_request.js":
/*!******************************************!*\
  !*** ./src/js/components/api_request.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**\n * Created by rchyla on 3/28/14.\n */\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ \"./node_modules/underscore/underscore-umd.js\"), __webpack_require__(/*! backbone */ \"./src/libs/backbone.js\"), __webpack_require__(/*! js/components/facade */ \"./src/js/components/facade.js\"), __webpack_require__(/*! js/components/default_request */ \"./src/js/components/default_request.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, Backbone, Facade, ApiRequestImpl) {\n  var hardenedInterface = {\n    // add makes no sense with request\n    get: 'get a key',\n    set: 'set (replace existing)',\n    url: 'url string defining this request',\n    has: 'has a key',\n    load: 'loads request as a string',\n    clear: 'clears all values',\n    unset: 'removes a key',\n    toJSON: 'values back as JSON object',\n    clone: 'make a copy',\n    isLocked: true,\n    lock: true,\n    unlock: true,\n    pairs: 'get all values as pairs',\n    keys: 'as keys',\n    values: 'only values',\n    hasChanged: 'whether this object has modification (since its creation)',\n    previousAttributes: 'get all changed attributes',\n    previous: 'previous values for a given attribute'\n  };\n\n  var ApiRequest = function ApiRequest(data, options) {\n    // Facade pattern, we want to expose only limited API\n    // despite the fact that the underlying instance has\n    // all power of the Backbone.Model\n    if (data instanceof ApiRequestImpl) {\n      this.innerRequest = new Facade(hardenedInterface, data);\n    } else {\n      this.innerRequest = new Facade(hardenedInterface, new ApiRequestImpl(data, options));\n    }\n  };\n\n  var toInsert = {};\n\n  _.each(_.keys(hardenedInterface), function (element, index, list) {\n    toInsert[element] = function () {\n      return this.innerRequest[element].apply(this.innerRequest, arguments);\n    };\n  });\n\n  _.extend(ApiRequest.prototype, toInsert, {\n    clone: function clone() {\n      var clone = this.innerRequest.clone.apply(this.innerRequest, arguments);\n      return new ApiRequest(clone);\n    },\n    load: function load() {\n      var clone = this.innerRequest.load.apply(this.innerRequest, arguments);\n      return new ApiRequest(clone);\n    }\n  });\n\n  return ApiRequest;\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//# sourceURL=webpack://bumblebee/./src/js/components/api_request.js?");

/***/ }),

/***/ "./src/js/components/default_request.js":
/*!**********************************************!*\
  !*** ./src/js/components/default_request.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n/**\n * Created by rchyla on 3/28/14.\n */\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ \"./node_modules/underscore/underscore-umd.js\"), __webpack_require__(/*! backbone */ \"./src/libs/backbone.js\"), __webpack_require__(/*! js/components/api_query */ \"./src/js/components/api_query.js\"), __webpack_require__(/*! js/components/multi_params */ \"./src/js/components/multi_params.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, Backbone, ApiQuery, MultiParams) {\n  var basicCheck = function basicCheck(s) {\n    if (_.isString(s)) {\n      return true;\n    }\n\n    if (_.isArray(s)) {\n      var l = s.length;\n\n      for (var i = 0; i < l; i++) {\n        var x = s[i];\n\n        if (!(_.isString(x) || _.isNumber(x))) {\n          return false;\n        }\n      }\n    }\n\n    return true;\n  };\n\n  var allowedAttrs = {\n    query: function query(v) {\n      if (_.isUndefined(v)) {\n        return true;\n      }\n\n      return v instanceof ApiQuery;\n    },\n    target: basicCheck,\n    sender: basicCheck,\n    options: basicCheck\n  };\n  var checker = {\n    target: function target(s) {\n      if (s && s.substring(0, 1) !== '/') {\n        return '/' + s;\n      }\n    }\n  };\n  var Request = MultiParams.extend({\n    /**\n     * Internal method: we allow only certain keys\n     *\n     * @param attributes\n     * @param options\n     * @returns {boolean}\n     * @private\n     */\n    _validate: function _validate(attributes, options) {\n      _.forOwn(attributes, function (val, attr) {\n        var tempVal = attributes[attr];\n\n        if (!(attr in allowedAttrs)) {\n          throw new Error('Invalid attr: ' + attr);\n        }\n\n        if (!allowedAttrs[attr].call(allowedAttrs, tempVal)) {\n          throw new Error('Invalid value:key ' + attr + tempVal);\n        }\n      });\n\n      return true;\n    },\n\n    /**\n     * Modified version of the multi-valued set(); we do not insist\n     * on having the values in array\n     *\n     * @param key\n     * @param val\n     * @param options\n     * @returns {Request}\n     */\n    set: function set(key, val, options) {\n      this._checkLock();\n\n      var attrs;\n      if (key == null) return this; // Handle both `\"key\", value` and `{key: value}` -style arguments.\n\n      if (_typeof(key) === 'object') {\n        attrs = key;\n        options = val;\n      } else {\n        (attrs = {})[key] = val;\n      }\n\n      Backbone.Model.prototype.set.call(this, attrs, options);\n    },\n    // for requests, we use all components: path, query, hash\n    _checkParsed: function _checkParsed(attrs) {\n      if (_.isObject(attrs)) {\n        var ret = {};\n\n        if ('#query' in attrs && !_.isEmpty(attrs['#query'])) {\n          ret.query = new ApiQuery(attrs['#query']);\n        }\n\n        if ('#path' in attrs) {\n          ret.target = attrs['#path'][0];\n        }\n\n        if ('#hash' in attrs) {\n          _.extend(ret, _.each(attrs['#hash'], function (val, key, obj) {\n            if (val.length == 1) {\n              obj[key] = val[0];\n            }\n          }));\n        }\n\n        return ret;\n      }\n\n      return attrs;\n    },\n\n    /*\n     * Return the url string encoding all parameters that made\n     * this request. The parameters will be sorted alphabetically\n     * by their keys and URL encoded so that they can be used\n     * in requests.\n     */\n    url: function url(whatToSort) {\n      if (!whatToSort) {\n        whatToSort = this.attributes;\n      }\n\n      var target = whatToSort.target;\n      var url = target ? _.isArray(target) ? target.join('/') : target : '';\n\n      if ('query' in whatToSort) {\n        url += '?' + whatToSort.query.url();\n      }\n\n      if ('sender' in whatToSort) {\n        url += '#' + MultiParams.prototype.url.call(this, {\n          sender: whatToSort.sender\n        });\n      }\n\n      return url;\n    },\n\n    /**\n     * Re-constructs the query from the url string, returns the json attributes;\n     * cannot be used it the instance is locked\n     *\n     * @param query (String)\n     * @returns {Model}\n     */\n    load: function load(query) {\n      return MultiParams.prototype.load.call(this, query.indexOf('?') > -1 ? query : query + '?');\n    }\n  });\n  return Request;\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//# sourceURL=webpack://bumblebee/./src/js/components/default_request.js?");

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

/***/ "./src/js/components/solr_params.js":
/*!******************************************!*\
  !*** ./src/js/components/solr_params.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*\nSubclass of the multi-param with a functionality specific for\nSOLR queries. Do not use this class directly inside your app!\nInstead, import 'api_query' and configure it properly\n\n * <p>For a list of possible parameters, please consult the links below.</p>\n *\n * @see http://wiki.apache.org/solr/CoreQueryParameters\n * @see http://wiki.apache.org/solr/CommonQueryParameters\n * @see http://wiki.apache.org/solr/SimpleFacetParameters\n * @see http://wiki.apache.org/solr/HighlightingParameters\n * @see http://wiki.apache.org/solr/MoreLikeThis\n * @see http://wiki.apache.org/solr/SpellCheckComponent\n * @see http://wiki.apache.org/solr/StatsComponent\n * @see http://wiki.apache.org/solr/TermsComponent\n * @see http://wiki.apache.org/solr/TermVectorComponent\n * @see http://wiki.apache.org/solr/LocalParams\n *\n * @param properties A map of fields to set. Refer to the list of public fields.\n * @class ParameterStore\n */\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! js/components/multi_params */ \"./src/js/components/multi_params.js\"), __webpack_require__(/*! backbone */ \"./src/libs/backbone.js\"), __webpack_require__(/*! underscore */ \"./node_modules/underscore/underscore-umd.js\"), __webpack_require__(/*! jquery */ \"./src/libs/jquery.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (MultiParams, Backbone, _, $) {\n  var SolrParams = MultiParams.extend({\n    fieldsToConcatenate: [],\n    defaultOperator: ' ',\n    fieldProcessors: {\n      '*': function _(vals, self) {\n        return [vals.join(self.defaultOperator)];\n      }\n    },\n    initialize: function initialize(attributes, options) {\n      if (options) {\n        _.extend(this, _.pick(options, ['fieldsToConcatenate', 'defaultOperator', 'fieldProcessors']));\n      }\n    },\n    url: function url(resp, options) {\n      // first massage the fields, but do not touch the original values\n      // lodash has a parameter isDeep that can be set to true, but\n      // for compatibility reasons with underscore, lets' not use it\n      // the values should always be only one level deep\n      var values = _.clone(this.attributes);\n\n      var l = this.fieldsToConcatenate.length;\n      var k = '';\n\n      for (var i = 0; i < l; i++) {\n        k = this.fieldsToConcatenate[i];\n\n        if (this.has(k)) {\n          if (this.fieldProcessors[k]) {\n            values[k] = this.fieldProcessors[k](this.get(k), this);\n          } else {\n            values[k] = this.fieldProcessors['*'](this.get(k), this);\n          }\n        }\n      } // then call the default implementation of the url handling\n\n\n      return MultiParams.prototype.url.call(this, values);\n    }\n  });\n  return SolrParams;\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//# sourceURL=webpack://bumblebee/./src/js/components/solr_params.js?");

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ \"./src/libs/jquery.js\"), __webpack_require__(/*! underscore */ \"./node_modules/underscore/underscore-umd.js\"), __webpack_require__(/*! analytics */ \"./src/js/components/analytics.js\"), __webpack_require__(/*! react */ \"./src/libs/react.js\"), __webpack_require__(/*! js/components/api_query */ \"./src/js/components/api_query.js\"), __webpack_require__(/*! js/components/api_request */ \"./src/js/components/api_request.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function ($, _, analytics, React, ApiQuery, ApiRequest) {\n  var qs = function qs(key, str, separator) {\n    // eslint-disable-next-line no-useless-escape\n    var k = key.replace(/[*+?^$.[\\]{}()|\\\\\\/]/g, '\\\\$&'); // escape RegEx meta chars\n\n    var pattern = '(^|[\\\\?&])' + k + '=[^&]*';\n    var match = (str || window.location.hash).match(new RegExp(pattern, 'g'));\n\n    if (!match) {\n      return null;\n    }\n\n    var clean = []; // remove 'key=' from string, combine with optional separator and unquote spaces\n\n    for (var i = 0; i < match.length; i += 1) {\n      clean.push(match[i].replace(new RegExp('(^|[\\\\?&])' + k + '='), ''));\n    }\n\n    if (separator) {\n      var msg = clean.join(separator); // works even if separator is undefined\n\n      return decodeURIComponent(msg.replace(/\\+/g, ' '));\n    }\n\n    if (separator === false) {\n      return _.map(clean, function (msg) {\n        return decodeURIComponent(msg.replace(/\\+/g, ' '));\n      });\n    }\n\n    return null;\n  };\n\n  var updateHash = function updateHash(key, value, hash) {\n    // eslint-disable-next-line no-useless-escape\n    var k = key.replace(/[*+?^$.[\\]{}()|\\\\\\/]/g, '\\\\$&');\n    var h = _.isString(hash) ? hash : window.location.hash;\n    var match = h.match(new RegExp('&?' + k + '=([^&]+)(&|$)'));\n\n    if (match) {\n      var mat = match[0].replace(match[1], value);\n      return h.replace(match[0], mat);\n    }\n\n    return hash;\n  };\n\n  var difference = function difference(obj, base) {\n    return _.transform(obj, function (result, value, key) {\n      if (!_.isEqual(value, base[key])) {\n        result[key] = _.isObject(value) && _.isObject(base[key]) ? difference(value, base[key]) : value;\n      }\n    });\n  }; // get the current browser information\n\n\n  var getBrowserInfo = function getBrowserInfo() {\n    // do this inline, so we only request when necessary\n    var $dd = $.Deferred(); // reject after 3 seconds\n\n    var timeoutId = setTimeout(function () {\n      $dd.reject();\n    }, 3000);\n\n    window.require(['bowser'], function (bowser) {\n      window.clearTimeout(timeoutId);\n      $dd.resolve(bowser.parse(window.navigator.userAgent));\n    }, function () {\n      $dd.reject();\n    });\n\n    return $dd.promise();\n  };\n\n  var TimingEvent = /*#__PURE__*/function () {\n    function TimingEvent() {\n      var timingVar = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Timers';\n      var timingCategory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Generic Timer';\n      var timingLabel = arguments.length > 2 ? arguments[2] : undefined;\n\n      _classCallCheck(this, TimingEvent);\n\n      this.timingCategory = timingCategory;\n      this.timingVar = timingVar;\n      this.timingLabel = timingLabel;\n      this.time = null;\n    }\n\n    _createClass(TimingEvent, [{\n      key: \"start\",\n      value: function start() {\n        this.time = +new Date();\n        this._emitted = false;\n      }\n    }, {\n      key: \"stop\",\n      value: function stop() {\n        // do not emit an event if we haven't started timing or already emitted\n        if (this._emitted) {\n          return;\n        }\n\n        var time = +new Date() - this.time;\n        analytics('send', 'timing', {\n          timingCategory: this.timingCategory,\n          timingVar: this.timingVar,\n          timingLabel: this.timingLabel,\n          timingValue: time\n        });\n        this._emitted = true;\n      }\n    }]);\n\n    return TimingEvent;\n  }();\n\n  var waitForSelector = function waitForSelector() {\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    var $dd = $.Deferred();\n    var timeout = 3100; // 31 seconds\n\n    var ref = null;\n\n    (function check(n) {\n      var $el = $.apply(void 0, args);\n\n      if ($el.length) {\n        return $dd.resolve($el);\n      }\n\n      if (n >= timeout) {\n        return $dd.reject('timeout');\n      }\n\n      ref = setTimeout(function () {\n        window.requestAnimationFrame(function () {\n          check(n += 1);\n        });\n      }, 100);\n      return null;\n    })(0);\n\n    $dd.promise.destroy = function () {\n      window.clearTimeout(ref);\n      $dd.reject();\n    };\n\n    return $dd.promise();\n  };\n\n  var withPrerenderedContent = function withPrerenderedContent(view) {\n    view.handlePrerenderedContent = function (content, $el) {\n      // setup the elements so events are properly delegated\n      var selector = view.tagName + '.' + view.className;\n      view.$el = $(selector, $el); // stops mathjax from pre-rendering before we replace the content\n\n      $('>', view.$el).addClass('tex2jax_ignore');\n      view.el = view.$el.get(0);\n      view.delegateEvents(); // replace the current marionette template renderer for a moment\n\n      var _renderTmpl = view._renderTemplate;\n\n      view._renderTemplate = function () {}; // reset template renderer on first model change\n\n\n      view.model.once('change', function () {\n        view._renderTemplate = _renderTmpl;\n      });\n    };\n\n    return view;\n  };\n\n  var escapeRegExp = function escapeRegExp(value) {\n    return value.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&');\n  };\n\n  var makeApiQuery = function makeApiQuery(params) {\n    return new ApiQuery(params);\n  };\n\n  var makeApiRequest = function makeApiRequest(params) {\n    return new ApiRequest(params);\n  };\n\n  var extractErrorMessageFromAjax = function extractErrorMessageFromAjax(maybeXHR, defaultMessage) {\n    if (typeof maybeXHR !== 'undefined' && typeof maybeXHR.responseJSON !== 'undefined') {\n      if (typeof maybeXHR.responseJSON.error === 'string') {\n        return maybeXHR.responseJSON.error;\n      } else if (typeof maybeXHR.responseJSON.message === 'string') {\n        return maybeXHR.responseJSON.message;\n      }\n    }\n\n    return defaultMessage;\n  };\n\n  return {\n    qs: qs,\n    updateHash: updateHash,\n    difference: difference,\n    getBrowserInfo: getBrowserInfo,\n    TimingEvent: TimingEvent,\n    waitForSelector: waitForSelector,\n    withPrerenderedContent: withPrerenderedContent,\n    escapeRegExp: escapeRegExp,\n    makeApiQuery: makeApiQuery,\n    makeApiRequest: makeApiRequest,\n    extractErrorMessageFromAjax: extractErrorMessageFromAjax\n  };\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//# sourceURL=webpack://bumblebee/./src/js/utils.js?");

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
/******/ 			"Utils": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], function() { return __webpack_require__("./src/js/utils.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;