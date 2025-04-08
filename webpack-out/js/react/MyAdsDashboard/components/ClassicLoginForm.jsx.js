function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

define(['react', 'react-bootstrap'], function (React, _ref) {
  var Form = _ref.Form,
      FormGroup = _ref.FormGroup,
      FormControl = _ref.FormControl,
      ControlLabel = _ref.ControlLabel,
      HelpBlock = _ref.HelpBlock,
      Button = _ref.Button,
      Alert = _ref.Alert;

  var loginStatusMessage = function loginStatusMessage(_ref2) {
    var status = _ref2.status,
        error = _ref2.error;

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
        }, error ? error : 'Login failed, try changing the mirror site.');

      case 'success':
        return /*#__PURE__*/React.createElement("span", {
          className: "text-success"
        }, "Login Successful!");
    }
  };

  var initialState = {
    email: '',
    password: '',
    mirror: '',
    mirrors: [],
    mirrorsFail: false,
    loginSuccessful: false,
    message: null,
    showCancel: false
  };

  var ClassicLoginForm = /*#__PURE__*/function (_React$Component) {
    _inherits(ClassicLoginForm, _React$Component);

    function ClassicLoginForm(props) {
      var _this;

      _classCallCheck(this, ClassicLoginForm);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ClassicLoginForm).call(this, props));
      _this.state = initialState;
      _this.onSubmit = _this.onSubmit.bind(_assertThisInitialized(_this));
      _this.onChangeUser = _this.onChangeUser.bind(_assertThisInitialized(_this));
      _this.onCancel = _this.onCancel.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(ClassicLoginForm, [{
      key: "onChange",
      value: function onChange(prop) {
        var _this2 = this;

        return function (e) {
          _this2.setState(_defineProperty({}, prop, e.target.value));
        };
      }
    }, {
      key: "showMessage",
      value: function showMessage(message, timing) {
        var _this3 = this;

        this.setState({
          message: message
        }, function () {
          if (timing) {
            setTimeout(function () {
              return _this3.setState({
                message: null
              });
            }, timing);
          }
        });
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.props.loginClassicCheck();
        this.props.fetchClassicMirrors();
      }
    }, {
      key: "onChangeUser",
      value: function onChangeUser(e) {
        e.preventDefault();
        this.setState({
          loginSuccessful: null,
          showCancel: true
        });
        this.props.onChangeUser();
      }
    }, {
      key: "onCancel",
      value: function onCancel(e) {
        e.preventDefault();
        this.setState({
          loginSuccessful: true,
          showCancel: false
        });
        this.props.onLogin();
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(next) {
        if (this.props.classicMirrorsRequest.status !== next.classicMirrorsRequest.status && next.classicMirrorsRequest.status === 'success') {
          this.setState({
            mirrors: next.classicMirrorsRequest.result,
            mirror: 'adsabs.harvard.edu'
          });
        } else if (this.props.classicMirrorsRequest.status !== next.classicMirrorsRequest.status && next.classicMirrorsRequest.status === 'failure') {
          this.setState({
            mirrorsFail: true
          });
        }

        if (this.props.loginClassicCheckRequest.status !== next.loginClassicCheckRequest.status && next.loginClassicCheckRequest.status === 'success') {
          var _next$loginClassicChe = next.loginClassicCheckRequest.result,
              classic_email = _next$loginClassicChe.classic_email,
              classic_mirror = _next$loginClassicChe.classic_mirror;
          this.setState({
            loginSuccessful: true,
            email: classic_email,
            mirror: classic_mirror
          });
          next.onLogin();
        }

        if (this.props.loginClassicRequest.status !== next.loginClassicRequest.status && next.loginClassicRequest.status === 'success') {
          this.setState({
            loginSuccessful: true
          });
          next.onLogin();
        }
      }
    }, {
      key: "onSubmit",
      value: function onSubmit(e) {
        e.preventDefault();
        this.props.loginClassic({
          classic_email: this.state.email,
          classic_mirror: this.state.mirror,
          classic_password: this.state.password
        });
      }
    }, {
      key: "render",
      value: function render() {
        if (this.props.loginClassicCheckRequest.status === 'pending') {
          return /*#__PURE__*/React.createElement("div", null, "loading...");
        } else if (this.state.loginSuccessful) {
          return /*#__PURE__*/React.createElement("div", null, "logged in as ", /*#__PURE__*/React.createElement("strong", null, this.state.email), " on the", ' ', /*#__PURE__*/React.createElement("strong", null, this.state.mirror), " mirror site.", ' ', /*#__PURE__*/React.createElement("a", {
            href: "javascript:void(0);",
            title: "Change user",
            onClick: this.onChangeUser
          }, "Change user?"));
        }

        return /*#__PURE__*/React.createElement(Form, {
          onSubmit: this.onSubmit
        }, /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(ControlLabel, null, "Email Address"), /*#__PURE__*/React.createElement(FormControl, {
          type: "email",
          bsSize: "large",
          value: this.state.email,
          onChange: this.onChange('email')
        }), /*#__PURE__*/React.createElement(FormControl.Feedback, null), /*#__PURE__*/React.createElement(HelpBlock, null, "Enter your ADS classic email address")), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(ControlLabel, null, "Password"), /*#__PURE__*/React.createElement(FormControl, {
          type: "password",
          bsSize: "large",
          value: this.state.password,
          onChange: this.onChange('password')
        }), /*#__PURE__*/React.createElement(FormControl.Feedback, null), /*#__PURE__*/React.createElement(HelpBlock, null, "Enter classic password")), this.state.mirrorsFail ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(ControlLabel, null, "ADS Classic Mirror Site"), /*#__PURE__*/React.createElement(FormControl, {
          type: "text",
          bsSize: "large",
          value: this.state.mirror,
          onChange: this.onChange('mirror')
        }), /*#__PURE__*/React.createElement(FormControl.Feedback, null), /*#__PURE__*/React.createElement(HelpBlock, null, "Enter your ADS classic mirror site")), /*#__PURE__*/React.createElement(Alert, {
          bsStyle: "warning"
        }, "There was a problem loading classic mirror sites. Please enter the mirror site directly.")) : /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(ControlLabel, null, "ADS Classic Mirror Site"), /*#__PURE__*/React.createElement(FormControl, {
          componentClass: "select",
          bsSize: "large",
          value: this.state.mirror,
          onChange: this.onChange('mirror')
        }, this.state.mirrors.map(function (m) {
          return /*#__PURE__*/React.createElement("option", {
            value: m
          }, m);
        })), /*#__PURE__*/React.createElement(FormControl.Feedback, null), /*#__PURE__*/React.createElement(HelpBlock, null, "Select a mirror site to use")), /*#__PURE__*/React.createElement("div", {
          className: "row",
          style: {
            borderTop: 'solid 1px #d9d9d9',
            paddingTop: '1rem'
          }
        }, /*#__PURE__*/React.createElement("div", {
          className: "col-sm-4"
        }, /*#__PURE__*/React.createElement("div", {
          className: "btn-toolbar"
        }, /*#__PURE__*/React.createElement(Button, {
          type: "submit",
          bsStyle: "primary",
          bsSize: "large"
        }, "Login"), this.state.showCancel && /*#__PURE__*/React.createElement(Button, {
          bsSize: "large",
          bsStyle: "default",
          onClick: this.onCancel
        }, "Cancel"))), /*#__PURE__*/React.createElement("div", {
          className: "col-sm-4 text-center",
          style: {
            paddingTop: '1rem'
          }
        }, loginStatusMessage(this.props.loginClassicRequest))));
      }
    }]);

    return ClassicLoginForm;
  }(React.Component);

  ClassicLoginForm.defaultProps = {
    classicMirrorsRequest: {},
    loginClassicRequest: {},
    loginClassicCheckRequest: {},
    fetchClassicMirrors: function fetchClassicMirrors() {},
    loginClassic: function loginClassic() {},
    loginClassicCheck: function loginClassicCheck() {},
    onSubmit: function onSubmit() {},
    onLogin: function onLogin() {},
    onChangeUser: function onChangeUser() {}
  };
  return ClassicLoginForm;
});
