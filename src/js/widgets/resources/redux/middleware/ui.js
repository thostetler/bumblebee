import api from 'js/widgets/resources/redux/modules/api';
import ui from 'js/widgets/resources/redux/modules/ui';

const { LINK_CLICKED } = ui.actions;

const { SEND_ANALYTICS } = api.actions;

/**
 * Dispatches a SEND_ANALYTICS message when a link is clicked
 */
const linkClicked = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === LINK_CLICKED) {
    dispatch({ type: SEND_ANALYTICS, result: action.result.name });
  }
};

export default [linkClicked];
