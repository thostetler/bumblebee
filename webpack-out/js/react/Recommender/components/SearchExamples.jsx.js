define(['react', 'prop-types', 'react-redux', 'js/react/Recommender/models/index', 'js/react/Recommender/actions'], function (React, PropTypes, _ref, _ref2, _ref3) {
  var useDispatch = _ref.useDispatch;
  var searchExamples = _ref2.searchExamples;
  var updateSearchBar = _ref3.updateSearchBar,
      emitAnalytics = _ref3.emitAnalytics;

  var Dl = function Dl(_ref4) {
    var children = _ref4.children;
    return /*#__PURE__*/React.createElement("dl", {
      className: "dl-horizontal"
    }, children);
  };

  Dl.propTypes = {
    children: PropTypes.element.isRequired
  };

  var Entry = function Entry(_ref5) {
    var label = _ref5.label,
        text = _ref5.text,
        onClick = _ref5.onClick,
        tooltip = _ref5.tooltip;
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/jsx-fragments
      React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("dt", null, label), /*#__PURE__*/React.createElement("dd", {
        style: {
          display: 'flex'
        }
      }, /*#__PURE__*/React.createElement("button", {
        type: "button",
        onClick: onClick,
        className: "text-link"
      }, text), tooltip && /*#__PURE__*/React.createElement("i", {
        className: "icon-help",
        "aria-hidden": "true",
        "data-toggle": "tooltip",
        title: tooltip
      })))
    );
  };

  Entry.defaultProps = {
    label: '',
    text: '',
    tooltip: '',
    onClick: function onClick() {}
  };
  Entry.propTypes = {
    label: PropTypes.string,
    onClick: PropTypes.func,
    text: PropTypes.string,
    tooltip: PropTypes.string
  };
  var SearchExamples = React.memo(function () {
    var dispatch = useDispatch();

    var _onClick = function onClick(text) {
      dispatch(updateSearchBar(text));
      dispatch(emitAnalytics(['send', 'event', 'interaction', 'suggestion-used']));
    };

    var generateRandom = function generateRandom(max) {
      return Math.floor(Math.random() * max);
    };

    return /*#__PURE__*/React.createElement("div", {
      className: "search-examples"
    }, /*#__PURE__*/React.createElement("div", {
      className: "quick-reference"
    }, /*#__PURE__*/React.createElement(Dl, null, searchExamples.slice(0, 8).map(function (entry) {
      var index = generateRandom(entry.examples.length);
      var example = entry.syntax.replace('%', entry.examples[index]);
      return /*#__PURE__*/React.createElement(Entry, {
        label: entry.label,
        text: example,
        tooltip: entry.tooltip,
        onClick: function onClick() {
          return _onClick(example);
        },
        key: entry.label
      });
    }))), /*#__PURE__*/React.createElement("div", {
      className: "quick-reference"
    }, /*#__PURE__*/React.createElement(Dl, null, searchExamples.slice(8).map(function (entry) {
      var index = generateRandom(entry.examples.length);
      var example = entry.syntax.replace('%', entry.examples[index]);
      return /*#__PURE__*/React.createElement(Entry, {
        label: entry.label,
        text: example,
        tooltip: entry.tooltip,
        onClick: function onClick() {
          return _onClick(example);
        },
        key: entry.label
      });
    }))));
  });
  return SearchExamples;
});
