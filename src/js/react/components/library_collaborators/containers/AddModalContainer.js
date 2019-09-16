define([
  'es6!../components/AddModal.jsx',
  'react-redux',
  '../redux/actions',
], function(
  AddModal,
  {connect},
  actions,
) {

  const mapStateToProps = ({

  }) => ({

  });

  const {
    addNewUser
  } = actions;

  const actionCreators = {
    addNewUser
  };

  return connect(mapStateToProps, actionCreators)(AddModal);
});
