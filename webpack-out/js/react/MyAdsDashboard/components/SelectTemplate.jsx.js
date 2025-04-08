function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

define(['react', 'js/react/MyAdsDashboard/constants'], function (React, _ref) {
  var page = _ref.page;

  var SelectTemplate = /*#__PURE__*/function (_React$Component) {
    _inherits(SelectTemplate, _React$Component);

    function SelectTemplate() {
      _classCallCheck(this, SelectTemplate);

      return _possibleConstructorReturn(this, _getPrototypeOf(SelectTemplate).apply(this, arguments));
    }

    _createClass(SelectTemplate, [{
      key: "render",
      value: function render() {
        var _this = this;

        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
          className: "list-group"
        }, /*#__PURE__*/React.createElement("a", {
          href: "javascript:void(0);",
          className: "list-group-item",
          onClick: function onClick() {
            return _this.props.goTo(page.ARXIV_FORM);
          }
        }, /*#__PURE__*/React.createElement("h2", {
          className: "h4"
        }, "arXiv"), /*#__PURE__*/React.createElement("p", null, "Daily updates from arXiv.org")), /*#__PURE__*/React.createElement("a", {
          href: "javascript:void(0);",
          className: "list-group-item",
          onClick: function onClick() {
            return _this.props.goTo(page.CITATIONS_FORM);
          }
        }, /*#__PURE__*/React.createElement("h2", {
          className: "h4"
        }, "Citations"), /*#__PURE__*/React.createElement("p", null, "Weekly updates on the latest citations to your papers or those by any other author")), /*#__PURE__*/React.createElement("a", {
          href: "javascript:void(0);",
          className: "list-group-item",
          onClick: function onClick() {
            return _this.props.goTo(page.AUTHORS_FORM);
          }
        }, /*#__PURE__*/React.createElement("h2", {
          className: "h4"
        }, "Authors"), /*#__PURE__*/React.createElement("p", null, "Weekly updates on the latest papers by your favorite authors")), /*#__PURE__*/React.createElement("a", {
          href: "javascript:void(0);",
          className: "list-group-item",
          onClick: function onClick() {
            return _this.props.goTo(page.KEYWORD_FORM);
          }
        }, /*#__PURE__*/React.createElement("h2", {
          className: "h4"
        }, "Keywords"), /*#__PURE__*/React.createElement("p", null, "Weekly updates on the most recent, most popular, and most cited papers on your favorite keyword(s) or any other ADS query")), /*#__PURE__*/React.createElement("a", {
          href: "javascript:void(0);",
          className: "list-group-item",
          onClick: function onClick() {
            return _this.props.goTo(page.GENERAL_FORM);
          }
        }, /*#__PURE__*/React.createElement("h2", {
          className: "h4"
        }, "General"), /*#__PURE__*/React.createElement("p", null, "Notification based on a general, free-form query that you can create from the results page."))));
      }
    }]);

    return SelectTemplate;
  }(React.Component);

  return SelectTemplate;
});
