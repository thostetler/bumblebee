define(['js/widgets/resources/redux/modules/api', 'js/widgets/resources/redux/modules/ui'], function (api, ui) {
  var LINK_CLICKED = ui.actions.LINK_CLICKED;
  var SEND_ANALYTICS = api.actions.SEND_ANALYTICS;
  /**
   * Dispatches a SEND_ANALYTICS message when a link is clicked
   */

  var linkClicked = function linkClicked(_ref) {
    var dispatch = _ref.dispatch;
    return function (next) {
      return function (action) {
        next(action);

        if (action.type === LINK_CLICKED) {
          dispatch({
            type: SEND_ANALYTICS,
            result: action.result.name
          });
        }
      };
    };
  };

  return [linkClicked];
});
