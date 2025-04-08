function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define([], function () {
  var actions = {
    ADD_NOTIFICATION: 'ADD_NOTIFICATION',
    ERROR_RESET: 'ERROR_RESET',
    ERROR: 'ERROR',
    GET_QID: 'GET_QID',
    RESET: 'RESET',
    SAVE_NEW_NOTIFICATION: 'SAVE_NEW_NOTIFICATION',
    SET_UPDATE_DATA: 'SET_UPDATE_DATA',
    SET_LOGIN_STATUS: 'SET_LOGIN_STATUS',
    CHECK_LOGIN_STATUS: 'CHECK_LOGIN_STATUS'
  };
  var actionCreators = {
    addNotification: function addNotification(notification) {
      return {
        type: 'API_REQUEST',
        scope: actions.ADD_NOTIFICATION,
        options: {
          type: 'POST',
          target: 'vault/notifications',
          data: _objectSpread({}, notification, {
            type: 'query'
          })
        }
      };
    },
    getQID: function getQID(queryParams) {
      return {
        type: 'API_REQUEST',
        scope: actions.GET_QID,
        options: {
          type: 'POST',
          target: 'vault/query',
          data: queryParams
        }
      };
    },
    saveNewNotification: function saveNewNotification(notification) {
      return {
        type: actions.SAVE_NEW_NOTIFICATION,
        result: notification
      };
    },
    makeError: function makeError(error) {
      return {
        type: actions.ERROR,
        result: error
      };
    },
    reset: function reset() {
      return {
        type: actions.RESET
      };
    },
    setLoginStatus: function setLoginStatus(result) {
      return {
        type: actions.SET_LOGIN_STATUS,
        result: result
      };
    }
  };
  return _objectSpread({}, actions, actionCreators);
});
