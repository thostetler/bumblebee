define([
  'es6!./PermissionsList.jsx',
  'js/react/containers/WithBackboneView',
  './store',
  'react-redux',
  './actions'
], function (PermissionsList, WithBackboneView, configureStore, { connect }, actions) {

  const mapStateToProps = (state) => ({
    permissions: state.permissions
  });

  const {
    setPermissions
  } = actions;

  const actionCreators = {
    setPermissions
  };

  return WithBackboneView(connect(mapStateToProps, actionCreators)(PermissionsList), configureStore({}));
});
