function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define([], function () {
  var actions = {
    SET_BIBCODE: 'SET_BIBCODE',
    SET_FORM: 'SET_FORM',
    CHECK_BIBCODES: 'CHECK_BIBCODES'
  };
  var actionCreators = {
    setBibcode: function setBibcode(payload) {
      return {
        type: actions.SET_BIBCODE,
        payload: payload
      };
    },
    setForm: function setForm(payload) {
      return {
        type: actions.SET_FORM,
        payload: payload
      };
    },
    checkBibcodes: function checkBibcodes(payload) {
      return {
        type: actions.CHECK_BIBCODES,
        payload: payload
      };
    }
  };
  return _objectSpread({}, actions, actionCreators);
});
