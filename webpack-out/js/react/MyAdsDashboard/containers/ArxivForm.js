function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define(['js/react/MyAdsDashboard/components/ArxivForm.jsx', 'react-redux', 'js/react/MyAdsDashboard/actions/index', 'js/react/MyAdsDashboard/constants'], function (ArxivForm, _ref, actions, _ref2) {
  var connect = _ref.connect;
  var page = _ref2.page;

  var mapStateToProps = function mapStateToProps(_ref3) {
    var requests = _ref3.requests,
        notifications = _ref3.notifications,
        editingNotification = _ref3.editingNotification;
    return {
      addNotificationRequest: requests.ADD_NOTIFICATION,
      updateNotificationRequest: requests.UPDATE_NOTIFICATION,
      editingNotification: editingNotification,
      notifications: notifications
    };
  };

  var _addNotification = actions.addNotification,
      goTo = actions.goTo,
      updateNotification = actions.updateNotification;
  var actionCreators = {
    addNotification: function addNotification(notification) {
      return _addNotification(_objectSpread({}, notification, {
        template: 'arxiv',
        type: 'template'
      }));
    },
    updateNotification: updateNotification,
    onSuccess: function onSuccess() {
      return goTo(page.DASHBOARD);
    },
    onCancel: function onCancel() {
      return goTo(page.DASHBOARD);
    }
  };
  return connect(mapStateToProps, actionCreators)(ArxivForm);
});
