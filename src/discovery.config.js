  // Main config file for the Discovery application
require.config({

  baseUrl: '.',
  // Initialize the application with the main application file or if we run
  // as a test, then load the test unittests
  deps: (function(){

    if (typeof window !== "undefined" && window.skipMain){
      return [];
    }
    else {
      return [ 'js/apps/discovery/main'];
    }

  }()),

  //this will be overridden in the compiled file
  waitSeconds: 30,

  // Configuration we want to make available to modules of ths application
  // see: http://requirejs.org/docs/api.html#config-moduleconfig
  config: {

    'es6': {
      modules: undefined
    },

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

    //TODO: these libs will need manual optimization (they dont come with minified sources)
    //TODO: require-handlebars-js, d3-cloud, jquery-hoverIntent, dsjslib/cache, query-builder

    // bumblebee components (here we'll lists simple names), paths are relative
    // to the config (the module that bootstraps our application; look at the html)
    // as a convention, all modules should be loaded using 'symbolic' names
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

    'prop-types': './libs/react/prop-types/index',

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

    'json2': './libs/json2/index'

    // 3rd party dependencies
    // I can't for the life of my figure out how to swap non-minified libs in dev
    // to minified libs in the r.js optimize task
    // 'async': './libs/requirejs-plugins/async',
    // 'babel': './libs/requirejs-babel-plugin/babel-5.8.34.min',
    // 'backbone': './libs/backbone/backbone',
    // 'backbone-validation': './libs/backbone-validation/backbone-validation',
    // // 'backbone.babysitter' : './libs/backbone.babysitter/backbone.babysitter',
    // // 'backbone.eventbinder' : 'libs/backbone.eventbinder/backbone.eventbinder',
    // 'backbone.stickit' : './libs/backbone.stickit/backbone.stickit',
    // // 'backbone.wreqr' : './libs/backbone.wreqr/lib/backbone.wreqr',
    // 'bootstrap': './libs/bootstrap/bootstrap',
    // 'cache': './libs/dsjslib/lib/Cache',
    // 'chai': '../bower_components/chai/chai',
    // 'classnames': '../bower_components/classnames/index',
    // 'clipboard': './libs/clipboard/clipboard',
    // 'create-react-class': './libs/create-react-class/index',
    // 'd3':'./libs/d3/d3',
    // 'd3-cloud' : './libs/d3-cloud/d3.layout.cloud',
    // 'enzyme': './libs/enzyme/enzyme',
    // 'es5-shim' : './libs/es5-shim/es5-shim',
    // 'es6': './libs/requirejs-babel-plugin/es6',
    // 'filesaver' : './libs/FileSaver/FileSaver',
    // 'google-analytics': "//www.google-analytics.com/analytics",
    // 'google-recaptcha' : '//www.google.com/recaptcha/api.js?&render=explicit&onload=onRecaptchaLoad',
    // 'hbs': './libs/require-handlebars-plugin/hbs',
    // 'jquery' : '//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min',
    // 'jquery-querybuilder': './libs/jQuery-QueryBuilder/query-builder',
    // 'jquery-ui' : '//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min',
    // 'jsonpath': './libs/jsonpath/jsonpath',
    // 'marionette' : './libs/marionette/backbone.marionette',
    // 'mathjax' : '//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_HTML&amp;delayStartupUntil=configured',
    // 'mocha': './libs/mocha/mocha',
    // 'moment' : './libs/momentjs/moment',
    // 'persist-js': './libs/persist-js/src/persist',
    // 'react' : '//cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react-with-addons.min',
    // 'react-backbone': 'libs/react-backbone/react.backbone',
    // 'react-dom' : '//cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react-dom.min',
    // 'react-prop-types': './libs/react-prop-types/index',
    // 'react-redux' : './libs/react-redux/index',
    // 'redux' : './libs/redux/index',
    // 'redux-thunk' : './libs/redux-thunk/index',
    // 'select2' : './libs/select2/select2',
    // 'sinon': '../bower_components/sinon/index',
    // 'sprintf': './libs/sprintf/sprintf',
    // 'squire': '../bower_components/squire/src/Squire'
  },

  hbs: {
    templateExtension: 'html',
    helpers: false
  },

  es6: {
    fileExtension: '.jsx.js'
  },

  babel: {
    presets: ['es2015', 'react'],
    plugins: ['transform-es2015-modules-amd']
  },

  shim: {

    "Backbone": {
      deps: ["backbone"],
      exports: "Backbone"
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
        exports: "MathJax",
        init: function () {
          MathJax.Hub.Config({
            HTML: ["input/TeX","output/HTML-CSS"],
            TeX: { extensions: ["AMSmath.js","AMSsymbols.js"],
              equationNumbers: { autoNumber: "AMS" } },
            extensions: ["tex2jax.js"],
            jax: ["input/TeX","output/HTML-CSS"],
            tex2jax: { inlineMath: [ ['$','$'], ["\\(","\\)"] ],
              displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
              processEscapes: true },
            "HTML-CSS": { availableFonts: ["TeX"],
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

      //eg  (where current is a variable): {{#compare current 1 operator=">"}}

      Handlebars.registerHelper('compare', function (lvalue, rvalue, options) {
        var operators, result, operator;
        if (arguments.length < 3) {
          throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
        }

        if (options === undefined || !options.hash || !options.hash.operator) {
          operator = "===";
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
          throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
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
