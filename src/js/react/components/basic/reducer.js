define([
  './actions',
  'redux'
], function (actions, { combineReducers }) {

  const {
    SET_PERMISSIONS
  } = actions;

  const list = (state = {
    permissions: []
  }, action) => {

    console.log('lksdjfsd', action, state);

    switch(action.type) {
      case SET_PERMISSIONS:
        return { ...state, permissions: action.payload }
      default:
        return state;
    }
  }

  const rootReducer = list;

  return rootReducer;
});
