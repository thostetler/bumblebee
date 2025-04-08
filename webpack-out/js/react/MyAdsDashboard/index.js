define(['js/react/MyAdsDashboard/components/App.jsx', 'js/react/WithBackboneView', 'js/react/configureStore', 'react-redux', 'js/react/MyAdsDashboard/actions', 'js/react/MyAdsDashboard/middleware', 'js/react/MyAdsDashboard/reducer', 'js/react/shared/helpers', 'js/react/shared/middleware/api'], function (App, WithBackboneView, configureStore, _ref, actions, middleware, reducer, _ref2, sharedMiddleware) {
  var connect = _ref.connect;
  var withContext = _ref2.withContext;

  var mapStateToProps = function mapStateToProps(_ref3) {
    var page = _ref3.page,
        editingNotification = _ref3.editingNotification;
    return {
      page: page,
      editingNotification: editingNotification
    };
  };

  var goTo = actions.goTo;
  var actionCreators = {
    goTo: goTo
  };
  return WithBackboneView(connect(mapStateToProps, actionCreators)(App), function (context) {
    return configureStore(context, reducer, withContext(middleware, sharedMiddleware));
  });
});
