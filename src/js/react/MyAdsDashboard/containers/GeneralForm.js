import actions from 'js/react/MyAdsDashboard/actions/index';
import GeneralForm from 'js/react/MyAdsDashboard/components/GeneralForm.jsx';
import { page } from 'js/react/MyAdsDashboard/constants';
import { connect } from 'react-redux';

const mapStateToProps = ({ requests, notifications, editingNotification }) => ({
  requests: {
    updateNotification: requests.UPDATE_NOTIFICATION,
    getQuery: requests.GET_QUERY,
  },
  editingNotification,
  notifications,
});

const { goTo, updateNotification, getQuery } = actions;

const actionCreators = {
  updateNotification,
  getQuery,
  onSuccess: () => goTo(page.DASHBOARD),
  onCancel: () => goTo(page.DASHBOARD),
};

export default connect(mapStateToProps, actionCreators)(GeneralForm);
