import configureStore from 'js/react/configureStore';
import actions from 'js/react/MyAdsDashboard/actions';
import App from 'js/react/MyAdsDashboard/components/App.jsx';
import middleware from 'js/react/MyAdsDashboard/middleware';
import reducer from 'js/react/MyAdsDashboard/reducer';
import { withContext } from 'js/react/shared/helpers';
import sharedMiddleware from 'js/react/shared/middleware/api';
import WithBackboneView from 'js/react/WithBackboneView';
import { connect } from 'react-redux';

const mapStateToProps = ({ page, editingNotification }) => ({
  page,
  editingNotification,
});

const { goTo } = actions;

const actionCreators = {
  goTo,
};

export default WithBackboneView(connect(mapStateToProps, actionCreators)(App), (context) =>
  configureStore(context, reducer, withContext(middleware, sharedMiddleware))
);
