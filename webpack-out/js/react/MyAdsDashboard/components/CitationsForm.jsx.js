function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

define(['react', 'react-bootstrap', 'prop-types', 'js/react/MyAdsDashboard/components/CitationsEntry.jsx', 'js/react/shared/helpers'], function (React, _ref, PropTypes, CitationsEntry, _ref2) {
  var Form = _ref.Form,
      FormGroup = _ref.FormGroup,
      ControlLabel = _ref.ControlLabel,
      FormControl = _ref.FormControl,
      HelpBlock = _ref.HelpBlock;
  var escape = _ref2.escape,
      unescape = _ref2.unescape;

  var getStatusMessage = function getStatusMessage(_ref3) {
    var status = _ref3.status,
        error = _ref3.error,
        editing = _ref3.editing;

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
  var CitationsFormInitialState = {
    message: null,
    name: '',
    orcid: '',
    editing: false,
    notificationName: '',
    entries: [],
    pending: false
  };

  var CitationsForm = /*#__PURE__*/function (_React$Component) {
    _inherits(CitationsForm, _React$Component);

    function CitationsForm(props) {
      var _this;

      _classCallCheck(this, CitationsForm);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(CitationsForm).call(this, props));
      _this.onSubmit = _this.onSubmit.bind(_assertThisInitialized(_this));
      _this.entriesUpdated = _this.entriesUpdated.bind(_assertThisInitialized(_this));
      var updatedState = {};

      if (_this.props.editingNotification) {
        updatedState = _objectSpread({
          editing: true
        }, _this.parseQueryString(_this.props.editingNotification.data), {
          notificationName: _this.props.editingNotification.name
        });
      }

      _this.state = _objectSpread({}, CitationsFormInitialState, updatedState);
      return _this;
    }

    _createClass(CitationsForm, [{
      key: "parseQueryString",
      value: function parseQueryString(query) {
        try {
          var parts = query.split(' OR ');
          var entries = {};

          if (parts.length > 0) {
            entries = parts.map(function (str) {
              var _$exec = /^(author|orcid):"(.*)"$/.exec(str),
                  _$exec2 = _slicedToArray(_$exec, 3),
                  p = _$exec2[0],
                  type = _$exec2[1],
                  text = _$exec2[2];

              return {
                type: type === 'author' ? 'Name' : 'ORCiD',
                text: text
              };
            });
          }

          return {
            entries: entries
          };
        } catch (e) {
          return {
            editing: false
          };
        }
      }
    }, {
      key: "entriesUpdated",
      value: function entriesUpdated(entries) {
        this.setState({
          entries: entries
        });
      }
    }, {
      key: "createQueryString",
      value: function createQueryString() {
        var entries = this.state.entries;
        return entries.map(function (_ref4) {
          var type = _ref4.type,
              text = _ref4.text;
          return "".concat(type === 'Name' ? 'author' : 'orcid', ":\"").concat(text, "\"");
        }).join(' OR ');
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
      key: "onSubmit",
      value: function onSubmit(e) {
        e.preventDefault();

        if (this.state.pending) {
          return;
        }

        var data = this.createQueryString();

        if (data === '') {
          return this.showMessage('Must add an author name or orcid ID');
        }

        var payload = {
          data: data,
          name: this.state.notificationName
        };

        if (this.state.editing) {
          this.props.updateNotification(_objectSpread({}, this.props.editingNotification, payload));
        } else {
          this.props.addNotification(payload);
          this.setState({
            reset: true
          });
        }
      }
    }, {
      key: "onChange",
      value: function onChange(data) {
        var _this$setState;

        // set the value and clear the other
        this.setState((_this$setState = {}, _defineProperty(_this$setState, type, value), _defineProperty(_this$setState, type === 'name' ? 'orcid' : 'name', ''), _this$setState));
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(next) {
        var _this3 = this;

        var addStatus = next.addNotificationRequest.status;
        var updateStatus = next.updateNotificationRequest.status; // fires success handler if our request was successful

        if (addStatus === 'success' || updateStatus === 'success') {
          setTimeout(function () {
            return _this3.props.onSuccess();
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
      key: "render",
      value: function render() {
        var _this4 = this;

        return /*#__PURE__*/React.createElement(Form, {
          onSubmit: this.onSubmit
        }, this.state.editing && /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(ControlLabel, null, "Name"), /*#__PURE__*/React.createElement(FormControl, {
          type: "text",
          bsSize: "large",
          value: this.state.notificationName,
          onChange: function onChange(e) {
            return _this4.setState({
              notificationName: e.target.value
            });
          }
        }), /*#__PURE__*/React.createElement(FormControl.Feedback, null), /*#__PURE__*/React.createElement(HelpBlock, null, "Set the name for this notification")), /*#__PURE__*/React.createElement(CitationsEntry, {
          entriesUpdated: this.entriesUpdated,
          initialState: {
            entries: this.state.entries
          }
        }), /*#__PURE__*/React.createElement("div", {
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
        }, this.state.editing ? 'Save notification' : 'Create notification'), /*#__PURE__*/React.createElement("button", {
          className: "btn btn-default",
          onClick: this.props.onCancel
        }, "Cancel"))), /*#__PURE__*/React.createElement("div", {
          className: "col-sm-7 col-sm-offset-1",
          style: {
            paddingTop: '1rem'
          }
        }, getStatusMessage(_objectSpread({}, this.state.editing ? this.props.updateNotificationRequest : this.props.addNotificationRequest, {
          editing: this.state.editing
        })), /*#__PURE__*/React.createElement("span", {
          className: "text-info"
        }, this.state.message))));
      }
    }]);

    return CitationsForm;
  }(React.Component);

  return CitationsForm;
});
