import actions from 'js/react/MyAdsDashboard/actions';
import CitationsForm from 'js/react/MyAdsDashboard/components/CitationsForm.jsx';
import constants from 'js/react/MyAdsDashboard/constants';
import { connect } from 'react-redux';

const mapStateToProps = ({ requests, notifications, editingNotification }) => ({
  addNotificationRequest: requests.ADD_NOTIFICATION,
  updateNotificationRequest: requests.UPDATE_NOTIFICATION,
  editingNotification,
  notifications,
});

const { addNotification, updateNotification, goTo } = actions;

const actionCreators = {
  addNotification: (notification) =>
    addNotification({
      ...notification,
      template: 'citations',
      type: 'template',
    }),
  updateNotification,
  onSuccess: () => goTo(constants.page.DASHBOARD),
  onCancel: () => goTo(constants.page.DASHBOARD),
};
export default connect(mapStateToProps, actionCreators)(CitationsForm);
