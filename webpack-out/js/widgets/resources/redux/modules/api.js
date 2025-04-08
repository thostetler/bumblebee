function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define([], function () {
  var actions = {
    QUERY_PROVIDED: '[api] QUERY_PROVIDED',
    RECEIVED_RESPONSE: '[api] RECEIVED_RESPONSE',
    CURRENT_QUERY_UPDATED: '[api] CURRENT_QUERY_UPDATED',
    FETCH_DATA: '[api] FETCH_DATA',
    FETCHING_DATA: '[api] FETCHING_DATA',
    SET_LINK_SERVER: '[api] SET_LINK_SERVER',
    SEND_ANALYTICS: '[api] SEND_ANALYTICS'
  };
  var initialState = {
    linkServer: null,
    query: null
  };

  var reducer = function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case actions.SET_LINK_SERVER:
        return _objectSpread({}, state, {
          linkServer: action.result
        });

      case actions.CURRENT_QUERY_UPDATED:
        return _objectSpread({}, state, {
          query: action.result
        });

      default:
        return state;
    }
  }; // action creators


  var displayDocuments = function displayDocuments(result) {
    return {
      type: actions.QUERY_PROVIDED,
      result: result
    };
  };

  var processResponse = function processResponse(result) {
    return {
      type: actions.RECEIVED_RESPONSE,
      result: result
    };
  };

  var setLinkServer = function setLinkServer(result) {
    return {
      type: actions.SET_LINK_SERVER,
      result: result
    };
  };

  return {
    reducer: reducer,
    initialState: initialState,
    actions: actions,
    displayDocuments: displayDocuments,
    processResponse: processResponse,
    setLinkServer: setLinkServer
  };
});
