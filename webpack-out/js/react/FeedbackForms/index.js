function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

define(['js/react/FeedbackForms/components/App.jsx', 'js/react/WithBackboneView', 'js/react/configureStore', 'react-redux', 'js/react/FeedbackForms/actions', 'js/react/FeedbackForms/middleware', 'js/react/FeedbackForms/reducer', 'js/react/shared/helpers', 'js/react/shared/middleware/index'], function (App, WithBackboneView, configureStore, _ref, actions, middleware, reducer, _ref2, sharedMiddleware) {
  var connect = _ref.connect;
  var withContext = _ref2.withContext;

  var mapStateToProps = function mapStateToProps(_ref3) {
    _objectDestructuringEmpty(_ref3);

    return {};
  };

  _objectDestructuringEmpty(actions);

  var actionCreators = {};
  var middlewares = [middleware].concat(_toConsumableArray(sharedMiddleware));
  return WithBackboneView(connect(mapStateToProps, actionCreators)(App), function (context) {
    return configureStore(context, reducer, withContext.apply(void 0, _toConsumableArray(middlewares)));
  });
});
