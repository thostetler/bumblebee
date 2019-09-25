define([], function() {
  /**
   * middleware wrapper with a function that, when called,
   * binds it's first argument to the first argument of the middleware function
   * returns the wrapped middleware function
   *
   * This will also combine middlewares passed as arguments into a single object
   */
  const withContext = (...args) => (context) => {
    const fns = args.reduce((acc, a) => ({ ...acc, ...a }), {});
    return Object.keys(fns).map((key) => fns[key].bind(null, context));
  };

  const escape = (string) => {
    return string.replace(/(['"])/g, '\\$1');
  };

  const unescape = (string) => {
    return string.replace(/\\(["'])/g, '$1');
  };

  const isEmpty = (value) => {
    return !(typeof value === 'string' && value.length > 0);
  };

  const middleware = (callback) => {
    return ({ trigger }, { dispatch, getState }) => (next) => (action) =>
      callback({ trigger, dispatch, getState, next, action });
  };

  return {
    withContext,
    escape,
    unescape,
    middleware,
    isEmpty,
  };
});
