import _ from 'underscore';
import ReactRedux from 'react-redux';
import ui from 'js/widgets/resources/redux/modules/ui';
import App from 'js/widgets/resources/components/app.jsx';
  // actions
  const { handleLinkClick, handleResetClick } = ui;

  // mapping state to props
  const mapStateToProps = (state) => ({
    loading: state.ui.loading,
    noResults: state.ui.noResults,
    hasError: state.ui.hasError,
    fullTextSources: state.ui.fullTextSources,
    dataProducts: state.ui.dataProducts,
  });

  // dispatch to props
  const mapDispatchToProps = (dispatch) => ({
    onLinkClick: (source, link) => dispatch(handleLinkClick(source, link)),
  });

  export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);

