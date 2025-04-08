function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (e, s) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? s(exports, require("react-hook-form")) : "function" == typeof define && define.amd ? define(["exports", "react-hook-form"], s) : s((e = e || self).ReactHookFormResolvers = {}, e.ReactHookForm);
}(this, function (e, s) {
  "use strict";

  var r = function r(e) {
    return e.reduce(function (e, s, r) {
      return "".concat(e).concat("string" == typeof s ? "".concat(r > 0 ? "." : "").concat(s) : "[".concat(s, "]"));
    }, "").toString();
  };

  var t = function t(e, _t) {
    return Array.isArray(e.failures) ? e.failures.reduce(function (e, _ref) {
      var a = _ref.path,
          _ref$message = _ref.message,
          n = _ref$message === void 0 ? "" : _ref$message,
          o = _ref.type;
      var c = r(a);
      return Object.assign(Object.assign({}, e), a ? e[c] && _t ? _defineProperty({}, c, s.appendErrors(c, _t, e, o || "", n)) : _defineProperty({}, c, e[c] || Object.assign({
        message: n,
        type: o
      }, _t ? {
        types: _defineProperty({}, o || "", n || !0)
      } : {})) : {});
    }, {}) : [];
  },
      a = function a(e, t) {
    return Array.isArray(e.details) ? e.details.reduce(function (e, _ref4) {
      var a = _ref4.path,
          _ref4$message = _ref4.message,
          n = _ref4$message === void 0 ? "" : _ref4$message,
          o = _ref4.type;
      var c = r(a);
      return Object.assign(Object.assign({}, e), a ? e[c] && t ? _defineProperty({}, c, s.appendErrors(c, t, e, o, n)) : _defineProperty({}, c, e[c] || Object.assign({
        message: n,
        type: o
      }, t ? {
        types: _defineProperty({}, o, n || !0)
      } : {})) : {});
    }, {}) : [];
  };

  e.joiResolver = function (e) {
    var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      abortEarly: !1
    };
    return /*#__PURE__*/function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(t, n) {
        var o,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                o = _args.length > 2 && _args[2] !== undefined ? _args[2] : !1;
                _context.prev = 1;
                _context.next = 4;
                return e.validateAsync(t, Object.assign({}, r));

              case 4:
                _context.t0 = _context.sent;
                _context.t1 = {};
                return _context.abrupt("return", {
                  values: _context.t0,
                  errors: _context.t1
                });

              case 9:
                _context.prev = 9;
                _context.t2 = _context["catch"](1);
                return _context.abrupt("return", {
                  values: {},
                  errors: s.transformToNestObject(a(_context.t2, o))
                });

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 9]]);
      }));

      return function (_x, _x2) {
        return _ref7.apply(this, arguments);
      };
    }();
  }, e.superstructResolver = function (e) {
    return /*#__PURE__*/function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(r, a) {
        var n,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                n = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : !1;
                _context2.prev = 1;
                return _context2.abrupt("return", {
                  values: e(r),
                  errors: {}
                });

              case 5:
                _context2.prev = 5;
                _context2.t0 = _context2["catch"](1);
                return _context2.abrupt("return", {
                  values: {},
                  errors: s.transformToNestObject(t(_context2.t0, n))
                });

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 5]]);
      }));

      return function (_x3, _x4) {
        return _ref8.apply(this, arguments);
      };
    }();
  }, e.yupResolver = function (e) {
    var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      abortEarly: !1
    };
    return /*#__PURE__*/function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(t, a) {
        var n,
            _r,
            _args3 = arguments;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                n = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : !1;
                _context3.prev = 1;
                r.context;
                _context3.next = 5;
                return e.validate(t, Object.assign(Object.assign({}, r), {
                  context: a
                }));

              case 5:
                _context3.t0 = _context3.sent;
                _context3.t1 = {};
                return _context3.abrupt("return", {
                  values: _context3.t0,
                  errors: _context3.t1
                });

              case 10:
                _context3.prev = 10;
                _context3.t2 = _context3["catch"](1);

                _r = function (e, s) {
                  return Array.isArray(e.inner) && e.inner.length ? e.inner.reduce(function (e, _ref10) {
                    var r = _ref10.path,
                        t = _ref10.message,
                        a = _ref10.type;
                    var n = e[r] && e[r].types || {};
                    return Object.assign(Object.assign({}, e), r ? _defineProperty({}, r, Object.assign(Object.assign({}, e[r] || {
                      message: t,
                      type: a
                    }), s ? {
                      types: Object.assign(Object.assign({}, n), _defineProperty({}, a, n[a] ? [].concat(_toConsumableArray([].concat(n[a])), [t]) : t))
                    } : {})) : {});
                  }, {}) : _defineProperty({}, e.path, {
                    message: e.message,
                    type: e.type
                  });
                }(_context3.t2, n);

                return _context3.abrupt("return", {
                  values: {},
                  errors: n ? _r : s.transformToNestObject(_r)
                });

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 10]]);
      }));

      return function (_x5, _x6) {
        return _ref9.apply(this, arguments);
      };
    }();
  }, Object.defineProperty(e, "__esModule", {
    value: !0
  });
});
