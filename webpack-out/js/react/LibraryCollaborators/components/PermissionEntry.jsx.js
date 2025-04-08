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
  var Button = _ref.Button,
      Modal = _ref.Modal;
  var Permissions = _ref2.Permissions;

  var ConfirmModal = function ConfirmModal(_ref3) {
    var show = _ref3.show,
        onHide = _ref3.onHide,
        onOk = _ref3.onOk,
        children = _ref3.children;
    return /*#__PURE__*/React.createElement(Modal, {
      show: show,
      onHide: onHide,
      "aria-labelledby": "revoke-access-confirm__title"
    }, /*#__PURE__*/React.createElement(Modal.Header, null, /*#__PURE__*/React.createElement(Modal.Title, {
      id: "revoke-access-confirm__title"
    }, "Confirm Revoke Access")), /*#__PURE__*/React.createElement(Modal.Body, null, children), /*#__PURE__*/React.createElement(Modal.Footer, null, /*#__PURE__*/React.createElement(Button, {
      bsSize: "lg",
      onClick: onHide
    }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
      bsSize: "lg",
      bsStyle: "danger",
      onClick: onOk
    }, "Revoke Access")));
  };

  var initialState = {
    showConfirmRevokeModal: false,
    email: '',
    permission: Permissions.ADMIN
  };

  var PermissionEntry = /*#__PURE__*/function (_React$Component) {
    _inherits(PermissionEntry, _React$Component);

    function PermissionEntry(props) {
      var _this;

      _classCallCheck(this, PermissionEntry);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(PermissionEntry).call(this, props));
      var _props$data = props.data,
          email = _props$data.email,
          permission = _props$data.permission;
      _this.state = {
        initialState: initialState,
        email: email,
        permission: permission
      };
      _this.onManagePermissions = _this.onManagePermissions.bind(_assertThisInitialized(_this));
      _this.openConfirmRevocationModal = _this.openConfirmRevocationModal.bind(_assertThisInitialized(_this));
      _this.closeConfirmRevocationModal = _this.closeConfirmRevocationModal.bind(_assertThisInitialized(_this));
      _this.doRevocation = _this.doRevocation.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(PermissionEntry, [{
      key: "onManagePermissions",
      value: function onManagePermissions(permission) {
        this.setState({
          permission: permission
        });
        this.props.onChangePermission(permission);
      }
    }, {
      key: "openConfirmRevocationModal",
      value: function openConfirmRevocationModal() {
        this.setState({
          showConfirmRevokeModal: true
        });
      }
    }, {
      key: "doRevocation",
      value: function doRevocation() {
        this.setState({
          showConfirmRevokeModal: false
        });
        this.props.onRevokeAccess();
      }
    }, {
      key: "closeConfirmRevocationModal",
      value: function closeConfirmRevocationModal() {
        this.setState({
          showConfirmRevokeModal: false
        });
      }
    }, {
      key: "render",
      value: function render() {
        return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
          className: "fa fa-user-circle-o",
          "aria-hidden": "true"
        }), ' ', this.state.email)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(ManageButton, {
          permission: this.state.permission,
          onChange: this.onManagePermissions
        })), /*#__PURE__*/React.createElement("td", {
          style: {
            display: 'grid',
            justifyContent: 'end'
          }
        }, /*#__PURE__*/React.createElement(Button, {
          bsStyle: "danger",
          bsSize: "sm",
          onClick: this.openConfirmRevocationModal
        }, "Revoke Access", ' ', /*#__PURE__*/React.createElement("span", {
          className: "sr-only"
        }, "for ", this.state.email))), /*#__PURE__*/React.createElement(ConfirmModal, {
          show: this.state.showConfirmRevokeModal,
          onHide: this.closeConfirmRevocationModal,
          onOk: this.doRevocation
        }, /*#__PURE__*/React.createElement("p", null, "This will revoke all permissions for", ' ', /*#__PURE__*/React.createElement("strong", null, this.state.email), "."), /*#__PURE__*/React.createElement("p", null, "Are you sure?")));
      }
    }]);

    return PermissionEntry;
  }(React.Component);

  PermissionEntry.defaultProps = {
    data: null,
    onRevokeAccess: function onRevokeAccess() {},
    onChangePermission: function onChangePermission() {},
    pendingPermissionChange: false,
    isNew: false
  };
  PermissionEntry.propTypes = {
    data: PropTypes.object.isRequired,
    onRevokeAccess: PropTypes.func,
    onChangePermission: PropTypes.func,
    pendingPermissionChange: PropTypes.bool,
    isNew: PropTypes.bool
  };
  return PermissionEntry;
});
