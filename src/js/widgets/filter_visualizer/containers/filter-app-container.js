'use strict';
define([
  'underscore',
  'react',
  'redux',
  'react-redux',
  'es6!../redux/modules/filter-app',
  'es6!../components/filter-app.jsx'
], function (_, React, Redux, ReactRedux, actions, FilterApp) {

  // actions
  const {
    deleteFilter,
    lockFilter
  } = actions;

  // mapping state to props
  const mapStateToProps = (state) => ({
    app: state.toJS().FilterApp // state is available on sub-components as 'app'
  });

  // dispatch to props
  const mapDispatchToProps = (dispatch) => ({
    deleteFilter: (index) => dispatch(deleteFilter(index)),
    lockFilter: (index) => dispatch(lockFilter(index))
  });

  return ReactRedux.connect(mapStateToProps, mapDispatchToProps)(FilterApp);
});