define(['js/react/MyAdsDashboard/components/Dashboard.jsx', 'react-redux', 'js/react/MyAdsDashboard/actions/index', 'js/react/MyAdsDashboard/constants'], function (Dashboard, _ref, actions, _ref2) {
  var connect = _ref.connect;
  var page = _ref2.page;

  var mapStateToProps = function mapStateToProps(_ref3) {
    var notifications = _ref3.notifications,
        requests = _ref3.requests;
    return {
      notifications: notifications,
      getNotificationsRequest: requests.GET_NOTIFICATIONS,
      updateNotificationRequest: requests.UPDATE_NOTIFICATION,
      removeNotificationRequest: requests.REMOVE_NOTIFICATION,
      getNotificationRequest: requests.GET_NOTIFICATION
    };
  };

  var updateNotification = actions.updateNotification,
      getNotifications = actions.getNotifications,
      getNotification = actions.getNotification,
      removeNotification = actions.removeNotification,
      goTo = actions.goTo,
      toggleActive = actions.toggleActive,
      importNotifications = actions.importNotifications,
      runQuery = actions.runQuery;
  var actionCreators = {
    updateNotification: updateNotification,
    getNotifications: getNotifications,
    getNotification: getNotification,
    removeNotification: removeNotification,
    toggleActive: toggleActive,
    importNotifications: importNotifications,
    runQuery: runQuery,
    editNotification: function editNotification(id) {
      return getNotification(id);
    },
    createNewNotification: function createNewNotification() {
      return goTo(page.SELECT_TEMPLATE);
    }
  };
  return connect(mapStateToProps, actionCreators)(Dashboard);
});
