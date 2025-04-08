import ReactRedux from 'react-redux';
import actions from 'js/widgets/orcid-selector/redux/modules/orcid-selector-app';
import OrcidSelectorApp from 'js/widgets/orcid-selector/components/orcid-selector-app.jsx';
  // actions
  const { sendEvent } = actions;

  // mapping state to props
  const mapStateToProps = (state) => ({
    app: state, // state is available on sub-components as 'app'
  });

  // dispatch to props
  const mapDispatchToProps = (dispatch) => ({
    onClaim: () => dispatch(sendEvent('orcid-bulk-claim')),
    onDelete: () => dispatch(sendEvent('orcid-bulk-delete')),
    onUpdate: () => dispatch(sendEvent('orcid-bulk-update')),
  });

  export default ReactRedux.connect(
    mapStateToProps,
    mapDispatchToProps
  )(OrcidSelectorApp);

