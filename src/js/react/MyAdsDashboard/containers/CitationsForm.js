import actions from 'js/react/MyAdsDashboard/actions/index';
import CitationsForm from 'js/react/MyAdsDashboard/components/CitationsForm.jsx';
import { page } from 'js/react/MyAdsDashboard/constants';
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
  onSuccess: () => goTo(page.DASHBOARD),
  onCancel: () => goTo(page.DASHBOARD),
};
export default connect(mapStateToProps, actionCreators)(CitationsForm);
