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

require([
  'router',
  'js/components/application',
  'js/mixins/discovery_bootstrap',
  'js/mixins/api_access',
  '../../../modules.config',
  'analytics',
  'es5-shim',
  '../../helpers/backbone-validation',
  '../../helpers/d3'
], function (Router,
  Application,
  DiscoveryBootstrap,
  ApiAccess,
  modulesConfig,
  analytics,
) {


  var updateProgress = (typeof window.__setAppLoadingProgress === 'function')
    ? window.__setAppLoadingProgress : function () {};

  var timeStart = Date.now();

  Application.prototype.shim();

  // at the beginning, we don't know anything about ourselves...
  var debug = window.location.href.indexOf('debug=true') > -1;

  // app object will load everything
  var app = new (Application.extend(DiscoveryBootstrap))({
    debug: true,
    timeout: 300000 // 5 minutes
  });

  // load the objects/widgets/modules (using discovery.config.js)
  updateProgress(20, 'Starting Application');
  app.registerModules(modulesConfig);
  app.activate();
  updateProgress(50, 'Modules Loaded');
  var timeLoaded = Date.now();
  analytics('send', 'event', 'timer', 'modules-loaded', timeLoaded - timeStart);

  var pubsub = app.getService('PubSub');
  pubsub.publish(pubsub.getCurrentPubSubKey(), pubsub.APP_LOADED);

  // set some important urls, parameters before doing anything
  app.configure();
  pubsub.publish(pubsub.getCurrentPubSubKey(), pubsub.APP_STARTING);
  app.start(Router);
  pubsub.publish(pubsub.getCurrentPubSubKey(), pubsub.APP_STARTED);

  updateProgress(95, 'Finishing Up...');
  app.bootstrap().done(function (data) {
    updateProgress(100);

    app.onBootstrap(data);
    pubsub.publish(pubsub.getCurrentPubSubKey(), pubsub.APP_BOOTSTRAPPED);

    var getUserData = function () {
      try {
        var beehive = _.isFunction(this.getBeeHive) && this.getBeeHive();
        var user = _.isFunction(beehive.getObject) && beehive.getObject('User');
        if (user) {
          return user.getUserData('USER_DATA');
        }
      } catch (e) {
        // do nothing
      }
      return {};
    }

    // handle user preferences for external link actions
    var updateExternalLinkBehavior = _.debounce(function () {
      var userData = getUserData.call(app);
      var action = userData.externalLinkAction && userData.externalLinkAction.toUpperCase() || 'AUTO';
      if (action === 'OPEN IN CURRENT TAB') {
        var max = 10;
        var timeout;
        (function updateLinks(count) {
          clearTimeout(timeout);
          if (count < max) {
            $('a[target="_blank"]').attr('target', '');
            timeout = setTimeout(updateLinks, 1000, count + 1);
          }
        })(0);
      }
    }, 3000, { leading: true, trailing: false }, false);
    pubsub.subscribe(pubsub.getCurrentPubSubKey(), pubsub.NAVIGATE, updateExternalLinkBehavior);
    updateExternalLinkBehavior();

    analytics('send', 'event', 'timer', 'app-booted', Date.now() - timeLoaded);

    // some global event handlers, not sure if right place
    $('body').on('click', 'button.toggle-menu', function (e) {
      var $button = $(e.target),
        $sidebar = $button.parents().eq(1).find('.nav-container');

      $sidebar.toggleClass('show');
      var text = $sidebar.hasClass('show') ? '  <i class="fa fa-close"></i> Close Menu' : ' <i class="fa fa-bars"></i> Show Menu';
      $button.html(text);
    });

    // accessibility: skip to main content
    $('body').on('click', '#skip-to-main-content', function (e) {
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
        timingValue: time
      });
      if (debug) {
        console.log('Application Started: ' + time + 'ms');
      }
    }
  }).fail(function () {
    analytics('send', 'event', 'introspection', 'failed-load', arguments);

    if (!debug) {
      app.redirect('500.html');
    }
  });
});