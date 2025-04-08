function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define([], function () {
  var getPermissionMap = function getPermissionMap(id) {
    switch (id) {
      case 'read':
        return {
          read: true,
          write: false,
          admin: false
        };

      case 'write':
        return {
          read: false,
          write: true,
          admin: false
        };

      case 'admin':
        return {
          read: false,
          write: false,
          admin: true
        };

      default:
        return {
          read: false,
          write: false,
          admin: false
        };
    }
  };

  var actions = {
    // ADD
    ADD_COLLABORATOR: 'ADD_COLLABORATOR',
    // GET
    GET_COLLABORATORS: 'GET_COLLABORATORS',
    // EDIT
    EDIT_COLLABORATOR: 'EDIT_COLLABORATOR',
    // app state
    SET_COLLABORATORS: 'SET_COLLABORATORS',
    SET_LIBRARY_DATA: 'SET_LIBRARY_DATA'
  };
  var actionCreators = {
    getCollaborators: function getCollaborators(id) {
      return {
        type: 'API_REQUEST',
        scope: actions.GET_COLLABORATORS,
        options: {
          type: 'GET',
          target: "biblib/permissions/".concat(id)
        }
      };
    },
    addCollaborator: function addCollaborator(_ref) {
      var id = _ref.id,
          email = _ref.email,
          permission = _ref.permission;
      return {
        type: 'API_REQUEST',
        scope: actions.ADD_COLLABORATOR,
        options: {
          type: 'POST',
          target: "biblib/permissions/".concat(id),
          data: {
            email: email,
            permission: getPermissionMap(permission && permission.id)
          }
        }
      };
    },
    editCollaborator: function editCollaborator(_ref2) {
      var id = _ref2.id,
          email = _ref2.email,
          permission = _ref2.permission;
      return {
        type: 'API_REQUEST',
        scope: actions.EDIT_COLLABORATOR,
        options: {
          type: 'POST',
          target: "biblib/permissions/".concat(id),
          data: {
            email: email,
            permission: getPermissionMap(permission && permission.id)
          }
        }
      };
    }
  };
  return _objectSpread({}, actions, actionCreators);
});
