function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

define(['underscore', 'redux', 'js/react/LibraryCollaborators/constants', 'js/react/LibraryCollaborators/actions'], function (_, _ref, _ref2, _ref3) {
  var combineReducers = _ref.combineReducers;
  var Permissions = _ref2.Permissions;
  var SET_LIBRARY_DATA = _ref3.SET_LIBRARY_DATA;

  var getPermissionType = function getPermissionType(type) {
    if (type.includes('admin')) {
      return Permissions.ADMIN;
    }

    if (type.includes('write')) {
      return Permissions.WRITE;
    }

    return Permissions.READ;
  };

  var requestState = {
    GET_COLLABORATORS: {
      status: null,
      result: null,
      error: null
    },
    ADD_COLLABORATOR: {
      status: null,
      result: null,
      error: null
    },
    EDIT_COLLABORATOR: {
      status: null,
      result: null,
      error: null
    }
  };

  var requests = function requests() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : requestState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    if (/_API_REQUEST_/.test(action.type)) {
      var _action$type$split = action.type.split('_API_REQUEST_'),
          _action$type$split2 = _slicedToArray(_action$type$split, 2),
          scope = _action$type$split2[0],
          status = _action$type$split2[1];

      var _action$result = action.result,
          result = _action$result === void 0 ? null : _action$result,
          _action$error = action.error,
          error = _action$error === void 0 ? null : _action$error;
      return _objectSpread({}, state, _defineProperty({}, scope, {
        status: status.toLowerCase(),
        result: result,
        error: error
      }));
    }

    if (/_RESET$/.test(action.type)) {
      var _scope = action.type.replace('_RESET', '');

      return _objectSpread({}, state, _defineProperty({}, _scope, requestState[_scope]));
    }

    return state;
  };

  var libraryState = {
    id: null,
    name: null,
    owner: null
  };

  var library = function library() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : libraryState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    if (action.type === SET_LIBRARY_DATA && action.result) {
      var _action$result2 = action.result,
          _action$result2$id = _action$result2.id,
          id = _action$result2$id === void 0 ? state.id : _action$result2$id,
          _action$result2$name = _action$result2.name,
          name = _action$result2$name === void 0 ? state.name : _action$result2$name,
          _action$result2$owner = _action$result2.owner,
          owner = _action$result2$owner === void 0 ? state.owner : _action$result2$owner;
      return {
        id: id,
        name: name,
        owner: owner
      };
    }

    return state;
  };

  var collaboratorsState = {};

  var collaborators = function collaborators() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : collaboratorsState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    if (action.type === 'SET_COLLABORATORS' && action.result) {
      var result = action.result.sort(function (a, b) {
        return Object.keys(b)[0] - Object.keys(a)[0];
      });
      return result.reduce(function (acc, collab) {
        var id = _.uniqueId('collaborator_');

        var keys = Object.keys(collab);
        var role = collab[keys[0]];

        if (role.includes('owner')) {
          return acc;
        }

        return _objectSpread({}, acc, _defineProperty({}, id, {
          id: id,
          email: keys[0],
          permission: getPermissionType(role)
        }));
      }, {});
    }

    return state;
  };

  return combineReducers({
    requests: requests,
    library: library,
    collaborators: collaborators
  });
});
