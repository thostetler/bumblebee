


// var baseConfig = {
//   'build': {
//     options: {
//       baseUrl: 'src',
//       mainConfigFile: 'src/discovery.config.js',
//       dir: 'build',
//       optimize: 'none',
//       paths: PATHS
//     }
//   },
//   common: {
//     options: {
//       logLevel: 1,
//       baseUrl: 'build',
//       name: 'common.bundle',
//       out: 'build/common.bundle.js',
//       optimize: 'none',
//       mainConfigFile: 'build/app.config.js',
//       deps: [],
//       create: true,
//       include: [
//         "jquery",
//         "./discovery.config",
//         "js/apps/discovery/main",
//         "analytics",
//         "router",
//         "cache",
//         "es6",
//         "hbs",
//         "immutable",
//         "jquery-querybuilder",
//         "redux-immutable",
//         "babel",
//         "utils"
//       ],
//       paths: PATHS
//     }
//   },
//   core: {
//     options: {
//       logLevel: 1,
//       baseUrl: 'build',
//       name: 'core.bundle',
//       out: 'build/core.bundle.js',
//       optimize: 'none',
//       mainConfigFile: 'build/app.config.js',
//       deps: [],
//       create: true,
//       include: [
//         'js/wraps/discovery_mediator',
//         'js/components/query_mediator',
//         'js/bugutils/diagnostics',
//         'js/wraps/alerts_mediator',
//         'js/modules/orcid/module',
//         'js/services/api',
//         'js/services/pubsub',
//         'js/apps/discovery/navigator',
//         'js/services/storage',
//         'js/components/history_manager',
//         'js/components/user',
//         'js/components/session',
//         'discovery.vars',
//         'js/page_managers/master',
//         'js/components/app_storage',
//         'js/components/recaptcha_manager',
//         'js/components/csrf_manager',
//         'js/components/library_controller',
//         'js/components/doc_stash_controller',
//         'js/widgets/facet/factory'
//       ],
//       exclude: [
//         'common.bundle'
//       ],
//       paths: PATHS
//     }
//   }
// };

module.exports = function (grunt) {

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
    'underscore': 'empty:'
  };

  var baseConfig = {
    waitSeconds: 0,
    logLevel: 1,
    baseUrl: 'src',
    optimize: 'none',
    optimize: 'none',
    mainConfigFile: 'src/discovery.config.js',
    deps: [],
    stubModules: ['babel', 'es6'],
    create: true,
    paths: PATHS
  };

  grunt.registerMultiTask('optimize-build', 'Generate config and optimize build', function () {
    var _ = require('lodash');
    var path = require('path');
    var fullConfig = {};

    // callback called with URL and name pulled from folder
    var getByGlob = function (globs, cb) {
      var urls = []
      grunt.file.expand({ filter: 'isFile' }, globs).forEach(function (url) {
        var parts = url.split(path.sep);
        if (/jsx\.js$/.test(url)) {
          url = url.replace(/^/, 'es6!');
        }
        url = url.replace('src/', '').replace(/\.js$/, '');
        urls.push(url);
        cb && cb(url, parts[3]);
      });
      return urls;
    };

    var writeOutConfig = function (config) {
      var output = '// GENERATED FILE (edits will be overwritten)\n\n' +
        'module.exports =\n' + JSON.stringify(config, null, 2) + ';'
      fullConfig = config;
      grunt.file.write(path.resolve(__dirname, 'requirejs.js'), output);
      grunt.log.writeln('Configuration Generated...');
    };

    grunt.registerTask('generateConfig', function () {
      var config = {};
      var addConfig = function (name, cfg) {
        config[name] = {};
        config[name].options = _.extend({}, baseConfig, {
          name: name + '.bundle',
          out: 'build/' + name + '.bundle.js'
        }, cfg);
      }

      addConfig('analytics', {
        include: [
          'analytics'
        ]
      });

      addConfig('app', {
        include: [
          'router',
          'discovery.vars',
          'js/apps/discovery/main',
          'async',
          'cache',
          'babel',
          'es6',
          'hbs',
          'immutable',
          'jquery',
          'jquery-querybuilder',
          'mocha',
          'redux-immutable',
          'utils'
        ].concat(getByGlob([
          'src/js/apps/**/*.js',
          'src/js/components/**/*.js',
          'src/js/mixins/**/*.js',
          'src/js/modules/**/*.js',
          'src/js/bugutils/**/*.js',
          'src/js/page_managers/**/*.js',
          'src/js/services/**/*.js',
          'src/js/widgets/**/*widget*.js',
          'src/js/wraps/**/*.js',
          '!src/js/apps/bumblebox/**/*',
          '!src/js/components/analytics.js',
          '!src/js/apps/discovery/router.js'
        ])),
        exclude: ['analytics']
      });
      writeOutConfig(config);
    });

    grunt.registerTask('generateHtmls', function () {
      var files = [
        'build/*.html',
        '!build/google*',
        '!build/shim*'
      ];
      var htmls = grunt.file.expand({ filter: 'isFile' }, files);
      htmls.map(grunt.file.read).forEach(function (content, i) {
        var file = htmls[i];
        grunt.log.subhead('processhtml - ', file);
        content = content.toString().replace(/discovery\.config/g, 'app.bundle');
        grunt.file.write(file, content);
        grunt.log.writeln('file "' + file + '" processed');
      });
    });

    grunt.registerTask('applyIncludesToConfig', function () {
      var content = grunt.file.read('build/discovery.config.js');
      content = content.toString();
      config = {};
      config.bundles = _.reduce(fullConfig, function (acc, v) {
        acc[v.options.name] = v.options.include;
        return acc;
      }, {});
      var out = '//GENERATED: \nrequirejs.config(' + JSON.stringify(config, null, 2) + ');'
      grunt.file.write('build/discovery.config.js', content + '\n' + out);
      grunt.log.writeln('discovery.config.js updated with bundle information');
    });

    grunt.task.run('clean:build');
    grunt.task.run('generateConfig');
    grunt.task.run(['requirejs', 'copy:build']);
    grunt.task.run('applyIncludesToConfig');
    // grunt.task.run('generateHtmls');
  });

  return {
    options: {},
    release: {
    }
  };
};

