define(['js/react/MyAdsDashboard/components/ClassicLoginForm.jsx', 'react-redux', 'js/react/MyAdsDashboard/actions/index'], function (ClassicLoginForm, _ref, actions) {
  var connect = _ref.connect;

  var mapStateToProps = function mapStateToProps(_ref2) {
    var requests = _ref2.requests;
    return {
      classicMirrorsRequest: requests.FETCH_CLASSIC_MIRRORS,
      loginClassicRequest: requests.LOGIN_CLASSIC,
      loginClassicCheckRequest: requests.LOGIN_CLASSIC_CHECK
    };
  };

  var goTo = actions.goTo,
      fetchClassicMirrors = actions.fetchClassicMirrors,
      loginClassic = actions.loginClassic,
      loginClassicCheck = actions.loginClassicCheck;
  var actionCreators = {
    goTo: goTo,
    fetchClassicMirrors: fetchClassicMirrors,
    loginClassic: loginClassic,
    loginClassicCheck: loginClassicCheck
  };
  return connect(mapStateToProps, actionCreators)(ClassicLoginForm);
});
