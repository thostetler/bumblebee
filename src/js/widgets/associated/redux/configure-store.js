import apiMiddleware from 'js/widgets/associated/redux/middleware/api';
import uiMiddleware from 'js/widgets/associated/redux/middleware/ui';
import api from 'js/widgets/associated/redux/modules/api';
import ui from 'js/widgets/associated/redux/modules/ui';
import Redux from 'redux';

const { createStore, applyMiddleware, combineReducers } = Redux;

export default function configureStore(context) {
  const middleware = applyMiddleware.apply(Redux, [...uiMiddleware, ...apiMiddleware(context)]);
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
  const reducer = combineReducers({
    api: api.reducer,
    ui: ui.reducer,
  });
  const store = createStore(reducer, composeEnhancers(middleware));
  return store;
}
