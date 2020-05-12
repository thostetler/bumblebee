define(['../helpers'], function({ middleware }) {
  const getInitialData = middleware(({ trigger, next, action, dispatch }) => {
    next(action);

    if (action.type === 'GET_INITIAL_DATA') {
      trigger('getInitialData', (result) => {
        dispatch({ type: 'SET_INITIAL_DATA', result });
      });
    }
  });

  return {
    getInitialData,
  };
});
