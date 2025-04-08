import actions from 'js/react/MyAdsDashboard/actions';
import GeneralForm from 'js/react/MyAdsDashboard/components/GeneralForm.jsx';
import constants from 'js/react/MyAdsDashboard/constants';
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
  onSuccess: () => goTo(constants.page.DASHBOARD),
  onCancel: () => goTo(constants.page.DASHBOARD),
};

export default connect(mapStateToProps, actionCreators)(GeneralForm);
