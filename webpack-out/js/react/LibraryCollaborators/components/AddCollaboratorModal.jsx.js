function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

define(['react', 'prop-types', 'react-bootstrap', 'js/react/LibraryCollaborators/constants', 'js/react/LibraryCollaborators/components/ManageButton.jsx'], function (React, PropTypes, _ref, _ref2, ManageButton) {
  var Modal = _ref.Modal,
      Button = _ref.Button,
      FormControl = _ref.FormControl,
      ControlLabel = _ref.ControlLabel,
      FormGroup = _ref.FormGroup;
  var Permissions = _ref2.Permissions;
  var initialState = {
    permission: Permissions.READ,
    email: ''
  };

  var AddCollaboratorModal = /*#__PURE__*/function (_React$Component) {
    _inherits(AddCollaboratorModal, _React$Component);

    function AddCollaboratorModal(props) {
      var _this;

      _classCallCheck(this, AddCollaboratorModal);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(AddCollaboratorModal).call(this, props));
      _this.state = initialState;
      _this.onSubmit = _this.onSubmit.bind(_assertThisInitialized(_this));
      _this.onManagePermissions = _this.onManagePermissions.bind(_assertThisInitialized(_this));
      _this.onChangeEmail = _this.onChangeEmail.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(AddCollaboratorModal, [{
      key: "onSubmit",
      value: function onSubmit(e) {
        e.preventDefault();
        var _this$state = this.state,
            email = _this$state.email,
            permission = _this$state.permission;
        this.props.onSubmit({
          email: email,
          permission: permission
        });
        this.reset();
      }
    }, {
      key: "onManagePermissions",
      value: function onManagePermissions(permission) {
        this.setState({
          permission: permission
        });
      }
    }, {
      key: "onChangeEmail",
      value: function onChangeEmail(e) {
        this.setState({
          email: e.target.value.trim()
        });
      }
    }, {
      key: "reset",
      value: function reset() {
        this.setState(initialState);
      }
    }, {
      key: "render",
      value: function render() {
        return /*#__PURE__*/React.createElement(Modal, {
          show: this.props.show,
          onHide: this.props.onHide,
          "aria-labelledby": "add-collaborator__title"
        }, /*#__PURE__*/React.createElement(Modal.Header, null, /*#__PURE__*/React.createElement(Modal.Title, {
          id: "collaborator__title"
        }, "Add New Collaborator")), /*#__PURE__*/React.createElement("form", {
          onSubmit: this.onSubmit
        }, /*#__PURE__*/React.createElement(Modal.Body, null, /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(ControlLabel, {
          htmlFor: "manage-permission-".concat(this.state.permission.id)
        }, "Permission"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ManageButton, {
          onChange: this.onManagePermissions,
          permission: this.state.permission
        }))), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(ControlLabel, {
          htmlFor: "new_collab_email"
        }, "Email"), /*#__PURE__*/React.createElement(FormControl, {
          type: "email",
          id: "new_collab_email",
          value: this.state.email,
          onChange: this.onChangeEmail,
          placeholder: "collaborator@example.com",
          required: true
        })), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(FormControl.Static, null, /*#__PURE__*/React.createElement("strong", null, "* This user will be notified via email provided")))), /*#__PURE__*/React.createElement(Modal.Footer, null, /*#__PURE__*/React.createElement(Button, {
          onClick: this.props.onHide
        }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
          bsStyle: "success",
          type: "submit"
        }, "Add Collaborator"))));
      }
    }]);

    return AddCollaboratorModal;
  }(React.Component);

  AddCollaboratorModal.defaultProps = {
    onSubmit: function onSubmit() {},
    show: false,
    onHide: function onHide() {}
  };
  AddCollaboratorModal.propTypes = {
    onSubmit: PropTypes.func,
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired
  };
  return AddCollaboratorModal;
});
