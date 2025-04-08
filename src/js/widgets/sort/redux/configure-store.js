import SortApp from 'js/widgets/sort/redux/modules/sort-app';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

export default function configureStore(context) {
  const middleware = applyMiddleware(ReduxThunk.withExtraArgument(context));
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(SortApp.reducer, composeEnhancers(middleware));
}
