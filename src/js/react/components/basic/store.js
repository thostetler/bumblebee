define([
  'redux',
  './reducer'
], function ({ createStore }, rootReducer) {

  const configureStore = preloadedState => {
    const store = createStore(
      rootReducer,
      preloadedState
    );

    return store;
  }

  return configureStore;
});
