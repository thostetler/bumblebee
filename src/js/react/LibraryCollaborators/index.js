import Dashboard from 'js/react/LibraryCollaborators/components/Dashboard.jsx';
import WithBackboneView from 'js/react/WithBackboneView';
import configureStore from 'js/react/configureStore';
import { connect } from 'react-redux';
import actions from 'js/react/LibraryCollaborators/actions';
import middleware from 'js/react/LibraryCollaborators/middleware';
import reducer from 'js/react/LibraryCollaborators/reducer';
import { withContext } from 'js/react/shared/helpers';
import sharedMiddleware from 'js/react/shared/middleware/index';
  const mapStateToProps = ({ library, collaborators, requests }) => ({
    library,
    permissions: collaborators,
    requests: {
      add: requests.ADD_COLLABORATOR,
      get: requests.GET_COLLABORATORS,
      edit: requests.EDIT_COLLABORATOR,
    },
  });

  const { getCollaborators, addCollaborator, editCollaborator } = actions;

  const actionCreators = {
    getCollaborators,
    addCollaborator,
    editCollaborator,
  };

  const middlewares = [middleware, ...sharedMiddleware];

  export default WithBackboneView(
    connect(mapStateToProps, actionCreators)(Dashboard),
    (context) => configureStore(context, reducer, withContext(...middlewares))
  );

