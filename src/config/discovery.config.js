// Main config file for the Discovery application
require.config({
  // Initialize the application with the main application file or if we run
  // as a test, then load the test unittests
  deps: (function() {
    if (typeof window !== 'undefined' && window.skipMain) {
      return ['common.config'];
    } else {
      return ['config/common.config', 'js/apps/discovery/main'];
    }
  })(),

  //this will be overridden in the compiled file
  waitSeconds: 30,

  // Configuration we want to make available to modules of ths application
  // see: http://requirejs.org/docs/api.html#config-moduleconfig
  config: {
    es6: {
      modules: undefined,
    },

    'js/components/persistent_storage': {
      // the unique namespace under which the local storage will be created
      // so every new instance of the storage will be saving its data into
      // <namespace>[other-name]
      namespace: 'bumblebee',
    },

    'js/apps/discovery/main': {
      core: {
        controllers: {
          FeedbackMediator: 'js/wraps/discovery_mediator',
          QueryMediator: 'js/components/query_mediator',
          Diagnostics: 'js/bugutils/diagnostics',
          AlertsController: 'js/wraps/alerts_mediator',
          Orcid: 'js/modules/orcid/module',
          SecondOrderController: 'js/components/second_order_controller',
        },
        services: {
          Api: 'js/services/api',
          PubSub: 'js/services/pubsub',
          Navigator: 'js/apps/discovery/navigator',
          PersistentStorage: 'js/services/storage',
          HistoryManager: 'js/components/history_manager',
        },
        objects: {
          User: 'js/components/user',
          Session: 'js/components/session',
          DynamicConfig: 'config/discovery.vars',
          MasterPageManager: 'js/page_managers/master',
          AppStorage: 'js/components/app_storage',
          RecaptchaManager: 'recaptcha!js/components/recaptcha_manager',
          CSRFManager: 'js/components/csrf_manager',
          LibraryController: 'js/components/library_controller',
          DocStashController: 'js/components/doc_stash_controller',
        },
        modules: {
          FacetFactory: 'js/widgets/facet/factory',
        },
      },
      widgets: {
        LandingPage: 'js/wraps/landing_page_manager/landing_page_manager',
        SearchPage: 'js/wraps/results_page_manager',
        DetailsPage: 'js/wraps/abstract_page_manager/abstract_page_manager',
        AuthenticationPage: 'js/wraps/authentication_page_manager',
        SettingsPage: 'js/wraps/user_settings_page_manager/user_page_manager',
        OrcidPage: 'js/wraps/orcid_page_manager/orcid_page_manager',
        OrcidInstructionsPage:
          'js/wraps/orcid-instructions-page-manager/manager',

        LibrariesPage: 'js/wraps/libraries_page_manager/libraries_page_manager',
        HomePage: 'js/wraps/home_page_manager/home_page_manager',
        PublicLibrariesPage:
          'js/wraps/public_libraries_page_manager/public_libraries_manager',
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
        ExportWidget: 'es6!js/widgets/export/widget.jsx',
        Sort: 'es6!js/widgets/sort/widget.jsx',
        ExportDropdown: 'js/wraps/export_dropdown',
        VisualizationDropdown: 'js/wraps/visualization_dropdown',
        AuthorNetwork: 'js/wraps/author_network',
        PaperNetwork: 'js/wraps/paper_network',
        ConceptCloud: 'js/widgets/wordcloud/widget',
        BubbleChart: 'js/widgets/bubble_chart/widget',
        AuthorAffiliationTool:
          'es6!js/widgets/author_affiliation_tool/widget.jsx',

        Metrics: 'js/widgets/metrics/widget',
        CitationHelper: 'js/widgets/citation_helper/widget',
        OrcidBigWidget: 'js/modules/orcid/widget/widget',
        OrcidSelector: 'es6!js/widgets/orcid-selector/widget.jsx',

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
        ShowSimilar: 'js/wraps/similar',
        MetaTagsWidget: 'js/widgets/meta_tags/widget',
        //can't camel case because router only capitalizes first letter
        ShowToc: 'js/wraps/table_of_contents',
        ShowResources: 'es6!js/widgets/resources/widget.jsx',
        ShowAssociated: 'es6!js/widgets/associated/widget.jsx',
        ShowRecommender: 'js/widgets/recommender/widget',
        ShowMetrics: 'js/wraps/paper_metrics',
        ShowExportcitation: 'js/wraps/paper_export',
        ShowLibraryAdd: 'js/wraps/abstract_page_library_add/widget',

        IndividualLibraryWidget: 'js/widgets/library_individual/widget',
        LibraryActionsWidget: 'es6!js/widgets/library_actions/widget.jsx',
        AllLibrariesWidget: 'js/widgets/libraries_all/widget',
        LibraryListWidget: 'js/widgets/library_list/widget',
      },
      plugins: {},
    },
  },

  // Configuration for the facades (you can pick specific implementation, just for your
  // application) see http://requirejs.org/docs/api.html#config-map
  map: {
    '*': {
      pubsub_service_impl: 'js/services/default_pubsub',
    },
  },

  paths: {
    router: 'js/apps/discovery/router',
    analytics: 'js/components/analytics',
    underscore: 'libs/lodash/lodash.compat',
    async: 'libs/requirejs-plugins/async',
    babel: 'libs/requirejs-babel-plugin/babel-5.8.34.min',
    backbone: 'libs/backbone/backbone',
    'backbone-validation': 'libs/backbone-validation/backbone-validation',
    'backbone.stickit': 'libs/backbone.stickit/backbone.stickit',
    'backbone.wreqr': 'libs/backbone.wreqr/lib/backbone.wreqr',
    bootstrap: 'libs/bootstrap/bootstrap',
    bowser: 'libs/bowser/index',
    cache: 'libs/dsjslib/lib/Cache',
    classnames: '../bower_components/classnames/index',
    clipboard: 'libs/clipboard/clipboard',
    'create-react-class': 'libs/create-react-class/index',
    d3: 'libs/d3/d3.min',
    'd3-cloud': 'libs/d3-cloud/d3.layout.cloud',
    enzyme: 'libs/enzyme/enzyme',
    'es5-shim': 'libs/es5-shim/es5-shim',
    es6: 'libs/requirejs-babel-plugin/es6',
    filesaver: 'libs/file-saver/index',
    'google-analytics': ['libs/g', 'data:application/javascript,'],
    hbs: 'libs/require-handlebars-plugin/hbs',
    jquery: 'libs/jquery/jquery',
    'jquery-querybuilder': 'libs/jQuery-QueryBuilder/query-builder',
    'jquery-ui': 'libs/jqueryui/jquery-ui',
    jsonpath: 'libs/jsonpath/jsonpath',
    marionette: 'libs/marionette/backbone.marionette',
    mathjax:
      'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.6/MathJax.js?config=TeX-AMS_HTML&amp;delayStartupUntil=configured',
    moment: 'libs/momentjs/moment',
    'persist-js': 'libs/persist-js/src/persist',
    react: 'libs/react/index',
    'react-bootstrap': 'libs/react-bootstrap/index',
    'react-dom': 'libs/react-dom/index',
    'react-prop-types': 'libs/react-prop-types/index',
    'react-redux': 'libs/react-redux/index',
    recaptcha: 'js/plugins/recaptcha',
    redux: 'libs/redux/index',
    'redux-thunk': 'libs/redux-thunk/index',
    select2: 'libs/select2/select2',
    sprintf: 'libs/sprintf/sprintf',
    utils: 'js/utils',
    reselect: 'libs/reselect',
    mocha: 'libs/mocha/mocha',
    chai: 'bower_components/chai/chai',
    sinon: 'https://cdnjs.cloudflare.com/ajax/libs/sinon.js/1.9.0/sinon.min',
    es5shim: 'node_modules/es5-shim/es5-shim.min',
  },

  hbs: {
    templateExtension: 'html',
    helpers: false,
  },

  shim: {
    Backbone: {
      deps: ['backbone'],
      exports: 'Backbone',
    },
    'backbone.stickit': {
      deps: ['backbone'],
    },
    'backbone-validation': {
      deps: ['backbone'],
    },
    bootstrap: {
      deps: ['jquery', 'jquery-ui'],
    },
    backbone: {
      deps: ['jquery', 'underscore'],
    },

    marionette: {
      deps: ['jquery', 'underscore', 'backbone'],
      exports: 'Marionette',
    },

    cache: {
      exports: 'Cache',
    },

    mocha: {
      exports: 'mocha',
    },

    filesaver: {
      exports: 'saveAs',
    },

    d3: {
      exports: 'd3',
    },

    'd3-cloud': {
      deps: ['d3'],
    },

    'google-analytics': {
      exports: '__ga__',
    },

    'jquery-ui': {
      deps: ['jquery'],
    },

    'jquery-querybuilder': {
      deps: ['jquery'],
    },

    sprintf: {
      exports: 'sprintf',
    },

    'persist-js': {
      exports: 'Persist',
    },
  },
});
