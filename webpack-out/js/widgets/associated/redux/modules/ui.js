function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define([], function () {
  var actions = {
    LINK_CLICKED: '[ui] LINK_CLICKED',
    SET_LOADING: '[ui] SET_LOADING',
    SET_ITEMS: '[ui] SET_ITEMS',
    SET_HAS_ERROR: '[ui] SET_HAS_ERROR',
    RESET: '[ui] RESET'
  };
  var initialState = {
    loading: true,
    items: [],
    hasError: false
  };

  var reducer = function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case actions.SET_LOADING:
        return _objectSpread({}, state, {
          loading: action.result
        });

      case actions.SET_ITEMS:
        return _objectSpread({}, state, {
          items: action.result
        });

      case actions.SET_HAS_ERROR:
        return _objectSpread({}, state, {
          hasError: action.result,
          loading: false
        });

      case actions.RESET:
        return initialState;

      default:
        return state;
    }
  }; // action creators


  var handleLinkClick = function handleLinkClick(result) {
    return {
      type: actions.LINK_CLICKED,
      result: result
    };
  };

  var setError = function setError(result) {
    return {
      type: actions.SET_HAS_ERROR,
      result: result
    };
  };

  var reset = function reset() {
    return {
      type: actions.RESET
    };
  };

  return {
    reducer: reducer,
    initialState: initialState,
    actions: actions,
    handleLinkClick: handleLinkClick,
    setError: setError,
    reset: reset
  };
});
