define([

], function () {

  const actions = {

    // permissions
    FETCH_PERMISSIONS: 'FETCH_PERMISSIONS',

    // errors
    SET_ERROR: 'SET_ERROR',

    // roles
    POST_ROLES: 'POST_ROLES',

    // users
    SET_USERS: 'SET_USERS',
    ADD_NEW_USER: 'ADD_NEW_USER',

    // editing
    SET_EDITING_USER: 'SET_EDITING_USER'
  }

  const actionCreators = {

    // permissions
    getPermissions: () => ({ type: actions.FETCH_PERMISSIONS }),

    // error
    setError: (payload) => ({ type: actions.SET_ERROR, payload }),

    // users
    setUsers: (payload) => ({ type: actions.SET_USERS, payload }),
    addNewUser: (payload) => ({ type: actions.ADD_NEW_USER, payload }),
    updateUserRoles: (payload) => ({ type: actions.POST_ROLES, payload }),

    // editing
    setEditingUser: (payload) => ({ type: actions.SET_EDITING_USER, payload }),
  }

  return {
    ...actions,
    ...actionCreators
  };

});
