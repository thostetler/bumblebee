/* eslint-disable global-require */
/**
 * Webpack entry point for the Discovery application
 *
 * This file replaces the dynamic loading in main.js with static imports
 * for webpack compatibility.
 */

// Import core dependencies
import Router from 'router';
import Application from 'js/components/application';
import DiscoveryBootstrap from 'js/mixins/discovery_bootstrap';
import ApiAccess from 'js/mixins/api_access';
import ApiFeedback from 'js/components/api_feedback';
import analytics from 'analytics';

// Import configuration
import config from 'config/discovery.config';

// Import all controllers
import FeedbackMediator from 'js/wraps/discovery_mediator';
import QueryMediator from 'js/components/query_mediator';
import Diagnostics from 'js/bugutils/diagnostics';
import AlertsController from 'js/wraps/alerts_mediator';
import Orcid from 'js/modules/orcid/module';
import SecondOrderController from 'js/components/second_order_controller';
import HotkeysController from 'js/components/hotkeys_controller';
import Experiments from 'js/components/experiments';

// Import all services
import Api from 'js/services/api';
import PubSub from 'js/services/pubsub';
import Navigator from 'js/apps/discovery/navigator';
import PersistentStorage from 'js/services/storage';
import HistoryManager from 'js/components/history_manager';

// Import all objects
import User from 'js/components/user';
import Session from 'js/components/session';
import DynamicConfig from 'config/discovery.vars';
import MasterPageManager from 'js/page_managers/master';
import AppStorage from 'js/components/app_storage';
import CSRFManager from 'js/components/csrf_manager';
import LibraryController from 'js/components/library_controller';
import DocStashController from 'js/components/doc_stash_controller';
import Utils from 'utils';

// Import all modules
import FacetFactory from 'js/widgets/facet/factory';

// Import all widgets
import LandingPage from 'js/wraps/landing_page_manager/landing_page_manager';
import SearchPage from 'js/wraps/results_page_manager';
import DetailsPage from 'js/wraps/abstract_page_manager/abstract_page_manager';
import AuthenticationPage from 'js/wraps/authentication_page_manager';
import SettingsPage from 'js/wraps/user_settings_page_manager/user_page_manager';
import OrcidPage from 'js/wraps/orcid_page_manager/orcid_page_manager';
import OrcidInstructionsPage from 'js/wraps/orcid-instructions-page-manager/manager';
import ReactPageManager from 'js/react/PageManager';
import LibrariesPage from 'js/wraps/libraries_page_manager/libraries_page_manager';
import HomePage from 'js/wraps/home_page_manager/home_page_manager';
import PublicLibrariesPage from 'js/wraps/public_libraries_page_manager/public_libraries_manager';
import ErrorPage from 'js/wraps/error_page_manager/error_page_manager';
import Authentication from 'js/widgets/authentication/widget';
import UserSettings from 'js/widgets/user_settings/widget';
import UserPreferences from 'js/widgets/preferences/widget';
import LibraryImport from 'js/widgets/library_import/widget';
import BreadcrumbsWidget from 'js/widgets/filter_visualizer/widget';
import NavbarWidget from 'js/widgets/navbar/widget';
import UserNavbarWidget from 'js/widgets/user_navbar/widget';
import AlertsWidget from 'js/widgets/alerts/widget';
import ClassicSearchForm from 'js/widgets/classic_form/widget';
import SearchWidget from 'js/widgets/search_bar/search_bar_widget';
import PaperSearchForm from 'js/widgets/paper_search_form/widget';
import Results from 'js/widgets/results/widget';
import QueryInfo from 'js/widgets/query_info/query_info_widget';
import QueryDebugInfo from 'js/widgets/api_query/widget';
import ExportWidget from 'js/widgets/export/widget';
import Sort from 'js/widgets/sort/widget';
import ExportDropdown from 'js/wraps/export_dropdown';
import VisualizationDropdown from 'js/wraps/visualization_dropdown';
import AuthorNetwork from 'js/wraps/author_network';
import PaperNetwork from 'js/wraps/paper_network';
import ConceptCloud from 'js/widgets/wordcloud/widget';
import BubbleChart from 'js/widgets/bubble_chart/widget';
import AuthorAffiliationTool from 'js/widgets/author_affiliation_tool/widget';

