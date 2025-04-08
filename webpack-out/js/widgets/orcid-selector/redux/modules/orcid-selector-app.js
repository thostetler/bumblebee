function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define([], function () {
  // Action Constants
  var UPDATE_SELECTED = 'UPDATE_SELECTED';
  var UPDATE_MODE = 'UPDATE_MODE'; // Action Creators

  var updateSelected = function updateSelected(value) {
    return {
      type: UPDATE_SELECTED,
      value: value
    };
  };

  var updateMode = function updateMode(value) {
    return {
      type: UPDATE_MODE,
      value: value
    };
  };

  var sendEvent = function sendEvent(event) {
    return function (dispatch, getState, widget) {
      var _getState = getState(),
          selected = _getState.selected;

      widget.fireOrcidEvent(event, selected);
    };
  }; // initial state


  var initialState = {
    selected: [],
    mode: false
  }; // reducer

  var reducer = function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case UPDATE_SELECTED:
        return _objectSpread({}, state, {
          selected: action.value
        });

      case UPDATE_MODE:
        return _objectSpread({}, state, {
          mode: action.value
        });

      default:
        return initialState;
    }
  };

  return {
    updateSelected: updateSelected,
    updateMode: updateMode,
    sendEvent: sendEvent,
    reducer: reducer
  };
});
