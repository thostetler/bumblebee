'use strict';
var path = require('path');

/**
 * Options for the `requirejs` grunt task
 *
 * Task to minify modules/css; it should run only after files were
 * copied over to the 'dist' folder
 *
 * @module grunt/requirejs
 */

module.exports = function (grunt) {
  var createIncludePaths = function () {
    var s = grunt.file.read('src/discovery.config.js');
    require = {
      config: function(s) {
        return s;
      }
    };
    var bumblebeeConfig = eval(s).config['js/apps/discovery/main'];

    function getPaths(obj) {
      var paths = [];

      function pushPaths(config_obj) {
        for (var k in config_obj) {
          var v = config_obj[k];
          if (v instanceof Object) {
            pushPaths(v);
          } else {
            paths.push(v);
          }
        }
      };

      pushPaths(obj);
      return paths;
    }

    return getPaths(bumblebeeConfig);
  };

  var PATHS = {
    'backbone-validation': 'empty:',
    'backbone.stickit': 'empty:',
    'backbone.wreqr': 'empty:',
    'backbone': 'empty:',
    'bootstrap': 'empty:',
    'classnames': 'empty:',
    'clipboard': 'empty:',
    'create-react-class': 'empty:',
    'd3-cloud': 'empty:',
    'd3': 'empty:',
    'es5-shim': 'empty:',
    'filesaver': 'empty:',
    'google-analytics': 'empty:',
    'google-recaptcha': 'empty:',
    'jquery-ui' : 'empty:',
    'jquery' : 'empty:',
    'jsonpath': 'empty:',
    'marionette': 'empty:',
    'mathjax': 'empty:',
    'moment': 'empty:',
    'persist-js': 'empty:',
    'react-bootstrap': 'empty:',
    'react-dom' : 'empty:',
    'react-prop-types': 'empty:',
    'react-redux': 'empty:',
    'react' : 'empty:',
    'redux-thunk': 'empty:',
    'redux': 'empty:',
    'requirejs' : 'empty:',
    'reselect': 'empty:',
    'select2': 'empty:',
    'sinon': 'empty:',
    'sprintf': 'empty:',
    'underscore': 'empty:',
  };

  var getWidgetConfigs = function () {
    var widgetPaths = grunt.file.expand('src/js/widgets/**/widget*.js');
    var config = {};
    widgetPaths.forEach(function (url) {
      var parts = url.split(path.sep);
      var name = parts[3];
      if (/jsx\.js$/.test(url)) {
        url = url.replace(/^/, 'es6!');
      }
      url = url.replace('src/', '').replace(/\.js$/, '');
      config[name] = {
        options: {
          logLevel: 1,
          baseUrl: 'build',
          name: name + '.bundle',
          out: 'build/' + name + '.bundle.js',
          optimize: 'none',
          mainConfigFile: 'build/app.config.js',
          deps: [],
          create: true,
          include: [url],
          exclude: ['common.bundle'],
          paths: PATHS
        }
      };
    });
    return config;
  }

  var mainConfig = {
    'build': {
      options: {
        baseUrl: 'src',
        mainConfigFile: 'src/discovery.config.js',
        dir: 'build',
        optimize: 'none',
        paths: PATHS
      }
    },
    common: {
      options: {
        logLevel: 1,
        baseUrl: 'build',
        name: 'common.bundle',
        out: 'build/common.bundle.js',
        optimize: 'none',
        mainConfigFile: 'build/app.config.js',
        deps: [],
        create: true,
        include: [
          'config',
          'js/apps/discovery/main',
          'analytics',
          'router',
          'cache',
          'es6',
          'hbs',
          'immutable',
          'jquery-querybuilder',
          'redux-immutable',
          'utils'
        ],
        exclude: [
          'core.bundle'
        ],
        paths: PATHS
      }
    }
  };

  var widgetConfigs = getWidgetConfigs();
  Object.keys(widgetConfigs).forEach(function (key) {
    mainConfig[key] = widgetConfigs[key];
  });
  return mainConfig;
};
