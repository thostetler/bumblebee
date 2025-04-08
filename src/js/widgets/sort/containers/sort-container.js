import SortApp from 'js/widgets/sort/components/sort-app.jsx';
import actions from 'js/widgets/sort/redux/modules/sort-app';
import { connect } from 'react-redux';

// actions
const { setSort, setDirection } = actions;

// mapping state to props
const mapStateToProps = (state) => ({
  app: state, // state is available on sub-components as 'app'
});

// dispatch to props
const mapDispatchToProps = (dispatch) => ({
  setSort: (value) => dispatch(setSort(value)),
  setDirection: () => dispatch(setDirection()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SortApp);
