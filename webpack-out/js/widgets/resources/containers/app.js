define(['underscore', 'react-redux', 'js/widgets/resources/redux/modules/ui', 'js/widgets/resources/components/app.jsx'], function (_, ReactRedux, ui, App) {
  // actions
  var handleLinkClick = ui.handleLinkClick,
      handleResetClick = ui.handleResetClick; // mapping state to props

  var mapStateToProps = function mapStateToProps(state) {
    return {
      loading: state.ui.loading,
      noResults: state.ui.noResults,
      hasError: state.ui.hasError,
      fullTextSources: state.ui.fullTextSources,
      dataProducts: state.ui.dataProducts
    };
  }; // dispatch to props


  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      onLinkClick: function onLinkClick(source, link) {
        return dispatch(handleLinkClick(source, link));
      }
    };
  };

  return ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);
});
