function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// @ts-nocheck
define(['underscore', 'react', 'react-bootstrap', 'js/react/MyAdsDashboard/containers/ClassicLoginForm', 'prop-types'], function (_ref, React, _ref2, ClassicLoginForm, PropTypes) {
  var debounce = _ref.debounce;
  var Form = _ref2.Form,
      FormGroup = _ref2.FormGroup,
      FormControl = _ref2.FormControl,
      ControlLabel = _ref2.ControlLabel,
      HelpBlock = _ref2.HelpBlock,
      Button = _ref2.Button,
      Alert = _ref2.Alert,
      Modal = _ref2.Modal;

  var getStatusMessage = function getStatusMessage(_ref3) {
    var status = _ref3.status,
        error = _ref3.error;

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
        }, error ? error : 'Unable to import');
    }
  };

  var initialState = {
    isLoggedIn: false,
    showModal: false,
    new: 0,
    existing: 0
  };

  var ImportNotificationsForm = /*#__PURE__*/function (_React$Component) {
    _inherits(ImportNotificationsForm, _React$Component);

    function ImportNotificationsForm(props) {
      var _this;

      _classCallCheck(this, ImportNotificationsForm);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ImportNotificationsForm).call(this, props));
      _this.state = initialState;
      _this.onSubmit = _this.onSubmit.bind(_assertThisInitialized(_this));
      _this.onLogin = _this.onLogin.bind(_assertThisInitialized(_this));
      _this.onHide = _this.onHide.bind(_assertThisInitialized(_this));
      _this.onChangeUser = _this.onChangeUser.bind(_assertThisInitialized(_this));
      _this.beginImport = debounce(_this.beginImport, 1000);
      return _this;
    }

    _createClass(ImportNotificationsForm, [{
      key: "onSubmit",
      value: function onSubmit(e) {
        e.preventDefault();
        this.beginImport();
      }
    }, {
      key: "beginImport",
      value: function beginImport() {
        this.props.importClassic();
      }
    }, {
      key: "onLogin",
      value: function onLogin() {
        this.setState({
          isLoggedIn: true
        });
      }
    }, {
      key: "onChangeUser",
      value: function onChangeUser() {
        this.setState({
          isLoggedIn: false
        });
      }
    }, {
      key: "onHide",
      value: function onHide() {
        this.setState({
          showModal: false
        });
        this.props.onSuccess();
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(next) {
        if (this.props.importClassicRequest.status !== next.importClassicRequest.status && next.importClassicRequest.status === 'success') {
          this.setState({
            showModal: true,
            new: next.importClassicRequest.result.new.length,
            existing: next.importClassicRequest.result.existing.length
          });
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        return /*#__PURE__*/React.createElement("div", {
          style: {
            paddingTop: '1rem'
          }
        }, /*#__PURE__*/React.createElement(ClassicLoginForm, {
          onLogin: function onLogin() {
            return _this2.onLogin();
          },
          onChangeUser: this.onChangeUser
        }), this.state.isLoggedIn && /*#__PURE__*/React.createElement("div", {
          style: {
            marginTop: '2rem'
          }
        }, /*#__PURE__*/React.createElement(Form, {
          onSubmit: this.onSubmit
        }, /*#__PURE__*/React.createElement("div", {
          className: "row"
        }, /*#__PURE__*/React.createElement("div", {
          className: "col-sm-4"
        }, /*#__PURE__*/React.createElement(Button, {
          type: "submit",
          bsStyle: "primary",
          bsSize: "large"
        }, "Begin Import")), /*#__PURE__*/React.createElement("div", {
          className: "col-sm-4 text-center",
          style: {
            paddingTop: '1rem'
          }
        }, getStatusMessage(this.props.importClassicRequest))))), this.state.showModal && /*#__PURE__*/React.createElement(Modal.Dialog, {
          show: this.state.showModal,
          onHide: this.onHide
        }, /*#__PURE__*/React.createElement(Modal.Header, null, /*#__PURE__*/React.createElement(Modal.Title, null, "Import Successful")), /*#__PURE__*/React.createElement(Modal.Body, null, /*#__PURE__*/React.createElement("p", null, "We successfully imported ", /*#__PURE__*/React.createElement("strong", null, this.state.new), " new notification", this.state.new !== 1 ? 's' : ''), /*#__PURE__*/React.createElement("p", null, "and found ", /*#__PURE__*/React.createElement("strong", null, this.state.existing), " existing notification", this.state.existing !== 1 ? 's' : '')), /*#__PURE__*/React.createElement(Modal.Footer, null, /*#__PURE__*/React.createElement(Button, {
          bsStyle: "primary",
          onClick: this.onHide
        }, "Close"))));
      }
    }]);

    return ImportNotificationsForm;
  }(React.Component);

  ImportNotificationsForm.defaultProps = {
    onSuccess: function onSuccess() {},
    importClassic: function importClassic() {}
  };
  return ImportNotificationsForm;
});
