import _ from 'underscore';
import ReactRedux from 'react-redux';
import ui from 'js/widgets/associated/redux/modules/ui';
import App from 'js/widgets/associated/components/app.jsx';
  // actions
  const { handleLinkClick } = ui;

  // mapping state to props
  const mapStateToProps = (state) => ({
    loading: state.ui.loading,
    items: state.ui.items,
    hasError: state.ui.hasError,
  });

  // dispatch to props
  const mapDispatchToProps = (dispatch) => ({
    handleLinkClick: (link) => dispatch(handleLinkClick(link)),
  });

  export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);

