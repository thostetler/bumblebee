import actions from 'js/react/MyAdsDashboard/actions/index';
import ImportNotificationsForm from 'js/react/MyAdsDashboard/components/ImportNotificationsForm.jsx';
import { page } from 'js/react/MyAdsDashboard/constants';
import { connect } from 'react-redux';

const mapStateToProps = ({ requests }) => ({
  importClassicRequest: requests.IMPORT_CLASSIC,
});

const { goTo, importClassic } = actions;

const actionCreators = {
  onSuccess: () => goTo(page.DASHBOARD),
  importClassic,
};

export default connect(mapStateToProps, actionCreators)(ImportNotificationsForm);
