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
  'analytics',
  'es5-shim'
], function (Router,
  Application,
  DiscoveryBootstrap,
  ApiAccess,
  analytics) {


  var config = {

    core: {
      controllers: {
        FeedbackMediator: 'js/wraps/discovery_mediator',
        QueryMediator: 'js/components/query_mediator',
        Diagnostics: 'js/bugutils/diagnostics',
        AlertsController: 'js/wraps/alerts_mediator',
        Orcid: 'js/modules/orcid/module'
      },
      services: {
        Api: 'js/services/api',
        PubSub: 'js/services/pubsub',
        Navigator: 'js/apps/discovery/navigator',
        PersistentStorage: 'js/services/storage',
        HistoryManager: 'js/components/history_manager'
      },
      objects: {
        User: 'js/components/user',
        Session: 'js/components/session',
        DynamicConfig: 'discovery.vars',
        MasterPageManager: 'js/page_managers/master',
        AppStorage: 'js/components/app_storage',
        RecaptchaManager: 'js/components/recaptcha_manager',
        CSRFManager: "js/components/csrf_manager",
        LibraryController: 'js/components/library_controller',
        DocStashController: 'js/components/doc_stash_controller'
      },
      modules: {
        FacetFactory: 'js/widgets/facet/factory'
      }
    },
    widgets: {
      LandingPage: 'js/wraps/landing_page_manager/landing_page_manager',
      SearchPage: 'js/wraps/results_page_manager',
      DetailsPage: 'js/wraps/abstract_page_manager/abstract_page_manager',
      AuthenticationPage: 'js/wraps/authentication_page_manager',
      SettingsPage: 'js/wraps/user_settings_page_manager/user_page_manager',
      OrcidPage: 'js/wraps/orcid_page_manager/orcid_page_manager',
      OrcidInstructionsPage: 'js/wraps/orcid-instructions-page-manager/manager',

      LibrariesPage: 'js/wraps/libraries_page_manager/libraries_page_manager',
      HomePage: 'js/wraps/home_page_manager/home_page_manager',
      PublicLibrariesPage: 'js/wraps/public_libraries_page_manager/public_libraries_manager',
      ErrorPage: 'js/wraps/error_page_manager/error_page_manager',

      Authentication: 'js/widgets/authentication/widget',
      UserSettings: 'js/widgets/user_settings/widget',
      UserPreferences: 'js/widgets/preferences/widget',
      LibraryImport: 'js/widgets/library_import/widget',
      BreadcrumbsWidget: 'js/widgets/filter_visualizer/widget',
      NavbarWidget: 'js/widgets/navbar/widget',
      UserNavbarWidget: 'js/widgets/user_navbar/widget',
      AlertsWidget: 'js/widgets/alerts/widget',
      ClassicSearchForm: 'js/widgets/classic_form/widget',
      SearchWidget: 'js/widgets/search_bar/search_bar_widget',
      PaperSearchForm: 'js/widgets/paper_search_form/widget',
      Results: 'js/widgets/results/widget',
      QueryInfo: 'js/widgets/query_info/query_info_widget',
      QueryDebugInfo: 'js/widgets/api_query/widget',
      ExportWidget: 'js/widgets/export/widget.jsx',
      Sort: 'js/widgets/sort/widget.jsx',
      ExportDropdown: 'js/wraps/export_dropdown',
      VisualizationDropdown: 'js/wraps/visualization_dropdown',
      AuthorNetwork: 'js/wraps/author_network',
      PaperNetwork: 'js/wraps/paper_network',
      ConceptCloud: 'js/widgets/wordcloud/widget',
      BubbleChart: 'js/widgets/bubble_chart/widget',
      AuthorAffiliationTool: 'js/widgets/author_affiliation_tool/widget.jsx',

      Metrics: 'js/widgets/metrics/widget',
      CitationHelper: 'js/widgets/citation_helper/widget',
      OrcidBigWidget: 'js/modules/orcid/widget/widget',
      OrcidSelector: 'js/widgets/orcid-selector/widget.jsx',

      AffiliationFacet: 'js/wraps/affiliation_facet',
      AuthorFacet: 'js/wraps/author_facet',
      BibgroupFacet: 'js/wraps/bibgroup_facet',
      BibstemFacet: 'js/wraps/bibstem_facet',
      DataFacet: 'js/wraps/data_facet',
      DatabaseFacet: 'js/wraps/database_facet',
      GrantsFacet: 'js/wraps/grants_facet',
      KeywordFacet: 'js/wraps/keyword_facet',
      ObjectFacet: 'js/wraps/simbad_object_facet',
      NedObjectFacet: 'js/wraps/ned_object_facet',
      RefereedFacet: 'js/wraps/refereed_facet',
      VizierFacet: 'js/wraps/vizier_facet',
      GraphTabs: 'js/wraps/graph_tabs',
      FooterWidget: 'js/widgets/footer/widget',
      PubtypeFacet: 'js/wraps/pubtype_facet',

      ShowAbstract: 'js/widgets/abstract/widget',
      ShowGraphics: 'js/widgets/graphics/widget',
      ShowGraphicsSidebar: 'js/wraps/sidebar-graphics-widget',
      ShowReferences: 'js/wraps/references',
      ShowCitations: 'js/wraps/citations',
      ShowCoreads: 'js/wraps/coreads',
      MetaTagsWidget: 'js/widgets/meta_tags/widget',
      //can't camel case because router only capitalizes first letter
      ShowTableofcontents: 'js/wraps/table_of_contents',
      ShowResources: 'js/widgets/resources/widget.jsx',
      ShowAssociated: 'js/widgets/associated/widget.jsx',
      ShowRecommender: 'js/widgets/recommender/widget',
      ShowMetrics: 'js/wraps/paper_metrics',
      ShowPaperExport: 'js/wraps/paper_export',
      ShowLibraryAdd: 'js/wraps/abstract_page_library_add/widget',

      IndividualLibraryWidget: 'js/widgets/library_individual/widget',
      AllLibrariesWidget: 'js/widgets/libraries_all/widget',
      LibraryListWidget: 'js/widgets/library_list/widget'
    },
    plugins: {}
  }


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
  var defer = app.loadModules(config);

  updateProgress(20, 'Starting Application');

  // after they are loaded; we'll kick off the application
  defer.done(function () {
    updateProgress(50, 'Modules Loaded');
    var timeLoaded = Date.now();

    analytics('send', 'event', 'timer', 'modules-loaded', timeLoaded - timeStart);

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
  }).fail(function () {
    analytics('send', 'event', 'introspection', 'failed-reloading', arguments);

    if (debug) {
      // so error messages remain in the console
      return;
    }
    // if we failed loading, retry *once again* (and give up eventually)
    app.reload('404.html');
  });
});


// define(['config', 'module'], function (config, module) {
// });
