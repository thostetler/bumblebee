function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

define(['js/react/MyAdsFreeform/components/SaveQueryForm.jsx', 'react-redux', 'js/react/MyAdsFreeform/actions'], function (SaveQueryForm, _ref, actions) {
  var connect = _ref.connect;

  var mapStateToProps = function mapStateToProps(_ref2) {
    var requests = _ref2.requests;
    return {
      requests: {
        addNotification: requests.ADD_NOTIFICATION
      }
    };
  };

  _objectDestructuringEmpty(actions);

  var actionCreators = {};
  return connect(mapStateToProps, actionCreators)(SaveQueryForm);
});
