function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

define(['react', 'prop-types', 'react-bootstrap', 'js/react/LibraryCollaborators/components/PermissionEntry.jsx'], function (React, PropTypes, _ref, PermissionEntry) {
  var Table = _ref.Table;
  var initialState = {};

  var PermissionList = /*#__PURE__*/function (_React$Component) {
    _inherits(PermissionList, _React$Component);

    function PermissionList(props) {
      var _this;

      _classCallCheck(this, PermissionList);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(PermissionList).call(this, props));
      _this.state = initialState;
      return _this;
    }

    _createClass(PermissionList, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        return /*#__PURE__*/React.createElement(Table, {
          striped: true,
          hover: true
        }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Email"), /*#__PURE__*/React.createElement("th", {
          id: "table-title-permission"
        }, "Permission"), /*#__PURE__*/React.createElement("th", null, /*#__PURE__*/React.createElement("span", {
          className: "sr-only"
        }, "Revoke Access ")))), /*#__PURE__*/React.createElement("tbody", null, Object.keys(this.props.permissions).map(function (id) {
          return /*#__PURE__*/React.createElement(PermissionEntry, {
            data: _this2.props.permissions[id],
            key: id,
            onRevokeAccess: function onRevokeAccess() {
              return _this2.props.onRevokeAccess(id);
            },
            onChangePermission: function onChangePermission(change) {
              return _this2.props.onChangePermission(id, change);
            },
            pendingPermissionChange: true
          });
        })));
      }
    }]);

    return PermissionList;
  }(React.Component);

  PermissionList.defaultProps = {
    permissions: {},
    onRevokeAccess: function onRevokeAccess() {},
    onChangePermission: function onChangePermission() {}
  };
  PermissionList.propTypes = {
    permissions: PropTypes.object,
    onRevokeAccess: PropTypes.func,
    onChangePermission: PropTypes.func
  };
  return PermissionList;
});
