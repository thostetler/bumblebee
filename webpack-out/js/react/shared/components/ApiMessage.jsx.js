define(['react', 'react-bootstrap', 'prop-types'], function (React, _ref, PropTypes) {
  var Alert = _ref.Alert;
  var TYPES = {
    pending: 'warning',
    error: 'danger',
    success: 'success'
  };

  var ApiMessage = function ApiMessage(_ref2) {
    var request = _ref2.request;
    var status = request.status,
        error = request.error;

    if (!error) {
      return null;
    }

    return /*#__PURE__*/React.createElement(Alert, {
      bsStyle: "danger",
      style: {
        marginTop: '1rem'
      }
    }, error && /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-exclamation-triangle",
      "aria-hidden": "true"
    }), ' ', "Error:"), ' ', error));
  };

  ApiMessage.defaultProps = {
    request: {
      status: null,
      result: null,
      error: null
    }
  };
  ApiMessage.propTypes = {
    request: PropTypes.object
  };
  return ApiMessage;
});
