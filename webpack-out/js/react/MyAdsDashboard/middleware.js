function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

define(['underscore', 'js/react/MyAdsDashboard/actions', 'js/react/MyAdsDashboard/constants', 'js/react/shared/helpers'], function (_, actions, _ref, _ref2) {
  var page = _ref.page;
  var middleware = _ref2.middleware,
      apiSuccess = _ref2.apiSuccess;
  var SET_NOTIFICATIONS = actions.SET_NOTIFICATIONS,
      SET_EDITING_NOTIFICATION = actions.SET_EDITING_NOTIFICATION,
      RESET_EDITING_NOTIFICATION = actions.RESET_EDITING_NOTIFICATION,
      TOGGLE_ACTIVE = actions.TOGGLE_ACTIVE,
      SET_NOTIFICATION_QUERY_KEY = actions.SET_NOTIFICATION_QUERY_KEY,
      RUN_QUERY = actions.RUN_QUERY,
      goTo = actions.goTo,
      getNotifications = actions.getNotifications,
      updateNotification = actions.updateNotification,
      getNotificationQueries = actions.getNotificationQueries;

  var delay = function delay(cb) {
    if (cb.toKey) {
      window.clearTimeout(cb.toKey);
    }

    cb.toKey = setTimeout(cb, 3000);
  };

  var parseScope = function parseScope(requestType) {
    var _requestType$split = requestType.split('_API_REQUEST_'),
        _requestType$split2 = _slicedToArray(_requestType$split, 2),
        scope = _requestType$split2[0],
        status = _requestType$split2[1];

    return {
      scope: scope,
      status: status
    };
  };

  var resetAfterRequest = function resetAfterRequest(_, _ref3) {
    var dispatch = _ref3.dispatch;
    return function (next) {
      return function (action) {
        next(action);

        if (/_API_REQUEST_(SUCCESS|FAILURE)$/.test(action.type)) {
          var _parseScope = parseScope(action.type),
              scope = _parseScope.scope; // don't bother if we are getting the full list


          if (scope === 'GET_NOTIFICATIONS') {
            return;
          }

          delay(function () {
            dispatch({
              type: "".concat(scope, "_RESET")
            });
          });
        }
      };
    };
  };

  var runQueries = middleware(function (_ref4) {
    var action = _ref4.action,
        next = _ref4.next,
        dispatch = _ref4.dispatch,
        trigger = _ref4.trigger,
        getState = _ref4.getState;
    next(action);

    if (action.type === RUN_QUERY) {
      var _action$payload = action.payload,
          id = _action$payload.id,
          queryKey = _action$payload.queryKey;
      dispatch({
        type: SET_NOTIFICATION_QUERY_KEY,
        payload: queryKey
      });
      dispatch(getNotificationQueries(id));
    }

    if (action.type === apiSuccess('GET_NOTIFICATION_QUERIES')) {
      var _queryKey = getState().queryKey;

      if (_queryKey !== null && action.result && action.result.length > 0) {
        try {
          trigger('doSearch', action.result[_queryKey]);
        } catch (e) {
          dispatch(goTo(page.DASHBOARD));
        }
      } // reset queryKey


      dispatch({
        type: SET_NOTIFICATION_QUERY_KEY,
        payload: null
      });
    }
  });

  var updateNotifications = function updateNotifications(__, _ref5) {
    var dispatch = _ref5.dispatch,
        getState = _ref5.getState;
    return function (next) {
      return function (action) {
        next(action);
        /**
         * Set the current notifications after a successful GET
         */

        if (action.type === apiSuccess('GET_NOTIFICATIONS')) {
          dispatch({
            type: SET_NOTIFICATIONS,
            result: action.result
          });
        }

        if (action.type === apiSuccess('GET_NOTIFICATION')) {
          var result = action.result[0]; // After requesting a single notification, set it as the active editing one

          dispatch({
            type: SET_EDITING_NOTIFICATION,
            result: result
          });

          var _getState = getState(),
              notifications = _getState.notifications;

          var _notifications$result = notifications[result.id],
              template = _notifications$result.template,
              type = _notifications$result.type;
          var form;

          if (type === 'query') {
            form = page.GENERAL_FORM;
          } else {
            form = page["".concat(template.toUpperCase(), "_FORM")];
          }

          dispatch(goTo(form));
        }

        if (action.type === TOGGLE_ACTIVE) {
          var _getState2 = getState(),
              _notifications = _getState2.notifications;

          var item = _notifications[action.id];

          if (item) {
            dispatch(updateNotification(_objectSpread({}, _notifications[action.id], {
              active: !_notifications[action.id].active
            })));
          }
        }

        if (action.type === apiSuccess('UPDATE_NOTIFICATION') || action.type === apiSuccess('REMOVE_NOTIFICATION') || action.type === apiSuccess('ADD_NOTIFICATION')) {
          dispatch(getNotifications());
        }
      };
    };
  };
  /**
   * When going to dashboard, reset the current editing notification
   */


  var resetEditingNotificationAfterGoTo = function resetEditingNotificationAfterGoTo(_, _ref6) {
    var dispatch = _ref6.dispatch;
    return function (next) {
      return function (action) {
        next(action);

        if (action.type === 'GOTO' && action.payload === page.DASHBOARD) {
          dispatch({
            type: RESET_EDITING_NOTIFICATION
          });
        }
      };
    };
  };

  var importNotifications = function importNotifications(_, _ref7) {
    var dispatch = _ref7.dispatch;
    return function (next) {
      return function (action) {
        next(action);

        if (action.type === 'IMPORT_NOTIFICATIONS') {
          dispatch(goTo(page.IMPORT_NOTIFICATIONS));
        }
      };
    };
  };

  var reloadNotificationsAfterGoTo = function reloadNotificationsAfterGoTo(_, _ref8) {
    var dispatch = _ref8.dispatch;
    return function (next) {
      return function (action) {
        next(action);

        if (action.type === 'GOTO' && action.payload === page.DASHBOARD) {
          dispatch(getNotifications());
        }
      };
    };
  };

  var updateOnNavigate = middleware(function (_ref9) {
    var action = _ref9.action,
        next = _ref9.next,
        dispatch = _ref9.dispatch,
        getState = _ref9.getState;
    next(action);

    if (action.type === 'NAVIGATE/MyAdsDashboard') {
      if (getState().requests.GET_NOTIFICATIONS.status !== 'pending') {
        dispatch(getNotifications());
      }
    }
  });
  return {
    resetAfterRequest: resetAfterRequest,
    updateNotifications: updateNotifications,
    resetEditingNotificationAfterGoTo: resetEditingNotificationAfterGoTo,
    importNotifications: importNotifications,
    reloadNotificationsAfterGoTo: reloadNotificationsAfterGoTo,
    runQueries: runQueries,
    updateOnNavigate: updateOnNavigate
  };
});
