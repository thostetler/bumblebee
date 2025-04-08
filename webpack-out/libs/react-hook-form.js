function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (e, r) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? r(exports, require("react")) : "function" == typeof define && define.amd ? define(["exports", "react"], r) : r((e = "undefined" != typeof globalThis ? globalThis : e || self).ReactHookForm = {}, e.React);
}(this, function (e, r) {
  "use strict";

  var t = function t(e) {
    return e instanceof HTMLElement;
  };

  var n = "blur",
      s = "change",
      c = "input",
      u = "onBlur",
      i = "onChange",
      a = "onSubmit",
      o = "onTouched",
      l = "all",
      f = "undefined",
      d = "max",
      y = "min",
      g = "maxLength",
      b = "minLength",
      m = "pattern",
      h = "required",
      v = "validate";

  var p = function p(e) {
    return null == e;
  };

  var O = function O(e) {
    return "object" == _typeof(e);
  };

  var A = function A(e) {
    return !p(e) && !Array.isArray(e) && O(e) && !(e instanceof Date);
  },
      R = function R(e) {
    return !Array.isArray(e) && (/^\w*$/.test(e) || !/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/.test(e));
  },
      j = function j(e) {
    return e.filter(Boolean);
  },
      F = function F(e) {
    return j(e.replace(/["|']/g, "").replace(/\[/g, ".").replace(/\]/g, "").split("."));
  };

  function V(e, r, t) {
    var n = -1;
    var s = R(r) ? [r] : F(r),
        c = s.length,
        u = c - 1;

    for (; ++n < c;) {
      var _r = s[n];
      var _c = t;

      if (n !== u) {
        var _t = e[_r];
        _c = A(_t) || Array.isArray(_t) ? _t : isNaN(+s[n + 1]) ? {} : [];
      }

      e[_r] = _c, e = e[_r];
    }

    return e;
  }

  var C = function C(e) {
    var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    for (var _t2 in e) {
      R(_t2) ? r[_t2] = e[_t2] : V(r, _t2, e[_t2]);
    }

    return r;
  },
      x = function x(e) {
    return void 0 === e;
  },
      k = function k(e, r, t) {
    var n = j(r.split(/[,[\].]+?/)).reduce(function (e, r) {
      return p(e) ? e : e[r];
    }, e);
    return x(n) || n === e ? x(e[r]) ? t : e[r] : n;
  },
      S = function S(e, r) {
    t(e) && e.removeEventListener && (e.removeEventListener(c, r), e.removeEventListener(s, r), e.removeEventListener(n, r));
  };

  var w = {
    isValid: !1,
    value: ""
  };

  var E = function E(e) {
    return Array.isArray(e) ? e.reduce(function (e, r) {
      return r && r.ref.checked ? {
        isValid: !0,
        value: r.ref.value
      } : e;
    }, w) : w;
  },
      D = function D(e) {
    return "radio" === e.type;
  },
      B = function B(e) {
    return "file" === e.type;
  },
      L = function L(e) {
    return "checkbox" === e.type;
  },
      T = function T(e) {
    return "select-multiple" === e.type;
  };

  var N = {
    value: !1,
    isValid: !1
  },
      W = {
    value: !0,
    isValid: !0
  };

  var M = function M(e) {
    if (Array.isArray(e)) {
      if (e.length > 1) {
        var _r3 = e.filter(function (e) {
          return e && e.ref.checked;
        }).map(function (_ref) {
          var e = _ref.ref.value;
          return e;
        });

        return {
          value: _r3,
          isValid: !!_r3.length
        };
      }

      var _e$0$ref = e[0].ref,
          _r2 = _e$0$ref.checked,
          _t3 = _e$0$ref.value,
          _n = _e$0$ref.attributes;
      return _r2 ? _n && !x(_n.value) ? x(_t3) || "" === _t3 ? W : {
        value: _t3,
        isValid: !0
      } : W : N;
    }

    return N;
  };

  function $(e, r, t, n) {
    var s = e.current[r];

    if (s) {
      var _s$ref = s.ref,
          _e2 = _s$ref.value,
          _r4 = _s$ref.disabled,
          _t4 = s.ref;
      if (_r4 && n) return;
      return B(_t4) ? _t4.files : D(_t4) ? E(s.options).value : T(_t4) ? (c = _t4.options, _toConsumableArray(c).filter(function (_ref2) {
        var e = _ref2.selected;
        return e;
      }).map(function (_ref3) {
        var e = _ref3.value;
        return e;
      })) : L(_t4) ? M(s.options).value : _e2;
    }

    var c;
    if (t) return k(t.current, r);
  }

  function P(e) {
    return !e || e instanceof HTMLElement && e.nodeType !== Node.DOCUMENT_NODE && P(e.parentNode);
  }

  var I = function I(e) {
    return A(e) && !Object.keys(e).length;
  },
      H = function H(e) {
    return "boolean" == typeof e;
  };

  function U(e, r) {
    var t = R(r) ? [r] : F(r),
        n = 1 == t.length ? e : function (e, r) {
      var t = r.slice(0, -1).length;
      var n = 0;

      for (; n < t;) {
        e = x(e) ? n++ : e[r[n++]];
      }

      return e;
    }(e, t),
        s = t[t.length - 1];
    var c = void 0;
    n && delete n[s];

    for (var _r5 = 0; _r5 < t.slice(0, -1).length; _r5++) {
      var _n2 = -1,
          _s = void 0;

      var _u = t.slice(0, -(_r5 + 1)),
          _i = _u.length - 1;

      for (_r5 > 0 && (c = e); ++_n2 < _u.length;) {
        var _r6 = _u[_n2];
        _s = _s ? _s[_r6] : e[_r6], _i === _n2 && (A(_s) && I(_s) || Array.isArray(_s) && !_s.filter(function (e) {
          return A(e) && !I(e) || H(e);
        }).length) && (c ? delete c[_r6] : delete e[_r6]), c = _s;
      }
    }

    return e;
  }

  var q = function q(e, r) {
    return e && e.ref === r;
  };

  function _(e, r, t, n, s) {
    var c = -1;

    for (; ++c < e.length;) {
      for (var _n3 in e[c]) {
        Array.isArray(e[c][_n3]) ? (!t[c] && (t[c] = {}), t[c][_n3] = [], _(e[c][_n3], k(r[c] || {}, _n3, []), t[c][_n3], t[c], _n3)) : k(r[c] || {}, _n3) === e[c][_n3] ? V(t[c] || {}, _n3) : t[c] = Object.assign(Object.assign({}, t[c]), _defineProperty({}, _n3, !0));
      }

      !t.length && n && delete n[s];
    }

    return t.length ? t : void 0;
  }

  var z = function z(e) {
    return "string" == typeof e;
  },
      G = function G(e) {
    return p(e) || !O(e);
  };

  function J(e, r) {
    if (G(e) || G(r)) return r;

    for (var _t5 in r) {
      var _n4 = e[_t5],
          _s2 = r[_t5];

      try {
        e[_t5] = A(_n4) && A(_s2) || Array.isArray(_n4) && Array.isArray(_s2) ? J(_n4, _s2) : _s2;
      } catch (e) {}
    }

    return e;
  }

  var K = function K(e, r, t, n) {
    var s = {};

    var _loop = function _loop(_r7) {
      (x(n) || (z(n) ? _r7.startsWith(n) : Array.isArray(n) && n.find(function (e) {
        return _r7.startsWith(e);
      }))) && (s[_r7] = $(e, _r7, void 0, t));
    };

    for (var _r7 in e.current) {
      _loop(_r7);
    }

    return J(C(Object.assign({}, (r || {}).current || {})), C(s));
  };

  function Q(e, r, t) {
    if (G(e) || G(r)) return e === r;
    var n = Object.keys(e),
        s = Object.keys(r);
    if (n.length !== s.length) return !1;

    for (var _i2 = 0, _n5 = n; _i2 < _n5.length; _i2++) {
      var _s3 = _n5[_i2];

      if (!t || !["ref", "context"].includes(_s3)) {
        var _n6 = e[_s3],
            _c2 = r[_s3];
        if ((A(_n6) || Array.isArray(_n6)) && (A(_c2) || Array.isArray(_c2)) ? !Q(_n6, _c2, t) : _n6 !== _c2) return !1;
      }
    }

    return !0;
  }

  var X = function X(e) {
    return e instanceof RegExp;
  };

  var Y = function Y(e) {
    return A(r = e) && !X(r) ? e : {
      value: e,
      message: ""
    };
    var r;
  },
      Z = function Z(e) {
    return "function" == typeof e;
  },
      ee = function ee(e) {
    return z(e) || A(e) && r.isValidElement(e);
  };

  function re(e, r) {
    var t = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "validate";
    if (ee(e) || H(e) && !e) return {
      type: t,
      message: ee(e) ? e : "",
      ref: r
    };
  }

  var te = function te(e, r, t, n, s) {
    if (r) {
      var _r8 = t[e];
      return Object.assign(Object.assign({}, _r8), {
        types: Object.assign(Object.assign({}, _r8 && _r8.types ? _r8.types : {}), _defineProperty({}, n, s || !0))
      });
    }

    return {};
  },
      ne = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e, r, _ref4, R) {
      var t, _ref4$ref, n, s, c, u, i, a, o, l, f, O, j, F, V, C, x, k, S, w, B, _ref6, _e3, _n7, _e4, _c3, _Y, _u2, _i3, _Y2, _a, _f, _r9, _r10, _Y3, _e5, _t6, _Y4, _n8, _c4, _u3, _o, _l, _Y5, _e6, _n9, _n10, _s4, _e7, _e8, _i4, _Object$entries, _Object$entries$_i, _t7, _c5, _u4;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              t = _ref4.ref, _ref4$ref = _ref4.ref, n = _ref4$ref.type, s = _ref4$ref.value, c = _ref4.options, u = _ref4.required, i = _ref4.maxLength, a = _ref4.minLength, o = _ref4.min, l = _ref4.max, f = _ref4.pattern, O = _ref4.validate;
              j = e.current, F = t.name, V = {}, C = D(t), x = L(t), k = C || x, S = "" === s, w = te.bind(null, F, r, V), B = function B(e, r, n) {
                var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : g;
                var c = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : b;
                var u = e ? r : n;
                V[F] = Object.assign({
                  type: e ? s : c,
                  message: u,
                  ref: t
                }, w(e ? s : c, u));
              };

              if (!(u && (!C && !x && (S || p(s)) || H(s) && !s || x && !M(c).isValid || C && !E(c).isValid))) {
                _context.next = 6;
                break;
              }

              _ref6 = ee(u) ? {
                value: !!u,
                message: u
              } : Y(u), _e3 = _ref6.value, _n7 = _ref6.message;

              if (!(_e3 && (V[F] = Object.assign({
                type: h,
                message: _n7,
                ref: k ? ((j[F].options || [])[0] || {}).ref : t
              }, w(h, _n7)), !r))) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", V);

            case 6:
              if (!(!p(o) || !p(l))) {
                _context.next = 11;
                break;
              }

              _Y = Y(l), _u2 = _Y.value, _i3 = _Y.message, _Y2 = Y(o), _a = _Y2.value, _f = _Y2.message;

              if ("number" === n || !n && !isNaN(s)) {
                _r9 = t.valueAsNumber || parseFloat(s);
                p(_u2) || (_e4 = _r9 > _u2), p(_a) || (_c3 = _r9 < _a);
              } else {
                _r10 = t.valueAsDate || new Date(s);
                z(_u2) && (_e4 = _r10 > new Date(_u2)), z(_a) && (_c3 = _r10 < new Date(_a));
              }

              if (!((_e4 || _c3) && (B(!!_e4, _i3, _f, d, y), !r))) {
                _context.next = 11;
                break;
              }

              return _context.abrupt("return", V);

            case 11:
              if (!(z(s) && !S && (i || a))) {
                _context.next = 15;
                break;
              }

              _Y3 = Y(i), _e5 = _Y3.value, _t6 = _Y3.message, _Y4 = Y(a), _n8 = _Y4.value, _c4 = _Y4.message, _u3 = s.toString().length, _o = !p(_e5) && _u3 > _e5, _l = !p(_n8) && _u3 < _n8;

              if (!((_o || _l) && (B(!!_o, _t6, _c4), !r))) {
                _context.next = 15;
                break;
              }

              return _context.abrupt("return", V);

            case 15:
              if (!(f && !S)) {
                _context.next = 19;
                break;
              }

              _Y5 = Y(f), _e6 = _Y5.value, _n9 = _Y5.message;

              if (!(X(_e6) && !_e6.test(s) && (V[F] = Object.assign({
                type: m,
                message: _n9,
                ref: t
              }, w(m, _n9)), !r))) {
                _context.next = 19;
                break;
              }

              return _context.abrupt("return", V);

            case 19:
              if (!O) {
                _context.next = 52;
                break;
              }

              _n10 = $(e, F, R), _s4 = k && c ? c[0].ref : t;

              if (!Z(O)) {
                _context.next = 32;
                break;
              }

              _context.t0 = re;
              _context.next = 25;
              return O(_n10);

            case 25:
              _context.t1 = _context.sent;
              _context.t2 = _s4;
              _e7 = (0, _context.t0)(_context.t1, _context.t2);

              if (!(_e7 && (V[F] = Object.assign(Object.assign({}, _e7), w(v, _e7.message)), !r))) {
                _context.next = 30;
                break;
              }

              return _context.abrupt("return", V);

            case 30:
              _context.next = 52;
              break;

            case 32:
              if (!A(O)) {
                _context.next = 52;
                break;
              }

              _e8 = {};
              _i4 = 0, _Object$entries = Object.entries(O);

            case 35:
              if (!(_i4 < _Object$entries.length)) {
                _context.next = 50;
                break;
              }

              _Object$entries$_i = _slicedToArray(_Object$entries[_i4], 2), _t7 = _Object$entries$_i[0], _c5 = _Object$entries$_i[1];

              if (!(!I(_e8) && !r)) {
                _context.next = 39;
                break;
              }

              return _context.abrupt("break", 50);

            case 39:
              _context.t3 = re;
              _context.next = 42;
              return _c5(_n10);

            case 42:
              _context.t4 = _context.sent;
              _context.t5 = _s4;
              _context.t6 = _t7;
              _u4 = (0, _context.t3)(_context.t4, _context.t5, _context.t6);
              _u4 && (_e8 = Object.assign(Object.assign({}, _u4), w(_t7, _u4.message)), r && (V[F] = _e8));

            case 47:
              _i4++;
              _context.next = 35;
              break;

            case 50:
              if (!(!I(_e8) && (V[F] = Object.assign({
                ref: _s4
              }, _e8), !r))) {
                _context.next = 52;
                break;
              }

              return _context.abrupt("return", V);

            case 52:
              return _context.abrupt("return", V);

            case 53:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function ne(_x, _x2, _x3, _x4) {
      return _ref5.apply(this, arguments);
    };
  }();

  var se = function se(e, r) {
    return Object.entries(r).map(function (_ref7) {
      var _ref8 = _slicedToArray(_ref7, 2),
          t = _ref8[0],
          n = _ref8[1];

      return function (r, t, n) {
        var s = n ? "".concat(e, ".").concat(r) : "".concat(e, "[").concat(r, "]");
        return G(t) ? s : se(s, t);
      }(t, n, A(r));
    }).flat(1 / 0);
  };

  var ce = function ce(e, r, t, n, s) {
    var c;
    return t.add(r), I(e) ? c = void 0 : (c = k(e, r), (A(c) || Array.isArray(c)) && se(r, c).forEach(function (e) {
      return t.add(e);
    })), x(c) ? s ? n : k(n, r) : c;
  },
      ue = function ue(_ref9) {
    var e = _ref9.isOnBlur,
        r = _ref9.isOnChange,
        t = _ref9.isOnTouch,
        n = _ref9.isTouched,
        s = _ref9.isReValidateOnBlur,
        c = _ref9.isReValidateOnChange,
        u = _ref9.isBlurEvent,
        i = _ref9.isSubmitted,
        a = _ref9.isOnAll;
    return !a && (!i && t ? !(n || u) : (i ? s : e) ? !u : !(i ? c : r) || u);
  },
      ie = function ie(e) {
    return e.substring(0, e.indexOf("["));
  };

  var ae = function ae(e, r) {
    return RegExp("^".concat(r, "([|.)\\d+").replace(/\[/g, "\\[").replace(/\]/g, "\\]")).test(e);
  };

  var oe = function oe(e, r) {
    return _toConsumableArray(e).some(function (e) {
      return ae(r, e);
    });
  };

  function le(e, r) {
    var t;
    if (G(e) || r && e instanceof File) return e;
    if (e instanceof Date) return t = new Date(e.getTime()), t;

    if (e instanceof Set) {
      t = new Set();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = e[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _r11 = _step.value;
          t.add(_r11);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return t;
    }

    if (e instanceof Map) {
      t = new Map();
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = e.keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _n11 = _step2.value;
          t.set(_n11, le(e.get(_n11), r));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return t;
    }

    t = Array.isArray(e) ? [] : {};

    for (var _n12 in e) {
      t[_n12] = le(e[_n12], r);
    }

    return t;
  }

  var fe = function fe(e) {
    return {
      isOnSubmit: !e || e === a,
      isOnBlur: e === u,
      isOnChange: e === i,
      isOnAll: e === l,
      isOnTouch: e === o
    };
  },
      de = function de(e) {
    return D(e) || L(e);
  };

  var ye = (typeof window === "undefined" ? "undefined" : _typeof(window)) === f,
      ge = (typeof document === "undefined" ? "undefined" : _typeof(document)) !== f && !ye && !x(window.HTMLElement),
      be = ge ? "Proxy" in window : (typeof Proxy === "undefined" ? "undefined" : _typeof(Proxy)) !== f;

  function me(e, r) {
    var t = {};

    for (var n in e) {
      Object.prototype.hasOwnProperty.call(e, n) && r.indexOf(n) < 0 && (t[n] = e[n]);
    }

    if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
      var s = 0;

      for (n = Object.getOwnPropertySymbols(e); s < n.length; s++) {
        r.indexOf(n[s]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[s]) && (t[n[s]] = e[n[s]]);
      }
    }

    return t;
  }

  var he = r.createContext(null);
  he.displayName = "RHFContext";

  var ve = function ve() {
    return r.useContext(he);
  };

  var pe = function pe() {
    var e = (typeof performance === "undefined" ? "undefined" : _typeof(performance)) === f ? Date.now() : 1e3 * performance.now();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (r) {
      var t = (16 * Math.random() + e) % 16 | 0;
      return ("x" == r ? t : 3 & t | 8).toString(16);
    });
  };

  var Oe = function Oe(e, r) {
    return x(r) ? [] : Array.isArray(r) ? function (e, r) {
      var t = -1;

      for (; ++t < e.length;) {
        r.indexOf(t) >= 0 && delete e[t];
      }

      return j(e);
    }(e, r) : function (e, r) {
      return [].concat(_toConsumableArray(e.slice(0, r)), _toConsumableArray(e.slice(r + 1)));
    }(e, r);
  },
      Ae = function Ae(e, r, t) {
    return Array.isArray(e) ? (x(e[t]) && (e[t] = void 0), e.splice(t, 0, e.splice(r, 1)[0]), e) : [];
  },
      Re = function Re(e, r, t) {
    var n = [e[t], e[r]];
    e[r] = n[0], e[t] = n[1];
  };

  function je(e, r) {
    return [].concat(_toConsumableArray(Array.isArray(r) ? r : [r || void 0]), _toConsumableArray(e));
  }

  function Fe(e, r, t) {
    return [].concat(_toConsumableArray(e.slice(0, r)), _toConsumableArray(Array.isArray(t) ? t : [t || void 0]), _toConsumableArray(e.slice(r)));
  }

  var Ve = function Ve(e) {
    return Array.isArray(e) ? Array(e.length).fill(void 0) : void 0;
  };

  function Ce(e) {
    if (A(e)) {
      var _r12 = {};

      for (var _t8 in e) {
        _r12[_t8] = !0;
      }

      return [_r12];
    }

    return [!0];
  }

  var xe = function xe(e) {
    return (Array.isArray(e) ? e : [e]).map(Ce).flat();
  };

  var ke = function ke() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var r = arguments.length > 1 ? arguments[1] : undefined;
    return e.map(function (e) {
      return Object.assign(_defineProperty({}, r, pe()), e);
    });
  };

  e.Controller = function (e) {
    var t = e.name,
        n = e.rules,
        s = e.as,
        c = e.render,
        u = e.defaultValue,
        i = e.control,
        a = e.onFocus,
        o = me(e, ["name", "rules", "as", "render", "defaultValue", "control", "onFocus"]);

    var l = ve(),
        _ref10 = i || l.control,
        f = _ref10.defaultValuesRef,
        d = _ref10.setValue,
        y = _ref10.register,
        g = _ref10.unregister,
        b = _ref10.trigger,
        m = _ref10.mode,
        _ref10$reValidateMode = _ref10.reValidateMode,
        h = _ref10$reValidateMode.isReValidateOnBlur,
        v = _ref10$reValidateMode.isReValidateOnChange,
        _ref10$formStateRef$c = _ref10.formStateRef.current,
        p = _ref10$formStateRef$c.isSubmitted,
        O = _ref10$formStateRef$c.touched,
        R = _ref10.updateFormState,
        j = _ref10.readFormStateRef,
        F = _ref10.fieldsRef,
        C = _ref10.fieldArrayNamesRef,
        S = _ref10.shallowFieldsStateRef,
        w = !oe(C.current, t),
        E = function E() {
      return !x(k(S.current, t)) && w ? k(S.current, t) : x(u) ? k(f.current, t) : u;
    },
        _r$useState = r.useState(E()),
        _r$useState2 = _slicedToArray(_r$useState, 2),
        D = _r$useState2[0],
        B = _r$useState2[1],
        L = r.useRef(D),
        T = r.useRef({
      focus: function focus() {
        return null;
      }
    }),
        N = r.useRef(a || function () {
      return T.current.focus();
    }),
        W = r.useCallback(function (e) {
      return !ue(Object.assign({
        isBlurEvent: e,
        isReValidateOnBlur: h,
        isReValidateOnChange: v,
        isSubmitted: p,
        isTouched: !!k(O, t)
      }, m));
    }, [h, v, p, O, t, m]),
        M = r.useCallback(function (_ref11) {
      var _ref12 = _slicedToArray(_ref11, 1),
          e = _ref12[0];

      var r = function (e) {
        return G(e) || !A(e.target) || A(e.target) && !e.type ? e : x(e.target.value) ? e.target.checked : e.target.value;
      }(e);

      return B(r), L.current = r, r;
    }, []),
        $ = r.useCallback(function () {
      F.current[t] ? F.current[t] = Object.assign({
        ref: F.current[t].ref
      }, n) : (y(Object.defineProperty({
        name: t,
        focus: N.current
      }, "value", {
        set: function set(e) {
          B(e), L.current = e;
        },
        get: function get() {
          return L.current;
        }
      }), n), w && !k(f.current, t) && B(E()));
    }, [n, t, y]);

    r.useEffect(function () {
      return function () {
        return g(t);
      };
    }, [g, t]), r.useEffect(function () {
      $();
    }, [$]), r.useEffect(function () {
      F.current[t] || ($(), w && B(E()));
    });
    var P = r.useCallback(function () {
      j.current.touched && !k(O, t) && (V(O, t, !0), R({
        touched: O
      })), W(!0) && b(t);
    }, [t, O, R, W, b, j]),
        I = {
      onChange: r.useCallback(function () {
        for (var _len = arguments.length, e = new Array(_len), _key = 0; _key < _len; _key++) {
          e[_key] = arguments[_key];
        }

        return d(t, M(e), {
          shouldValidate: W(),
          shouldDirty: !0
        });
      }, [d, M, t, W]),
      onBlur: P,
      name: t,
      value: D,
      ref: T
    },
        H = Object.assign(Object.assign({}, o), I);
    return s ? r.isValidElement(s) ? r.cloneElement(s, H) : r.createElement(s, H) : c ? c(I) : null;
  }, e.FormProvider = function (e) {
    var t = e.children,
        n = me(e, ["children"]);
    return r.createElement(he.Provider, {
      value: Object.assign({}, n)
    }, t);
  }, e.appendErrors = te, e.get = k, e.transformToNestObject = C, e.useFieldArray = function (_ref13) {
    var e = _ref13.control,
        t = _ref13.name,
        _ref13$keyName = _ref13.keyName,
        n = _ref13$keyName === void 0 ? "id" : _ref13$keyName;

    var s = ve(),
        c = r.useRef(-1),
        _ref14 = e || s.control,
        u = _ref14.isFormDirty,
        i = _ref14.updateWatchedValue,
        a = _ref14.resetFieldArrayFunctionRef,
        o = _ref14.fieldArrayNamesRef,
        l = _ref14.fieldsRef,
        f = _ref14.defaultValuesRef,
        d = _ref14.removeFieldEventListener,
        y = _ref14.formStateRef,
        g = _ref14.shallowFieldsStateRef,
        b = _ref14.updateFormState,
        m = _ref14.readFormStateRef,
        h = _ref14.validFieldsRef,
        v = _ref14.fieldsWithValidationRef,
        p = _ref14.fieldArrayDefaultValuesRef,
        O = _ref14.validateResolver,
        A = _ref14.getValues,
        R = _ref14.shouldUnregister,
        F = _ref14.fieldArrayValuesRef,
        C = ie(t),
        x = r.useRef(_toConsumableArray(k(p.current, C) ? k(p.current, t, []) : k(R ? f.current : g.current, t, []))),
        _r$useState3 = r.useState(ke(x.current, n)),
        _r$useState4 = _slicedToArray(_r$useState3, 2),
        S = _r$useState4[0],
        w = _r$useState4[1];

    V(F.current, t, S);

    var E = r.useCallback(function () {
      return k(F.current, t, []);
    }, []),
        D = function D() {
      return k(A(), t, E()).map(function (e, r) {
        return Object.assign(Object.assign({}, E()[r]), e);
      });
    };

    o.current.add(t), k(p.current, C) || V(p.current, C, k(f.current, C));

    var B = function B(e) {
      if (w(e), V(F.current, t, e), m.current.isValid && O) {
        var _r13 = A();

        V(_r13, t, e), O(_r13);
      }
    },
        L = function L() {
      for (var _e9 in l.current) {
        ae(_e9, t) && d(l.current[_e9], !0);
      }
    },
        T = function T(e) {
      return !j(k(e, t, [])).length && U(e, t);
    },
        N = function N(e) {
      var r = k(f.current, t, []),
          s = function s(e, r) {
        for (var _s5 in e) {
          for (var _c6 in e[_s5]) {
            _c6 === n || r[_s5] && e[_s5] && e[_s5][_c6] === r[_s5][_c6] || V(y.current.dirtyFields, "".concat(t, "[").concat(_s5, "]"), Object.assign(Object.assign({}, k(y.current.dirtyFields, "".concat(t, "[").concat(_s5, "]"), {})), _defineProperty({}, _c6, !0)));
          }
        }
      };

      e && (s(r, e), s(e, r));
    },
        W = function W(e, r, s) {
      var c = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
      var i = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !0;
      var a = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : !1;

      if (k(g.current, t)) {
        var _n13 = e(k(g.current, t), r.argA, r.argB);

        i && V(g.current, t, _n13);
      }

      if (k(p.current, t)) {
        var _n14 = e(k(p.current, t), r.argA, r.argB);

        i && V(p.current, t, _n14), T(p.current);
      }

      if (Array.isArray(k(y.current.errors, t))) {
        var _n15 = e(k(y.current.errors, t), r.argA, r.argB);

        i && V(y.current.errors, t, _n15), T(y.current.errors);
      }

      if (m.current.touched && k(y.current.touched, t)) {
        var _n16 = e(k(y.current.touched, t), r.argA, r.argB);

        i && V(y.current.touched, t, _n16), T(y.current.touched);
      }

      if (m.current.dirtyFields || m.current.isDirty) {
        var _n17 = e(k(y.current.dirtyFields, t, []), r.argC, r.argD);

        i && V(y.current.dirtyFields, t, _n17), N(s), T(y.current.dirtyFields);
      }

      a && m.current.isValid && !O && (V(h.current, t, e(k(h.current, t, []), r.argA)), T(h.current), V(v.current, t, e(k(v.current, t, []), r.argA)), T(v.current)), b({
        errors: y.current.errors,
        dirtyFields: y.current.dirtyFields,
        isDirty: u(t, c.map(function () {
          var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var r = n;
          e[r];
          return me(e, ["symbol" == _typeof(r) ? r : r + ""]);
        })),
        touched: y.current.touched
      });
    },
        M = function M(e) {
      L(), !e && U(p.current, t), U(g.current, t), x.current = k(e || f.current, t), w(ke(x.current, n));
    };

    return r.useEffect(function () {
      var e = k(p.current, t);
      if (e && S.length < e.length && (e.pop(), V(p.current, t, e)), i(t), c.current > -1) for (var _e10 in l.current) {
        var _r14 = l.current[_e10];

        if (_e10.startsWith("".concat(t, "[").concat(c.current, "]")) && _r14.ref.focus) {
          _r14.ref.focus();

          break;
        }
      }
      c.current = -1;
    }, [S, t]), r.useEffect(function () {
      var e = a.current,
          r = o.current;
      return ie(t) || (e[t] = M), function () {
        L(), delete e[t], U(F, t), r.delete(t);
      };
    }, []), {
      swap: r.useCallback(function (e, r) {
        var t = D();
        Re(t, e, r), L(), B(_toConsumableArray(t)), W(Re, {
          argA: e,
          argB: r,
          argC: e,
          argD: r
        }, void 0, t, !1);
      }, [t]),
      move: r.useCallback(function (e, r) {
        var t = D();
        Ae(t, e, r), L(), B(_toConsumableArray(t)), W(Ae, {
          argA: e,
          argB: r,
          argC: e,
          argD: r
        }, void 0, t, !1);
      }, [t]),
      prepend: r.useCallback(function (e) {
        var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
        var t = Ve(e),
            s = je(D(), ke(Array.isArray(e) ? e : [e], n));
        B(s), L(), W(je, {
          argA: t,
          argC: xe(e)
        }, s), c.current = r ? 0 : -1;
      }, [t]),
      append: r.useCallback(function (e) {
        var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
        var s = [].concat(_toConsumableArray(E()), _toConsumableArray(ke(Array.isArray(e) ? e : [e], n)));
        B(s), (m.current.dirtyFields || m.current.isDirty) && (N(s), b({
          isDirty: !0,
          dirtyFields: y.current.dirtyFields
        })), !R && V(g.current, t, [].concat(_toConsumableArray(k(g.current, t) || []), [e])), c.current = r ? S.length : -1;
      }, [t]),
      remove: r.useCallback(function (e) {
        var r = D(),
            t = Oe(r, e);
        B(t), L(), W(Oe, {
          argA: e,
          argC: e
        }, t, Oe(r, e), !0, !0);
      }, [t]),
      insert: r.useCallback(function (e, r) {
        var t = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !0;
        var s = Ve(r),
            u = D(),
            i = Fe(u, e, ke(Array.isArray(r) ? r : [r], n));
        B(i), L(), W(Fe, {
          argA: e,
          argB: s,
          argC: e,
          argD: xe(r)
        }, i, Fe(u, e)), c.current = t ? e : -1;
      }, [t]),
      fields: S
    };
  }, e.useForm = function () {
    var _ref15 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref15$mode = _ref15.mode,
        e = _ref15$mode === void 0 ? a : _ref15$mode,
        _ref15$reValidateMode = _ref15.reValidateMode,
        u = _ref15$reValidateMode === void 0 ? i : _ref15$reValidateMode,
        o = _ref15.resolver,
        f = _ref15.context,
        _ref15$defaultValues = _ref15.defaultValues,
        d = _ref15$defaultValues === void 0 ? {} : _ref15$defaultValues,
        _ref15$shouldFocusErr = _ref15.shouldFocusError,
        y = _ref15$shouldFocusErr === void 0 ? !0 : _ref15$shouldFocusErr,
        _ref15$shouldUnregist = _ref15.shouldUnregister,
        g = _ref15$shouldUnregist === void 0 ? !0 : _ref15$shouldUnregist,
        b = _ref15.criteriaMode;

    var m = r.useRef({}),
        h = r.useRef({}),
        v = r.useRef({}),
        O = r.useRef(new Set()),
        F = r.useRef({}),
        w = r.useRef({}),
        E = r.useRef({}),
        N = r.useRef({}),
        W = r.useRef(d),
        M = r.useRef({}),
        H = r.useRef(!1),
        J = r.useRef(!1),
        X = r.useRef(),
        Y = r.useRef(g ? {} : le(d, ge)),
        ee = r.useRef({}),
        re = r.useRef(f),
        te = r.useRef(o),
        ae = r.useRef(new Set()),
        me = r.useRef(fe(e)),
        _me$current = me.current,
        he = _me$current.isOnSubmit,
        ve = _me$current.isOnTouch,
        pe = b === l,
        _r$useState5 = r.useState({
      isDirty: !1,
      dirtyFields: {},
      isSubmitted: !1,
      submitCount: 0,
      touched: {},
      isSubmitting: !1,
      isSubmitSuccessful: !1,
      isValid: !he,
      errors: {}
    }),
        _r$useState6 = _slicedToArray(_r$useState5, 2),
        Oe = _r$useState6[0],
        Ae = _r$useState6[1],
        Re = r.useRef({
      isDirty: !be,
      dirtyFields: !be,
      touched: !be || ve,
      isSubmitting: !be,
      isValid: !be
    }),
        je = r.useRef(Oe),
        Fe = r.useRef(),
        _r$useRef$current = r.useRef(fe(u)).current,
        Ve = _r$useRef$current.isOnBlur,
        Ce = _r$useRef$current.isOnChange;

    re.current = f, te.current = o, je.current = Oe;

    var xe = r.useCallback(function () {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return !H.current && Ae(Object.assign(Object.assign({}, je.current), e));
    }, []),
        ke = r.useCallback(function (e, r) {
      var t = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
      var n = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var s = arguments.length > 4 ? arguments[4] : undefined;

      var c = t || function (_ref16) {
        var e = _ref16.errors,
            r = _ref16.name,
            t = _ref16.error,
            n = _ref16.validFields,
            s = _ref16.fieldsWithValidation;
        var c = x(t),
            u = k(e, r);
        return c && !!u || !c && !Q(u, t, !0) || c && k(s, r) && !k(n, r);
      }({
        errors: je.current.errors,
        error: r,
        name: e,
        validFields: N.current,
        fieldsWithValidation: E.current
      });

      var u = k(je.current.errors, e);
      r ? (U(N.current, e), c = c || !u || !Q(u, r, !0), V(je.current.errors, e, r)) : ((k(E.current, e) || te.current) && (V(N.current, e, !0), c = c || u), U(je.current.errors, e)), (c && !p(t) || !I(n)) && xe(Object.assign(Object.assign(Object.assign({}, n), {
        errors: je.current.errors
      }), te.current ? {
        isValid: !!s
      } : {}));
    }, []),
        Se = r.useCallback(function (e, r) {
      var _m$current$e = m.current[e],
          n = _m$current$e.ref,
          s = _m$current$e.options,
          c = ge && t(n) && p(r) ? "" : r;
      D(n) && s ? s.forEach(function (_ref17) {
        var e = _ref17.ref;
        return e.checked = e.value === c;
      }) : B(n) && !z(c) ? n.files = c : T(n) ? _toConsumableArray(n.options).forEach(function (e) {
        return e.selected = c.includes(e.value);
      }) : L(n) && s ? s.length > 1 ? s.forEach(function (_ref18) {
        var e = _ref18.ref;
        return e.checked = Array.isArray(c) ? !!c.find(function (r) {
          return r === e.value;
        }) : c === e.value;
      }) : s[0].ref.checked = !!c : n.value = c;
    }, []),
        we = r.useCallback(function (e, r) {
      if (Re.current.isDirty || Re.current.dirtyFields) {
        var _t9 = Pe();

        return e && r && V(_t9, e, r), !Q(_t9, I(W.current) ? M.current : W.current);
      }

      return !1;
    }, []),
        Ee = r.useCallback(function (e) {
      var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;

      if (Re.current.isDirty || Re.current.dirtyFields) {
        var _t10 = !Q(k(M.current, e), $(m, e, Y)),
            _n18 = k(je.current.dirtyFields, e),
            _s6 = je.current.isDirty;

        _t10 ? V(je.current.dirtyFields, e, !0) : U(je.current.dirtyFields, e);

        var _c7 = {
          isDirty: we(),
          dirtyFields: je.current.dirtyFields
        },
            _u5 = Re.current.isDirty && _s6 !== _c7.isDirty || Re.current.dirtyFields && _n18 !== k(je.current.dirtyFields, e);

        return _u5 && r && (je.current = Object.assign(Object.assign({}, je.current), _c7), xe(Object.assign({}, _c7))), _u5 ? _c7 : {};
      }

      return {};
    }, []),
        De = r.useCallback( /*#__PURE__*/function () {
      var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(e, r) {
        var _t11;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!m.current[e]) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 3;
                return ne(m, pe, m.current[e], Y);

              case 3:
                _context2.t0 = e;
                _t11 = _context2.sent[_context2.t0];
                return _context2.abrupt("return", (ke(e, _t11, r), x(_t11)));

              case 6:
                return _context2.abrupt("return", !1);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x5, _x6) {
        return _ref19.apply(this, arguments);
      };
    }(), [ke, pe]),
        Be = r.useCallback( /*#__PURE__*/function () {
      var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(e) {
        var _yield$te$current, r, t, _t12, _n19;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return te.current(Pe(), re.current, pe);

              case 2:
                _yield$te$current = _context3.sent;
                r = _yield$te$current.errors;
                t = je.current.isValid;

                if (!Array.isArray(e)) {
                  _context3.next = 8;
                  break;
                }

                _t12 = e.map(function (e) {
                  var t = k(r, e);
                  return t ? V(je.current.errors, e, t) : U(je.current.errors, e), !t;
                }).every(Boolean);
                return _context3.abrupt("return", (xe({
                  isValid: I(r),
                  errors: je.current.errors
                }), _t12));

              case 8:
                _n19 = k(r, e);
                return _context3.abrupt("return", (ke(e, _n19, t !== I(r), {}, I(r)), !_n19));

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x7) {
        return _ref20.apply(this, arguments);
      };
    }(), [ke, pe]),
        Le = r.useCallback( /*#__PURE__*/function () {
      var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(e) {
        var r, _t13;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                r = e || Object.keys(m.current);

                if (!te.current) {
                  _context5.next = 3;
                  break;
                }

                return _context5.abrupt("return", Be(r));

              case 3:
                if (!Array.isArray(r)) {
                  _context5.next = 9;
                  break;
                }

                !e && (je.current.errors = {});
                _context5.next = 7;
                return Promise.all(r.map( /*#__PURE__*/function () {
                  var _ref22 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(e) {
                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            _context4.next = 2;
                            return De(e, null);

                          case 2:
                            return _context4.abrupt("return", _context4.sent);

                          case 3:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4);
                  }));

                  return function (_x9) {
                    return _ref22.apply(this, arguments);
                  };
                }()));

              case 7:
                _t13 = _context5.sent;
                return _context5.abrupt("return", (xe(), _t13.every(Boolean)));

              case 9:
                _context5.next = 11;
                return De(r, Re.current.isValid);

              case 11:
                return _context5.abrupt("return", _context5.sent);

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x8) {
        return _ref21.apply(this, arguments);
      };
    }(), [Be, De]),
        Te = r.useCallback(function (e, r, _ref23) {
      var t = _ref23.shouldDirty,
          n = _ref23.shouldValidate;
      var s = {};
      V(s, e, r);
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = se(e, r)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _c8 = _step3.value;
          m.current[_c8] && (Se(_c8, k(s, _c8)), t && Ee(_c8), n && Le(_c8));
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }, [Le, Se, Ee]),
        Ne = r.useCallback(function (e, r) {
      var t = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      m.current[e] ? (Se(e, r), t.shouldDirty && Ee(e)) : G(r) || (Te(e, r, t), ae.current.has(e) && (h.current[e] = r, ee.current[e](_defineProperty({}, e, r)), (Re.current.isDirty || Re.current.dirtyFields) && t.shouldDirty && (V(je.current.dirtyFields, e, _(r, k(W.current, e, []), k(je.current.dirtyFields, e, []))), xe({
        isDirty: !Q(Object.assign(Object.assign({}, Pe()), _defineProperty({}, e, r)), W.current),
        dirtyFields: je.current.dirtyFields
      })))), !g && V(Y.current, e, r);
    }, [Ee, Se, Te]),
        We = function We(e) {
      return J.current || O.current.has(e) || O.current.has((e.match(/\w+/) || [])[0]);
    },
        Me = function Me(e) {
      var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
      if (!I(F.current)) for (var _t14 in F.current) {
        e && F.current[_t14].size && !F.current[_t14].has(e) && !F.current[_t14].has(ie(e)) || (w.current[_t14](), r = !1);
      }
      return r;
    };

    function $e(e) {
      if (!g) {
        var _r15 = le(e, ge);

        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = ae.current[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var _e11 = _step4.value;
            R(_e11) && !_r15[_e11] && (_r15 = Object.assign(Object.assign({}, _r15), _defineProperty({}, _e11, [])));
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        return _r15;
      }

      return e;
    }

    function Pe(e) {
      if (z(e)) return $(m, e, Y);

      if (Array.isArray(e)) {
        var _r16 = {};
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = e[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var _t15 = _step5.value;
            V(_r16, _t15, $(m, _t15, Y));
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
              _iterator5.return();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }

        return _r16;
      }

      return $e(K(m, Y));
    }

    X.current = X.current ? X.current : /*#__PURE__*/function () {
      var _ref25 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_ref24) {
        var e, r, t, s, c, u, _r17, _i5, _a2, _o2, _yield$te$current2, _e12, _r18, _r19, _n20;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                e = _ref24.type, r = _ref24.target;
                t = r.name;
                s = m.current[t];

                if (!s) {
                  _context6.next = 23;
                  break;
                }

                _r17 = e === n, _i5 = ue(Object.assign({
                  isBlurEvent: _r17,
                  isReValidateOnChange: Ce,
                  isReValidateOnBlur: Ve,
                  isTouched: !!k(je.current.touched, t),
                  isSubmitted: je.current.isSubmitted
                }, me.current));
                _a2 = Ee(t, !1), _o2 = !I(_a2) || We(t);

                if (!(_r17 && !k(je.current.touched, t) && Re.current.touched && (V(je.current.touched, t, !0), _a2 = Object.assign(Object.assign({}, _a2), {
                  touched: je.current.touched
                })), _i5)) {
                  _context6.next = 8;
                  break;
                }

                return _context6.abrupt("return", (Me(t), (!I(_a2) || _o2 && I(_a2)) && xe(_a2)));

              case 8:
                if (!te.current) {
                  _context6.next = 18;
                  break;
                }

                _context6.next = 11;
                return te.current(Pe(), re.current, pe);

              case 11:
                _yield$te$current2 = _context6.sent;
                _e12 = _yield$te$current2.errors;
                _r18 = je.current.isValid;

                if (c = k(_e12, t), !c && te.current) {
                  _r19 = t.substring(0, t.lastIndexOf(".") > t.lastIndexOf("[") ? t.lastIndexOf(".") : t.lastIndexOf("[")), _n20 = k(_e12, _r19, {});
                  _n20.type && _n20.message && (c = _n20), _r19 && (_n20 || k(je.current.errors, _r19)) && (t = _r19);
                }

                u = I(_e12), _r18 !== u && (_o2 = !0);
                _context6.next = 22;
                break;

              case 18:
                _context6.next = 20;
                return ne(m, pe, s, Y);

              case 20:
                _context6.t0 = t;
                c = _context6.sent[_context6.t0];

              case 22:
                Me(t), ke(t, c, _o2, _a2, u);

              case 23:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      return function (_x10) {
        return _ref25.apply(this, arguments);
      };
    }();

    var Ie = r.useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var e,
          _yield$te$current3,
          r,
          t,
          _args7 = arguments;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              e = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {};
              _context7.next = 3;
              return te.current(Object.assign(Object.assign(Object.assign({}, W.current), Pe()), e), re.current, pe);

            case 3:
              _yield$te$current3 = _context7.sent;
              r = _yield$te$current3.errors;
              t = I(r);
              je.current.isValid !== t && xe({
                isValid: t
              });

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })), [pe]),
        He = r.useCallback(function (e, r) {
      return function (e, r, t, n, s, c) {
        var u = t.ref,
            _t$ref = t.ref,
            i = _t$ref.name,
            a = _t$ref.type,
            o = e.current[i];

        if (!s) {
          var _r20 = $(e, i, n);

          x(_r20) || V(n.current, i, _r20);
        }

        if (a) {
          if ((D(u) || L(u)) && o) {
            var _t16 = o.options;
            Array.isArray(_t16) && _t16.length ? (j(_t16).forEach(function (e, n) {
              var s = e.ref;
              (s && P(s) && q(e, s) || c) && (S(s, r), U(_t16, "[".concat(n, "]")));
            }), _t16 && !j(_t16).length && delete e.current[i]) : delete e.current[i];
          } else (P(u) && q(o, u) || c) && (S(u, r), delete e.current[i]);
        } else delete e.current[i];
      }(m, X.current, e, Y, g, r);
    }, [g]),
        Ue = r.useCallback(function (e) {
      if (J.current) xe();else if (O) {
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = O.current[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var _r21 = _step6.value;

            if (_r21.startsWith(e)) {
              xe();
              break;
            }
          }
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
              _iterator6.return();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }

        Me(e);
      }
    }, []),
        qe = r.useCallback(function (e, r) {
      e && (He(e, r), g && !j(e.options || []).length && (U(M.current, e.ref.name), U(N.current, e.ref.name), U(E.current, e.ref.name), U(je.current.errors, e.ref.name), V(je.current.dirtyFields, e.ref.name, !0), xe({
        errors: je.current.errors,
        isDirty: we(),
        dirtyFields: je.current.dirtyFields
      }), Re.current.isValid && te.current && Ie(), Ue(e.ref.name)));
    }, [Ie, He]),
        _e = r.useCallback(function (e, r, t) {
      var n = t ? F.current[t] : O.current,
          s = x(r) ? W.current : r;
      var c = K(m, Y, !1, e);

      if (z(e)) {
        if (ae.current.has(e)) {
          var _r22 = k(v.current, e, []);

          c = _r22.length === j(k(c, e, [])).length && _r22.length ? c : v.current;
        }

        return ce(c, e, n, x(r) ? k(s, e) : r, !0);
      }

      return Array.isArray(e) ? e.reduce(function (e, r) {
        return Object.assign(Object.assign({}, e), _defineProperty({}, r, ce(c, r, n, s)));
      }, {}) : (J.current = x(t), C(!I(c) && c || s));
    }, []);

    function ze(e) {
      var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var u = e.name,
          i = e.type,
          a = e.value,
          o = Object.assign({
        ref: e
      }, r),
          l = m.current,
          f = de(e),
          d = oe(ae.current, u),
          y = function y(r) {
        return ge && (!t(e) || r === e);
      };

      var g,
          b = l[u],
          h = !0;
      if (b && (f ? Array.isArray(b.options) && j(b.options).find(function (e) {
        return a === e.ref.value && y(e.ref);
      }) : y(b.ref))) return void (l[u] = Object.assign(Object.assign({}, b), r));
      b = i ? f ? Object.assign({
        options: [].concat(_toConsumableArray(j(b && b.options || [])), [{
          ref: e
        }]),
        ref: {
          type: i,
          name: u
        }
      }, r) : Object.assign({}, o) : o, l[u] = b;
      var v = x(k(Y.current, u));

      if (I(W.current) && v || (g = k(v ? W.current : Y.current, u), h = x(g), h || d || Se(u, g)), I(r) || (V(E.current, u, !0), !he && Re.current.isValid && ne(m, pe, b, Y).then(function (e) {
        var r = je.current.isValid;
        I(e) ? V(N.current, u, !0) : U(N.current, u), r !== I(e) && xe();
      })), !(M.current[u] || d && h)) {
        var _e13 = $(m, u, Y);

        V(M.current, u, h ? A(_e13) ? Object.assign({}, _e13) : _e13 : g), !d && U(je.current.dirtyFields, u);
      }

      i && function (_ref27, r, u) {
        var e = _ref27.ref;
        t(e) && u && (e.addEventListener(r ? s : c, u), e.addEventListener(n, u));
      }(f && b.options ? b.options[b.options.length - 1] : b, f || "select-one" === e.type, X.current);
    }

    var Ge = r.useCallback(function (e, r) {
      return /*#__PURE__*/function () {
        var _ref28 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(t) {
          var n, s, _yield$te$current4, _e14, _r23, _i6, _Object$values, _e15, _r24, _t17;

          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  t && t.preventDefault && (t.preventDefault(), t.persist());
                  n = {}, s = $e(K(m, Y, !0));
                  Re.current.isSubmitting && xe({
                    isSubmitting: !0
                  });
                  _context8.prev = 3;

                  if (!te.current) {
                    _context8.next = 13;
                    break;
                  }

                  _context8.next = 7;
                  return te.current(s, re.current, pe);

                case 7:
                  _yield$te$current4 = _context8.sent;
                  _e14 = _yield$te$current4.errors;
                  _r23 = _yield$te$current4.values;
                  je.current.errors = n = _e14, s = _r23;
                  _context8.next = 25;
                  break;

                case 13:
                  _i6 = 0, _Object$values = Object.values(m.current);

                case 14:
                  if (!(_i6 < _Object$values.length)) {
                    _context8.next = 25;
                    break;
                  }

                  _e15 = _Object$values[_i6];

                  if (!_e15) {
                    _context8.next = 22;
                    break;
                  }

                  _r24 = _e15.ref.name;
                  _context8.next = 20;
                  return ne(m, pe, _e15, Y);

                case 20:
                  _t17 = _context8.sent;
                  _t17[_r24] ? (V(n, _r24, _t17[_r24]), U(N.current, _r24)) : k(E.current, _r24) && (U(je.current.errors, _r24), V(N.current, _r24, !0));

                case 22:
                  _i6++;
                  _context8.next = 14;
                  break;

                case 25:
                  if (!(I(n) && Object.keys(je.current.errors).every(function (e) {
                    return e in m.current;
                  }))) {
                    _context8.next = 31;
                    break;
                  }

                  xe({
                    errors: {},
                    isSubmitting: !0
                  });
                  _context8.next = 29;
                  return e(s, t);

                case 29:
                  _context8.next = 37;
                  break;

                case 31:
                  je.current.errors = Object.assign(Object.assign({}, je.current.errors), n);
                  _context8.t0 = r;

                  if (!_context8.t0) {
                    _context8.next = 36;
                    break;
                  }

                  _context8.next = 36;
                  return r(je.current.errors, t);

                case 36:
                  y && function (e, r) {
                    for (var _t18 in e) {
                      if (k(r, _t18)) {
                        var _r25 = e[_t18];
                        if (_r25) if (_r25.ref.focus) {
                          if (x(_r25.ref.focus())) break;
                        } else if (_r25.options) {
                          _r25.options[0].ref.focus();

                          break;
                        }
                      }
                    }
                  }(m.current, je.current.errors);

                case 37:
                  _context8.prev = 37;
                  xe({
                    isSubmitted: !0,
                    isSubmitting: !1,
                    isSubmitSuccessful: I(je.current.errors),
                    errors: je.current.errors,
                    submitCount: je.current.submitCount + 1
                  });
                  return _context8.finish(37);

                case 40:
                case "end":
                  return _context8.stop();
              }
            }
          }, _callee8, null, [[3,, 37, 40]]);
        }));

        return function (_x11) {
          return _ref28.apply(this, arguments);
        };
      }();
    }, [y, pe]);
    r.useEffect(function () {
      return H.current = !1, o && Re.current.isValid && Ie(), Fe.current = Fe.current || !ge ? Fe.current : function (e, r) {
        var t = new MutationObserver(function () {
          for (var _i7 = 0, _Object$values2 = Object.values(e.current); _i7 < _Object$values2.length; _i7++) {
            var _t19 = _Object$values2[_i7];

            if (_t19 && _t19.options) {
              var _iteratorNormalCompletion7 = true;
              var _didIteratorError7 = false;
              var _iteratorError7 = undefined;

              try {
                for (var _iterator7 = _t19.options[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                  var _e16 = _step7.value;
                  _e16 && _e16.ref && P(_e16.ref) && r(_t19);
                }
              } catch (err) {
                _didIteratorError7 = true;
                _iteratorError7 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion7 && _iterator7.return != null) {
                    _iterator7.return();
                  }
                } finally {
                  if (_didIteratorError7) {
                    throw _iteratorError7;
                  }
                }
              }
            } else _t19 && P(_t19.ref) && r(_t19);
          }
        });
        return t.observe(window.document, {
          childList: !0,
          subtree: !0
        }), t;
      }(m, qe), function () {
        H.current = !0, Fe.current && Fe.current.disconnect(), Y.current = {}, Object.values(m.current).forEach(function (e) {
          return qe(e, !0);
        });
      };
    }, [qe]), !o && Re.current.isValid && (Oe.isValid = Q(N.current, E.current) && I(je.current.errors));
    var Je = {
      trigger: Le,
      setValue: r.useCallback(function (e, r, t) {
        Ne(e, r, t), We(e) && xe(), Me(e), (t || {}).shouldValidate && Le(e);
      }, [Ne, Le]),
      getValues: r.useCallback(Pe, []),
      register: r.useCallback(function (e, r) {
        if (!ye) if (z(e)) ze({
          name: e
        }, r);else {
          if (!A(e) || !("name" in e)) return function (r) {
            return r && ze(r, e);
          };
          ze(e, r);
        }
      }, [W.current]),
      unregister: r.useCallback(function (e) {
        var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
          for (var _iterator8 = (Array.isArray(e) ? e : [e])[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var _r26 = _step8.value;
            qe(m.current[_r26], !0);
          }
        } catch (err) {
          _didIteratorError8 = true;
          _iteratorError8 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion8 && _iterator8.return != null) {
              _iterator8.return();
            }
          } finally {
            if (_didIteratorError8) {
              throw _iteratorError8;
            }
          }
        }
      }, [])
    },
        Ke = r.useMemo(function () {
      return Object.assign({
        isFormDirty: we,
        updateWatchedValue: Ue,
        shouldUnregister: g,
        updateFormState: xe,
        removeFieldEventListener: He,
        watchInternal: _e,
        mode: me.current,
        reValidateMode: {
          isReValidateOnBlur: Ve,
          isReValidateOnChange: Ce
        },
        validateResolver: o ? Ie : void 0,
        fieldsRef: m,
        resetFieldArrayFunctionRef: ee,
        useWatchFieldsRef: F,
        useWatchRenderFunctionsRef: w,
        fieldArrayDefaultValuesRef: h,
        validFieldsRef: N,
        fieldsWithValidationRef: E,
        fieldArrayNamesRef: ae,
        readFormStateRef: Re,
        formStateRef: je,
        defaultValuesRef: W,
        shallowFieldsStateRef: Y,
        fieldArrayValuesRef: v
      }, Je);
    }, [W.current, Ue, g, He, _e]);
    return Object.assign({
      watch: function watch(e, r) {
        return _e(e, r);
      },
      control: Ke,
      formState: be ? new Proxy(Oe, {
        get: function get(e, r) {
          if (r in e) return Re.current[r] = !0, e[r];
        }
      }) : Oe,
      handleSubmit: Ge,
      reset: r.useCallback(function (e) {
        var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (ge) {
          for (var _i8 = 0, _Object$values3 = Object.values(m.current); _i8 < _Object$values3.length; _i8++) {
            var _e17 = _Object$values3[_i8];

            if (_e17) {
              var _r27 = _e17.ref,
                  _n21 = _e17.options,
                  _s7 = de(_r27) && Array.isArray(_n21) ? _n21[0].ref : _r27;

              if (t(_s7)) try {
                _s7.closest("form").reset();

                break;
              } catch (e) {}
            }
          }
        }

        m.current = {}, W.current = le(e || W.current, ge), e && Me(""), Object.values(ee.current).forEach(function (e) {
          return Z(e) && e();
        }), Y.current = g ? {} : le(e, ge) || {}, function (_ref29) {
          var e = _ref29.errors,
              r = _ref29.isDirty,
              t = _ref29.isSubmitted,
              n = _ref29.touched,
              s = _ref29.isValid,
              c = _ref29.submitCount,
              u = _ref29.dirtyFields;
          s || (N.current = {}, E.current = {}), M.current = {}, h.current = {}, O.current = new Set(), J.current = !1, xe({
            submitCount: c ? je.current.submitCount : 0,
            isDirty: !!r && je.current.isDirty,
            isSubmitted: !!t && je.current.isSubmitted,
            isValid: !!s && je.current.isValid,
            dirtyFields: u ? je.current.dirtyFields : {},
            touched: n ? je.current.touched : {},
            errors: e ? je.current.errors : {},
            isSubmitting: !1,
            isSubmitSuccessful: !1
          });
        }(r);
      }, []),
      clearErrors: r.useCallback(function (e) {
        e && (Array.isArray(e) ? e : [e]).forEach(function (e) {
          return m.current[e] && R(e) ? delete je.current.errors[e] : U(je.current.errors, e);
        }), xe({
          errors: e ? je.current.errors : {}
        });
      }, []),
      setError: r.useCallback(function (e, r) {
        var t = (m.current[e] || {}).ref;
        V(je.current.errors, e, Object.assign(Object.assign({}, r), {
          ref: t
        })), xe({
          isValid: !1,
          errors: je.current.errors
        }), r.shouldFocus && t && t.focus && t.focus();
      }, []),
      errors: Oe.errors
    }, Je);
  }, e.useFormContext = ve, e.useWatch = function (_ref30) {
    var e = _ref30.control,
        t = _ref30.name,
        n = _ref30.defaultValue;

    var s = ve(),
        _ref31 = e || s.control,
        c = _ref31.useWatchFieldsRef,
        u = _ref31.useWatchRenderFunctionsRef,
        i = _ref31.watchInternal,
        a = _ref31.defaultValuesRef,
        _r$useState7 = r.useState(x(n) ? z(t) ? k(a.current, t) : Array.isArray(t) ? t.reduce(function (e, r) {
      return Object.assign(Object.assign({}, e), _defineProperty({}, r, k(a.current, r)));
    }, {}) : a.current : n),
        _r$useState8 = _slicedToArray(_r$useState7, 2),
        o = _r$useState8[0],
        l = _r$useState8[1],
        f = r.useRef(),
        d = r.useRef(n),
        y = r.useCallback(function () {
      var e = i(t, d.current, f.current);
      l(A(e) ? Object.assign({}, e) : Array.isArray(e) ? _toConsumableArray(e) : e);
    }, [l, i, d, t, f]);

    return r.useEffect(function () {
      var e = f.current = pe(),
          r = u.current,
          n = c.current;
      return n[e] = new Set(), r[e] = y, i(t, d.current, e), function () {
        delete n[e], delete r[e];
      };
    }, [t, y, u, c, i, d]), x(o) ? n : o;
  }, Object.defineProperty(e, "__esModule", {
    value: !0
  });
});
