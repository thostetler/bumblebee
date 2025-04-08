function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

define(['underscore', 'react'], function (_, React) {
  var MultiControl = /*#__PURE__*/function (_React$Component) {
    _inherits(MultiControl, _React$Component);

    function MultiControl(props) {
      var _this;

      _classCallCheck(this, MultiControl);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(MultiControl).call(this, props));
      _this.state = {
        count: 1,
        selected: [props.items[0].id]
      };

      _this.updateCount = function (e, val) {
        e.preventDefault();
        var items = _this.props.items;
        var _this$state = _this.state,
            selected = _this$state.selected,
            count = _this$state.count;

        var arr = _toConsumableArray(selected);

        val === 1 ? arr.push(items[0].id) : arr.pop();

        _this.setState({
          count: count + val,
          selected: arr
        });

        _this.props.onChange(arr);
      };

      _this.createOnChangeHandler = function (index) {
        return function (value) {
          _this.setState(function (_ref) {
            var selected = _ref.selected;
            return {
              selected: [].concat(_toConsumableArray(selected.slice(0, index)), [value], _toConsumableArray(selected.slice(index + 1)))
            };
          }, function () {
            _this.props.onChange(_this.state.selected);
          });
        };
      };

      return _this;
    }

    _createClass(MultiControl, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var count = this.state.count;
        var _this$props = this.props,
            addIcon = _this$props.addIcon,
            removeIcon = _this$props.removeIcon,
            addLabel = _this$props.addLabel,
            disableControls = _this$props.disableControls,
            max = _this$props.max,
            children = _this$props.children;
        return /*#__PURE__*/React.createElement("div", null, _.range(0, count).map(function (i) {
          return children(i > 0 ? i + 1 : null, _this2.createOnChangeHandler(i));
        }), !disableControls && /*#__PURE__*/React.createElement("div", {
          className: "form-group btn-toolbar"
        }, /*#__PURE__*/React.createElement("button", {
          type: "button",
          id: "addLibrary",
          className: "btn btn-default btn-sm",
          disabled: count >= max,
          onClick: function onClick(e) {
            return _this2.updateCount(e, 1);
          }
        }, /*#__PURE__*/React.createElement("fa", {
          className: "fa fa-".concat(addIcon)
        }), " ", addLabel), count > 1 && /*#__PURE__*/React.createElement("button", {
          type: "button",
          id: "removeLibrary",
          className: "btn btn-danger btn-sm",
          onClick: function onClick(e) {
            return _this2.updateCount(e, -1);
          }
        }, /*#__PURE__*/React.createElement("fa", {
          className: "fa fa-".concat(removeIcon, "-o")
        }))));
      }
    }]);

    return MultiControl;
  }(React.Component);

  MultiControl.defaultProps = {
    addIcon: 'plus',
    removeIcon: 'trash',
    addLabel: 'Add',
    disableControls: false,
    max: Number.MAX_SAFE_INTEGER
  };
  return MultiControl;
});
