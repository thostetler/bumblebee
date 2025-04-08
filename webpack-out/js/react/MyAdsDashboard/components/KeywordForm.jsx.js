function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

define(['react', 'react-bootstrap', 'prop-types'], function (React, _ref, PropTypes) {
  var Form = _ref.Form,
      FormGroup = _ref.FormGroup,
      ControlLabel = _ref.ControlLabel,
      FormControl = _ref.FormControl,
      HelpBlock = _ref.HelpBlock;

  var getStatusMessage = function getStatusMessage(_ref2) {
    var status = _ref2.status,
        error = _ref2.error,
        editing = _ref2.editing;

    switch (status) {
      case 'pending':
        return /*#__PURE__*/React.createElement("span", {
          className: "text-info"
        }, /*#__PURE__*/React.createElement("i", {
          className: "fa fa-spinner fa-spin",
          "aria-hidden": "true"
        }), " Sending request...");

      case 'failure':
        return /*#__PURE__*/React.createElement("span", {
          className: "text-danger"
        }, "Request failed. (", error, ")");

      case 'success':
        return /*#__PURE__*/React.createElement("span", {
          className: "text-success"
        }, "Notification ", editing ? 'saved' : 'created', "!");

      default:
        return null;
    }
  };

  getStatusMessage.defaultProps = {
    status: '',
    error: '',
    editing: false
  };
  getStatusMessage.propTypes = {
    status: PropTypes.string,
    error: PropTypes.string,
    editing: PropTypes.bool
  };
  var KeywordFormInitialState = {
    keywords: '',
    message: '',
    name: '',
    editing: false,
    pending: false
  };

  var KeywordForm = /*#__PURE__*/function (_React$Component) {
    _inherits(KeywordForm, _React$Component);

    function KeywordForm(props) {
      var _this;

      _classCallCheck(this, KeywordForm);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(KeywordForm).call(this, props));
      _this.onSubmit = _this.onSubmit.bind(_assertThisInitialized(_this));
      _this.onChange = _this.onChange.bind(_assertThisInitialized(_this));
      var updatedState = {};

      if (_this.props.editingNotification) {
        updatedState = {
          editing: true,
          keywords: _this.props.editingNotification.data,
          name: _this.props.editingNotification.name
        };
      }

      _this.state = _objectSpread({}, KeywordFormInitialState, updatedState);
      return _this;
    }

    _createClass(KeywordForm, [{
      key: "showMessage",
      value: function showMessage(message) {
        var _this2 = this;

        this.setState({
          message: message
        }, function () {
          setTimeout(function () {
            return _this2.setState({
              message: null
            });
          }, 3000);
        });
      }
    }, {
      key: "createQueryString",
      value: function createQueryString() {
        var keywords = this.state.keywords;
        return keywords.trim();
      }
    }, {
      key: "onSubmit",
      value: function onSubmit(e) {
        e.preventDefault();
        var data = this.createQueryString();
        var _this$state = this.state,
            name = _this$state.name,
            pending = _this$state.pending;

        if (pending) {
          return;
        }

        if (data === '') {
          return this.showMessage('Must add at least one keyword');
        }

        var payload = {
          data: data,
          name: name
        };

        if (this.state.editing) {
          this.props.updateNotification(_objectSpread({}, this.props.editingNotification, payload));
        } else {
          this.props.addNotification(payload);
        }
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(next) {
        var _this3 = this;

        var addStatus = next.addNotificationRequest.status;
        var updateStatus = next.updateNotificationRequest.status; // fires success handler if our request was successful

        if (addStatus === 'success' || updateStatus === 'success') {
          setTimeout(function () {
            return _this3.props.onSuccess();
          }, 1000);
        } // won't allow a request to go through if we're pending or had just failed


        if (addStatus === 'pending' || updateStatus === 'pending' || addStatus === 'failure' || updateStatus === 'failure') {
          this.setState({
            pending: true
          });
        } else if (!addStatus && !updateStatus) {
          this.setState({
            pending: false
          });
        }
      }
    }, {
      key: "onChange",
      value: function onChange(e) {
        this.setState({
          keywords: e.target.value
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this4 = this;

        return /*#__PURE__*/React.createElement(Form, {
          onSubmit: this.onSubmit
        }, this.state.editing && /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(ControlLabel, null, "Name"), /*#__PURE__*/React.createElement(FormControl, {
          type: "text",
          bsSize: "large",
          value: this.state.name,
          onChange: function onChange(e) {
            return _this4.setState({
              name: e.target.value
            });
          }
        }), /*#__PURE__*/React.createElement(FormControl.Feedback, null), /*#__PURE__*/React.createElement(HelpBlock, null, "Set the name for this notification")), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(ControlLabel, null, "Set of Keywords "), /*#__PURE__*/React.createElement(FormControl, {
          bsSize: "large",
          type: "text",
          value: this.state.keywords,
          placeholder: "star OR planet",
          onChange: function onChange(e) {
            return _this4.setState({
              keywords: e.target.value
            });
          }
        }), /*#__PURE__*/React.createElement(FormControl.Feedback, null), /*#__PURE__*/React.createElement(HelpBlock, null, "Boolean \"AND\" is assumed, but can be overriden by using explicit logical operators between keywords")), /*#__PURE__*/React.createElement("div", {
          className: "row",
          style: {
            borderTop: 'solid 1px #d9d9d9',
            paddingTop: '1rem'
          }
        }, /*#__PURE__*/React.createElement("div", {
          className: "col-sm-4"
        }, /*#__PURE__*/React.createElement("div", {
          className: "btn-toolbar"
        }, /*#__PURE__*/React.createElement("button", {
          type: "submit",
          className: "btn btn-primary"
        }, this.state.editing ? 'Save notification' : 'Create notification'), /*#__PURE__*/React.createElement("button", {
          className: "btn btn-default",
          onClick: this.props.onCancel
        }, "Cancel"))), /*#__PURE__*/React.createElement("div", {
          className: "col-sm-7 col-sm-offset-1",
          style: {
            paddingTop: '1rem'
          }
        }, getStatusMessage(_objectSpread({}, this.state.editing ? this.props.updateNotificationRequest : this.props.addNotificationRequest, {
          editing: this.state.editing
        })), /*#__PURE__*/React.createElement("span", {
          className: "text-info"
        }, this.state.message))));
      }
    }]);

    return KeywordForm;
  }(React.Component);

  return KeywordForm;
});
