'use strict';
define([
  'redux',
  'redux-thunk',
  'es6!./modules/FieldBoosterApp'
], function (Redux, ReduxThunk, FieldBoosterApp) {

  const { createStore, applyMiddleware, combineReducers } = Redux;

  return function configureStore (context) {
    const middleware = applyMiddleware(ReduxThunk.default.withExtraArgument(context));
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
    const reducer = combineReducers({
      FieldBoosterApp: FieldBoosterApp.reducer
    });
    return createStore(reducer, composeEnhancers(middleware));
  };
});
