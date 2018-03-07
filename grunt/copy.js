'use strict';
/**
 * Options for the `jshint` grunt task
 *
 * @module grunt/jshint
 */
module.exports = function (grunt) {

  var rename = function (name) {
    return function (dest, src) {
      return dest + src.replace(name, 'index');
    }
  };

  return {
    libraries: {
      files: [

        // Lodash
        {
          cwd: 'node_modules/lodash/dist',
          src: 'lodash.min.js',
          dest: 'src/libs/lodash/',
          expand: true,
          flatten: true,
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

        // Requirejs/plugins#json
        {
          cwd: 'node_modules/requirejs-plugins/src',
          src: 'json.js',
          dest: 'src/libs/requirejs/plugins/json/',
          expand: true,
          rename: rename('json')
        },

        // React
        {
          cwd: 'node_modules/react/dist',
          src: 'react.min.js',
          dest: 'src/libs/react/',
          expand: true,
          rename: rename('react.min')
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
          rename: rename('react-prop-types')
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
          cwd: 'node_modules/filesaver/src',
          src: 'Filesaver.js',
          dest: 'src/libs/filesaver/',
          expand: true,
          rename: rename('Filesaver')
        },

        // Backbone
        {
          cwd: 'node_modules/backbone',
          src: 'backbone-min.js',
          dest: 'src/libs/backbone/',
          expand: true,
          rename: rename('backbone-min')
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

        // Cache
        {
          cwd: 'node_modules/dsjslib/lib',
          src: 'Cache.js',
          dest: 'src/libs/cache/',
          expand: true,
          rename: rename('Cache')
        },

        // Enzyme
        {
          cwd: 'node_modules/enzyme/build',
          src: '*.js',
          dest: 'src/libs/enzyme/',
          expand: true
        },

        // Bootstrap JS
        {
          cwd: 'node_modules/bootstrap-sass/assets',
          src: 'bootstrap.min.js',
          dest: 'src/libs/bootstrap/',
          expand: true,
          rename: rename('bootstrap.min')
        },

        // Bootstrap Styles
        {
          cwd: 'node_modules/bootstrap-sass/assets/stylesheets',
          src: ['**'],
          dest: 'src/styles/sass/bootstrap/',
          expand: true,
          rename: rename('_bootstrap')
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
          dest: 'src/styles/jqueryui/',
          expand: true
        },


        // {
        //   src: 'bower_components/marionette/lib/*',
        //   dest: 'src/libs/marionette/',
        //   expand: true,
        //   flatten: true
        // },
        // {
        //   src: 'bower_components/backbone.babysitter/lib/*',
        //   dest: 'src/libs/backbone.babysitter/',
        //   expand: true,
        //   flatten: true
        // },
        // {
        //   src: [
        //     'bower_components/bootstrap/dist/css/*',
        //     'bower_components/bootstrap/dist/fonts/*',
        //     'bower_components/bootstrap/dist/js/*'
        //   ],
        //   dest: 'src/libs/bootstrap/',
        //   expand: true,
        //   flatten: true
        // },
        // {
        //   src: ['bower_components/d3/*.js'],
        //   dest: 'src/libs/d3/',
        //   expand: true,
        //   flatten: true
        // },
        // {
        //   src: ['bower_components/requirejs-plugins/src/*.js'],
        //   dest: 'src/libs/requirejs-plugins/',
        //   expand: true,
        //   flatten: true
        // },
        //
        // {
        //   src: ['bower_components/fontawesome/scss/*'],
        //   dest: 'src/libs/fontawesome/scss/',
        //   expand: true,
        //   flatten: true
        // },
        // {
        //   src: ['bower_components/fontawesome/fonts/*'],
        //   dest: 'src/libs/fontawesome/fonts',
        //   expand: true,
        //   flatten: true
        // },
        // {
        //   cwd: 'bower_components/bootstrap-sass/assets/stylesheets/',
        //   src: ['*', '**'],
        //   expand: true
        // },
        // {
        //   src: ['bower_components/react/*.js'],
        //   dest: 'src/libs/react/',
        //   expand: true,
        //   flatten: true
        // },
        // {
        //   src: ['bower_components/requirejs-babel/*.js'],
        //   dest: 'src/libs/requirejs-babel-plugin/',
        //   expand: true,
        //   flatten: true
        // },
        // {
        //   cwd: 'node_modules/create-react-class',
        //   src: 'create-react-class.js',
        //   dest: 'src/libs/create-react-class/',
        //   expand: true,
        //   rename: function (dest, src) {
        //     return dest + src.replace('create-react-class', 'index');
        //   }
        // },
        // {
        //   cwd: 'node_modules/prop-types',
        //   src: 'prop-types.js',
        //   dest: 'src/libs/react-prop-types/',
        //   expand: true,
        //   rename: function (dest, src) {
        //     return dest + src.replace('prop-types', 'index');
        //   }
        // },
        // {
        //   src: ['bower_components/select2/**/*.js', 'bower_components/select2/**/*.css'],
        //   dest: 'src/libs/select2/',
        //   expand: true,
        //   flatten : true
        // },
        // {
        //   cwd: 'node_modules/jsonpath',
        //   src: 'jsonpath*.js',
        //   dest: 'src/libs/jsonpath',
        //   expand: true
        // },
        // {
        //   cwd: 'node_modules/prop-types',
        //   src: 'prop-types.js',
        //   dest: 'src/libs/react-prop-types/',
        //   expand: true,
        //   rename: function (dest, src) {
        //     return dest + src.replace('prop-types', 'index');
        //   }
        // }
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
