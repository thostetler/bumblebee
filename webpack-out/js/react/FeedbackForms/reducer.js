function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define(['redux', 'js/react/FeedbackForms/actions', 'js/react/FeedbackForms/models/index'], function (_ref, _ref2, _ref3) {
  var combineReducers = _ref.combineReducers;
  var SET_BIBCODE = _ref2.SET_BIBCODE,
      SET_FORM = _ref2.SET_FORM;
  var FORMS = _ref3.FORMS;
  var mainState = {
    bibcode: null,
    form: 'missingreferences'
  };

  var main = function main() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : mainState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case SET_BIBCODE:
        return _objectSpread({}, state, {
          bibcode: action.payload
        });

      case SET_FORM:
        return _objectSpread({}, state, {
          form: FORMS[action.payload] ? FORMS[action.payload] : state.form
        });

      default:
        return state;
    }
  };

  var userState = {
    email: null
  };

  var user = function user() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : userState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    // action will be USER_ANNOUNCEMENT/...
    var _action$type$split = action.type.split('/'),
        _action$type$split2 = _slicedToArray(_action$type$split, 2),
        type = _action$type$split2[1];

    switch (type) {
      case 'user_signed_in':
        return _objectSpread({}, state, {
          email: action.payload
        });

      case 'user_signed_out':
        return _objectSpread({}, state, {
          email: null
        });

      default:
        return state;
    }
  };

  return combineReducers({
    main: main,
    user: user
  });
});
