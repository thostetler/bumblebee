'use strict';
define([
  'immutable'
], function (Immutable) {

  // actions
  const LOCK_FILTER = 'LOCK_FILTER';
  const DELETE_FILTER = 'DELETE_FILTER';

  // actions creators
  const lockFilter = (idx) => ({ type: LOCK_FILTER, index: idx });
  const deleteFilter = (idx) => ({ type: DELETE_FILTER, index: idx });

  // initial state
  const initialState = Immutable.fromJS({
    filters: [
      { title: 'loren', operand: 'sdfs', locked: false, lockable: true },
      { title: 'ipssdf', operand: 'sdfsdf', locked: false, lockable: false },
      { title: 'sdfsdf', operand: 'sdfsdf', locked: false},
      { title: 'Rodsfsdfbin', operand: 'sdfsdf', locked: false},
    ]
  });

  // reducer
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case LOCK_FILTER:
        return state.updateIn(['filters', action.index, 'locked'], val => !val);
      case DELETE_FILTER:
        return state.set('filters', state.get('filters').delete(action.index));
      default: return initialState;
    }
  };

  return {
    initialState: initialState,
    deleteFilter: deleteFilter,
    lockFilter: lockFilter,
    reducer: reducer
  };
});