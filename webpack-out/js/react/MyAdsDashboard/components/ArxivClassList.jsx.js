function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable max-classes-per-file */
define(['underscore', 'react', 'react-bootstrap', 'js/react/MyAdsDashboard/models/arxivClasses'], function (_, React, _ref, ArxivClassesModel) {
  var Checkbox = _ref.Checkbox,
      ListGroup = _ref.ListGroup,
      ListGroupItem = _ref.ListGroupItem;
  var initialState = {
    groups: _objectSpread({}, ArxivClassesModel),
    all: false
  };
  /**
   *
   */

  var ArxivClassList = /*#__PURE__*/function (_React$Component) {
    _inherits(ArxivClassList, _React$Component);

    function ArxivClassList(props) {
      var _this;

      _classCallCheck(this, ArxivClassList);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ArxivClassList).call(this, props));
      _this.state = _objectSpread({}, initialState);
      _this.onSelect = _.debounce(_this._onSelect.bind(_assertThisInitialized(_this)), 100);

      _this.props.onSelection(_this._groupsToArray());

      if (_this.props.initialSelected && _this.props.initialSelected.length > 0) {
        try {
          _this.selectGroups(_this.props.initialSelected, true);
        } catch (e) {
          console.error(e);
        }
      }

      return _this;
    }

    _createClass(ArxivClassList, [{
      key: "_isIndeterminate",
      value: function _isIndeterminate(children) {
        // only return true if SOME of the children are selected, not all
        var keys = Object.keys(children);
        var selected = keys.filter(function (k) {
          return children[k].selected;
        });
        return selected.length > 0 && selected.length < keys.length;
      }
    }, {
      key: "_allSelected",
      value: function _allSelected(items) {
        return Object.keys(items).every(function (k) {
          return items[k].selected;
        });
      }
    }, {
      key: "_noneSelected",
      value: function _noneSelected(items) {
        return !Object.keys(items).some(function (k) {
          return items[k].selected;
        });
      }
    }, {
      key: "_groupsToArray",
      value: function _groupsToArray() {
        var _this2 = this;

        var arr = [];
        Object.keys(this.state.groups).forEach(function (parentKey) {
          var item = _this2.state.groups[parentKey]; // if it is selected, add it and move on

          if (item.selected) {
            arr = [].concat(_toConsumableArray(arr), [item.key]); // if it is indeterminate, then go into the children and grab them instead
          } else if (item.indeterminate) {
            arr = [].concat(_toConsumableArray(arr), _toConsumableArray(Object.keys(item.children).filter(function (k) {
              return item.children[k].selected;
            }).map(function (k) {
              return item.children[k].key;
            })));
          }
        });
        return arr;
      }
    }, {
      key: "selectGroups",
      value: function selectGroups(groups, value) {
        var _this3 = this;

        if (!groups || groups.length <= 0) {
          return;
        }

        var _groups = this.state.groups;
        var newGroups = groups.reduce(function (acc, key) {
          // checking parent keys
          if (acc[key]) {
            acc[key] = _objectSpread({}, acc[key], {
              selected: value,
              indeterminate: false,
              children: Object.keys(acc[key].children).reduce(function (a, k) {
                a[k] = _objectSpread({}, acc[key].children[k], {
                  selected: value
                });
                return a;
              }, {})
            });
          } else {
            // the key is a child, we need to find the entry
            Object.keys(acc).forEach(function (k) {
              if (acc[k].children && acc[k].children[key]) {
                var children = _objectSpread({}, acc[k].children, _defineProperty({}, key, _objectSpread({}, acc[k].children[key], {
                  selected: value
                })));

                acc[k] = _objectSpread({}, acc[k], {
                  indeterminate: _this3._isIndeterminate(children),
                  selected: _this3._allSelected(children),
                  children: children
                });
              }
            });
          }

          return acc;
        }, _objectSpread({}, _groups));
        setTimeout(function () {
          return _this3.setState({
            groups: newGroups
          }, function () {
            return _this3.props.onSelection(_this3._groupsToArray());
          });
        }, 0);
      }
    }, {
      key: "_onSelect",
      value: function _onSelect(key, value) {
        var _this4 = this;

        var valueDefined = typeof value !== 'undefined';
        var _groups = this.state.groups;

        if (_groups[key]) {
          var selected = valueDefined ? value : !_groups[key].selected;

          var newGroups = _objectSpread({}, _groups, _defineProperty({}, key, _objectSpread({}, _groups[key], {
            selected: selected,
            indeterminate: false,
            // if we are selecting the parent, then select all children too
            children: Object.keys(_groups[key].children).reduce(function (acc, k) {
              acc[k] = _objectSpread({}, _groups[key].children[k], {
                selected: selected
              });
              return acc;
            }, {})
          })));

          this.setState({
            groups: newGroups
          }, function () {
            _this4.props.onSelection(_this4._groupsToArray());
          });
        } else {
          var _newGroups = Object.keys(_groups).reduce(function (acc, k) {
            if (_groups[k].children && _groups[k].children[key]) {
              var _selected = valueDefined ? value : !_groups[k].children[key].selected;

              var children = _objectSpread({}, _groups[k].children, _defineProperty({}, key, _objectSpread({}, _groups[k].children[key], {
                selected: _selected
              })));

              acc[k] = _objectSpread({}, _groups[k], {
                indeterminate: _this4._isIndeterminate(children),
                selected: _this4._allSelected(children),
                children: children
              });
            } else {
              acc[k] = _objectSpread({}, _groups[k]);
            }

            return acc;
          }, {});

          this.setState({
            groups: _newGroups
          }, function () {
            return _this4.props.onSelection(_this4._groupsToArray());
          });
        }
      }
    }, {
      key: "onSelectAll",
      value: function onSelectAll() {
        var _this5 = this;

        var selectAll = !this.state.all;
        var groups = this.state.groups;
        this.setState({
          all: selectAll,
          groups: Object.keys(groups).reduce(function (acc, k) {
            acc[k] = _objectSpread({}, groups[k], {
              selected: selectAll,
              indeterminate: false,
              children: Object.keys(groups[k].children).map(function (childKey) {
                return _objectSpread({}, groups[k].children[childKey], {
                  selected: selectAll
                });
              })
            });
            return acc;
          }, {})
        }, function () {
          _this5.props.onSelection(_this5._groupsToArray());
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this6 = this;

        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ListGroup, null, Object.keys(this.state.groups).map(function (k) {
          return /*#__PURE__*/React.createElement(Item, {
            key: _this6.state.groups[k].key,
            item: _this6.state.groups[k],
            onSelect: _this6.onSelect
          });
        })));
      }
    }]);

    return ArxivClassList;
  }(React.Component);

  var Item = /*#__PURE__*/function (_React$Component2) {
    _inherits(Item, _React$Component2);

    function Item(props) {
      var _this7;

      _classCallCheck(this, Item);

      _this7 = _possibleConstructorReturn(this, _getPrototypeOf(Item).call(this, props));
      _this7.state = {
        expanded: false,
        hasChildren: Object.keys(props.item.children).length > 0
      };

      _this7.onSelect = function (e, key, value) {
        e.preventDefault();
        e.stopPropagation();

        _this7.props.onSelect(key, value);
      };

      return _this7;
    }

    _createClass(Item, [{
      key: "expand",
      value: function expand(e) {
        if (this.state.hasChildren) {
          this.setState({
            expanded: !this.state.expanded
          });
        } else {
          this.onSelect(e, this.props.item.key);
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this8 = this;

        var _this$props$item = this.props.item,
            key = _this$props$item.key,
            label = _this$props$item.label,
            selected = _this$props$item.selected,
            children = _this$props$item.children,
            indeterminate = _this$props$item.indeterminate;
        var childrenKeys = Object.keys(children);
        var hasChildren = this.state.hasChildren;
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ListGroupItem, {
          onClick: function onClick(e) {
            return _this8.expand(e);
          },
          style: {
            paddingLeft: hasChildren ? 'auto' : 37,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }
        }, hasChildren && /*#__PURE__*/React.createElement("span", {
          style: {
            padding: 0,
            marginRight: 10
          }
        }, /*#__PURE__*/React.createElement("i", {
          className: "fa fa-chevron-".concat(this.state.expanded ? 'down' : 'right')
        })), /*#__PURE__*/React.createElement(Checkbox, {
          inline: true,
          checked: selected,
          title: label,
          onChange: function onChange(e) {
            return _this8.onSelect(e, key);
          },
          inputRef: function inputRef(el) {
            return el && (el.indeterminate = indeterminate);
          }
        }, selected || indeterminate ? /*#__PURE__*/React.createElement("b", null, "".concat(key, ": ").concat(label)) : "".concat(key, ": ").concat(label))), this.state.expanded && hasChildren && /*#__PURE__*/React.createElement(ListGroup, null, childrenKeys.map(function (childKey) {
          var _children$childKey = children[childKey],
              key = _children$childKey.key,
              label = _children$childKey.label,
              selected = _children$childKey.selected;
          return /*#__PURE__*/React.createElement(ListGroupItem, {
            key: key,
            style: {
              paddingLeft: 70,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            },
            onClick: function onClick(e) {
              return _this8.onSelect(e, key);
            }
          }, /*#__PURE__*/React.createElement(Checkbox, {
            inline: true,
            checked: selected,
            title: label,
            onClick: function onClick(e) {
              return _this8.onSelect(e, key);
            },
            style: {
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }
          }, selected ? /*#__PURE__*/React.createElement("b", null, "".concat(key, ": ").concat(label)) : "".concat(key, ": ").concat(label)));
        })));
      }
    }]);

    return Item;
  }(React.Component);

  return ArxivClassList;
});
