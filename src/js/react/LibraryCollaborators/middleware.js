import {
  ADD_COLLABORATOR,
  EDIT_COLLABORATOR,
  GET_COLLABORATORS,
  getCollaborators,
  SET_COLLABORATORS,
  SET_LIBRARY_DATA,
} from 'js/react/LibraryCollaborators/actions';
import { apiSuccess, delay, middleware, parseScope } from 'js/react/shared/helpers';

const collaborators = middleware(({ next, action, dispatch, getState }) => {
  next(action);

  if (action.type === apiSuccess(GET_COLLABORATORS)) {
    dispatch({ type: SET_COLLABORATORS, result: action.result });
  }
  if (
    action.type === apiSuccess(ADD_COLLABORATOR) ||
    action.type === apiSuccess(EDIT_COLLABORATOR) ||
    action.type === SET_LIBRARY_DATA
  ) {
    const library = getState().library;
    if (library.id) {
      dispatch(getCollaborators(library.id));
    }
  }
});

const requestReset = middleware(({ dispatch, next, action }) => {
  next(action);
  if (/_API_REQUEST_(SUCCESS|FAILURE)$/.test(action.type)) {
    const { scope } = parseScope(action.type);

    delay(() => {
      dispatch({ type: `${scope}_RESET` });
    });
  }
});

export default {
  collaborators,
  requestReset,
};
