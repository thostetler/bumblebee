define(['utils'], function (utils) {

  const lazy = {
    load: function (name, req, onload, config) {
      const args = name.indexOf('?') > -1 && name.split('?')[1];
      name = name.indexOf('?') > -1 ? name.split('?')[0] : name;
      
      const cb = () => {
        return utils.getResourceAsync(name);
      }
      
      if (args) {
        let cbArg = /^cb=(.*)$/.exec(args)[1];

        if (cbArg) {
          cbArg = '__lazy__' + cbArg;
          if (typeof window[cbArg] === 'function') {
            window[cbArg].entries.push(cb);
          } else {
            window[cbArg] = function () {
              const proms = window[cbArg].entries.map(e => e());
              window[cbArg] = undefined;
              return Promise.all(proms);
            };
            window[cbArg].entries = [cb]
          }
        }
      }

      onload(function (n) {
        return window['__lazy__' + n]();
      });
    }
  };

  return lazy;
});
