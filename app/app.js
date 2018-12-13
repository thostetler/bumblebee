define([
  'services/router',
  'components/application',
  'mixins/discovery_bootstrap',
  'modules.config',
  'styles/manifest.scss',
  'bootstrap-sass'
], function (Router, Application, Bootstrapper, modules) {

  Application.prototype.shim();
  const app = window.app = new (Application.extend(Bootstrapper))({
    debug: false,
    timeout: 30000
  });

  // app.registerModules({
  //   core: {
  //     controllers: {
  //       Orcid: require('modules/orcid/module'),
  //       QueryMediator: require('components/query_mediator'),
  //       AlertsController: require('wraps/alerts_mediator'),
  //       FeedbackMediator: require('wraps/discovery_mediator'),
  //     },
  //     services: {
  //       Api: require('services/api'),
  //       Navigator: require('services/navigator'),
  //       PubSub: require('services/pubsub'),
  //       PersistentStorage: require('services/storage'),
  //       HistoryManager: require('components/history_manager')
  //     },
  //     objects: {
  //       User: require('components/user'),
  //       AppStorage: require('components/app_storage'),
  //       DynamicConfig: require('discovery.vars'),
  //       MasterPageManager: require('page_managers/master'),
  //       Session: require('components/session'),
  //       DocStashController: require('components/doc_stash_controller'),
  //       LibraryController: require('components/library_controller'),
  //       CSRFManager: require('components/csrf_manager'),
  //       RecaptchaManager: require('components/recaptcha_manager'),
  //     }
  //   },
  //   widgets: {
  //     NavbarWidget: require('widgets/navbar/widget'),
  //     FooterWidget: require('widgets/footer/widget'),
  //     AlertsWidget: require('widgets/alerts/widget')
  //   }
  // });
  app.registerModules(modules);
  const pb = app.getService('PubSub');
  const publish = _.partial(_.bind(pb.publish, pb), pb.getCurrentPubSubKey());
  publish(pb.APP_LOADED);
  app.configure();
  publish(pb.APP_STARTING);
  app.start(Router);

  publish(pb.APP_STARTED);
  app.bootstrap().done(function (config) {
    app.onBootstrap(config);
    publish(pb.APP_BOOTSTRAPPED);
  });

  $('body').on('click', 'button.toggle-menu', function (e) {
    var $button = $(e.target),
      $sidebar = $button.parents().eq(1).find('.nav-container');

    $sidebar.toggleClass('show');
    var text = $sidebar.hasClass('show') ? '  <i class="fa fa-close"></i> Close Menu' : ' <i class="fa fa-bars"></i> Show Menu';
    $button.html(text);
  });

  $('body').on('click', '#skip-to-main-content', function (e) {
    e.preventDefault();
  });

  console.log(app);
});
