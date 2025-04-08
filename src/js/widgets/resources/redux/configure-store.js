import Redux from 'redux';
import api from 'js/widgets/resources/redux/modules/api';
import ui from 'js/widgets/resources/redux/modules/ui';
import apiMiddleware from 'js/widgets/resources/redux/middleware/api';
import uiMiddleware from 'js/widgets/resources/redux/middleware/ui';
  const { createStore, applyMiddleware, combineReducers } = Redux;

  export default function configureStore(context) {
    const middleware = applyMiddleware.apply(Redux, [
      ...uiMiddleware,
      ...apiMiddleware(context),
    ]);
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
    const reducer = combineReducers({
      api: api.reducer,
      ui: ui.reducer,
    });
    const store = createStore(reducer, composeEnhancers(middleware));
    return store;
  };

