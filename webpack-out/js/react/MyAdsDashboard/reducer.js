function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define(['js/react/MyAdsDashboard/actions', 'redux', 'js/react/MyAdsDashboard/constants'], function (actions, _ref, _ref2) {
  var combineReducers = _ref.combineReducers;
  var PAGE = _ref2.page;
  var SET_NOTIFICATIONS = actions.SET_NOTIFICATIONS,
      SET_EDITING_NOTIFICATION = actions.SET_EDITING_NOTIFICATION,
      RESET_EDITING_NOTIFICATION = actions.RESET_EDITING_NOTIFICATION,
      GOTO = actions.GOTO,
      SET_NOTIFICATION_QUERY_KEY = actions.SET_NOTIFICATION_QUERY_KEY;
  /**
   * @typedef {Object.<string, import('js/react/MyAdsDashboard/typedefs').Notification>} NotificationState
   */

  /** @type {NotificationState} */

  var notificationsState = {};

  var notifications = function notifications() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : notificationsState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    if (action.type === SET_NOTIFICATIONS && action.result) {
      return action.result.reduce(function (acc, entry) {
        return _objectSpread({}, acc, _defineProperty({}, entry.id, entry));
      }, {});
    }

    return state;
  };

  var editingNotificationState = null;

  var editingNotification = function editingNotification() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : editingNotificationState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    if (action.type === SET_EDITING_NOTIFICATION && action.result) {
      return action.result;
    }

    if (action.type === RESET_EDITING_NOTIFICATION) {
      return editingNotificationState;
    }

    return state;
  };
  /** @type {string} */


  var pageState = PAGE.DASHBOARD;

  var page = function page() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : pageState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    if (action.type === GOTO && action.payload) {
      return action.payload;
    }

    return state;
  };
  /**
   * @typedef {Object.<string, import('js/react/MyAdsDashboard/typedefs').Request>} RequestState
   */

  /** @type {RequestState} */


  var requestState = {
    ADD_NOTIFICATION: {
      status: null,
      result: null,
      error: null
    },
    GET_NOTIFICATIONS: {
      status: null,
      result: null,
      error: null
    },
    GET_NOTIFICATION: {
      status: null,
      result: null,
      error: null
    },
    UPDATE_NOTIFICATION: {
      status: null,
      result: null,
      error: null
    },
    REMOVE_NOTIFICATION: {
      status: null,
      result: null,
      error: null
    },
    FETCH_CLASSIC_MIRRORS: {
      status: null,
      result: null,
      error: null
    },
    LOGIN_CLASSIC: {
      status: null,
      result: null,
      error: null
    },
    LOGIN_CLASSIC_CHECK: {
      status: null,
      result: null,
      error: null
    },
    IMPORT_CLASSIC: {
      status: null,
      result: null,
      error: null
    },
    GET_QUERY: {
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

  var queryKeyState = null;

  var queryKey = function queryKey() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : queryKeyState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    if (action.type === SET_NOTIFICATION_QUERY_KEY) {
      return action.payload;
    }

    return state;
  };

  return combineReducers({
    notifications: notifications,
    page: page,
    requests: requests,
    editingNotification: editingNotification,
    queryKey: queryKey
  });
});
