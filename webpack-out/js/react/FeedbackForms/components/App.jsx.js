function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    padding: 4rem 1rem;\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

define(['react', 'suit', 'react-redux', 'styled-components', 'js/react/FeedbackForms/models/index'], function (React, _ref, _ref2, styled, _ref3) {
  var FeedbackForms = _ref.FeedbackForms;
  var useSelector = _ref2.useSelector;
  var FORMS = _ref3.FORMS;
  var Container = styled.div(_templateObject());

  var formSelector = function formSelector(_ref4) {
    var main = _ref4.main;
    return {
      form: main.form
    };
  };

  var App = function App() {
    var _useSelector = useSelector(formSelector),
        form = _useSelector.form;

    return /*#__PURE__*/React.createElement(Container, {
      className: "container"
    }, function () {
      switch (form) {
        case FORMS.missingreferences:
          return /*#__PURE__*/React.createElement(FeedbackForms.MissingIncorrectRecord, null);

        case FORMS.associatedarticles:
          return /*#__PURE__*/React.createElement(FeedbackForms.AssociatedReferences, null);

        case FORMS.correctabstract:
          return /*#__PURE__*/React.createElement(FeedbackForms.SubmitCorrectAbstract, null);

        default:
          return /*#__PURE__*/React.createElement(FeedbackForms.SubmitCorrectAbstract, null);
      }
    }());
  };

  return App;
});
