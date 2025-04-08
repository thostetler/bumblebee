import actions from 'js/react/MyAdsDashboard/actions/index';
import ClassicLoginForm from 'js/react/MyAdsDashboard/components/ClassicLoginForm.jsx';
import { connect } from 'react-redux';

const mapStateToProps = ({ requests }) => ({
  classicMirrorsRequest: requests.FETCH_CLASSIC_MIRRORS,
  loginClassicRequest: requests.LOGIN_CLASSIC,
  loginClassicCheckRequest: requests.LOGIN_CLASSIC_CHECK,
});

const { goTo, fetchClassicMirrors, loginClassic, loginClassicCheck } = actions;

const actionCreators = {
  goTo,
  fetchClassicMirrors,
  loginClassic,
  loginClassicCheck,
};

export default connect(mapStateToProps, actionCreators)(ClassicLoginForm);
