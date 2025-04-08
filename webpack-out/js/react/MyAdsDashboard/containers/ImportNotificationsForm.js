define(['js/react/MyAdsDashboard/components/ImportNotificationsForm.jsx', 'react-redux', 'js/react/MyAdsDashboard/actions/index', 'js/react/MyAdsDashboard/constants'], function (ImportNotificationsForm, _ref, actions, _ref2) {
  var connect = _ref.connect;
  var page = _ref2.page;

  var mapStateToProps = function mapStateToProps(_ref3) {
    var requests = _ref3.requests;
    return {
      importClassicRequest: requests.IMPORT_CLASSIC
    };
  };

  var goTo = actions.goTo,
      importClassic = actions.importClassic;
  var actionCreators = {
    onSuccess: function onSuccess() {
      return goTo(page.DASHBOARD);
    },
    importClassic: importClassic
  };
  return connect(mapStateToProps, actionCreators)(ImportNotificationsForm);
});
