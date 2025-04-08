function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

define(['js/react/MyAdsDashboard/components/SelectTemplate.jsx', 'react-redux', 'js/react/MyAdsDashboard/actions/index'], function (SelectTemplate, _ref, actions) {
  var connect = _ref.connect;

  var mapStateToProps = function mapStateToProps(_ref2) {
    _objectDestructuringEmpty(_ref2);

    return {};
  };

  var goTo = actions.goTo;
  var actionCreators = {
    goTo: goTo
  };
  return connect(mapStateToProps, actionCreators)(SelectTemplate);
});