// Create a static configuration object that matches the structure expected by the Application class
const staticConfig = {
  core: {
    controllers: {
      FeedbackMediator,
      QueryMediator,
      Diagnostics,
      AlertsController,
      Orcid,
      SecondOrderController,
      HotkeysController,
      Experiments
    },
    services: {
      Api,
      PubSub,
      Navigator,
      PersistentStorage,
      HistoryManager
    },
    objects: {
      User,
      Session,
      DynamicConfig,
      MasterPageManager,
      AppStorage,
      CSRFManager,
      LibraryController,
      DocStashController,
      Utils
    },
    modules: {
      FacetFactory
    }
  },
  widgets: {
    LandingPage,
    SearchPage,
    DetailsPage,
    AuthenticationPage,
    SettingsPage,
    OrcidPage,
    OrcidInstructionsPage,
    ReactPageManager,
    LibrariesPage,
    HomePage,
    PublicLibrariesPage,
    ErrorPage,
    Authentication,
    UserSettings,
    UserPreferences,
    LibraryImport,
    BreadcrumbsWidget,
    NavbarWidget,
    UserNavbarWidget,
    AlertsWidget,
    ClassicSearchForm,
    SearchWidget,
    PaperSearchForm,
    Results,
    QueryInfo,
    QueryDebugInfo,
    ExportWidget,
    Sort,
    ExportDropdown,
    VisualizationDropdown,
    AuthorNetwork,
    PaperNetwork,
    ConceptCloud,
    BubbleChart,
    AuthorAffiliationTool
  }
};

// Initialize the application
const updateProgress = typeof window.__setAppLoadingProgress === 'function'
  ? window.__setAppLoadingProgress
  : function() {};

Application.prototype.shim();

// Check if we're in debug mode
const debug = window.location.href.indexOf('debug=true') > -1;

// Create the application instance
const app = new (Application.extend(DiscoveryBootstrap))({
  debug,
  timeout: 60 * 1000 // 60 seconds
});

// Instead of dynamically loading modules, we'll register them directly
const startApp = function() {
  updateProgress(80, 'App Loaded');

  // Register the statically imported modules
  app._registerLoadedModules('controllers', staticConfig.core.controllers);
  app._registerLoadedModules('services', staticConfig.core.services);
  app._registerLoadedModules('objects', staticConfig.core.objects);
  app._registerLoadedModules('modules', staticConfig.core.modules);

  // Register widgets
  app._registerLoadedModules('widgets', staticConfig.widgets);

  // Activate all loaded modules
  app.activate();

  const pubsub = app.getService('PubSub');
  pubsub.publish(pubsub.getCurrentPubSubKey(), pubsub.APP_LOADED);

  // Set some important urls, parameters before doing anything
  app.configure();

  updateProgress(95, 'Finishing Up...');
  app.bootstrap().done(function(data) {
    updateProgress(100);

    app.onBootstrap(data);

    const dynConf = app.getObject('DynamicConfig');
    if (dynConf && dynConf.debugExportBBB) {
      window.bbb = app;
    }

    pubsub.publish(pubsub.getCurrentPubSubKey(), pubsub.APP_BOOTSTRAPPED);

    pubsub.publish(pubsub.getCurrentPubSubKey(), pubsub.APP_STARTING);
    app.start(Router).done(function() {
      pubsub.publish(pubsub.getCurrentPubSubKey(), pubsub.APP_STARTED);

      // Rest of the application initialization code...
      // (Copy the rest of the initialization code from main.js)
    });
  });
};

// Start the application
startApp();
