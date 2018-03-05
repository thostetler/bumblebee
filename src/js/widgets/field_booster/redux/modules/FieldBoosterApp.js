'use strict';
define([
  'underscore'
], function (_) {

  // constants
  const CHANGE_VALUE = 0.1;

  // utils
  function round(value, precision) {
    let multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  // Action Constants
  const INCREASE_FIELD = 'INCREASE_FIELD';
  const DECREASE_FIELD = 'DECREASE_FIELD';
  const DELETE_FIELD = 'DELETE_FIELD';
  const ADD_FIELD = 'ADD_FIELD';
  const UPDATE_FIELDS = 'UPDATE_FIELDS';

  // Action Creators
  const increaseField = (index, value) => ({ type: INCREASE_FIELD, index, value });
  const decreaseField = (index, value) => ({ type: DECREASE_FIELD, index, value });
  const deleteField = (index) => ({ type: DELETE_FIELD, index });
  const addField = (field, value) => ({ type: ADD_FIELD, field, value });
  const updateFields = (fields) => ({ type: UPDATE_FIELDS, fields });

  const submit = () => (dispatch, getState, widget) => {
    widget.startNewSearch(getState().FieldBoosterApp.fields);
  };

  // Reducer

  const initialState = {
    fields: [
      { key: 'first_author', value: 3.0 },
      { key: 'author', value: 2.0 },
      { key: 'title', value: 1.4 },
      { key: 'abstract', value: 1.3 },
      { key: 'keyword', value: 1.4 },
      { key: 'keyword_norm', value: 1.4 },
      { key: 'all', value: 1.0 },
      { key: 'body', value: 0.1 },
      { key: 'year', value: 1.0 },
    ]
  };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case INCREASE_FIELD:
        return {
          ...state,
          fields: [
            ...state.fields.slice(0, action.index),
            {
              ...state.fields[action.index],
              value: round(state.fields[action.index].value + CHANGE_VALUE, 1)
            },
            ...state.fields.slice(action.index + 1)
          ]
        };
      case DECREASE_FIELD:
        return {
          ...state,
          fields: [
            ...state.fields.slice(0, action.index),
            {
              ...state.fields[action.index],
              value: round(state.fields[action.index].value - CHANGE_VALUE, 1)
            },
            ...state.fields.slice(action.index + 1)
          ]
        };
      case DELETE_FIELD:
        return {
          ...state,
          fields: [
            ...state.fields.slice(0, action.index),
            ...state.fields.slice(action.index + 1)
          ]
        };
      case ADD_FIELD:
        return {
          ...state,
          fields: [
            ...state.fields.slice(0),
            { key: action.field, value: Number(action.value) }
          ]
        };
      case UPDATE_FIELDS:
        return {
          ...state,
          fields: action.fields
        };
      default: return initialState;
    }
  };

  return {
    increaseField: increaseField,
    decreaseField: decreaseField,
    deleteField: deleteField,
    addField: addField,
    updateFields: updateFields,
    submit: submit,
    initialState: initialState,
    reducer: reducer
  };
});