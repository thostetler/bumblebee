import actions from 'js/react/MyAdsDashboard/actions';
import Dashboard from 'js/react/MyAdsDashboard/components/Dashboard.jsx';
import constants from 'js/react/MyAdsDashboard/constants';
import { connect } from 'react-redux';

const mapStateToProps = ({ notifications, requests }) => ({
  notifications,
  getNotificationsRequest: requests.GET_NOTIFICATIONS,
  updateNotificationRequest: requests.UPDATE_NOTIFICATION,
  removeNotificationRequest: requests.REMOVE_NOTIFICATION,
  getNotificationRequest: requests.GET_NOTIFICATION,
});

const {
  updateNotification,
  getNotifications,
  getNotification,
  removeNotification,
  goTo,
  toggleActive,
  importNotifications,
  runQuery,
} = actions;

const actionCreators = {
  updateNotification,
  getNotifications,
  getNotification,
  removeNotification,
  toggleActive,
  importNotifications,
  runQuery,
  editNotification: (id) => getNotification(id),
  createNewNotification: () => goTo(constants.page.SELECT_TEMPLATE),
};

export default connect(mapStateToProps, actionCreators)(Dashboard);
