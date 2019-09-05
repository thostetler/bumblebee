define([
  'react-redux',
  'es6!../components/List.jsx'
], function (ReactRedux, List) {

  return ReactRedux.connect(
    (store) => ({ ...store })
  )(List);
});
