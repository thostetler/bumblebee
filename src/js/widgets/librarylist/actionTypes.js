define([
  './constants'
], function (c) {

  const types = [
    'SET_ITEMS',
    'SET_LOADING'
  ];

  return types.reduce((acc, t) => {
    acc[t] = `${ c.NAME }/${ t }`;
    return acc;
  }, {});
});
