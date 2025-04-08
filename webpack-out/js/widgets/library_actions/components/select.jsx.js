function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

define(['react'], function (React) {
  var Select = /*#__PURE__*/function (_React$Component) {
    _inherits(Select, _React$Component);

    function Select() {
      _classCallCheck(this, Select);

      return _possibleConstructorReturn(this, _getPrototypeOf(Select).apply(this, arguments));
    }

    _createClass(Select, [{
      key: "onChange",
      value: function onChange(e) {
        this.props.onChange(e.target.value);
      }
    }, {
      key: "render",
      value: function render() {
        var _this = this;

        var _this$props = this.props,
            label = _this$props.label,
            value = _this$props.value,
            items = _this$props.items,
            index = _this$props.index;
        var id = label.replace(/\W/, '_').toLowerCase();
        var defaultValue = items[index] && items[index].id;
        return /*#__PURE__*/React.createElement("div", {
          className: "form-group"
        }, /*#__PURE__*/React.createElement("label", {
          htmlFor: id,
          className: "control-label"
        }, label, " ", index), /*#__PURE__*/React.createElement("select", {
          name: id,
          id: id,
          className: "form-control",
          onChange: function onChange(e) {
            return _this.onChange(e);
          },
          value: value
        }, items.map(function (item) {
          return /*#__PURE__*/React.createElement("option", {
            value: item.id,
            key: item.id
          }, item.name);
        })));
      }
    }]);

    return Select;
  }(React.Component);

  Select.defaultProps = {
    label: '',
    items: [],
    index: null,
    onChange: function onChange() {}
  };
  return Select;
});
