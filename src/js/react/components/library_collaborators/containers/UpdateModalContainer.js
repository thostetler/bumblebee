define([
  'es6!../components/UpdateModal.jsx',
  'react-redux',
  '../redux/actions',
], function(
  UpdateModal,
  {connect},
  actions,
) {

  const mapStateToProps = ({
    editingUser
  }) => ({
    user: editingUser
  });

  const {
    updateUserRoles
  } = actions;

  const actionCreators = {
    updateUserRoles
  };

  return connect(mapStateToProps, actionCreators)(UpdateModal);
});
