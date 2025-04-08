define([], function () {
  var CDN_URL = 'https://ads-assets.pages.dev';

  var normalize = function normalize(moduleName) {
    try {
      var parts = moduleName.split('!');
      return parts[parts.length - 1].split('?')[0];
    } catch (e) {
      return moduleName;
    }
  };

  var cdn = {
    load: function load(name, req, onload) {
      console.log('CDN Loader', {
        name: name,
        normalized: normalize(name),
        req: req,
        onload: onload,
        _: this
      });

      if (process.env.NODE_ENV === 'development') {
        return req([name], function (module) {
          onload(module);
        }, function (err) {
          console.error('Problem loading module', {
            moduleName: name
          }, err);

          if (onload.error) {
            onload.error(err);
          }
        });
      }

      var path = normalize(name);
      req(["".concat(CDN_URL, "/").concat(path, ".js")], function (module) {
        onload(module);
      }, function () {
        req([name], function (module) {
          onload(module);
        });
      }, function (err) {
        console.error('Problem loading module', {
          moduleName: name,
          normalizedName: path
        }, err);

        if (onload.error) {
          onload.error(err);
        }
      });
    }
  };
  return cdn;
});
