function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

define(['react', 'react-bootstrap', 'js/react/LibraryCollaborators/components/AddCollaboratorModal.jsx', 'js/react/LibraryCollaborators/components/PermissionList.jsx', 'prop-types'], function (React, _ref, AddCollaboratorModal, PermissionList, PropTypes) {
  var Button = _ref.Button,
      Alert = _ref.Alert;

  var renderAlerts = function renderAlerts(_ref2) {
    var add = _ref2.add,
        get = _ref2.get,
        edit = _ref2.edit;

    if (edit.status === 'pending' || add.status === 'pending' || get.status === 'pending') {
      return /*#__PURE__*/React.createElement("div", {
        className: "row text-center"
      }, /*#__PURE__*/React.createElement(Alert, {
        bsStyle: "info"
      }, /*#__PURE__*/React.createElement("strong", null, /*#__PURE__*/React.createElement("i", {
        className: "fa fa-spinner fa-spin",
        "aria-hidden": "true"
      })), ' ', edit.status ? 'Updating permissions, one moment...' : add.status ? 'Creating new collaborator, one moment...' : get.status ? 'Loading...' : ''));
    } else if (edit.status === 'failure' || add.status === 'failure' || get.status === 'failure') {
      return /*#__PURE__*/React.createElement("div", {
        className: "row text-center"
      }, /*#__PURE__*/React.createElement(Alert, {
        bsStyle: "danger"
      }, /*#__PURE__*/React.createElement("strong", null, /*#__PURE__*/React.createElement("i", {
        className: "fa fa-exclamation-triangle",
        "aria-hidden": "true"
      })), ' ', edit.error ? "Unable to update permission (".concat(edit.error, ")") : add.error ? "Unable to add collaborator (".concat(add.error, ")") : get.error ? "Unable to retrieve collaborators (".concat(get.error, ")") : 'Something went wrong with the request'));
    } else if (edit.status === 'success' || add.status === 'success') {
      return /*#__PURE__*/React.createElement("div", {
        className: "row text-center"
      }, /*#__PURE__*/React.createElement(Alert, {
        bsStyle: "success"
      }, /*#__PURE__*/React.createElement("strong", null, /*#__PURE__*/React.createElement("i", {
        className: "fa fa-check",
        "aria-hidden": "true"
      })), ' ', edit.status ? 'Permission updated!' : add.status ? 'Collaborator added!' : ''));
    }
  };

  var initialState = {
    showAddCollaboratorModal: false
  };

  var Dashboard = /*#__PURE__*/function (_React$Component) {
    _inherits(Dashboard, _React$Component);

    function Dashboard(props) {
      var _this;

      _classCallCheck(this, Dashboard);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Dashboard).call(this, props));
      _this.state = initialState;
      _this.onRevokeAccess = _this.onRevokeAccess.bind(_assertThisInitialized(_this));
      _this.onChangePermission = _this.onChangePermission.bind(_assertThisInitialized(_this));
      _this.onAddCollaborator = _this.onAddCollaborator.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(Dashboard, [{
      key: "onRevokeAccess",
      value: function onRevokeAccess(id) {
        var email = this.props.permissions[id].email;
        this.props.editCollaborator({
          id: this.props.library.id,
          email: email,
          permission: null
        });
      }
    }, {
      key: "onChangePermission",
      value: function onChangePermission(id, permission) {
        var email = this.props.permissions[id].email;
        this.props.editCollaborator({
          id: this.props.library.id,
          email: email,
          permission: permission
        });
      }
    }, {
      key: "onAddCollaborator",
      value: function onAddCollaborator(_ref3) {
        var email = _ref3.email,
            permission = _ref3.permission;
        this.setState({
          showAddCollaboratorModal: false,
          pendingAddCollaborator: true
        });
        this.props.addCollaborator({
          id: this.props.library.id,
          email: email,
          permission: permission
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$props = this.props,
            permissions = _this$props.permissions,
            requests = _this$props.requests;
        var showAddCollaboratorModal = this.state.showAddCollaboratorModal;
        return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
          className: "row"
        }, /*#__PURE__*/React.createElement("h3", {
          className: "h3"
        }, "Collaborators")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
          className: "row"
        }, /*#__PURE__*/React.createElement(Button, {
          onClick: function onClick() {
            return _this2.setState({
              showAddCollaboratorModal: true
            });
          }
        }, /*#__PURE__*/React.createElement("i", {
          className: "fa fa-user-plus fa-fw",
          "aria-hidden": "true"
        }), " Add Collaborator")), Object.keys(permissions).length ? /*#__PURE__*/React.createElement("div", {
          className: "row"
        }, /*#__PURE__*/React.createElement(PermissionList, {
          permissions: permissions,
          onRevokeAccess: this.onRevokeAccess,
          onChangePermission: this.onChangePermission
        })) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", {
          className: "row text-center"
        }, "You have no collaborators, yet. Please add one above")), renderAlerts(requests), /*#__PURE__*/React.createElement(AddCollaboratorModal, {
          show: showAddCollaboratorModal,
          onHide: function onHide() {
            return _this2.setState({
              showAddCollaboratorModal: false
            });
          },
          onSubmit: this.onAddCollaborator
        })));
      }
    }]);

    return Dashboard;
  }(React.Component);

  Dashboard.defaultProps = {
    permissions: {},
    addCollaborator: function addCollaborator() {},
    changePermission: function changePermission() {},
    revokeAccess: function revokeAccess() {}
  };
  Dashboard.propTypes = {
    permissions: PropTypes.object,
    addCollaborator: PropTypes.func,
    changePermission: PropTypes.func,
    revokeAccess: PropTypes.func,
    requests: PropTypes.object
  };
  return Dashboard;
});
