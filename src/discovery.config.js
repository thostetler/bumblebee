  // Main config file for the Discovery application
require.config({

  baseUrl: '.',
  // Initialize the application with the main application file or if we run
  // as a test, then load the test unittests
  deps: (function(){

    if (typeof window !== 'undefined' && window.skipMain){
      return [];
    }
    else {
      return [ 'js/apps/discovery/main'];
    }

  }()),

  //this will be overridden in the compiled file
  waitSeconds: 90,

  // Configuration we want to make available to modules of ths application
  // see: http://requirejs.org/docs/api.html#config-moduleconfig
  config: {

    'js/components/persistent_storage': {
      // the unique namespace under which the local storage will be created
      // so every new instance of the storage will be saving its data into
      // <namespace>[other-name]
      namespace: 'bumblebee'
    }
  },

  // Configuration for the facades (you can pick specific implementation, just for your
  // application) see http://requirejs.org/docs/api.html#config-map
  map: {
    '*': {
      'pubsub_service_impl': 'js/services/default_pubsub',
      'analytics_config': 'discovery.vars'
    }
  },

  paths: {
    'appModules': './modules.config',
    'main': './js/apps/discovery/main',
    'router': './js/apps/discovery/router',
    'analytics': './js/components/analytics',

    'underscore': [
      'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.2/lodash.min',
      './libs/lodash/index'
    ],

    'async': [
      'https://cdnjs.cloudflare.com/ajax/libs/requirejs-plugins/1.0.3/async.min',
      './libs/requirejs/plugins/async/index'
    ],

    'react': [
      'https://cdnjs.cloudflare.com/ajax/libs/react/16.2.0/umd/react.production.min',
      './libs/react/index'
    ],

    'create-react-class': './libs/react/create-react-class/index',

    'react-prop-types': './libs/react/prop-types/index',

    'react-redux': './libs/react/redux/index',

    'react-dom': './libs/react/dom/index',

    'jsonpath': './libs/jsonpath/index',

    'filesaver': './libs/filesaver/index',

    'backbone': './libs/backbone/index',

    'backbone-validation': './libs/backbone/validation/index',

    'backbone-stickit': './libs/backbone/stickit/index',

    'backbone.radio': './libs/backbone/radio/index',

    'cache': './libs/cache/index',

    'enzyme': './libs/enzyme/index',

    'bootstrap': './libs/bootstrap/index',

    'jquery': './libs/jquery/index',

    'select2': './libs/select2/index',

    'select2/matcher': './libs/select2/matcher/index',

    'babel': './libs/babel/index',

    'es6': './libs/requirejs/plugins/es6/index',

    'moment': './libs/moment/index',

    'hbs': './libs/requirejs/plugins/hbs/index',

    'hbs.json2': './libs/requirejs/plugins/hbs/json2',

    'handlebars': './libs/handlebars/index',

    'd3': './libs/d3/index',

    'mathjax': './libs/mathjax/index',

    'sprintf': './libs/sprintf/index',

    'google-recaptcha': [
      'https://www.google.com/recaptcha/api.js?&render=explicit&onload=onRecaptchaLoad'
    ],

    'google-analytics': [
      'https://www.google-analytics.com/analytics'
    ],

    'text': './libs/requirejs/plugins/text/index',

    'jquery-ui': [
      'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min',
      './libs/jqueryui/core'
    ],

    'persist-js': './libs/persist/index',

    'jquery-querybuilder': './libs/jquery/index',

    'marionette': './libs/backbone/marionette/index',

    'd3-cloud': './libs/d3/cloud/index',

    'redux': './libs/redux/index',

    'redux-thunk': './libs/redux/thunk/index',

    'clipboard': './libs/clipboard/index'
  },

  hbs: {
    templateExtension: 'html',
    helpers: false
  },

  es6: {
    // fileExtension: '.js'
  },

  babel: {
    presets: ['es2015-loose', 'stage-3', 'react']
  },

  shim: {

    'Backbone': {
      deps: ['backbone'],
      exports: 'Backbone'
    },
    'mocha': {
      exports: 'mocha'
    },
    'backbone-stickit' : {
      deps : ['backbone']
    },
    'backbone-validation' : {
      deps : ['backbone']
    },
    'bootstrap' : {
      deps: ['jquery', 'jquery-ui']
    },
    // This is required to ensure Backbone works as expected within the AMD
    // environment.
    'backbone': {
      // These are the two hard dependencies that will be loaded first.
      deps: ['jquery', 'underscore']
    },

    marionette : {
      deps : ['jquery', 'underscore', 'backbone'],
      exports : 'Marionette'
    },

    cache: {
      exports: 'Cache'
    },

    'jquery-querybuilder': {
      deps: ['jquery']

    },

    'd3-cloud' : {
      deps :['d3']
    },
    
    'jquery-ui' : {
      deps: ['jquery']
    },

    'sprintf': {
      exports: 'sprintf'
    },

    'persist-js': {
      exports: 'Persist'
    },

    mathjax: {
        exports: 'MathJax',
        init: function () {
          MathJax.Hub.Config({
            HTML: ['input/TeX','output/HTML-CSS'],
            TeX: { extensions: ['AMSmath.js','AMSsymbols.js'],
              equationNumbers: { autoNumber: 'AMS' } },
            extensions: ['tex2jax.js'],
            jax: ['input/TeX','output/HTML-CSS'],
            tex2jax: { inlineMath: [ ['$','$'], ['\\(','\\)'] ],
              displayMath: [ ['$$','$$'], ['\\[','\\]'] ],
              processEscapes: true },
            'HTML-CSS': { availableFonts: ['TeX'],
              linebreaks: { automatic: true } }
          });
          MathJax.Hub.Startup.onload();
          return MathJax;
        }
    }
  },

  callback: function() {
    require(['handlebars'], function (Handlebars) {

      // register helpers
      // http://doginthehat.com.au/2012/02/comparison-block-helper-for-handlebars-templates/#comment-44

      //eg  (where current is a variable): {{#compare current 1 operator='>'}}

      Handlebars.registerHelper('compare', function (lvalue, rvalue, options) {
        var operators, result, operator;
        if (arguments.length < 3) {
          throw new Error('Handlerbars Helper \'compare\' needs 2 parameters');
        }

        if (options === undefined || !options.hash || !options.hash.operator) {
          operator = '===';
        }
        else {
          operator = options.hash.operator;
        }

        operators = {
          '==': function (l, r) { return l == r; },
          '===': function (l, r) { return l === r; },
          '!=': function (l, r) { return l != r; },
          '!==': function (l, r) { return l !== r; },
          '<': function (l, r) { return l < r; },
          '>': function (l, r) { return l > r; },
          '<=': function (l, r) { return l <= r; },
          '>=': function (l, r) { return l >= r; },
          'typeof': function (l, r) { return typeof l == r; }
        };
        if (!operators[operator]) {
          throw new Error('Handlerbars Helper \'compare\' doesn\'t know the operator ' + operator);
        }
        result = operators[operator](lvalue, rvalue);
        if (result) {
          return options.fn(this);
        } else {
          return options.inverse(this);
        }
      });
    });

    //set validation callbacks used by authentication and user settings widgets
    require(['backbone-validation'], function () {

      //this allows for instant validation of form fields using the backbone-validation plugin
      _.extend(Backbone.Validation.callbacks, {
        valid: function (view, attr, selector) {
          var $el = view.$('input[name=' + attr + ']');

           $el.closest('.form-group')
              .removeClass('has-error')
              .find('.help-block')
              .html('')
              .addClass('no-show');

        },
        invalid: function (view, attr, error, selector) {
          var $el = view.$('[name=' + attr + ']');
          $group = $el.closest('.form-group');

          if (view.submit === true){
            //only show error states if there has been a submit event
            $group.addClass('has-error');
            $group.find('.help-block').html(error).removeClass('no-show');
          }
        }
      });
    });
  }
});
