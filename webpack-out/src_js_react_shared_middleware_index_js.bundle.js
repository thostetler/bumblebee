/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkbumblebee"] = self["webpackChunkbumblebee"] || []).push([["src_js_react_shared_middleware_index_js"],{

/***/ "./src/js/react/shared/middleware/api.js":
/*!***********************************************!*\
  !*** ./src/js/react/shared/middleware/api.js ***!
  \***********************************************/
/***/ (function(module, exports) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {\n  // default fail object\n  var defaultFail = {\n    responseJSON: {\n      error: 'Server-side issue occurred'\n    }\n  };\n  /**\n   * Scoped request\n   *\n   * This will trigger an api request\n   */\n\n  var request = function request(_ref, _ref2) {\n    var trigger = _ref.trigger;\n    var dispatch = _ref2.dispatch;\n    return function (next) {\n      return function (action) {\n        next(action);\n\n        if (action.type === 'API_REQUEST' && action.scope) {\n          var done = function done(result) {\n            dispatch({\n              type: \"\".concat(action.scope, \"_API_REQUEST_SUCCESS\"),\n              result: result\n            });\n          };\n\n          var fail = function fail() {\n            var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultFail;\n            var responseJSON = error.responseJSON,\n                statusText = error.statusText;\n            var errorMsg = defaultFail.responseJSON.error;\n\n            if (responseJSON) {\n              errorMsg = responseJSON.error || responseJSON.message || responseJSON.msg;\n            } else if (statusText) {\n              errorMsg = statusText;\n            }\n\n            dispatch({\n              type: \"\".concat(action.scope, \"_API_REQUEST_FAILURE\"),\n              error: errorMsg,\n              result: responseJSON\n            });\n          };\n\n          var _action$options = action.options,\n              target = _action$options.target,\n              _action$options$query = _action$options.query,\n              query = _action$options$query === void 0 ? {} : _action$options$query,\n              _action$options$type = _action$options.type,\n              type = _action$options$type === void 0 ? 'GET' : _action$options$type,\n              data = _action$options.data,\n              headers = _action$options.headers;\n\n          if (!target) {\n            return;\n          }\n\n          dispatch({\n            type: \"\".concat(action.scope, \"_API_REQUEST_PENDING\")\n          });\n          trigger('sendRequest', {\n            target: target,\n            query: query,\n            options: {\n              type: type,\n              done: done,\n              fail: fail,\n              data: JSON.stringify(data),\n              headers: _objectSpread({\n                Accept: 'application/json; charset=utf-8',\n                'Content-Type': 'application/json; charset=utf-8'\n              }, headers)\n            }\n          });\n        }\n      };\n    };\n  };\n\n  return {\n    request: request\n  };\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//# sourceURL=webpack://bumblebee/./src/js/react/shared/middleware/api.js?");

/***/ }),

/***/ "./src/js/react/shared/middleware/index.js":
/*!*************************************************!*\
  !*** ./src/js/react/shared/middleware/index.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! js/react/shared/middleware/api */ \"./src/js/react/shared/middleware/api.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (api) {\n  return [api];\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//# sourceURL=webpack://bumblebee/./src/js/react/shared/middleware/index.js?");

/***/ })

}]);