import App from 'js/react/MyAdsDashboard/components/App.jsx';
import WithBackboneView from 'js/react/WithBackboneView';
import configureStore from 'js/react/configureStore';
import { connect } from 'react-redux';
import actions from 'js/react/MyAdsDashboard/actions';
import middleware from 'js/react/MyAdsDashboard/middleware';
import reducer from 'js/react/MyAdsDashboard/reducer';
import { withContext } from 'js/react/shared/helpers';
import sharedMiddleware from 'js/react/shared/middleware/api';
  const mapStateToProps = ({ page, editingNotification }) => ({
    page,
    editingNotification,
  });

  const { goTo } = actions;

  const actionCreators = {
    goTo,
  };

  export default WithBackboneView(
    connect(
      mapStateToProps,
      actionCreators
    )(App),
    (context) =>
      configureStore(
        context,
        reducer,
        withContext(middleware, sharedMiddleware)
      )
  );

