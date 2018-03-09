// define([
  // 'appModules',
  // "main",
  // "router",
  // "analytics",
  // "underscore",
  // "async",
  // "react",
  // "create-react-class",
  // "react-prop-types",
  // "react-redux",
  // "react-dom",
  // "jsonpath",
  // "filesaver",
  // "backbone",
  // "backbone-validation",
  // "backbone-stickit",
  // "backbone.radio",
  // "cache",
  // "enzyme",
  // "bootstrap",
  // "jquery",
  // "select2",
  // "select2/matcher",
  // "babel",
  // "es6",
  // "moment",
  // "hbs",
  // "hbs.json2",
  // "handlebars",
  // "d3",
  // "mathjax",
  // "sprintf",
  // "google-recaptcha",
  // "google-analytics",
  // "text",
  // "jquery-ui",
  // "persist-js",
  // "jquery-querybuilder",
  // "marionette",
  // "d3-cloud",
  // "redux",
  // "redux-thunk",
  // "clipboard",
  // "es5-shim",
// ], function () {
  // console.log("main", arguments[0]);
  // console.log("router", arguments[1]);
  // console.log("analytics", arguments[2]);
  // console.log("underscore", arguments[3]);
  // console.log("async", arguments[4]);
  // console.log("react", arguments[5]);
  // console.log("create-react-class", arguments[6]);
  // console.log("react-prop-types", arguments[7]);
  // console.log("react-redux", arguments[8]);
  // console.log("react-dom", arguments[9]);
  // console.log("jsonpath", arguments[10]);
  // console.log("filesaver", arguments[11]);
  // console.log("backbone", arguments[12]);
  // console.log("backbone-validation", arguments[13]);
  // console.log("backbone-stickit", arguments[14]);
  // console.log("backbone.radio", arguments[15]);
  // console.log("cache", arguments[16]);
  // console.log("enzyme", arguments[17]);
  // console.log("bootstrap", arguments[18]);
  // console.log("jquery", arguments[19]);
  // console.log("select2", arguments[20]);
  // console.log("select2/matcher", arguments[21]);
  // console.log("babel", arguments[22]);
  // console.log("es6", arguments[23]);
  // console.log("moment", arguments[24]);
  // console.log("hbs", arguments[25]);
  // console.log("hbs.json2", arguments[26]);
  // console.log("handlebars", arguments[27]);
  // console.log("d3", arguments[28]);
  // console.log("mathjax", arguments[29]);
  // console.log("sprintf", arguments[30]);
  // console.log("google-recaptcha", arguments[31]);
  // console.log("google-analytics", arguments[32]);
  // console.log("text", arguments[33]);
  // console.log("jquery-ui", arguments[34]);
  // console.log("persist-js", arguments[35]);
  // console.log("jquery-querybuilder", arguments[36]);
  // console.log("marionette", arguments[37]);
  // console.log("d3-cloud", arguments[38]);
  // console.log("redux", arguments[39]);
  // console.log("redux-thunk", arguments[40]);
  // console.log("clipboard", arguments[41]);
  // console.log("es5-shim", arguments[42]);
// });
/**
 * Discovery application: main bootstrapping routine
 *
 * Here we will bring up to life the discovery application,
 * all configuration is provided through the discovery.config.js
 *
 * Inside the config, there are sections for:
 *
 *  - where to find js libraries
 *  - which widgets to load (for this application)
 *  - which environmental variables are used
 *        (and how to bootstrap run-time values)
 *
 */

define(['appModules'], function(modules) {

  require([
      'router',
      'js/components/application',
      'js/mixins/discovery_bootstrap',
      'js/mixins/api_access',
      'analytics',
      'es5-shim'
    ], function(Router, Application, DiscoveryBootstrap, ApiAccess, analytics) {

      var updateProgress = (typeof window.__setAppLoadingProgress === 'function') ?
        window.__setAppLoadingProgress : function () {};

      Application.prototype.shim();

      // at the beginning, we don't know anything about ourselves...
      var debug = window.location.href.indexOf('debug=true') > -1;

      // app object will load everything
      var app = new (Application.extend(DiscoveryBootstrap))({'debug': debug, timeout: 30000});

      // load the objects/widgets/modules (using discovery.config.js)
      var defer = app.loadModules(modules);

      updateProgress(20, 'Starting Application');

      // after they are loaded; we'll kick off the application
      defer.done(function() {
        updateProgress(50, 'Modules Loaded');

        // this will activate all loaded modules
        app.activate();

        var pubsub = app.getService('PubSub');
        pubsub.publish(pubsub.getCurrentPubSubKey(), pubsub.APP_LOADED);


        // set some important urls, parameters before doing anything
        app.configure();

        updateProgress(95, 'Finishing Up...');
        app.bootstrap().done(function (data) {
          updateProgress(100);

          app.onBootstrap(data);
          pubsub.publish(pubsub.getCurrentPubSubKey(), pubsub.APP_BOOTSTRAPPED);

          pubsub.publish(pubsub.getCurrentPubSubKey(), pubsub.APP_STARTING);
          app.start(Router);
          pubsub.publish(pubsub.getCurrentPubSubKey(), pubsub.APP_STARTED);

          //some global event handlers, not sure if right place
          $("body").on("click", "button.toggle-menu", function(e){
                        var $button = $(e.target),
                             $sidebar =  $button.parents().eq(1).find(".nav-container");

                        $sidebar.toggleClass("show");
                        var text = $sidebar.hasClass("show") ? '  <i class="fa fa-close"></i> Close Menu' : ' <i class="fa fa-bars"></i> Show Menu';
                        $button.html(text);
                     });

          //accessibility: skip to main content
          $("body").on("click", "#skip-to-main-content", function(e){
            e.preventDefault();
          });

          var dynConf = app.getObject('DynamicConfig');
          if (dynConf && dynConf.debugExportBBB) {
            console.log('Exposing Bumblebee as global object: window.bbb');
            window.bbb = app;
          }

          // app is loaded, send timing event

          if (__PAGE_LOAD_TIMESTAMP) {
            var time = new Date() - __PAGE_LOAD_TIMESTAMP;
            analytics('send', {
              hitType: 'timing',
              timingCategory: 'Application',
              timingVar: 'Loaded',
              timingValue: (!isNaN(time)) ? -1 : time
            });
          }
        }).fail(function () {
          app.redirect('500.html');
        });

      }).fail(function() {
        if (debug){
          //so error messages remain in the console
          return
        }
        // if we failed loading, retry *once again* (and give up eventually)
        app.reload('404.html');
      });

    });




});
