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
  var capitalize = function capitalize(word) {
    if (word.length < 3) return word;
    return word.toLowerCase()[0].toUpperCase() + word.slice(1);
  };

  var RadioGroup = /*#__PURE__*/function (_React$Component) {
    _inherits(RadioGroup, _React$Component);

    function RadioGroup(props) {
      var _this;

      _classCallCheck(this, RadioGroup);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(RadioGroup).call(this, props));
      _this.state = {
        selection: props.options[0]
      };

      _this.onChange = function (selection) {
        _this.setState({
          selection: selection
        });

        _this.props.onChange(selection);
      };

      return _this;
    }

    _createClass(RadioGroup, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$props = this.props,
            options = _this$props.options,
            label = _this$props.label,
            direction = _this$props.direction;
        var selection = this.state.selection;
        var radioClass = direction === 'inline' ? 'radio-inline' : 'radio';
        var id = label.replace(/\W/g, '_').toLowerCase();
        return /*#__PURE__*/React.createElement("div", {
          className: "form-group"
        }, /*#__PURE__*/React.createElement("p", {
          style: {
            fontWeight: 'bold',
            marginBottom: '5px',
            fontSize: '15px'
          }
        }, label), options.map(function (val, i) {
          return /*#__PURE__*/React.createElement("label", {
            className: radioClass,
            key: id + i
          }, /*#__PURE__*/React.createElement("input", {
            type: "radio",
            name: id + i,
            value: val,
            checked: selection === val,
            onChange: function onChange(e) {
              return _this2.onChange(val);
            }
          }), ' ', capitalize(val));
        }));
      }
    }]);

    return RadioGroup;
  }(React.Component);

  RadioGroup.defaultProps = {
    options: [],
    label: 'Radio Group',
    direction: null,
    onChange: function onChange() {}
  };
  return RadioGroup;
});
