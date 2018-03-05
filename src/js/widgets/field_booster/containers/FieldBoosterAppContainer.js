'use strict';
define([
  'underscore',
  'react',
  'redux',
  'react-redux',
  'es6!../redux/modules/FieldBoosterApp',
  'es6!../components/FieldBoosterApp.jsx'
], function (_, React, Redux, ReactRedux, actions, FieldBoosterApp) {

  // actions
  const {
    increaseField,
    decreaseField,
    deleteField,
    addField,
    submit
  } = actions;

  // mapping state to props
  const mapStateToProps = (state) => ({
    app: state.FieldBoosterApp // state is available on sub-components as 'app'
  });

  // dispatch to props
  const mapDispatchToProps = (dispatch) => ({
    increaseField: (index, value) => dispatch(increaseField(index, value)),
    decreaseField: (index, value) => dispatch(decreaseField(index, value)),
    deleteField: (index) => dispatch(deleteField(index)),
    addField: (field, value) => dispatch(addField(field, value)),
    submit: () => dispatch(submit())
  });

  return ReactRedux.connect(mapStateToProps, mapDispatchToProps)(FieldBoosterApp);
});