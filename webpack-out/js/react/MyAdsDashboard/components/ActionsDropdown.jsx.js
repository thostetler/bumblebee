/* eslint-disable no-script-url */
define(['react', 'react-bootstrap', 'react-aria-menubutton', 'prop-types'], function (React, _ref, _ref2, PropTypes) {
  var Label = _ref.Label;
  var Button = _ref2.Button,
      Wrapper = _ref2.Wrapper,
      Menu = _ref2.Menu,
      MenuItem = _ref2.MenuItem;

  var renderRunButtons = function renderRunButtons(item) {
    var labels = [];

    if (item.type === 'template') {
      if (item.template === 'arxiv') {
        if (item.data === null) {
          labels = ['Search'];
        } else {
          labels = ['Keyword Matches - Recent Papers', 'Other Recent Papers in Selected Categories'];
        }
      } else if (item.template === 'keyword' && item.data !== null) {
        labels = ['Recent Papers', 'Most Popular', 'Most Cited'];
      } else {
        labels = ['Search'];
      }
    } else {
      labels = ['Search'];
    }

    return labels.map(function (label, i) {
      return /*#__PURE__*/React.createElement(MenuItem, {
        key: label,
        text: label,
        value: {
          type: 'runquery',
          queryKey: i
        },
        className: "menuitem"
      }, /*#__PURE__*/React.createElement("i", {
        className: "fa fa-search fa-fw",
        "aria-hidden": "true"
      }), " ", label);
    });
  };

  var ActionsDropdown = function ActionsDropdown(_ref3) {
    var onToggleActive = _ref3.onToggleActive,
        onRunQuery = _ref3.onRunQuery,
        onEdit = _ref3.onEdit,
        onDelete = _ref3.onDelete,
        item = _ref3.item,
        disable = _ref3.disable,
        dropup = _ref3.dropup;
    // is a general notification, disallow editing
    var allowEdit = item.type !== 'query';

    var handleSelection = function handleSelection(_ref4) {
      var type = _ref4.type,
          queryKey = _ref4.queryKey;

      switch (type) {
        case 'toggleactive':
          return onToggleActive(item);

        case 'edit':
          return onEdit(item);

        case 'delete':
          return onDelete(item);

        case 'runquery':
          return onRunQuery(item, queryKey);

        default:
      }
    };

    return /*#__PURE__*/React.createElement(Wrapper, {
      onSelection: handleSelection,
      className: "react-aria-menubutton__wrapper"
    }, /*#__PURE__*/React.createElement(Button, {
      className: "btn btn-default ".concat(disable ? 'disabled' : ''),
      disabled: disable
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-cog",
      "aria-hidden": "true"
    }), " Actions", ' ', /*#__PURE__*/React.createElement("i", {
      className: "fa fa-caret-down",
      "aria-hidden": "true"
    })), /*#__PURE__*/React.createElement(Menu, null, /*#__PURE__*/React.createElement("ul", {
      className: "react-aria-menubutton__menu"
    }, /*#__PURE__*/React.createElement("span", {
      key: "query-header",
      "aria-hidden": "true",
      className: "menuitem__label"
    }, "View in search results page"), renderRunButtons(item), /*#__PURE__*/React.createElement("hr", {
      key: "divider"
    }), /*#__PURE__*/React.createElement("span", {
      key: "actions-header",
      "aria-hidden": "true",
      className: "menuitem__label"
    }, "Actions"), /*#__PURE__*/React.createElement(MenuItem, {
      key: "toggler",
      text: "toggle",
      className: "menuitem",
      value: {
        type: 'toggleactive'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-group"
    }, /*#__PURE__*/React.createElement(Label, {
      bsStyle: item.active ? 'success' : 'default'
    }, "ENABLED"), /*#__PURE__*/React.createElement(Label, {
      bsStyle: item.active ? 'default' : 'danger'
    }, "DISABLED"))), allowEdit && /*#__PURE__*/React.createElement(MenuItem, {
      key: "edit",
      text: "edit",
      className: "menuitem",
      value: {
        type: 'edit'
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-pencil fa-fw",
      "aria-hidden": "true"
    }), " Edit"), /*#__PURE__*/React.createElement(MenuItem, {
      key: "delete",
      text: "delete",
      className: "menuitem",
      value: {
        type: 'delete'
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-trash fa-fw",
      "aria-hidden": "true"
    }), " Delete"))));
  };

  ActionsDropdown.defaultProps = {
    disable: false,
    dropup: false,
    onDelete: function onDelete() {},
    onEdit: function onEdit() {},
    onRunQuery: function onRunQuery() {},
    onToggleActive: function onToggleActive() {}
  };
  ActionsDropdown.propTypes = {
    disable: PropTypes.bool,
    item: PropTypes.shape({
      active: PropTypes.bool,
      id: PropTypes.number,
      type: PropTypes.string
    }).isRequired,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    onRunQuery: PropTypes.func,
    onToggleActive: PropTypes.func,
    dropup: PropTypes.bool
  };
  return ActionsDropdown;
});
