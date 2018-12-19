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
    'jquery': 'empty:',
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
    waitSeconds: 0,
    logLevel: 1,
    baseUrl: 'src',
    optimize: 'none',
    optimize: 'none',
    mainConfigFile: 'src/discovery.config.js',
    deps: [],
    stubModules: ['babel', 'es6'],
    create: true,
    paths: PATHS,
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

      addConfig('landing-page', {
        include: [
          'js/apps/discovery/main',
          'js/apps/discovery/router',
          'js/components/application',
          'js/mixins/discovery_bootstrap',
          'js/mixins/api_access',
          'js/components/api_query',
          'js/mixins/dependon',
          'js/components/api_feedback',
          'js/components/api_request',
          'js/components/api_targets',
          'js/components/api_query_updater',
          'js/components/beehive',
          'js/components/pubsub_events',
          'js/components/solr_params',
          'js/components/facade',
          'js/components/pubsub_key',
          'js/mixins/hardened',
          'js/components/default_request',
          'js/components/generic_module',
          'js/components/services_container',
          'js/components/multi_params',
          'js/wraps/discovery_mediator',
          'js/components/query_mediator',
          'js/bugutils/diagnostics',
          'js/wraps/alerts_mediator',
          'js/modules/orcid/module',
          'js/widgets/facet/factory',
          'js/services/api',
          'js/services/pubsub',
          'js/apps/discovery/navigator',
          'js/services/storage',
          'js/components/history_manager',
          'js/components/user',
          'js/components/session',
          'js/page_managers/master',
          'js/components/app_storage',
          'js/components/recaptcha_manager',
          'js/components/csrf_manager',
          'js/components/library_controller',
          'js/components/doc_stash_controller',
          'js/components/feedback_mediator',
          'js/widgets/widget_states',
          'js/components/alerts',
          'js/components/api_response',
          'js/mixins/add_secondary_sort',
          'js/components/json_response',
          'js/components/alerts_mediator',
          'js/modules/orcid/orcid_api',
          'js/widgets/facet/widget',
          'js/widgets/facet/graph-facet/widget',
          'js/services/default_pubsub',
          'js/components/navigator',
          'js/components/persistent_storage',
          'js/widgets/base/base_widget',
          'js/page_managers/controller',
          'js/components/solr_response',
          'js/widgets/facet/actions',
          'js/widgets/facet/reducers',
          'js/widgets/facet/create_store',
          'js/mixins/link_generator_mixin',
          'js/modules/orcid/work',
          'js/modules/orcid/profile',
          'js/components/transition',
          'js/components/transition_catalog',
          'js/mixins/widget_mixin_method',
          'js/mixins/widget_state_manager',
          'js/page_managers/three_column_view',
          'js/page_managers/view_mixin',
          'js/mixins/openurl_generator',
          'js/mixins/widget_utility',
          'js/widgets/alerts/widget',
          'js/widgets/navbar/widget',
          'js/widgets/footer/widget',
          'js/wraps/landing_page_manager/landing_page_manager',
          'js/widgets/alerts/modal_view',
          'js/widgets/alerts/page_top_alert',
          'js/page_managers/toc_controller',
          'js/page_managers/one_column_view',
          'js/page_managers/toc_widget',
          'js/widgets/search_bar/search_bar_widget',
          'js/widgets/classic_form/widget',
          'js/widgets/paper_search_form/widget',
          'js/components/query_builder/plugin',
          'js/mixins/formatter',
          'js/widgets/search_bar/autocomplete',
          'js/components/query_validator',
          'js/widgets/paper_search_form/topterms',
          'js/components/query_builder/rules_translator',
        ]
      });

      addConfig('app', {
        include: [
          'analytics',
          'router',
          'discovery.vars',
          'js/apps/discovery/main',
          'async',
          'cache',
          // 'babel',
          // 'es6',
          'hbs',
          'immutable',
          'jquery-querybuilder',
          'redux-immutable',
          'utils'
        ].concat(getByGlob([
          'src/js/apps/**/*.js',
          'src/js/components/**/*.js',
          'src/js/mixins/**/*.js',
          'src/js/modules/**/*.js',
          'src/js/bugutils/**.*.js',
          'src/js/page_managers/**/*.js',
          'src/js/services/**/*.js',
          'src/js/widgets/**/*widget*.js',
          'src/js/wraps/**/*.js',
          '!src/js/apps/bumblebox/**/*',
          '!src/js/widgets/hello_world/**/*',
          '!src/js/components/analytics.js',
          '!src/js/apps/discovery/router.js'
        ])),
        exclude: [
          '../build/landing-page.bundle'
        ]
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
