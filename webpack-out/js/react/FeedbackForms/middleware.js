define(['js/react/FeedbackForms/actions', 'js/react/shared/helpers'], function (_ref, _ref2) {
  var CHECK_BIBCODES = _ref.CHECK_BIBCODES;
  var middleware = _ref2.middleware;
  var checkBibcodes = middleware(function (_ref3) {
    var action = _ref3.action,
        next = _ref3.next,
        trigger = _ref3.trigger;
    next(action);

    if (action.type === CHECK_BIBCODES && Array.isArray(action.payload) && action.payload.length > 0) {
      var query = action.payload.reduce(function (acc, id, i, arr) {
        if (i === 0) {
          acc = 'identifier:(';
        }

        if (i === arr.length - 1) {
          acc += "".concat(id, ")");
        } else {
          acc += "".concat(id, " OR ");
        }

        return acc;
      }, '');
      trigger('doSearch', query, function () {});
    }
  });
  return {
    checkBibcodes: checkBibcodes
  };
});
