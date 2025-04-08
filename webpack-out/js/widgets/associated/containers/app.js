define(['underscore', 'react-redux', 'js/widgets/associated/redux/modules/ui', 'js/widgets/associated/components/app.jsx'], function (_, ReactRedux, ui, App) {
  // actions
  var _handleLinkClick = ui.handleLinkClick; // mapping state to props

  var mapStateToProps = function mapStateToProps(state) {
    return {
      loading: state.ui.loading,
      items: state.ui.items,
      hasError: state.ui.hasError
    };
  }; // dispatch to props


  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      handleLinkClick: function handleLinkClick(link) {
        return dispatch(_handleLinkClick(link));
      }
    };
  };

  return ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);
});
