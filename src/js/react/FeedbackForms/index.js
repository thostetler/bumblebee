import App from 'js/react/FeedbackForms/components/App.jsx';
import WithBackboneView from 'js/react/WithBackboneView';
import configureStore from 'js/react/configureStore';
import { connect } from 'react-redux';
import actions from 'js/react/FeedbackForms/actions';
import middleware from 'js/react/FeedbackForms/middleware';
import reducer from 'js/react/FeedbackForms/reducer';
import { withContext } from 'js/react/shared/helpers';
import sharedMiddleware from 'js/react/shared/middleware/index';
  const mapStateToProps = ({}) => ({});
  const {} = actions;
  const actionCreators = {};
  const middlewares = [middleware, ...sharedMiddleware];

  export default WithBackboneView(
    connect(mapStateToProps, actionCreators)(App),
    (context) => configureStore(context, reducer, withContext(...middlewares))
  );

