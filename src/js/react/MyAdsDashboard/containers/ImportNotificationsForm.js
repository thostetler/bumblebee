import actions from 'js/react/MyAdsDashboard/actions';
import ImportNotificationsForm from 'js/react/MyAdsDashboard/components/ImportNotificationsForm.jsx';
import constants from 'js/react/MyAdsDashboard/constants';
import { connect } from 'react-redux';

const mapStateToProps = ({ requests }) => ({
  importClassicRequest: requests.IMPORT_CLASSIC,
});

const { goTo, importClassic } = actions;

const actionCreators = {
  onSuccess: () => goTo(constants.page.DASHBOARD),
  importClassic,
};

export default connect(mapStateToProps, actionCreators)(ImportNotificationsForm);
