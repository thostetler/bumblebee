import configureStore from 'js/react/configureStore';
import App from 'js/react/Recommender/components/App.jsx';
import middleware from 'js/react/Recommender/middleware';
import reducer from 'js/react/Recommender/reducer';
import { withContext } from 'js/react/shared/helpers';
import sharedMiddleware from 'js/react/shared/middleware/index';
import WithBackboneView from 'js/react/WithBackboneView';

const middlewares = [middleware, ...sharedMiddleware];

export default WithBackboneView(App, (context) => configureStore(context, reducer, withContext(...middlewares)));
