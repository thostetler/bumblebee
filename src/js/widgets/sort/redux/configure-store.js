import Redux from 'redux';
import ReduxThunk from 'redux-thunk';
import SortApp from 'js/widgets/sort/redux/modules/sort-app';
  const { createStore, applyMiddleware } = Redux;

  export default function configureStore(context) {
    const middleware = applyMiddleware(
      ReduxThunk.default.withExtraArgument(context)
    );
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
    return createStore(SortApp.reducer, composeEnhancers(middleware));
  };

