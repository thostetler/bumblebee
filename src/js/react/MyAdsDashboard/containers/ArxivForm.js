import actions from 'js/react/MyAdsDashboard/actions/index';
import ArxivForm from 'js/react/MyAdsDashboard/components/ArxivForm.jsx';
import { page } from 'js/react/MyAdsDashboard/constants';
import { connect } from 'react-redux';

const mapStateToProps = ({ requests, notifications, editingNotification }) => ({
  addNotificationRequest: requests.ADD_NOTIFICATION,
  updateNotificationRequest: requests.UPDATE_NOTIFICATION,
  editingNotification,
  notifications,
});

const { addNotification, goTo, updateNotification } = actions;

const actionCreators = {
  addNotification: (notification) => addNotification({ ...notification, template: 'arxiv', type: 'template' }),
  updateNotification,
  onSuccess: () => goTo(page.DASHBOARD),
  onCancel: () => goTo(page.DASHBOARD),
};

export default connect(mapStateToProps, actionCreators)(ArxivForm);
