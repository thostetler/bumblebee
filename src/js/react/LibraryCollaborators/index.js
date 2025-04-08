import configureStore from 'js/react/configureStore';
import actions from 'js/react/LibraryCollaborators/actions';
import Dashboard from 'js/react/LibraryCollaborators/components/Dashboard.jsx';
import middleware from 'js/react/LibraryCollaborators/middleware';
import reducer from 'js/react/LibraryCollaborators/reducer';
import { withContext } from 'js/react/shared/helpers';
import sharedMiddleware from 'js/react/shared/middleware/index';
import WithBackboneView from 'js/react/WithBackboneView';
import { connect } from 'react-redux';

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

export default WithBackboneView(connect(mapStateToProps, actionCreators)(Dashboard), (context) =>
  configureStore(context, reducer, withContext(...middlewares))
);
