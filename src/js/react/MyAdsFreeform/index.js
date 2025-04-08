import App from 'js/react/MyAdsFreeform/components/App.jsx';
import WithBackboneView from 'js/react/WithBackboneView';
import configureStore from 'js/react/configureStore';
import { connect } from 'react-redux';
import actions from 'js/react/MyAdsFreeform/actions';
import middleware from 'js/react/MyAdsFreeform/middleware';
import reducer from 'js/react/MyAdsFreeform/reducer';
import { withContext } from 'js/react/shared/helpers';
import sharedMiddleware from 'js/react/shared/middleware/api';
  const mapStateToProps = ({ requests, generalError, loggedIn }) => ({
    requests: {
      addNotification: requests.ADD_NOTIFICATION,
      getQID: requests.GET_QID,
    },
    loggedIn,
    generalError,
  });
  const { saveNewNotification, checkLoginStatus } = actions;
  const actionCreators = {
    saveNewNotification,
    checkLoginStatus,
  };

  export default WithBackboneView(
    connect(mapStateToProps, actionCreators)(App),
    (context) =>
      configureStore(
        context,
        reducer,
        withContext(middleware, sharedMiddleware)
      )
  );

