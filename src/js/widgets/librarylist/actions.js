define([
  './actionTypes'
], function (t) {

  return {
    setItems: (items) => ({ type: t.SET_ITEMS, payload: { items } }),
    setLoading: (loading) => ({ type: t.SET_LOADING, payload: { loading } }),
  };
})
