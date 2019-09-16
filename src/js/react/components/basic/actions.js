define([

], function () {

  const actions = {
    SET_PERMISSIONS: 'SET_PERMISSIONS'
  }

  const actionCreators = {
    setPermissions: (payload) => ({ type: actions.SET_PERMISSIONS, payload })
  }

  return {
    ...actions,
    ...actionCreators
  };

});
