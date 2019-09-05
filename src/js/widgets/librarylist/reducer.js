define([
  './actionTypes'
], function (t) {

  const initialState = {
    items: [],
    loading: false
  };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case t.SET_ITEMS: return { ...state, ...action.payload };
      case t.SET_LOADING: return { ...state, ...action.payload };
      default: return initialState;
    }
  };

  return reducer;
});
