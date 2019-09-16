define([
  './actions',
  'redux'
], function (actions, { combineReducers }) {

  const {
    SET_ERROR,
    SET_USERS,
    SET_EDITING_USER
  } = actions;

  /**
   * @typedef InitialStateType
   * @property {array} users
   * @property {string} error
   * @property {object} editingUser
   */

  /** @type {InitialStateType} */
  const initialState = {
    users: [],
    error: null,
    editingUser: null
  }

  const list = (state = initialState, action) => {
    switch(action.type) {
      case SET_ERROR:
        return { ...state, error: action.payload }
      case SET_USERS:
        return { ...state, users: action.payload }
      case SET_EDITING_USER:
        return { ...state, editingUser: action.payload }
      default:
        return state;
    }
  }

  const rootReducer = list;

  return rootReducer;
});
