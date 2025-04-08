function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

define(['underscore', 'react', 'react-bootstrap', 'prop-types'], function (_ref, React, _ref2, PropTypes) {
  var uniqueId = _ref.uniqueId;
  var Form = _ref2.Form,
      FormControl = _ref2.FormControl,
      Button = _ref2.Button,
      FormGroup = _ref2.FormGroup,
      Tooltip = _ref2.Tooltip,
      OverlayTrigger = _ref2.OverlayTrigger,
      Alert = _ref2.Alert,
      InputGroup = _ref2.InputGroup;
  var initialState = {
    text: '',
    type: '',
    valid: true,
    error: '',
    entries: []
  };

  var CitationsEntry = /*#__PURE__*/function (_React$Component) {
    _inherits(CitationsEntry, _React$Component);

    function CitationsEntry(props) {
      var _this;

      _classCallCheck(this, CitationsEntry);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(CitationsEntry).call(this, props));
      _this.state = _objectSpread({}, initialState, props.initialState);

      if (props.initialState.entries && props.initialState.entries.length > 0) {
        // initialize array of entries with some ids
        _this.state.entries = props.initialState.entries.map(function (e) {
          return _objectSpread({}, e, {
            id: uniqueId()
          });
        });
      }

      _this.inputRef = null;
      return _this;
    }

    _createClass(CitationsEntry, [{
      key: "removeEntry",
      value: function removeEntry(id) {
        var _this2 = this;

        var entries = this.state.entries;
        var idx = entries.findIndex(function (entry) {
          return entry.id === id;
        });

        if (idx >= 0) {
          this.setState({
            entries: [].concat(_toConsumableArray(entries.slice(0, idx)), _toConsumableArray(entries.slice(idx + 1)))
          }, function () {
            var entries = _this2.state.entries;
            var entriesUpdated = _this2.props.entriesUpdated;
            entriesUpdated(entries);
          });
        }
      }
    }, {
      key: "addEntry",
      value: function addEntry() {
        var _this3 = this;

        var _this$state = this.state,
            type = _this$state.type,
            text = _this$state.text,
            entries = _this$state.entries; // check if entry is valid first

        if (this.isValid()) {
          var formattedText = type === 'ORCiD' ? text.replace(/-/g, '').match(/\d{3}[X\d]/g).join('-') : text;
          this.setState({
            entries: [].concat(_toConsumableArray(entries), [{
              id: uniqueId(),
              text: formattedText,
              type: type
            }]),
            text: '',
            type: ''
          }, function () {
            // refocus on input, call updated callback
            var entries = _this3.state.entries;
            var entriesUpdated = _this3.props.entriesUpdated;

            _this3.inputRef.focus();

            entriesUpdated(entries);
          });
        }
      }
      /**
       * Detects the type of entry from the text the user typed in
       */

    }, {
      key: "detectType",
      value: function detectType() {
        var text = this.state.text;
        var type = '';

        if (text.match(/^\d/)) {
          type = 'ORCiD';
        } else if (text.length > 0) {
          type = 'Name';
        }

        this.setState({
          type: type
        });
      }
    }, {
      key: "isValid",
      value: function isValid() {
        var _this$state2 = this.state,
            text = _this$state2.text,
            type = _this$state2.type,
            entries = _this$state2.entries;
        var valid = true;
        var error = '';

        if (type === 'ORCiD' && !text.match(/^\d{4}-?\d{4}-?\d{4}-?\d{3}[X\d]$/)) {
          // orcid formatting is off
          valid = false;
          error = 'ORCiD must in the format: 9999-9999-9999-9999';
        } else if (entries.some(function (e) {
          return e.text === text;
        })) {
          // there are duplicate(s)
          valid = false;
          error = 'Already in the list!';
        } else if (text.length === 0) {
          valid = false;
        }

        this.setState({
          valid: valid,
          error: error
        });
        return valid;
      }
    }, {
      key: "render",
      value: function render() {
        var _this4 = this;

        var _this$state3 = this.state,
            entries = _this$state3.entries,
            valid = _this$state3.valid,
            type = _this$state3.type,
            text = _this$state3.text,
            error = _this$state3.error;
        return /*#__PURE__*/React.createElement("div", {
          style: {
            marginBottom: '50px'
          }
        }, /*#__PURE__*/React.createElement("table", {
          className: "table"
        }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
          id: "author-heading"
        }, "Author (name or ORCiD)"), /*#__PURE__*/React.createElement("th", {
          id: "type-heading"
        }, "Type"), /*#__PURE__*/React.createElement("th", {
          id: "action-heading"
        }, "Action"))), /*#__PURE__*/React.createElement("tbody", null, entries.length <= 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
          colSpan: "3"
        }, /*#__PURE__*/React.createElement(Alert, {
          style: {
            marginBottom: 0
          },
          className: "text-center"
        }, "No entries! Add a new entry below"))), entries.map(function (_ref3) {
          var text = _ref3.text,
              type = _ref3.type,
              id = _ref3.id;
          return /*#__PURE__*/React.createElement(Entry, {
            text: text,
            type: type,
            onRemove: function onRemove() {
              return _this4.removeEntry(id);
            }
          });
        }))), /*#__PURE__*/React.createElement("div", {
          style: {
            borderTop: 'solid 1px gray',
            padding: '1em 0'
          }
        }, /*#__PURE__*/React.createElement("div", {
          className: "col-xs-10"
        }, /*#__PURE__*/React.createElement(FormGroup, {
          validationState: valid ? null : 'error'
        }, /*#__PURE__*/React.createElement(InputGroup, null, /*#__PURE__*/React.createElement(FormControl, {
          type: "text",
          name: "author",
          id: "author-input",
          "aria-labelledby": "author-heading",
          placeholder: "Huchra, J. or 1111-2222-3333-4444",
          value: text,
          inputRef: function inputRef(ref) {
            _this4.inputRef = ref;
          },
          onChange: function onChange(e) {
            _this4.setState({
              text: e.target.value,
              valid: true,
              error: ''
            }, function () {
              _this4.detectType();
            });
          }
        }), /*#__PURE__*/React.createElement(InputGroup.Addon, null, type)), !valid && /*#__PURE__*/React.createElement("small", {
          className: "text-danger"
        }, error))), /*#__PURE__*/React.createElement("div", {
          className: "col-xs-2"
        }, /*#__PURE__*/React.createElement(Button, {
          type: "button",
          onClick: function onClick() {
            return _this4.addEntry();
          },
          "aria-labelledby": "action-heading"
        }, "Add"))));
      }
    }]);

    return CitationsEntry;
  }(React.Component);

  CitationsEntry.propTypes = {
    entriesUpdated: function entriesUpdated() {},
    initialState: PropTypes.shape({
      entries: PropTypes.array
    })
  };
  CitationsEntry.defaultProps = {
    initialState: {},
    entriesUpdated: []
  };

  var getWarning = function getWarning(text, type) {
    if (type === 'Name' && !text.match(/^[^,]*,[^,]*$/)) {
      return "Author names should be formatted as 'Last, First M'";
    }

    return null;
  };

  var Entry = function Entry(_ref4) {
    var text = _ref4.text,
        type = _ref4.type,
        onRemove = _ref4.onRemove;
    var warning = getWarning(text, type);
    return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, text, warning && /*#__PURE__*/React.createElement(OverlayTrigger, {
      placement: "right",
      overlay: /*#__PURE__*/React.createElement(Tooltip, {
        id: "warning-tooltip"
      }, warning)
    }, /*#__PURE__*/React.createElement("small", {
      className: "text-warning",
      style: {
        marginLeft: '1rem'
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-exclamation-triangle",
      "aria-hidden": "true"
    })))), /*#__PURE__*/React.createElement("td", null, type), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Button, {
      bsSize: "sm",
      bsStyle: "default",
      onClick: onRemove
    }, "Remove")));
  };

  Entry.propTypes = {
    onRemove: PropTypes.func,
    text: PropTypes.string,
    type: PropTypes.string
  };
  Entry.defaultProps = {
    text: '',
    type: '',
    onRemove: function onRemove() {}
  };
  return CitationsEntry;
});
