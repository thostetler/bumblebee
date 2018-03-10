'use strict';
/**
 * Options for the `jshint` grunt task
 *
 * @module grunt/jshint
 */
module.exports = function (grunt) {

  var rename = function (name, val) {
    return function (dest, src) {
      return dest + src.replace(name, val || 'index');
    }
  };

  return {
    libraries: {
      options: {
        noProcess: ['**/*.{png,gif,jpg,ico,psd,otf,eot,svg,ttf,woff}'],
        process: function (content, src) {

          if (/require-handlebars-plugin\/hbs.js/.test(src)) {
            return content
              .replace(/hbs\//g, '')
              .replace('json2', 'hbs.json2');
          }

          return content;
        }
      },
      files: [

        // Babel
        {
          cwd: 'node_modules/babel-standalone',
          src: 'babel.js',
          dest: 'src/libs/babel/',
          expand: true,
          rename: rename('babel')
        },

        // ES5-shim
        {
          cwd: 'node_modules/es5-shim',
          src: 'es5-shim.min.js',
          dest: 'src/libs/es5-shim/',
          expand: true,
          rename: rename('es5-shim.min')
        },

        // Lodash
        {
          cwd: 'node_modules/lodash/dist',
          src: 'lodash.min.js',
          dest: 'src/libs/lodash/',
          expand: true,
          rename: rename('lodash.min')
        },

        // Requirejs
        {
          cwd: 'node_modules/requirejs',
          src: 'require.js',
          dest: 'src/libs/requirejs/',
          expand: true,
          rename: rename('require')
        },

        // Requirejs/plugins#async
        {
          cwd: 'node_modules/requirejs-plugins/src',
          src: 'async.js',
          dest: 'src/libs/requirejs/plugins/async/',
          expand: true,
          rename: rename('async')
        },

        // RequireJs/plugins#es6
        {
          cwd: 'node_modules/requirejs-babel-plugin',
          src: 'es6.js',
          dest: 'src/libs/requirejs/plugins/es6/',
          expand: true,
          rename: rename('es6')
        },

        // Requirejs/plugins#text
        {
          cwd: 'node_modules/requirejs-plugins/lib',
          src: 'text.js',
          dest: 'src/libs/requirejs/plugins/text/',
          expand: true,
          rename: rename('text')
        },

        // RequireJs/plugins#hbs
        {
          cwd: 'node_modules/require-handlebars-plugin',
          src: ['hbs.js', 'hbs/json2.js'],
          dest: 'src/libs/requirejs/plugins/hbs/',
          expand: true,
          flatten: true,
          rename: rename('hbs')
        },

        // React
        {
          cwd: 'node_modules/react/dist',
          src: 'react-with-addons.min.js',
          dest: 'src/libs/react/',
          expand: true,
          rename: rename('react-with-addons.min')
        },

        // React/create-react-class
        {
          cwd: 'node_modules/create-react-class',
          src: 'create-react-class.js',
          dest: 'src/libs/react/create-react-class/',
          expand: true,
          rename: rename('create-react-class')
        },

        // React/prop-types
        {
          cwd: 'node_modules/prop-types',
          src: 'prop-types.js',
          dest: 'src/libs/react/prop-types/',
          expand: true,
          rename: rename('prop-types')
        },

        // React/redux
        {
          cwd: 'node_modules/react-redux/dist',
          src: 'react-redux.min.js',
          dest: 'src/libs/react/redux/',
          expand: true,
          rename: rename('react-redux.min')
        },

        // React/dom
        {
          cwd: 'node_modules/react-dom/dist',
          src: 'react-dom.min.js',
          dest: 'src/libs/react/dom/',
          expand: true,
          rename: rename('react-dom.min')
        },

        // Jsonpath
        {
          cwd: 'node_modules/jsonpath',
          src: 'jsonpath.min.js',
          dest: 'src/libs/jsonpath/',
          expand: true,
          rename: rename('jsonpath.min')
        },

        // Filesaver
        {
          cwd: 'node_modules/file-saver',
          src: 'FileSaver.min.js',
          dest: 'src/libs/filesaver/',
          expand: true,
          rename: rename('FileSaver.min')
        },

        // Backbone
        {
          cwd: 'node_modules/backbone',
          src: 'backbone.js',
          dest: 'src/libs/backbone/',
          expand: true,
          rename: rename('backbone')
        },

        // Backbone/validation
        {
          cwd: 'node_modules/backbone-validation/dist',
          src: 'backbone-validation-amd-min.js',
          dest: 'src/libs/backbone/validation/',
          expand: true,
          rename: rename('backbone-validation-amd-min')
        },

        // Backbone/stickit
        {
          cwd: 'node_modules/backbone.stickit',
          src: 'backbone.stickit.js',
          dest: 'src/libs/backbone/stickit/',
          expand: true,
          rename: rename('backbone.stickit')
        },

        // Backbone/marionette
        {
          cwd: 'node_modules/backbone.marionette/lib',
          src: 'backbone.marionette.min.js',
          dest: 'src/libs/backbone/marionette/',
          expand: true,
          rename: rename('backbone.marionette.min')
        },

        // Backbone/radio
        {
          cwd: 'node_modules/backbone.radio/build',
          src: 'backbone.radio.min.js',
          dest: 'src/libs/backbone/radio/',
          expand: true,
          rename: rename('backbone.radio.min')
        },

        // Cache
        {
          cwd: 'node_modules/dsjslib/lib',
          src: 'Cache.js',
          dest: 'src/libs/cache/',
          expand: true,
          rename: rename('Cache')
        },

        // jQuery-QueryBuilder JS
        {
          cwd: 'node_modules/jQuery-QueryBuilder/dist',
          src: 'query-builder.min.js',
          dest: 'src/libs/jquery/query-builder/',
          expand: true,
          rename: rename('query-builder.min')
        },

        // jQuery-QueryBuilder Styles
        {
          cwd: 'node_modules/jQuery-QueryBuilder/dist',
          src: 'query-builder.min.css',
          dest: 'src/styles/vendor/jquery-query-builder/',
          expand: true,
          rename: rename('query-builder.min')
        },

        // Bootstrap JS
        {
          cwd: 'node_modules/bootstrap-sass/assets/javascripts',
          src: 'bootstrap.min.js',
          dest: 'src/libs/bootstrap/',
          expand: true,
          rename: rename('bootstrap.min')
        },

        // Bootstrap Styles
        {
          cwd: 'node_modules/bootstrap-sass/assets/stylesheets',
          src: ['**'],
          dest: 'src/styles/vendor/bootstrap/',
          expand: true,
          rename: rename('_bootstrap.scss', 'index.scss')
        },

        // jQuery
        {
          cwd: 'node_modules/jquery/dist',
          src: 'jquery.min.js',
          dest: 'src/libs/jquery/',
          expand: true,
          rename: rename('jquery.min')
        },

        // jQueryui JS
        {
          cwd: 'node_modules/jquery-ui/ui',
          src: ['*.js', 'effects/**', 'widgets/**'],
          dest: 'src/libs/jqueryui/',
          expand: true
        },

        // jQueryui Styles
        {
          cwd: 'node_modules/jquery-ui/themes/base',
          src: ['**'],
          dest: 'src/styles/vendor/jqueryui/',
          expand: true
        },

        // Select2 JS
        {
          cwd: 'node_modules/select2/dist/js',
          src: 'select2.min.js',
          dest: 'src/libs/select2/',
          expand: true,
          rename: rename('select2.min')
        },

        // Select2 JS (Old Matcher)
        {
          cwd: 'node_modules/select2/src/js/select2/compat',
          src: 'matcher.js',
          dest: 'src/libs/select2/matcher/',
          expand: true,
          rename: rename('matcher')
        },

        // Select2 Styles
        {
          cwd: 'node_modules/select2/dist/css',
          src: 'select2.min.css',
          dest: 'src/styles/vendor/select2/',
          expand: true,
          rename: rename('select2.min')
        },

        // Font-Awesome
        {
          cwd: 'node_modules/font-awesome',
          src: ['scss/*', 'fonts/*'],
          dest: 'src/styles/vendor/font-awesome/',
          expand: true,
          rename: rename('font-awesome')
        },

        // Moment
        {
          cwd: 'node_modules/moment/min',
          src: 'moment.min.js',
          dest: 'src/libs/moment/',
          expand: true,
          rename: rename('moment.min')
        },

        // Handlebars
        {
          cwd: 'node_modules/require-handlebars-plugin/hbs/',
          src: 'handlebars.js',
          dest: 'src/libs/handlebars/',
          expand: true,
          rename: rename('handlebars')
        },

        // D3
        {
          cwd: 'node_modules/d3',
          src: 'd3.min.js',
          dest: 'src/libs/d3/',
          expand: true,
          rename: rename('d3.min')
        },

        // D3/cloud
        {
          cwd: 'node_modules/d3-cloud/build',
          src: 'd3.layout.cloud.js',
          dest: 'src/libs/d3/cloud/',
          expand: true,
          rename: rename('d3.layout.cloud')
        },

        // MathJax
        {
          cwd: 'node_modules/mathjax',
          src: [ 'MathJax.js', 'extensions/**', 'jax/**', 'fonts/**' ],
          dest: 'src/libs/mathjax/',
          expand: true,
          rename: rename('MathJax.js', 'index.js')
        },

        // ClipboardJs
        {
          cwd: 'node_modules/clipboard/dist',
          src: 'clipboard.min.js',
          dest: 'src/libs/clipboard/',
          expand: true,
          rename: rename('clipboard.min')
        },

        // SprintF
        {
          cwd: 'node_modules/sprintf-js/dist',
          src: 'sprintf.min.js',
          dest: 'src/libs/sprintf/',
          expand: true,
          rename: rename('sprintf.min')
        },

        // Persist-Js
        {
          cwd: 'node_modules/persist-js',
          src: 'persist-min.js',
          dest: 'src/libs/persist/',
          expand: true,
          rename: rename('persist-min')
        },

        // Redux
        {
          cwd: 'node_modules/redux/dist',
          src: 'redux.min.js',
          dest: 'src/libs/redux/',
          expand: true,
          rename: rename('redux.min')
        },

        // Redux/thunk
        {
          cwd: 'node_modules/redux-thunk/dist',
          src: 'redux-thunk.min.js',
          dest: 'src/libs/redux/thunk/',
          expand: true,
          rename: rename('redux-thunk.min')
        },
      ]
    },

    release: {
      files: [{
        expand: true,
        src: [
          './src/**',
          '!./src/index.html'
        ],
        dest: 'dist/',
        rename: function(dest, src) {
          return dest + src.replace('/src/', '/');
        }
      }]
    },

    discovery_vars: {
      src: 'src/discovery.vars.js.default',
      dest: 'src/discovery.vars.js',
      filter: function () {
        // Only copy if over if it does not exist
        var dest = grunt.task.current.data.dest;
        return !grunt.file.exists(dest);
      }
    },

    keep_original: {
      files: [{
        expand: true,
        src: [
          './dist/index.html',
          'dist/discovery.config.js'
        ],
        dest: 'dist/',
        rename: function(dest, src) {
          var x = src.split('.');
          return x.slice(0, x.length-1).join('.') + '.original.' + x[x.length-1];
        }
      }]
    },

    foo: {
      files: [{
        src: ['./src/js/components/**/*.js'],
        dest: 'dist/',
        expand: true,
        rename: function(dest, src) {
          return dest + src.replace('/src/', '/');
        }
      }]
    },

    //give the concatenated file a cache busting hash
    bumblebee_app : {
      files : [{
        src: ['dist/bumblebee_app.js'],
        dest: 'dist/',
        expand: true,
        rename : function(dest, src){
          var gitDescribe = grunt.file.read('git-describe').trim();
          // find out what version of bbb we are going to assemble
          var tagInfo = gitDescribe.split('-');
          var version;
          if (tagInfo.length == 1) {
            version = tagInfo[0]; // the latest tag is also the latest commit (we'll use tagname v1.x.x)
          }
          else {
            version = tagInfo[2]; // use commit number instead of a tag
          }
          return 'dist/bumblebee_app.' + version + '.js';
        }

      }]
    }
  };
};
