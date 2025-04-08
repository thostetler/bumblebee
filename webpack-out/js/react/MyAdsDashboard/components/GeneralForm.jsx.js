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

define(['react', 'react-bootstrap', 'js/react/shared/helpers', 'prop-types'], function (React, _ref, _ref2, PropTypes) {
  var Form = _ref.Form,
      FormGroup = _ref.FormGroup,
      ControlLabel = _ref.ControlLabel,
      FormControl = _ref.FormControl,
      Checkbox = _ref.Checkbox,
      Radio = _ref.Radio,
      Button = _ref.Button;
  var isEmpty = _ref2.isEmpty;

  var getStatusMessage = function getStatusMessage(_ref3) {
    var status = _ref3.status,
        error = _ref3.error,
        editing = _ref3.editing,
        noSuccess = _ref3.noSuccess;

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
        }, noSuccess ? '' : "Notification ".concat(editing ? 'saved' : 'created', "!"));

      default:
        return null;
    }
  };

  getStatusMessage.defaultProps = {
    status: '',
    error: '',
    editing: false,
    noSuccess: false
  };
  getStatusMessage.propTypes = {
    status: PropTypes.string,
    error: PropTypes.string,
    editing: PropTypes.bool,
    noSuccess: PropTypes.bool
  };
  var GeneralFormInitialState = {
    stateful: false,
    frequency: 'daily',
    message: '',
    name: '',
    editing: false,
    pending: false
  };

  var GeneralForm = /*#__PURE__*/function (_React$Component) {
    _inherits(GeneralForm, _React$Component);

    function GeneralForm(props) {
      var _this;

      _classCallCheck(this, GeneralForm);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(GeneralForm).call(this, props));
      _this.onSubmit = _this.onSubmit.bind(_assertThisInitialized(_this));
      _this.onFormChange = _this.onFormChange.bind(_assertThisInitialized(_this));
      _this.onGotoResults = _this.onGotoResults.bind(_assertThisInitialized(_this));
      var updatedState = {};

      if (_this.props.editingNotification) {
        var _this$props$editingNo = _this.props.editingNotification,
            stateful = _this$props$editingNo.stateful,
            frequency = _this$props$editingNo.frequency,
            name = _this$props$editingNo.name;
        updatedState = {
          editing: true,
          stateful: stateful,
          frequency: frequency,
          name: name
        };
      }

      _this.state = _objectSpread({}, GeneralFormInitialState, updatedState);
      return _this;
    }

    _createClass(GeneralForm, [{
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
      key: "onGotoResults",
      value: function onGotoResults() {
        if (!this.state.pending) {
          this.props.getQuery(this.props.editingNotification.qid);
        }
      }
    }, {
      key: "onSubmit",
      value: function onSubmit(e) {
        e.preventDefault();
        var _this$state = this.state,
            name = _this$state.name,
            frequency = _this$state.frequency,
            stateful = _this$state.stateful,
            pending = _this$state.pending;

        if (pending) {
          return;
        }

        if (isEmpty(name)) {
          return this.showMessage('Notification name cannot be empty');
        }

        var payload = {
          name: name,
          frequency: frequency,
          stateful: stateful
        };
        this.props.updateNotification(_objectSpread({}, this.props.editingNotification, payload));
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(next) {
        var _this3 = this;

        var updateStatus = next.requests.updateNotification.status;
        var getQueryStatus = next.requests.getQuery.status; // fires success handler if our request was successful

        if (updateStatus === 'success') {
          setTimeout(function () {
            return _this3.props.onSuccess();
          }, 1000);
        } // won't allow a request to go through if we're pending or had just failed


        if (updateStatus === 'pending' || updateStatus === 'failure' || getQueryStatus === 'pending' || getQueryStatus === 'failure') {
          this.setState({
            pending: true
          });
        }

        if (!updateStatus && !getQueryStatus) {
          this.setState({
            pending: false
          });
        }
      }
    }, {
      key: "onFormChange",
      value: function onFormChange(prop) {
        var _this4 = this;

        return function (e) {
          var _this4$setState;

          var value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

          _this4.setState((_this4$setState = {}, _defineProperty(_this4$setState, prop, value), _defineProperty(_this4$setState, "updated", true), _this4$setState));
        };
      }
    }, {
      key: "render",
      value: function render() {
        var _this$state2 = this.state,
            editing = _this$state2.editing,
            name = _this$state2.name,
            stateful = _this$state2.stateful,
            frequency = _this$state2.frequency,
            message = _this$state2.message;
        return /*#__PURE__*/React.createElement("div", null, editing ? /*#__PURE__*/React.createElement(Form, {
          onSubmit: this.onSubmit
        }, /*#__PURE__*/React.createElement(FormGroup, {
          controlId: "notification-name"
        }, /*#__PURE__*/React.createElement(ControlLabel, null, "Notification Name"), /*#__PURE__*/React.createElement(FormControl, {
          type: "text",
          placeholder: "My Notification",
          value: name,
          onChange: this.onFormChange('name'),
          bsSize: "large",
          required: true
        })), /*#__PURE__*/React.createElement(FormGroup, {
          controlId: "notification-stateful"
        }, /*#__PURE__*/React.createElement(Checkbox, {
          checked: stateful,
          onChange: this.onFormChange('stateful')
        }, "Only receive new results")), /*#__PURE__*/React.createElement(FormGroup, {
          controlId: "notification-frequency"
        }, /*#__PURE__*/React.createElement(ControlLabel, {
          id: "frequency-check"
        }, "Frequency"), /*#__PURE__*/React.createElement(Radio, {
          name: "frequency",
          checked: frequency === 'daily',
          value: "daily",
          onChange: this.onFormChange('frequency'),
          "aria-labelledby": "frequency-check"
        }, "Daily"), /*#__PURE__*/React.createElement(Radio, {
          name: "frequency",
          checked: frequency === 'weekly',
          value: "weekly",
          onChange: this.onFormChange('frequency'),
          "aria-labelledby": "frequency-check"
        }, "Weekly")), /*#__PURE__*/React.createElement("div", {
          className: "row",
          style: {
            borderTop: 'solid 1px #d9d9d9',
            paddingTop: '1rem'
          }
        }, /*#__PURE__*/React.createElement("div", {
          className: "col-sm-6"
        }, /*#__PURE__*/React.createElement("div", {
          className: "btn-toolbar"
        }, /*#__PURE__*/React.createElement("button", {
          type: "submit",
          className: "btn btn-primary"
        }, "Save notification"), /*#__PURE__*/React.createElement("button", {
          className: "btn btn-default",
          onClick: this.props.onCancel
        }, "Cancel"))), /*#__PURE__*/React.createElement("div", {
          className: "col-sm-6",
          style: {
            paddingTop: '1rem'
          }
        }, getStatusMessage(_objectSpread({}, this.props.requests.updateNotification, {
          editing: editing
        })), getStatusMessage(_objectSpread({}, this.props.requests.getQuery, {
          editing: editing,
          noSuccess: true
        })), /*#__PURE__*/React.createElement("span", {
          className: "text-info"
        }, message)))) : /*#__PURE__*/React.createElement("div", {
          style: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between'
          }
        }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
          className: "h3",
          id: "create-new-general-title"
        }, "How to create a new general notification:"), /*#__PURE__*/React.createElement("ul", {
          className: "list-unstyled",
          "aria-labelledby": "create-new-general-title"
        }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "1."), " Perform a new search"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "2."), " While on results page, expand \"Create email notification\" menu"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "3."), " Add a name and frequency"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "4."), " Click \"Create\"")), /*#__PURE__*/React.createElement("span", {
          className: "text-primary"
        }, /*#__PURE__*/React.createElement("i", {
          className: "fa fa-bullhorn",
          "aria-hidden": "true"
        }), " Check out the Gif on the right for an example.", ' ', /*#__PURE__*/React.createElement("i", {
          className: "fa fa-arrow-right",
          "aria-hidden": "true"
        })), /*#__PURE__*/React.createElement("p", {
          style: {
            marginTop: '1em'
          }
        }, /*#__PURE__*/React.createElement("a", {
          href: "/",
          className: "btn btn-primary"
        }, "Start a new search"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
          src: "styles/img/myADS.gif",
          alt: "how to edit query on results page",
          style: {
            maxWidth: '800px'
          }
        }))));
      }
    }]);

    return GeneralForm;
  }(React.Component);

  return GeneralForm;
});
