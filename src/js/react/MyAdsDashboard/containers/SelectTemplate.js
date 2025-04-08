import actions from 'js/react/MyAdsDashboard/actions';
import SelectTemplate from 'js/react/MyAdsDashboard/components/SelectTemplate.jsx';
import { connect } from 'react-redux';

const mapStateToProps = ({}) => ({});

const { goTo } = actions;

const actionCreators = {
  goTo,
};

export default connect(mapStateToProps, actionCreators)(SelectTemplate);
