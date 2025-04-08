function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define(['react', 'js/react/MyAdsDashboard/constants', 'js/react/MyAdsDashboard/containers/Dashboard', 'js/react/MyAdsDashboard/containers/SelectTemplate', 'js/react/MyAdsDashboard/containers/ArxivForm', 'js/react/MyAdsDashboard/containers/CitationsForm', 'js/react/MyAdsDashboard/containers/AuthorsForm', 'js/react/MyAdsDashboard/containers/KeywordForm', 'js/react/MyAdsDashboard/containers/GeneralForm', 'js/react/MyAdsDashboard/containers/ImportNotificationsForm'], function (React, _ref, Dashboard, SelectTemplate, ArxivForm, CitationsForm, AuthorsForm, KeywordForm, GeneralForm, ImportNotificationsForm) {
  var _TITLES;

  var PAGE = _ref.page;

  var getComponent = function getComponent(page) {
    switch (page) {
      case PAGE.DASHBOARD:
        return /*#__PURE__*/React.createElement(Dashboard, null);

      case PAGE.ARXIV_FORM:
        return /*#__PURE__*/React.createElement(ArxivForm, null);

      case PAGE.CITATIONS_FORM:
        return /*#__PURE__*/React.createElement(CitationsForm, null);

      case PAGE.AUTHORS_FORM:
        return /*#__PURE__*/React.createElement(AuthorsForm, null);

      case PAGE.KEYWORD_FORM:
        return /*#__PURE__*/React.createElement(KeywordForm, null);

      case PAGE.GENERAL_FORM:
        return /*#__PURE__*/React.createElement(GeneralForm, null);

      case PAGE.SELECT_TEMPLATE:
        return /*#__PURE__*/React.createElement(SelectTemplate, null);

      case PAGE.IMPORT_NOTIFICATIONS:
        return /*#__PURE__*/React.createElement(ImportNotificationsForm, null);
    }
  };

  var TITLES = (_TITLES = {}, _defineProperty(_TITLES, PAGE.ARXIV_FORM, 'arXiv'), _defineProperty(_TITLES, PAGE.CITATIONS_FORM, 'Citations'), _defineProperty(_TITLES, PAGE.AUTHORS_FORM, 'Authors'), _defineProperty(_TITLES, PAGE.KEYWORD_FORM, 'Keywords'), _defineProperty(_TITLES, PAGE.GENERAL_FORM, 'General'), _defineProperty(_TITLES, PAGE.SELECT_TEMPLATE, 'Create New'), _defineProperty(_TITLES, PAGE.IMPORT_NOTIFICATIONS, 'Import'), _TITLES);

  var getMiddleMessage = function getMiddleMessage(page, isEditing) {
    var msg = '';

    if (page !== PAGE.SELECT_TEMPLATE && page !== PAGE.IMPORT_NOTIFICATIONS && page !== PAGE.DASHBOARD) {
      msg = " ".concat(isEditing ? 'Editing' : 'Create New', " |");
    }

    return msg;
  };

  var getPageTitle = function getPageTitle(page, isEditing) {
    var title = TITLES[page];

    if (title) {
      return "myADS |".concat(getMiddleMessage(page, isEditing), " ").concat(title);
    }

    return 'myADS';
  };

  var getBackButton = function getBackButton(page, onClick) {
    if (page === PAGE.DASHBOARD) {
      return null;
    }

    var onBack;

    switch (page) {
      case PAGE.ARXIV_FORM:
      case PAGE.CITATIONS_FORM:
      case PAGE.KEYWORD_FORM:
      case PAGE.AUTHORS_FORM:
      case PAGE.GENERAL_FORM:
        onBack = onClick.bind(null, PAGE.SELECT_TEMPLATE);
        break;

      default:
        onBack = onClick.bind(null, PAGE.DASHBOARD);
    }

    return /*#__PURE__*/React.createElement("button", {
      className: "btn btn-default",
      onClick: onBack,
      title: "go back"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-chevron-left",
      "aria-hidden": "true"
    }), " Go Back");
  };

  var App = /*#__PURE__*/function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
      _classCallCheck(this, App);

      return _possibleConstructorReturn(this, _getPrototypeOf(App).apply(this, arguments));
    }

    _createClass(App, [{
      key: "render",
      value: function render() {
        return /*#__PURE__*/React.createElement("div", {
          className: "panel panel-default",
          style: {
            marginTop: 50
          }
        }, /*#__PURE__*/React.createElement("div", {
          className: "panel-heading"
        }, getBackButton(this.props.editingNotification ? null : this.props.page, this.props.goTo), ' ', getPageTitle(this.props.page, this.props.editingNotification)), /*#__PURE__*/React.createElement("div", {
          className: "panel-body",
          style: {
            minHeight: 600
          }
        }, getComponent(this.props.page)));
      }
    }]);

    return App;
  }(React.Component);

  return App;
});
