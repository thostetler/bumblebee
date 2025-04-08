function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define([], function () {
  var actions = {
    // requests
    ADD_NOTIFICATION: 'ADD_NOTIFICATION',
    UPDATE_NOTIFICATION: 'UPDATE_NOTIFICATION',
    REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
    GET_NOTIFICATIONS: 'GET_NOTIFICATIONS',
    GET_NOTIFICATION: 'GET_NOTIFICATION',
    FETCH_CLASSIC_MIRRORS: 'FETCH_CLASSIC_MIRRORS',
    LOGIN_CLASSIC: 'LOGIN_CLASSIC',
    IMPORT_CLASSIC: 'IMPORT_CLASSIC',
    LOGIN_CLASSIC_CHECK: 'LOGIN_CLASSIC_CHECK',
    SET_NOTIFICATION_QUERY_KEY: 'SET_NOTIFICATION_QUERY_KEY',
    // notifications state management
    SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
    EDIT_NOTIFICATION: 'EDIT_NOTIFICATION',
    SET_EDITING_NOTIFICATION: 'SET_EDITING_NOTIFICATION',
    RESET_EDITING_NOTIFICATION: 'RESET_EDITING_NOTIFICATION',
    TOGGLE_ACTIVE: 'TOGGLE_ACTIVE',
    SET_NOTIFICATION_QUERY: 'SET_NOTIFICATION_QUERY',
    GET_NOTIFICATION_QUERIES: 'GET_NOTIFICATION_QUERIES',
    // paging
    GOTO: 'GOTO',
    // imports
    IMPORT_NOTIFICATIONS: 'IMPORT_NOTIFICATIONS',
    // searching
    RUN_QUERY: 'RUN_QUERY'
  };
  var actionCreators = {
    addNotification: function addNotification(notification) {
      return {
        type: 'API_REQUEST',
        scope: actions.ADD_NOTIFICATION,
        options: {
          type: 'POST',
          target: 'vault/notifications',
          data: notification
        }
      };
    },
    getNotifications: function getNotifications() {
      return {
        type: 'API_REQUEST',
        scope: actions.GET_NOTIFICATIONS,
        options: {
          type: 'GET',
          target: 'vault/notifications'
        }
      };
    },
    getNotification: function getNotification(id) {
      return {
        type: 'API_REQUEST',
        scope: actions.GET_NOTIFICATION,
        options: {
          type: 'GET',
          target: "vault/notifications/".concat(id)
        }
      };
    },
    updateNotification: function updateNotification(notification) {
      return {
        type: 'API_REQUEST',
        scope: actions.UPDATE_NOTIFICATION,
        options: {
          type: 'PUT',
          target: "vault/notifications/".concat(notification.id),
          data: notification
        }
      };
    },
    removeNotification: function removeNotification(id) {
      return {
        type: 'API_REQUEST',
        scope: actions.REMOVE_NOTIFICATION,
        options: {
          type: 'DELETE',
          target: "vault/notifications/".concat(id)
        }
      };
    },
    fetchClassicMirrors: function fetchClassicMirrors() {
      return {
        type: 'API_REQUEST',
        scope: actions.FETCH_CLASSIC_MIRRORS,
        options: {
          type: 'GET',
          target: 'harbour/mirrors'
        }
      };
    },
    loginClassic: function loginClassic(data) {
      return {
        type: 'API_REQUEST',
        scope: actions.LOGIN_CLASSIC,
        options: {
          type: 'POST',
          target: 'harbour/auth/classic',
          data: data
        }
      };
    },
    loginClassicCheck: function loginClassicCheck() {
      return {
        type: 'API_REQUEST',
        scope: actions.LOGIN_CLASSIC_CHECK,
        options: {
          type: 'GET',
          target: 'harbour/user'
        }
      };
    },
    importClassic: function importClassic() {
      return {
        type: 'API_REQUEST',
        scope: actions.IMPORT_CLASSIC,
        options: {
          type: 'GET',
          target: 'vault/myads-import'
        }
      };
    },
    importNotifications: function importNotifications() {
      return {
        type: actions.IMPORT_NOTIFICATIONS
      };
    },
    goTo: function goTo(payload) {
      return {
        type: actions.GOTO,
        payload: payload
      };
    },
    editNotification: function editNotification(id) {
      return {
        type: actions.EDIT_NOTIFICATION,
        id: id
      };
    },
    toggleActive: function toggleActive(id) {
      return {
        type: actions.TOGGLE_ACTIVE,
        id: id
      };
    },
    getNotificationQueries: function getNotificationQueries(id) {
      return {
        type: 'API_REQUEST',
        scope: actions.GET_NOTIFICATION_QUERIES,
        options: {
          type: 'GET',
          target: "vault/notification_query/".concat(id)
        }
      };
    },
    runQuery: function runQuery(id, queryKey) {
      return {
        type: 'RUN_QUERY',
        payload: {
          id: id,
          queryKey: queryKey
        }
      };
    }
  };
  return _objectSpread({}, actions, actionCreators);
});
