define(['react', 'prop-types'], function (React, ReactPropTypes) {
  var Slider = function Slider(_ref) {
    var count = _ref.count,
        setCount = _ref.setCount;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "ex-range"
    }, "Limit to first ", /*#__PURE__*/React.createElement("strong", null, count), " records"), /*#__PURE__*/React.createElement("input", {
      type: "range",
      id: "ex-range",
      min: "0",
      max: "3000",
      step: "1",
      defaultValue: count,
      onChange: function onChange(e) {
        return setCount(e.target.value);
      }
    }));
  };

  Slider.propTypes = {
    count: ReactPropTypes.number.isRequired,
    setCount: ReactPropTypes.func.isRequired
  };
  return Slider;
});
