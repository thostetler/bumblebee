define(['utils'], function (utils) {

  const asyncLoad = {
    load: function (name, req, onload, config) {

      // load our resource right away, don't wait for recaptcha to be ready
      onload(utils.getResourceAsync(name));
    }
  };

  return asyncLoad;
});
