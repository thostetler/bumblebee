function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

define(['underscore', 'react', 'prop-types'], function (_, React, PropTypes) {
  // component styles
  var styles = {
    list: {
      listStyleType: 'none',
      marginLeft: '7px'
    },
    link: {
      fontSize: '1em',
      borderLeft: 'solid 3px grey',
      paddingLeft: '5px'
    },
    icon: {
      fontSize: '1.4em',
      'padding-right': '5px'
    }
  }; // create the title element

  var Title = function Title(_ref) {
    var children = _ref.children;
    return /*#__PURE__*/React.createElement("div", {
      className: "associated__header__title"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-folder-open",
      style: styles.icon,
      "aria-hidden": "true"
    }), children);
  }; // create the links element


  var Links = function Links(_ref2) {
    var items = _ref2.items,
        _onClick = _ref2.onClick;

    var getLink = function getLink(item) {
      if (item.external) {
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("a", {
          href: item.url,
          target: "_blank",
          rel: "noreferrer noopener",
          onClick: function onClick() {
            return _onClick(item);
          }
        }, item.name, ' '), /*#__PURE__*/React.createElement("i", {
          className: "fa fa-external-link",
          "aria-hidden": "true"
        }));
      }

      return /*#__PURE__*/React.createElement("a", {
        href: item.url,
        onClick: function onClick() {
          return _onClick(item);
        }
      }, item.name);
    };

    return /*#__PURE__*/React.createElement("div", {
      style: styles.list,
      id: "associated_works"
    }, items.map(function (i) {
      return /*#__PURE__*/React.createElement("div", {
        key: i.id,
        style: styles.link,
        className: "resources__content__link associated_work"
      }, i.circular ? i.name : getLink(i));
    }));
  }; // Associated Articles Widget


  var App = /*#__PURE__*/function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
      var _this;

      _classCallCheck(this, App);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));
      _this.state = {
        showAllBtn: false,
        showAll: false,
        items: []
      };
      _this.onToggleShowAll = _this.onToggleShowAll.bind(_assertThisInitialized(_this));
      return _this;
    } // check items length, and slice them smaller if necessary


    _createClass(App, [{
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(props) {
        if (props.items.length > 4) {
          this.setState({
            items: props.items.slice(0, 4),
            showAllBtn: true,
            showAll: false
          });
        } else {
          this.setState({
            items: props.items
          });
        }
      }
    }, {
      key: "onToggleShowAll",
      value: function onToggleShowAll(e) {
        var _this2 = this;

        e.preventDefault();
        this.setState(function (prevState) {
          return {
            showAll: !prevState.showAll,
            items: prevState.showAll ? _this2.props.items.slice(0, 4) : _this2.props.items
          };
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            loading = _this$props.loading,
            handleLinkClick = _this$props.handleLinkClick,
            hasError = _this$props.hasError;
        var _this$state = this.state,
            items = _this$state.items,
            showAllBtn = _this$state.showAllBtn,
            showAll = _this$state.showAll;

        if (items.length > 0) {
          return /*#__PURE__*/React.createElement("div", {
            className: "resources__container"
          }, /*#__PURE__*/React.createElement(Title, null, "Related Materials (", this.props.items.length, ")"), /*#__PURE__*/React.createElement(Links, {
            items: items,
            onClick: handleLinkClick
          }), showAllBtn && /*#__PURE__*/React.createElement("input", {
            type: "button",
            id: "associated_works_btn",
            className: "btn btn-default btn-xs",
            onClick: this.onToggleShowAll,
            value: showAll ? 'Show Less' : 'Show All'
          }));
        }

        return null;
      }
    }]);

    return App;
  }(React.Component);

  App.propTypes = {
    hasError: PropTypes.bool,
    items: PropTypes.array,
    loading: PropTypes.bool,
    handleLinkClick: PropTypes.func
  };
  App.defaultProps = {
    hasError: false,
    items: [],
    loading: false,
    handleLinkClick: function handleLinkClick() {}
  };
  return App;
});
