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

define(['react', 'react-bootstrap', 'js/react/MyAdsDashboard/components/ArxivClassList.jsx', 'prop-types'], function (React, _ref, ArxivClassList, PropTypes) {
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

  var ArxivForm = /*#__PURE__*/function (_React$Component) {
    _inherits(ArxivForm, _React$Component);

    function ArxivForm(props) {
      var _this;

      _classCallCheck(this, ArxivForm);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ArxivForm).call(this, props));
      var updatedState = {};
      var editingNotification = _this.props.editingNotification;

      if (editingNotification) {
        updatedState = {
          groups: editingNotification.classes,
          keywords: editingNotification.data,
          name: editingNotification.name,
          editing: true
        };
      }

      _this.state = _objectSpread({
        groups: [],
        keywords: '',
        name: '',
        message: null,
        editing: false,
        pending: false
      }, updatedState);
      _this.onClassSelection = _this.onClassSelection.bind(_assertThisInitialized(_this));
      return _this;
    } // eslint-disable-next-line camelcase


    _createClass(ArxivForm, [{
      key: "UNSAFE_componentWillReceiveProps",
      value: function UNSAFE_componentWillReceiveProps(next) {
        var addStatus = next.addNotificationRequest.status;
        var updateStatus = next.updateNotificationRequest.status;
        var onSuccess = this.props.onSuccess; // fires success handler if our request was successful

        if (addStatus === 'success' || updateStatus === 'success') {
          setTimeout(function () {
            return onSuccess();
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
      key: "onClassSelection",
      value: function onClassSelection(groups) {
        this.setState({
          groups: groups
        });
      }
    }, {
      key: "onSubmit",
      value: function onSubmit(e) {
        e.preventDefault();
        var _this$state = this.state,
            keywords = _this$state.keywords,
            groups = _this$state.groups,
            name = _this$state.name,
            pending = _this$state.pending,
            editing = _this$state.editing;
        var _this$props = this.props,
            updateNotification = _this$props.updateNotification,
            editingNotification = _this$props.editingNotification,
            addNotification = _this$props.addNotification;

        if (pending) {
          return;
        }

        if (groups.length <= 0) {
          this.showMessage('must select at least one group');
        } else {
          var payload = {
            data: keywords,
            classes: groups,
            name: name
          };

          if (editing) {
            updateNotification(_objectSpread({}, editingNotification, payload));
          } else {
            addNotification(payload);
          }
        }
      }
    }, {
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
      key: "render",
      value: function render() {
        var _this3 = this;

        var _this$state2 = this.state,
            editing = _this$state2.editing,
            keywords = _this$state2.keywords,
            name = _this$state2.name,
            groups = _this$state2.groups,
            message = _this$state2.message;
        var _this$props2 = this.props,
            onCancel = _this$props2.onCancel,
            updateNotificationRequest = _this$props2.updateNotificationRequest,
            addNotificationRequest = _this$props2.addNotificationRequest;
        return /*#__PURE__*/React.createElement(Form, {
          onSubmit: function onSubmit(e) {
            return _this3.onSubmit(e);
          }
        }, editing && /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(ControlLabel, null, "Name"), /*#__PURE__*/React.createElement(FormControl, {
          type: "text",
          bsSize: "large",
          value: name,
          onChange: function onChange(e) {
            return _this3.setState({
              name: e.target.value
            });
          }
        }), /*#__PURE__*/React.createElement(FormControl.Feedback, null), /*#__PURE__*/React.createElement(HelpBlock, null, "Set the name for this notification")), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(ControlLabel, null, "Keywords (optional)"), /*#__PURE__*/React.createElement(HelpBlock, null, "Used to rank papers from selected arXiv categories (below)"), /*#__PURE__*/React.createElement(FormControl, {
          bsSize: "large",
          type: "text",
          value: keywords,
          placeholder: "star OR planet",
          onChange: function onChange(e) {
            return _this3.setState({
              keywords: e.target.value
            });
          }
        }), /*#__PURE__*/React.createElement(FormControl.Feedback, null), /*#__PURE__*/React.createElement(HelpBlock, null, "Boolean \"AND\" is assumed, but can be overriden by using explicit logical operators between keywords")), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(ControlLabel, null, "arXiv categories", ' ', /*#__PURE__*/React.createElement("span", {
          className: "text-danger",
          "aria-hidden": "true"
        }, "*"), ' ', /*#__PURE__*/React.createElement("span", {
          className: "text-muted"
        }, "(must choose at least one)"), /*#__PURE__*/React.createElement("span", {
          className: "help-block",
          style: {
            fontWeight: 'normal'
          }
        }, "Notification will include all papers from selected categories")), /*#__PURE__*/React.createElement(ArxivClassList, {
          onSelection: this.onClassSelection,
          initialSelected: groups
        }), /*#__PURE__*/React.createElement(HelpBlock, null, "Select the groups to query")), /*#__PURE__*/React.createElement("div", {
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
        }, editing ? 'Save notification' : 'Create notification'), /*#__PURE__*/React.createElement("button", {
          type: "button",
          className: "btn btn-default",
          onClick: onCancel
        }, "Cancel"))), /*#__PURE__*/React.createElement("div", {
          className: "col-sm-7 col-sm-offset-1",
          style: {
            paddingTop: '1rem'
          }
        }, getStatusMessage(_objectSpread({}, editing ? updateNotificationRequest : addNotificationRequest, {
          editing: editing
        })), /*#__PURE__*/React.createElement("span", {
          className: "text-info"
        }, message))));
      }
    }]);

    return ArxivForm;
  }(React.Component);

  ArxivForm.defaultProps = {
    addNotification: function addNotification() {},
    addNotificationRequest: PropTypes.shape({
      status: null,
      result: null,
      error: null
    }),
    editingNotification: function editingNotification() {},
    onCancel: function onCancel() {},
    onSuccess: function onSuccess() {},
    updateNotification: function updateNotification() {},
    updateNotificationRequest: PropTypes.shape({
      status: null,
      result: null,
      error: null
    })
  };
  ArxivForm.propTypes = {
    addNotification: PropTypes.func,
    addNotificationRequest: PropTypes.shape({
      status: PropTypes.string,
      result: PropTypes.string,
      error: PropTypes.string
    }),
    editingNotification: PropTypes.func,
    onCancel: PropTypes.func,
    onSuccess: PropTypes.func,
    updateNotification: PropTypes.func,
    updateNotificationRequest: PropTypes.shape({
      status: PropTypes.string,
      result: PropTypes.string,
      error: PropTypes.string
    })
  };
  return ArxivForm;
});
