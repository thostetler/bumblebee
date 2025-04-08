function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

define(['redux', 'js/react/Recommender/actions'], function (_ref, _ref2) {
  var combineReducers = _ref.combineReducers;
  var SET_DOCS = _ref2.SET_DOCS,
      SET_QUERY = _ref2.SET_QUERY,
      SET_TAB = _ref2.SET_TAB,
      SET_ORACLE_TARGET = _ref2.SET_ORACLE_TARGET,
      SET_QUERY_PARAMS = _ref2.SET_QUERY_PARAMS,
      UPDATE_USERNAME = _ref2.UPDATE_USERNAME;
  var requestState = {
    GET_RECOMMENDATIONS: {
      status: null,
      result: null,
      error: null
    },
    GET_DOCS: {
      status: null,
      result: null,
      error: null
    }
  };

  var requests = function requests() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : requestState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    if (/_API_REQUEST_/.test(action.type)) {
      var _action$type$split = action.type.split('_API_REQUEST_'),
          _action$type$split2 = _slicedToArray(_action$type$split, 2),
          scope = _action$type$split2[0],
          status = _action$type$split2[1];

      var _action$result = action.result,
          result = _action$result === void 0 ? null : _action$result,
          _action$error = action.error,
          error = _action$error === void 0 ? null : _action$error;
      return _objectSpread({}, state, _defineProperty({}, scope, {
        status: status.toLowerCase(),
        result: result,
        error: error
      }));
    }

    if (/_RESET$/.test(action.type)) {
      var _scope = action.type.replace('_RESET', '');

      return _objectSpread({}, state, _defineProperty({}, _scope, requestState[_scope]));
    }

    return state;
  };

  var docsState = [];

  var docs = function docs() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : docsState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    if (action.type === SET_DOCS) {
      return action.payload.map(function (doc) {
        return _objectSpread({}, doc, {
          title: doc.title[0],
          totalAuthors: doc.author_count
        });
      });
    }

    return state;
  };

  var queryState = null;

  var query = function query() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : queryState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    if (action.type === SET_QUERY && action.payload) {
      return action.payload;
    }

    return state;
  };

  var tabState = 2;

  var tab = function tab() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : tabState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    if (action.type === SET_TAB && action.payload) {
      return action.payload;
    }

    return state;
  };

  var oracleTargetState = 'oracle/readhist';

  var oracleTarget = function oracleTarget() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : oracleTargetState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    if (action.type === SET_ORACLE_TARGET && action.payload) {
      return action.payload;
    }

    return state;
  };

  var queryParamsState = {
    function: 'similar',
    sort: 'entry_date',
    numDocs: 5,
    cutoffDays: 5,
    topNReads: 10
  };

  var queryParams = function queryParams() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : queryParamsState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    if (action.type === SET_QUERY_PARAMS && action.payload) {
      return _objectSpread({}, state, action.payload);
    }

    return state;
  };

  var userNameState = null;

  var userName = function userName() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : userNameState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    if (action.type === UPDATE_USERNAME) {
      userNameState = action.payload;
    }

    return state;
  };

  return combineReducers({
    requests: requests,
    docs: docs,
    query: query,
    tab: tab,
    oracleTarget: oracleTarget,
    queryParams: queryParams,
    userName: userName
  });
});
