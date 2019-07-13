define(['utils'], function (utils) {

  const asyncLoad = {
    load: function (name, req, onload, config) {

      // load our resource right away, passing in our promise
      onload(utils.getResourceAsync(name));
    }
  };

  return asyncLoad;
});
