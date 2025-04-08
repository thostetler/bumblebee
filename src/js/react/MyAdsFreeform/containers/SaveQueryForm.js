import actions from 'js/react/MyAdsFreeform/actions';
import SaveQueryForm from 'js/react/MyAdsFreeform/components/SaveQueryForm.jsx';
import { connect } from 'react-redux';

const mapStateToProps = ({ requests }) => ({
  requests: {
    addNotification: requests.ADD_NOTIFICATION,
  },
});

const {} = actions;

const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(SaveQueryForm);
