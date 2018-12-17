var path = require('path');

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

var baseConfig = {
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
        'analytics',
        'router',
        'cache',
        'es6',
        'hbs',
        'immutable',
        'jquery-querybuilder',
        'redux-immutable',
        'utils',
      ],
      paths: PATHS
    }
  },
  core: {
    options: {
      logLevel: 1,
      baseUrl: 'build',
      name: 'core.bundle',
      out: 'build/core.bundle.js',
      optimize: 'none',
      mainConfigFile: 'build/app.config.js',
      deps: [],
      create: true,
      include: [
        'js/wraps/discovery_mediator',
        'js/components/query_mediator',
        'js/bugutils/diagnostics',
        'js/wraps/alerts_mediator',
        'js/modules/orcid/module',
        'js/services/api',
        'js/services/pubsub',
        'js/apps/discovery/navigator',
        'js/services/storage',
        'js/components/history_manager',
        'js/components/user',
        'js/components/session',
        'discovery.vars',
        'js/page_managers/master',
        'js/components/app_storage',
        'js/components/recaptcha_manager',
        'js/components/csrf_manager',
        'js/components/library_controller',
        'js/components/doc_stash_controller',
        'js/widgets/facet/factory'
      ],
      exclude: [
        'common.bundle'
      ],
      paths: PATHS
    }
  }
};


module.exports = function (grunt) {
  var getConfigs = function () {
    var paths = grunt.file.expand('src/js/widgets/**/widget*.js');
    var config = {};
    paths.forEach(function (url) {
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
          exclude: ['common.bundle', 'core.bundle'],
          paths: PATHS
        }
      };
    });
    return config;
  }

  var configs = getConfigs();
  Object.keys(configs).forEach(function (key) {
    baseConfig[key] = configs[key];
  });

  var output = '// GENERATED FILE (run grunt generate-require-config)\n\n' +
    'module.exports =\n' + JSON.stringify(baseConfig, null, 2) + ';'

  grunt.file.write(path.resolve(__dirname, 'requirejs.js'), output);
  grunt.log.writeln('Configuration Generated...');

  // uncomment to get the generated output to place in discovery config
  // var mappedIncludes = {};
  // Object.keys(baseConfig).forEach(function (key) {
  //   mappedIncludes[key + '.bundle'] = baseConfig[key].options.include;
  // });
  // console.log(JSON.stringify(mappedIncludes, null, 2));

  return {};
}
