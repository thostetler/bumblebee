define(['underscore', 'react', 'prop-types'], function (_, React, PropTypes) {
  // No Results View
  var NoResults = function NoResults() {
    return /*#__PURE__*/React.createElement("h3", {
      className: "s-right-col-widget-title"
    }, "No Sources Found");
  }; // Loading View


  var Loading = function Loading() {
    return /*#__PURE__*/React.createElement("div", {
      className: "text-center text-muted"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-spinner fa-spin fa-2x",
      "aria-hidden": "true"
    }), /*#__PURE__*/React.createElement("span", {
      className: "sr-only"
    }, "Loading"));
  }; // Full Text List


  var FullTextLinkList = function FullTextLinkList(_ref) {
    var items = _ref.items,
        _onClick = _ref.onClick;
    return /*#__PURE__*/React.createElement("div", {
      className: "resources__full__list"
    }, /*#__PURE__*/React.createElement("div", {
      className: "resources__header__row"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-file-text-o",
      "aria-hidden": "true"
    }), /*#__PURE__*/React.createElement("div", {
      className: "resources__header__title"
    }, "full text sources")), _.map(items, function (groups, key) {
      return /*#__PURE__*/React.createElement("div", {
        className: "resources__content",
        key: key
      }, /*#__PURE__*/React.createElement("div", {
        className: "resources__content__title"
      }, key), /*#__PURE__*/React.createElement("div", {
        className: "resources__content__links"
      }, _.map(groups, function (g, idx) {
        return /*#__PURE__*/React.createElement("span", {
          key: g.type + idx
        }, /*#__PURE__*/React.createElement("a", {
          href: g.url,
          target: "_blank",
          rel: "noreferrer noopener",
          onClick: function onClick() {
            return _onClick('ftl', g);
          },
          title: "".concat(g.description, " ").concat(g.open ? 'OPEN ACCESS' : g.type === 'INSTITUTION' ? '' : 'SIGN IN REQUIRED'),
          className: "resources__content__link ".concat(g.open ? 'unlock' : '')
        }, /*#__PURE__*/React.createElement("span", {
          className: "sr-only"
        }, g.description), g.type === 'PDF' && /*#__PURE__*/React.createElement("i", {
          className: "fa fa-file-pdf-o",
          "aria-hidden": "true"
        }), g.type === 'HTML' && /*#__PURE__*/React.createElement("i", {
          className: "fa fa-file-text",
          "aria-hidden": "true"
        }), g.type === 'SCAN' && /*#__PURE__*/React.createElement("i", {
          className: "fa fa-file-image-o",
          "aria-hidden": "true"
        }), g.type === 'INSTITUTION' && /*#__PURE__*/React.createElement("i", {
          className: "fa fa-university",
          "aria-hidden": "true"
        })), idx < groups.length - 1 && /*#__PURE__*/React.createElement("div", {
          className: "resources__content__link__separator"
        }, "|"));
      })));
    }));
  };

  FullTextLinkList.propTypes = {
    items: PropTypes.array,
    onClick: PropTypes.func
  };
  FullTextLinkList.defaultProps = {
    items: [],
    onClick: function onClick() {}
  }; // Data Product List

  var DataProductLinkList = function DataProductLinkList(_ref2) {
    var items = _ref2.items,
        _onClick2 = _ref2.onClick;
    return /*#__PURE__*/React.createElement("div", {
      className: "resources__data__list"
    }, /*#__PURE__*/React.createElement("div", {
      className: "resources__header__row"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-database"
    }), /*#__PURE__*/React.createElement("div", {
      className: "resources__header__title"
    }, "data products")), /*#__PURE__*/React.createElement("div", {
      className: "resources__content"
    }, _.map(items, function (item) {
      return /*#__PURE__*/React.createElement("a", {
        key: item.name,
        href: item.url,
        target: "_blank",
        rel: "noreferrer noopener",
        onClick: function onClick() {
          return _onClick2('data', item);
        },
        title: item.description,
        className: "resources__content__link"
      }, item.name, " (", item.count, ")");
    })));
  };

  DataProductLinkList.propTypes = {
    items: PropTypes.array,
    onClick: PropTypes.func
  };
  DataProductLinkList.defaultProps = {
    items: [],
    onClick: function onClick() {}
  }; // Main View

  var App = function App(props) {
    return /*#__PURE__*/React.createElement("div", null, props.loading && /*#__PURE__*/React.createElement(Loading, null), props.noResults && !props.loading && /*#__PURE__*/React.createElement(NoResults, null), !props.loading && !props.hasError && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "resources__container"
    }, !_.isEmpty(props.fullTextSources) && /*#__PURE__*/React.createElement(FullTextLinkList, {
      items: props.fullTextSources,
      onClick: props.onLinkClick
    })), /*#__PURE__*/React.createElement("div", {
      className: "resources__container"
    }, !_.isEmpty(props.dataProducts) && /*#__PURE__*/React.createElement(DataProductLinkList, {
      items: props.dataProducts,
      onClick: props.onLinkClick
    }))));
  };

  App.propTypes = {
    loading: PropTypes.bool,
    noResults: PropTypes.bool,
    fullTextSources: PropTypes.array,
    dataProducts: PropTypes.array,
    onLinkClick: PropTypes.func,
    hasError: PropTypes.string
  };
  App.defaultProps = {
    loading: false,
    noResults: false,
    fullTextSources: [],
    dataProducts: [],
    onLinkClick: function onLinkClick() {},
    hasError: null
  };
  return App;
});
