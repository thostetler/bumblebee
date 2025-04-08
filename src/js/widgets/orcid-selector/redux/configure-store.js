import Redux from 'redux';
import ReduxThunk from 'redux-thunk';
import OrcidSelectorApp from 'js/widgets/orcid-selector/redux/modules/orcid-selector-app';
  const { createStore, applyMiddleware } = Redux;

  export default function configureStore(context) {
    const middleware = applyMiddleware(
      ReduxThunk.default.withExtraArgument(context)
    );
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
    return createStore(OrcidSelectorApp.reducer, composeEnhancers(middleware));
  };

