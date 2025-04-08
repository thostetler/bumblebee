define(['underscore', 'js/react/LibraryCollaborators/actions', 'js/react/shared/helpers'], function (_, _ref, _ref2) {
  var GET_COLLABORATORS = _ref.GET_COLLABORATORS,
      SET_COLLABORATORS = _ref.SET_COLLABORATORS,
      ADD_COLLABORATOR = _ref.ADD_COLLABORATOR,
      EDIT_COLLABORATOR = _ref.EDIT_COLLABORATOR,
      SET_LIBRARY_DATA = _ref.SET_LIBRARY_DATA,
      getCollaborators = _ref.getCollaborators;
  var delay = _ref2.delay,
      middleware = _ref2.middleware,
      apiSuccess = _ref2.apiSuccess,
      parseScope = _ref2.parseScope;
  var collaborators = middleware(function (_ref3) {
    var next = _ref3.next,
        action = _ref3.action,
        dispatch = _ref3.dispatch,
        getState = _ref3.getState;
    next(action);

    if (action.type === apiSuccess(GET_COLLABORATORS)) {
      dispatch({
        type: SET_COLLABORATORS,
        result: action.result
      });
    }

    if (action.type === apiSuccess(ADD_COLLABORATOR) || action.type === apiSuccess(EDIT_COLLABORATOR) || action.type === SET_LIBRARY_DATA) {
      var library = getState().library;

      if (library.id) {
        dispatch(getCollaborators(library.id));
      }
    }
  });
  var requestReset = middleware(function (_ref4) {
    var dispatch = _ref4.dispatch,
        next = _ref4.next,
        action = _ref4.action;
    next(action);

    if (/_API_REQUEST_(SUCCESS|FAILURE)$/.test(action.type)) {
      var _parseScope = parseScope(action.type),
          scope = _parseScope.scope;

      delay(function () {
        dispatch({
          type: "".concat(scope, "_RESET")
        });
      });
    }
  });
  return {
    collaborators: collaborators,
    requestReset: requestReset
  };
});
