define(['redux', './reducer', './middleware'], function(
  {Redux, createStore, applyMiddleware, compose},
  rootReducer, rootMiddleware
) {
  const configureStore = context => {
    const middleware = applyMiddleware.apply(Redux, [
      ...rootMiddleware(context)
    ]);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(rootReducer, composeEnhancers(middleware));
    return store;
  };

  return configureStore;
});
