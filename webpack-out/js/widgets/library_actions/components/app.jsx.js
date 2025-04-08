function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

define(['underscore', 'react', 'js/widgets/library_actions/components/multi-control.jsx', 'js/widgets/library_actions/components/select.jsx', 'js/widgets/library_actions/components/radio-group.jsx'], function (_, React, MultiControl, Select, RadioGroup) {
  var descriptions = {
    union: 'Take the union of the source and the secondary libraries. This finds all records contained in any of the input libraries. The result is saved to a new library',
    intersection: 'Take the intersection of the source and the secondary libraries. This finds any records contained in all of the input libraries. The result is saved to a new library',
    difference: 'Take the difference between the source and the secondary libraries. This finds all records contained in the source library but in none of the secondary libraries. The result is saved to a new library',
    copy: 'Copy the contents of the source library into the target library. The target library is not emptied first; use the empty operation on the target library first in order to create a duplicate of the source library in the target library',
    empty: 'Empty the source library of its contents'
  };
  var AppStyles = {
    minHeight: '400px'
  }; // get the set of actions, this depends on the number of items passed

  var getActions = function getActions() {
    var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    if (items.length === 1) {
      return ['empty'];
    }

    return ['union', 'intersection', 'difference', 'copy', 'empty'];
  };

  var flattenString = function flattenString(str) {
    return str.toLowerCase().replace(/\W/g, '_');
  };

  var Loading = function Loading() {
    return /*#__PURE__*/React.createElement("div", {
      className: "all-libraries-widget s-all-libraries-widget library-actions",
      style: AppStyles
    }, /*#__PURE__*/React.createElement("div", {
      className: "loading-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "loading"
    }, /*#__PURE__*/React.createElement("div", {
      className: "loading-icon-big fa fa-spinner fa-spin",
      "aria-hidden": "true"
    }), /*#__PURE__*/React.createElement("div", {
      className: "loading-text loading-text-big"
    }, "Loading..."))));
  };

  var Title = function Title() {
    return /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-sm-offset-3 col-sm-6 text-center"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-wrench fa-2x",
      style: {
        marginRight: '5px'
      },
      "aria-hidden": "true"
    }), /*#__PURE__*/React.createElement("span", {
      className: "h3"
    }, "Library Operations")));
  };

  var Descriptions = function Descriptions(_ref) {
    var _ref$item = _ref.item,
        item = _ref$item === void 0 ? 0 : _ref$item,
        descriptions = _ref.descriptions;
    return /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("div", {
      className: "well clearfix",
      style: {
        borderRadius: '4px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-sm-1"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-question-circle fa-2x",
      "aria-hidden": "true"
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-sm-11"
    }, descriptions[item])));
  };

  var Alert = /*#__PURE__*/function (_React$Component) {
    _inherits(Alert, _React$Component);

    function Alert(props) {
      var _this;

      _classCallCheck(this, Alert);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Alert).call(this, props));
      _this.state = {
        message: props.message,
        title: props.title
      };
      return _this;
    }

    _createClass(Alert, [{
      key: "onClick",
      value: function onClick(e) {
        e.preventDefault();
        this.setState({
          message: null,
          title: null
        });
        this.props.onClose();
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(_ref2) {
        var message = _ref2.message,
            title = _ref2.title;
        this.setState({
          message: message,
          title: title
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var type = this.props.type;
        var _this$state = this.state,
            message = _this$state.message,
            title = _this$state.title;
        if (!message && !title) return null;
        return /*#__PURE__*/React.createElement("div", {
          className: "alert alert-".concat(type, " alert-dismissable text-center")
        }, /*#__PURE__*/React.createElement("a", {
          href: "javascript:void(0)",
          className: "close",
          onClick: function onClick(e) {
            return _this2.onClick(e);
          },
          "aria-label": "close"
        }, "\xD7"), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, title)), /*#__PURE__*/React.createElement("p", {
          dangerouslySetInnerHTML: {
            __html: message
          }
        }));
      }
    }]);

    return Alert;
  }(React.Component);

  Alert.defaultProps = {
    title: null,
    message: null
  };

  var Input = function Input(_ref3) {
    var label = _ref3.label,
        onInput = _ref3.onInput,
        hasError = _ref3.hasError,
        _ref3$helpBlock = _ref3.helpBlock,
        helpBlock = _ref3$helpBlock === void 0 ? 'Invalid Input' : _ref3$helpBlock,
        onKeyDown = _ref3.onKeyDown;
    var id = flattenString(label);
    return /*#__PURE__*/React.createElement("div", {
      className: "form-group ".concat(hasError ? 'has-error' : '')
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: id,
      className: "control-label"
    }, label), /*#__PURE__*/React.createElement("input", {
      id: id,
      type: "text",
      className: "form-control",
      onInput: onInput,
      onKeyDown: onKeyDown
    }), hasError && /*#__PURE__*/React.createElement("span", {
      className: "help-block"
    }, helpBlock));
  };

  var App = /*#__PURE__*/function (_React$Component2) {
    _inherits(App, _React$Component2);

    function App(props) {
      var _this3;

      _classCallCheck(this, App);

      _this3 = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));
      _this3.initialState = {
        actions: [],
        action: null,
        source: null,
        secondary: [],
        target: null,
        status: null,
        targetInvalid: false
      };
      _this3.state = _objectSpread({}, _this3.initialState);
      _this3.onTargetInput = _this3.onTargetInput.bind(_assertThisInitialized(_this3));
      _this3.onKeyDown = _this3.onKeyDown.bind(_assertThisInitialized(_this3));
      return _this3;
    }

    _createClass(App, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.props.onRef(this);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.props.onRef(undefined);
      }
    }, {
      key: "updateStatus",
      value: function updateStatus(status) {
        this.setState({
          status: status
        });
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(_ref4) {
        var items = _ref4.items;
        var actions = getActions(items);

        if (items.length === 0) {
          return this.setState(_objectSpread({}, this.initialState, {
            actions: actions,
            action: actions[0]
          }));
        }

        this.setState(function (_ref5) {
          var action = _ref5.action,
              status = _ref5.status,
              source = _ref5.source,
              secondary = _ref5.secondary;
          return {
            actions: actions,
            action: action || actions[0],
            source: source || items.length > 0 && items[0].id,
            secondary: secondary.length > 0 ? secondary : [items.length > 0 && items[0].id],
            status: status
          };
        });
      }
    }, {
      key: "onTargetInput",
      value: function onTargetInput(e) {
        var items = this.props.items;
        var target = e.target.value;

        if (_.find(items, {
          name: target
        })) {
          return this.setState({
            targetInvalid: true
          });
        }

        this.setState({
          target: target,
          targetInvalid: false
        });
      }
    }, {
      key: "onKeyDown",
      value: function onKeyDown(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          e.stopPropagation();
          this.onSubmit(e);
        }
      }
    }, {
      key: "onSubmit",
      value: function onSubmit(e) {
        e.preventDefault();

        var source = _.find(this.props.items, {
          id: this.state.source
        });

        var secondary = _.find(this.props.items, {
          id: this.state.secondary[0]
        });

        if (this.state.action === 'empty' && !confirm("Are you sure you want to empty \"".concat(source.name, "\"?"))) {
          return;
        }

        if (this.state.action === 'copy' && !confirm("Are you sure? This operation will append records from \"".concat(source.name, "\" to \"").concat(secondary.name, "\""))) {
          return;
        } // this.setState({ status: null });


        this.props.onSubmit(_.pick(this.state, ['action', 'source', 'secondary', 'target']));
      }
    }, {
      key: "render",
      value: function render() {
        var _this4 = this;

        var _this$props = this.props,
            items = _this$props.items,
            loading = _this$props.loading,
            submitting = _this$props.submitting;
        var _this$state2 = this.state,
            action = _this$state2.action,
            actions = _this$state2.actions,
            source = _this$state2.source,
            status = _this$state2.status,
            targetInvalid = _this$state2.targetInvalid;
        if (loading) return /*#__PURE__*/React.createElement(Loading, null);
        return /*#__PURE__*/React.createElement("div", {
          className: "all-libraries-widget s-all-libraries-widget",
          style: AppStyles
        }, /*#__PURE__*/React.createElement(Title, null), /*#__PURE__*/React.createElement("form", {
          onSubmit: function onSubmit(e) {
            return _this4.onSubmit(e);
          }
        }, /*#__PURE__*/React.createElement(RadioGroup, {
          label: "Select an Action",
          options: actions,
          direction: "inline",
          onChange: function onChange(action) {
            return _this4.setState({
              action: action
            });
          }
        }), /*#__PURE__*/React.createElement(Descriptions, {
          descriptions: descriptions,
          item: action
        }), /*#__PURE__*/React.createElement(Select, {
          label: "Source Library",
          items: items,
          value: source,
          onChange: function onChange(source) {
            return _this4.setState({
              source: source
            });
          }
        }), action !== 'empty' && action !== 'copy' && /*#__PURE__*/React.createElement(MultiControl, {
          items: items,
          addLabel: "Add Library",
          max: items.length - 1,
          onChange: function onChange(secondary) {
            return _this4.setState({
              secondary: secondary
            });
          }
        }, function (idx, onChange) {
          return /*#__PURE__*/React.createElement(Select, {
            label: "Secondary Library",
            index: idx,
            key: idx,
            items: items,
            onChange: onChange
          });
        }), action === 'copy' && /*#__PURE__*/React.createElement(Select, {
          label: "Target Library",
          items: items,
          onChange: function onChange(val) {
            return _this4.setState({
              secondary: [val]
            });
          }
        }), action !== 'empty' && action !== 'copy' && /*#__PURE__*/React.createElement(Input, {
          label: "New Library Name",
          onInput: this.onTargetInput,
          onKeyDown: this.onKeyDown,
          hasError: targetInvalid,
          helpBlock: "New library name must be unique.  Change name, or leave blank and one will be generated."
        }), /*#__PURE__*/React.createElement("div", {
          className: "form-group"
        }, submitting ? /*#__PURE__*/React.createElement("button", {
          className: "btn btn-primary",
          disabled: true
        }, /*#__PURE__*/React.createElement("i", {
          className: "fa fa-spinner fa-spin",
          "aria-hidden": "true"
        }), ' ', "Submitting...") : /*#__PURE__*/React.createElement("button", {
          className: "btn btn-primary",
          type: "submit",
          disabled: targetInvalid
        }, "Submit")), items.length === 1 && action === 'empty' && /*#__PURE__*/React.createElement(Alert, {
          type: "info",
          message: "Restricted to 'Empty' action because we only found a single library to operate on."
        }), status && status.result === 'success' && /*#__PURE__*/React.createElement(Alert, {
          type: "info",
          title: "Operation Completed Successfully",
          message: status.message,
          onClose: function onClose() {
            return _this4.setState({
              status: null
            });
          }
        }), status && status.result === 'error' && /*#__PURE__*/React.createElement(Alert, {
          type: "danger",
          title: "Operation Failed",
          message: status.message,
          onClose: function onClose() {
            return _this4.setState({
              status: null
            });
          }
        })));
      }
    }]);

    return App;
  }(React.Component);

  App.defaultProps = {
    items: [],
    onSubmit: function onSubmit() {}
  };
  return App;
});
