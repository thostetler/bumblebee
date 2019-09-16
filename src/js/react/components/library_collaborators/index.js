define([
  'es6!./components/PermissionsList.jsx',
  'js/react/containers/WithBackboneView',
  './redux/store',
  'react-redux',
  './redux/actions',
], function(
  PermissionsList,
  WithBackboneView,
  configureStore,
  {connect},
  actions,
) {

  const mapStateToProps = ({
    users,
    error,
    editingUser
  }) => ({
    users,
    error,
    editingUser
  });

  const {
    getPermissions,
    getCurrentUser,
    setEditingUser
  } = actions;

  const actionCreators = {
    getPermissions,
    getCurrentUser,
    setEditingUser
  };

  return WithBackboneView(
    connect(mapStateToProps, actionCreators)(PermissionsList),
    (context) => configureStore(context)
  );
});
