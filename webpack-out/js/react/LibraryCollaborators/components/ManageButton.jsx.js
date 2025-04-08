function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

define(['react', 'prop-types', 'js/react/LibraryCollaborators/constants'], function (React, PropTypes, _ref) {
  var Permissions = _ref.Permissions;

  var ManageButton = function ManageButton(_ref2) {
    var _ref2$permission = _ref2.permission,
        permission = _ref2$permission === void 0 ? Permissions.READ : _ref2$permission,
        onChange = _ref2.onChange,
        otherProps = _objectWithoutProperties(_ref2, ["permission", "onChange"]);

    var handleChange = function handleChange(e) {
      onChange(Permissions[e.currentTarget.value.toUpperCase()]);
    };

    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "sr-only",
      id: "permission-selected"
    }, permission.label, " permission selected"), /*#__PURE__*/React.createElement("select", _extends({
      key: "select-".concat(permission.id),
      id: "manage-permission-".concat(permission.id),
      "aria-labelledby": "permission-selected",
      value: permission.id,
      onChange: handleChange
    }, otherProps, {
      className: "form-control"
    }), Object.values(Permissions).map(function (item) {
      return /*#__PURE__*/React.createElement("option", {
        key: "option-".concat(item.id),
        value: item.id,
        title: item.description
      }, item.label);
    })));
  };

  ManageButton.defaultProps = {
    permission: Permissions.READ,
    onChange: function onChange() {}
  };
  ManageButton.propTypes = {
    permission: PropTypes.object,
    onChange: PropTypes.func
  };
  return ManageButton;
});
