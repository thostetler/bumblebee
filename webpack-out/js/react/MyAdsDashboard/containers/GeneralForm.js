define(['js/react/MyAdsDashboard/components/GeneralForm.jsx', 'react-redux', 'js/react/MyAdsDashboard/actions/index', 'js/react/MyAdsDashboard/constants'], function (GeneralForm, _ref, actions, _ref2) {
  var connect = _ref.connect;
  var page = _ref2.page;

  var mapStateToProps = function mapStateToProps(_ref3) {
    var requests = _ref3.requests,
        notifications = _ref3.notifications,
        editingNotification = _ref3.editingNotification;
    return {
      requests: {
        updateNotification: requests.UPDATE_NOTIFICATION,
        getQuery: requests.GET_QUERY
      },
      editingNotification: editingNotification,
      notifications: notifications
    };
  };

  var goTo = actions.goTo,
      updateNotification = actions.updateNotification,
      getQuery = actions.getQuery;
  var actionCreators = {
    updateNotification: updateNotification,
    getQuery: getQuery,
    onSuccess: function onSuccess() {
      return goTo(page.DASHBOARD);
    },
    onCancel: function onCancel() {
      return goTo(page.DASHBOARD);
    }
  };
  return connect(mapStateToProps, actionCreators)(GeneralForm);
});