// function (grunt) {

//   // callback called with URL and name pulled from folder
//   var getByGlob = function (glob, cb) {
//     var urls = []
//     grunt.file.expand(glob).forEach(function (url) {
//       var parts = url.split(path.sep);
//       if (/jsx\.js$/.test(url)) {
//         url = url.replace(/^/, 'es6!');
//       }
//       url = url.replace('src/', '').replace(/\.js$/, '');
//       urls.push(url);
//       cb && cb(url, parts[3]);
//     });
//     return urls;
//   }

//   var getConfigs = function () {
//     var config = {};

//     var wraps = getByGlob('src/js/wraps/**/*.js');
//     config['wraps'] = {
//       options: {
//         logLevel: 1,
//         baseUrl: 'build',
//         name: 'wraps.bundle',
//         out: 'build/wraps.bundle.js',
//         optimize: 'none',
//         mainConfigFile: 'build/app.config.js',
//         deps: [],
//         create: true,
//         include: wraps,
//         exclude: ['common.bundle', 'core.bundle'],
//         paths: PATHS
//       }
//     };

//     var mixins = getByGlob('src/js/mixins/**/*.js');
//     config['mixins'] = {
//       options: {
//         logLevel: 1,
//         baseUrl: 'build',
//         name: 'mixins.bundle',
//         out: 'build/mixins.bundle.js',
//         optimize: 'none',
//         mainConfigFile: 'build/app.config.js',
//         deps: [],
//         create: true,
//         include: mixins,
//         exclude: [
//           'common.bundle',
//           'core.bundle',
//           'wraps.bundle'
//         ],
//         paths: PATHS
//       }
//     };

//     var orcid = getByGlob('src/js/orcid/**/*.js');
//     config['orcid'] = {
//       options: {
//         logLevel: 1,
//         baseUrl: 'build',
//         name: 'orcid.bundle',
//         out: 'build/orcid.bundle.js',
//         optimize: 'none',
//         mainConfigFile: 'build/app.config.js',
//         deps: [],
//         create: true,
//         include: orcid,
//         exclude: [
//           'common.bundle',
//           'core.bundle',
//           'wraps.bundle',
//           'mixins.bundle'
//         ],
//         paths: PATHS
//       }
//     };

//     getByGlob('src/js/widgets/**/widget*.js', function (url, name) {
//       config[name] = {
//         options: {
//           logLevel: 1,
//           baseUrl: 'build',
//           name: name + '.bundle',
//           out: 'build/' + name + '.bundle.js',
//           optimize: 'none',
//           mainConfigFile: 'build/app.config.js',
//           deps: [],
//           create: true,
//           include: [url],
//           exclude: [
//             'common.bundle',
//             'core.bundle',
//             'wraps.bundle',
//             'mixins.bundle',
//             'orcid.bundle'
//           ],
//           paths: PATHS
//         }
//       };
//     });

//     return config;
//   }

//   var configs = getConfigs();
//   Object.keys(configs).forEach(function (key) {
//     baseConfig[key] = configs[key];
//   });

//   var output = '// GENERATED FILE (run grunt generate-require-config)\n\n' +
//     'module.exports =\n' + JSON.stringify(baseConfig, null, 2) + ';'

//   grunt.file.write(path.resolve(__dirname, 'requirejs.js'), output);
//   grunt.log.writeln('Configuration Generated...');

  // uncomment to get the generated output to place in discovery config
  // var mappedIncludes = {};
  // Object.keys(baseConfig).forEach(function (key) {
  //   mappedIncludes[key + '.bundle'] = baseConfig[key].options.include;
  // });
  // console.log(JSON.stringify(mappedIncludes, null, 2));

//   return {};
// }
