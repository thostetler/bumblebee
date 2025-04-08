// Main config file for the Discovery application
require.config({
  // Initialize the application with the main application file or if we run
  // as a test, then load the test unittests
  deps: (function() {
    if (typeof window !== 'undefined' && window.skipMain) {
      return ['common.config'];
    }
    return ['config/common.config', 'js/apps/discovery/main'];
  })(),

  // this will be overridden in the compiled file
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
          HotkeysController: 'js/components/hotkeys_controller',
          Experiments: 'js/components/experiments',
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
          CSRFManager: 'js/components/csrf_manager',
          LibraryController: 'js/components/library_controller',
          DocStashController: 'js/components/doc_stash_controller',
          Utils: 'utils',
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
        OrcidInstructionsPage: 'js/wraps/orcid-instructions-page-manager/manager',
        ReactPageManager: 'js/react/PageManager',

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
        ShowSimilar: 'js/wraps/similar',
        MetaTagsWidget: 'js/widgets/meta_tags/widget',
        ShowToc: 'js/wraps/table_of_contents',
        ShowResources: 'js/widgets/resources/widget.jsx',
        ShowAssociated: 'js/widgets/associated/widget.jsx',
        ShowRecommender: 'js/widgets/recommender/widget',
        ShowMetrics: 'js/wraps/paper_metrics',
        ShowExportcitation: 'js/wraps/paper_export',
        ShowFeedback: 'reactify!js/react/BumblebeeWidget?FeedbackForms',
        ShowLibraryAdd: 'js/wraps/abstract_page_library_add/widget',

        IndividualLibraryWidget: 'js/widgets/library_individual/widget',
        LibraryActionsWidget: 'js/widgets/library_actions/widget.jsx',
        AllLibrariesWidget: 'js/widgets/libraries_all/widget',
        LibraryListWidget: 'js/widgets/library_list/widget',

        MyAdsFreeform: 'reactify!js/react/BumblebeeWidget?MyAdsFreeform',
        MyAdsDashboard: 'reactify!js/react/BumblebeeWidget?MyAdsDashboard',
        RecommenderWidget: 'reactify!js/react/BumblebeeWidget?Recommender',
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
    // bumblebee components (here we'll lists simple names), paths are relative
    // to the config (the module that bootstraps our application; look at the html)
    // as a convention, all modules should be loaded using 'symbolic' names

    // **********************
    // *** internal paths ***
    // **********************
    router: 'js/apps/discovery/router',
    analytics: 'js/components/analytics',
    utils: 'js/utils',
    reactify: 'js/plugins/reactify',
    cdn: 'js/plugins/cdn',
    es6: 'js/plugins/es6',
    suit: 'shared/dist/index.umd.development',
    // **********************

    // *************************************
    // *** development-only dependencies ***
    // *************************************
    babel: 'libs/babel',
    async: 'libs/requirejs-plugins/async',
    hbs: 'libs/requirejs-plugins/hbs',
    sinon: 'libs/sinon',
    enzyme: 'libs/enzyme',
    mocha: 'libs/mocha/mocha',
    chai: 'libs/chai',
    // *************************************

    // *******************************
    // *** production dependencies ***
    // *******************************

    sprintf: [
      'https://cdn.jsdelivr.net/npm/sprintf-js@1.1.3/src/sprintf.min',
      'https://unpkg.com/sprintf-js@1.1.3/dist/sprintf.min',
      'https://ads-assets.pages.dev/libs/sprintf',
      'libs/sprintf',
    ],

    underscore: [
      'https://cdn.jsdelivr.net/npm/lodash@2.4.2/dist/lodash.compat.min',
      'https://unpkg.com/lodash@2.4.2/dist/lodash.compat.min',
      'https://ads-assets.pages.dev/libs/lodash',
      'libs/lodash',
    ],
    backbone: [
      'https://cdn.jsdelivr.net/npm/backbone@1.1.2/backbone-min',
      'https://unpkg.com/backbone@1.1.2/backbone-min',
      'https://ads-assets.pages.dev/libs/backbone',
      'libs/backbone',
    ],
    'backbone-validation': [
      'https://cdn.jsdelivr.net/npm/backbone-validation@0.11.3/dist/backbone-validation-amd-min',
      'https://unpkg.com/backbone-validation@0.11.3/dist/backbone-validation-amd-min',
      'https://ads-assets.pages.dev/libs/backbone',
      'libs/backbone-validation',
    ],
    'backbone.stickit': [
      'https://cdn.jsdelivr.net/npm/backbone.stickit@0.9.2/backbone.stickit',
      'https://unpkg.com/backbone.stickit@0.9.2/backbone.stickit',
      'https://ads-assets.pages.dev/libs/backbone.stickit',
      'libs/backbone.stickit',
    ],
    'backbone.wreqr': [
      'https://cdn.jsdelivr.net/npm/backbone.wreqr@1.4.0/lib/backbone.wreqr.min',
      'https://unpkg.com/backbone.wreqr@1.4.0/lib/backbone.wreqr.min',
      'https://ads-assets.pages.dev/libs/backbone.wreqr',
      'libs/backbone.wreqr',
    ],
    bootstrap: [
      'https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min',
      'https://unpkg.com/bootstrap@3.3.7/dist/js/bootstrap.min',
      'https://ads-assets.pages.dev/libs/bootstrap/bootstrap',
      'libs/bootstrap/bootstrap',
    ],
    bowser: [
      'https://cdn.jsdelivr.net/npm/bowser@2.11.0/es5',
      'https://unpkg.com/bowser@2.11.0/es5',
      'https://ads-assets.pages.dev/libs/bowser',
      'libs/bowser',
    ],
    clipboard: [
      'https://cdn.jsdelivr.net/npm/clipboard@1.7.1/dist/clipboard.min',
      'https://unpkg.com/clipboard@1.7.1/dist/clipboard.min',
      'https://ads-assets.pages.dev/libs/clipboard',
      'libs/clipboard',
    ],
    d3: [
      'https://cdn.jsdelivr.net/npm/d3@3.5.17/d3.min',
      'https://unpkg.com/d3@3.5.17/d3.min',
      'https://ads-assets.pages.dev/libs/d3',
      'libs/d3',
    ],
    'd3-cloud': [
      'https://cdn.jsdelivr.net/npm/d3-cloud@1.2.5/build/d3.layout.cloud',
      'https://unpkg.com/d3-cloud@1.2.5/build/d3.layout.cloud',
      'https://ads-assets.pages.dev/libs/d3-cloud',
      'libs/d3-cloud',
    ],
    filesaver: [
      'https://cdn.jsdelivr.net/npm/file-saver@1.3.8/FileSaver.min',
      'https://unpkg.com/file-saver@1.3.8/FileSaver.min',
      'https://ads-assets.pages.dev/libs/file-saver',
      'libs/file-saver',
    ],
    hotkeys: [
      'https://cdn.jsdelivr.net/npm/hotkeys-js@3.8.7/dist/hotkeys.min',
      'https://unpkg.com/hotkeys-js@3.8.7/dist/hotkeys.min',
      'https://ads-assets.pages.dev/libs/hotkeys',
      'libs/hotkeys',
    ],
    jquery: [
      'https://cdn.jsdelivr.net/npm/jquery@2.2.4/dist/jquery.min',
      'https://unpkg.com/jquery@2.2.4/dist/jquery.min',
      'https://ads-assets.pages.dev/libs/jquery',
      'libs/jquery',
    ],
    'jquery-ui': [
      'https://code.jquery.com/ui/1.12.1/jquery-ui.min',
      'https://unpkg.com/jquery-ui@1.12.1/jquery-ui.min',
      'https://ads-assets.pages.dev/libs/jquery-ui',
      'libs/jquery-ui',
    ],
    jsonpath: [
      'https://cdn.jsdelivr.net/npm/jsonpath@0.2.12/jsonpath.min',
      'https://unpkg.com/jsonpath@0.2.12/jsonpath.min',
      'https://ads-assets.pages.dev/libs/jsonpath',
      'libs/jsonpath',
    ],
    marionette: [
      'https://cdn.jsdelivr.net/npm/backbone.marionette@2.4.5/lib/backbone.marionette.min',
      'https://unpkg.com/backbone.marionette@2.4.5/lib/backbone.marionette.min',
      'https://ads-assets.pages.dev/libs/backbone.marionette',
      'libs/backbone.marionette',
    ],
    mathjax: [
      'https://cdn.jsdelivr.net/npm/mathjax@2.7.4/MathJax.js?config=TeX-AMS_HTML&amp;delayStartupUntil=configured',
      'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS_HTML&amp;delayStartupUntil=configured',
      'https://ads-assets.pages.dev/libs/mathjax/mathjax',
      'libs/mathjax/mathjax',
    ],
    moment: [
      'https://cdn.jsdelivr.net/npm/moment@2.22.2/min/moment.min',
      'https://unpkg.com/moment@2.22.2/min/moment.min',
      'https://ads-assets.pages.dev/libs/moment',
      'libs/moment',
    ],
    'persist-js': [
      'https://cdn.jsdelivr.net/npm/persist-js@0.3.1/persist-min',
      'https://unpkg.com/persist-js@0.3.1/persist-min',
      'https://ads-assets.pages.dev/libs/persist-js',
      'libs/persist-js',
    ],
    react: [
      'https://cdn.jsdelivr.net/npm/react@16/umd/react.development',
      'https://unpkg.com/react@16/umd/react.development',
      'https://ads-assets.pages.dev/libs/react',
      'libs/react',
    ],
    'react-bootstrap': [
      'https://cdn.jsdelivr.net/npm/react-bootstrap@0.33.0/dist/react-bootstrap.min',
      'https://unpkg.com/react-bootstrap@0.33.0/dist/react-bootstrap.min',
      'https://ads-assets.pages.dev/libs/react-bootstrap',
      'libs/react-bootstrap',
    ],
    'react-dom': [
      'https://cdn.jsdelivr.net/npm/react-dom@17.0.2/umd/react-dom.production.min',
      'https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min',
      'https://ads-assets.pages.dev/libs/react-dom',
      'libs/react-dom',
    ],
    'prop-types': [
      'https://cdn.jsdelivr.net/npm/prop-types@15.6/prop-types.min',
      'https://unpkg.com/prop-types@15.6/prop-types.min',
      'https://ads-assets.pages.dev/libs/prop-types',
      'libs/prop-types',
    ],
    'react-redux': [
      'https://cdn.jsdelivr.net/npm/react-redux@7.2.4/dist/react-redux.min',
      'https://unpkg.com/react-redux@7.2.4/dist/react-redux.min',
      'https://ads-assets.pages.dev/libs/react-redux',
      'libs/react-redux',
    ],
    'react-transition-group': [
      'https://cdn.jsdelivr.net/npm/react-transition-group@2.4.0/dist/react-transition-group.min',
      'https://unpkg.com/react-transition-group@2.4.0/dist/react-transition-group.min',
      'https://ads-assets.pages.dev/libs/react-transition-group',
      'libs/react-transition-group',
    ],
    redux: [
      'https://cdn.jsdelivr.net/npm/redux@4.0.5/dist/redux.min',
      'https://unpkg.com/redux@4.0.5/dist/redux.min',
      'https://ads-assets.pages.dev/libs/redux',
      'libs/redux',
    ],
    'redux-thunk': [
      'https://cdn.jsdelivr.net/npm/redux-thunk@2.3.0/dist/redux-thunk.min',
      'https://unpkg.com/redux-thunk@2.3.0/dist/redux-thunk.min',
      'https://ads-assets.pages.dev/libs/redux-thunk',
      'libs/redux-thunk',
    ],
    select2: [
      'https://cdn.jsdelivr.net/npm/select2@4.0.3/dist/js/select2.min',
      'https://unpkg.com/select2@4.0.3/dist/js/select2.min',
      'https://ads-assets.pages.dev/libs/select2/select2',
      'libs/select2/select2',
    ],
    'react-aria-menubutton': [
      'https://cdn.jsdelivr.net/npm/react-aria-menubutton@7.0.3/umd/ReactAriaMenuButton',
      'https://unpkg.com/react-aria-menubutton@7.0.3/umd/ReactAriaMenuButton',
      'https://ads-assets.pages.dev/libs/react-aria-menubutton',
      'libs/react-aria-menubutton',
    ],
    'react-hook-form': [
      'https://cdn.jsdelivr.net/npm/react-hook-form@6.11.0/dist/index.umd.production.min',
      'https://unpkg.com/react-hook-form@6.11.0/dist/index.umd.production.min',
      'https://ads-assets.pages.dev/libs/react-hook-form',
      'libs/react-hook-form',
    ],
    'react-is': [
      'https://cdn.jsdelivr.net/npm/react-is@17.0.2/umd/react-is.production.min',
      'https://unpkg.com/react-is@17.0.2/umd/react-is.production.min',
      'https://ads-assets.pages.dev/libs/react-is',
      'libs/react-is',
    ],
    'react-data-table-component': [
      'https://cdn.jsdelivr.net/npm/react-data-table-component@6.11.7/dist/react-data-table-component.umd',
      'https://unpkg.com/react-data-table-component@6.11.7/dist/react-data-table-component.umd',
      'https://ads-assets.pages.dev/libs/react-data-table-component',
      'libs/react-data-table-component',
    ],
    'react-window': [
      'https://cdn.jsdelivr.net/npm/react-window@1.8.6/dist/index-prod.umd',
      'https://unpkg.com/react-window@1.8.6/dist/index-prod.umd',
      'https://ads-assets.pages.dev/libs/react-window',
      'libs/react-window',
    ],
    'react-async': [
      'https://cdn.jsdelivr.net/npm/react-async@10.0.1/dist-umd/index',
      'https://unpkg.com/react-async@10.0.1/dist-umd/index',
      'https://ads-assets.pages.dev/libs/react-async',
      'libs/react-async',
    ],
    'regenerator-runtime': [
      'https://cdn.jsdelivr.net/npm/regenerator-runtime@0.13.9/runtime',
      'https://unpkg.com/regenerator-runtime@0.13.9/runtime',
      'https://ads-assets.pages.dev/libs/regenerator-runtime',
      'libs/regenerator-runtime',
    ],
    diff: [
      'https://cdn.jsdelivr.net/npm/diff@4.0.2/dist/diff.min',
      'https://unpkg.com/diff@4.0.2/dist/diff.min',
      'https://ads-assets.pages.dev/libs/diff',
      'libs/diff',
    ],
    'styled-components': [
      'https://cdn.jsdelivr.net/npm/styled-components@5.1.0/dist/styled-components.min',
      'https://unpkg.com/styled-components@5.1.0/dist/styled-components.min',
      'https://ads-assets.pages.dev/libs/styled-components',
      'libs/styled-components',
    ],
    '@hookform/resolvers': [
      'https://cdn.jsdelivr.net/npm/@hookform/resolvers@0.1.0/dist/index.umd.production.min',
      'https://unpkg.com/@hookform/resolvers@0.1.0/dist/index.umd.production.min',
      'https://ads-assets.pages.dev/libs/hookform',
      'libs/hookform',
    ],

    // Google analytics loaded locally only
    'google-analytics': [
      // to activate local tunnel (for us to collect all analytics data)
      // uncomment this; k12 should have ingress-nginx-proxy image deployed
      // that can proxy requests to /analytics
      // '/analytics/analytics'
      'https://ads-assets.pages.dev/libs/g',
      'libs/g',
      'data:application/javascript,',
    ],

    // require special handling, fetched via `grunt curl` task
    yup: ['https://ads-assets.pages.dev/libs/yup', 'libs/yup'],
    cache: ['https://ads-assets.pages.dev/libs/cache', 'libs/cache'],
    polyfill: ['https://ads-assets.pages.dev/libs/polyfill', 'libs/polyfill'],
    'react-flexview': ['https://ads-assets.pages.dev/libs/react-flexview', 'libs/react-flexview'],
    'array-flat-polyfill': ['https://ads-assets.pages.dev/libs/array-flat-polyfill', 'libs/array-flat-polyfill'],
    // *******************************

    'config/common.config': ['https://ads-assets.pages.dev/config/common.config', '/config/common.config'],
    'config/discovery.config': ['https://ads-assets.pages.dev/config/discovery.config', '/config/discovery.config'],
    'config/discovery.vars': ['https://ads-assets.pages.dev/config/discovery.vars', '/config/discovery.vars'],
    'config/init': ['https://ads-assets.pages.dev/config/init', '/config/init'],
    'config/utils': ['https://ads-assets.pages.dev/config/utils', '/config/utils'],
    'js/apps/bumblebox/bootstrap': [
      'https://ads-assets.pages.dev/js/apps/bumblebox/bootstrap',
      '/js/apps/bumblebox/bootstrap',
    ],
    'js/apps/bumblebox/main': ['https://ads-assets.pages.dev/js/apps/bumblebox/main', '/js/apps/bumblebox/main'],
    'js/apps/bumblebox/navigator': [
      'https://ads-assets.pages.dev/js/apps/bumblebox/navigator',
      '/js/apps/bumblebox/navigator',
    ],
    'js/apps/bumblebox/page_manager': [
      'https://ads-assets.pages.dev/js/apps/bumblebox/page_manager',
      '/js/apps/bumblebox/page_manager',
    ],
    'js/apps/bumblebox/router': ['https://ads-assets.pages.dev/js/apps/bumblebox/router', '/js/apps/bumblebox/router'],
    'js/apps/discovery/main': ['https://ads-assets.pages.dev/js/apps/discovery/main', '/js/apps/discovery/main'],
    'js/apps/discovery/navigator': [
      'https://ads-assets.pages.dev/js/apps/discovery/navigator',
      '/js/apps/discovery/navigator',
    ],
    'js/apps/discovery/router': ['https://ads-assets.pages.dev/js/apps/discovery/router', '/js/apps/discovery/router'],
    'js/bugutils/diagnostics': ['https://ads-assets.pages.dev/js/bugutils/diagnostics', '/js/bugutils/diagnostics'],
    'js/bugutils/minimal_pubsub': [
      'https://ads-assets.pages.dev/js/bugutils/minimal_pubsub',
      '/js/bugutils/minimal_pubsub',
    ],
    'js/components/alerts': ['https://ads-assets.pages.dev/js/components/alerts', '/js/components/alerts'],
    'js/components/alerts_mediator': [
      'https://ads-assets.pages.dev/js/components/alerts_mediator',
      '/js/components/alerts_mediator',
    ],
    'js/components/analytics': ['https://ads-assets.pages.dev/js/components/analytics', '/js/components/analytics'],
    'js/components/api_feedback': [
      'https://ads-assets.pages.dev/js/components/api_feedback',
      '/js/components/api_feedback',
    ],
    'js/components/api_query': ['https://ads-assets.pages.dev/js/components/api_query', '/js/components/api_query'],
    'js/components/api_query_updater': [
      'https://ads-assets.pages.dev/js/components/api_query_updater',
      '/js/components/api_query_updater',
    ],
    'js/components/api_request': [
      'https://ads-assets.pages.dev/js/components/api_request',
      '/js/components/api_request',
    ],
    'js/components/api_request_queue': [
      'https://ads-assets.pages.dev/js/components/api_request_queue',
      '/js/components/api_request_queue',
    ],
    'js/components/api_response': [
      'https://ads-assets.pages.dev/js/components/api_response',
      '/js/components/api_response',
    ],
    'js/components/api_targets': [
      'https://ads-assets.pages.dev/js/components/api_targets',
      '/js/components/api_targets',
    ],
    'js/components/app_storage': [
      'https://ads-assets.pages.dev/js/components/app_storage',
      '/js/components/app_storage',
    ],
    'js/components/application': [
      'https://ads-assets.pages.dev/js/components/application',
      '/js/components/application',
    ],
    'js/components/beehive': ['https://ads-assets.pages.dev/js/components/beehive', '/js/components/beehive'],
    'js/components/csrf_manager': [
      'https://ads-assets.pages.dev/js/components/csrf_manager',
      '/js/components/csrf_manager',
    ],
    'js/components/default_request': [
      'https://ads-assets.pages.dev/js/components/default_request',
      '/js/components/default_request',
    ],
    'js/components/doc_stash_controller': [
      'https://ads-assets.pages.dev/js/components/doc_stash_controller',
      '/js/components/doc_stash_controller',
    ],
    'js/components/experiments': [
      'https://ads-assets.pages.dev/js/components/experiments',
      '/js/components/experiments',
    ],
    'js/components/facade': ['https://ads-assets.pages.dev/js/components/facade', '/js/components/facade'],
    'js/components/feedback_mediator': [
      'https://ads-assets.pages.dev/js/components/feedback_mediator',
      '/js/components/feedback_mediator',
    ],
    'js/components/generic_module': [
      'https://ads-assets.pages.dev/js/components/generic_module',
      '/js/components/generic_module',
    ],
    'js/components/history_manager': [
      'https://ads-assets.pages.dev/js/components/history_manager',
      '/js/components/history_manager',
    ],
    'js/components/hotkeys_controller': [
      'https://ads-assets.pages.dev/js/components/hotkeys_controller',
      '/js/components/hotkeys_controller',
    ],
    'js/components/json_response': [
      'https://ads-assets.pages.dev/js/components/json_response',
      '/js/components/json_response',
    ],
    'js/components/library_controller': [
      'https://ads-assets.pages.dev/js/components/library_controller',
      '/js/components/library_controller',
    ],
    'js/components/multi_params': [
      'https://ads-assets.pages.dev/js/components/multi_params',
      '/js/components/multi_params',
    ],
    'js/components/navigator': ['https://ads-assets.pages.dev/js/components/navigator', '/js/components/navigator'],
    'js/components/paginator': ['https://ads-assets.pages.dev/js/components/paginator', '/js/components/paginator'],
    'js/components/persistent_storage': [
      'https://ads-assets.pages.dev/js/components/persistent_storage',
      '/js/components/persistent_storage',
    ],
    'js/components/pubsub_events': [
      'https://ads-assets.pages.dev/js/components/pubsub_events',
      '/js/components/pubsub_events',
    ],
    'js/components/pubsub_key': ['https://ads-assets.pages.dev/js/components/pubsub_key', '/js/components/pubsub_key'],
    'js/components/query_builder/plugin': [
      'https://ads-assets.pages.dev/js/components/query_builder/plugin',
      '/js/components/query_builder/plugin',
    ],
    'js/components/query_builder/rules_translator': [
      'https://ads-assets.pages.dev/js/components/query_builder/rules_translator',
      '/js/components/query_builder/rules_translator',
    ],
    'js/components/query_mediator': [
      'https://ads-assets.pages.dev/js/components/query_mediator',
      '/js/components/query_mediator',
    ],
    'js/components/query_validator': [
      'https://ads-assets.pages.dev/js/components/query_validator',
      '/js/components/query_validator',
    ],
    'js/components/second_order_controller': [
      'https://ads-assets.pages.dev/js/components/second_order_controller',
      '/js/components/second_order_controller',
    ],
    'js/components/services_container': [
      'https://ads-assets.pages.dev/js/components/services_container',
      '/js/components/services_container',
    ],
    'js/components/session': ['https://ads-assets.pages.dev/js/components/session', '/js/components/session'],
    'js/components/solr_params': [
      'https://ads-assets.pages.dev/js/components/solr_params',
      '/js/components/solr_params',
    ],
    'js/components/solr_response': [
      'https://ads-assets.pages.dev/js/components/solr_response',
      '/js/components/solr_response',
    ],
    'js/components/transition': ['https://ads-assets.pages.dev/js/components/transition', '/js/components/transition'],
    'js/components/transition_catalog': [
      'https://ads-assets.pages.dev/js/components/transition_catalog',
      '/js/components/transition_catalog',
    ],
    'js/components/user': ['https://ads-assets.pages.dev/js/components/user', '/js/components/user'],
    'js/dark-mode-switch': ['https://ads-assets.pages.dev/js/dark-mode-switch', '/js/dark-mode-switch'],
    'js/mixins/add_secondary_sort': [
      'https://ads-assets.pages.dev/js/mixins/add_secondary_sort',
      '/js/mixins/add_secondary_sort',
    ],
    'js/mixins/add_stable_index_to_collection': [
      'https://ads-assets.pages.dev/js/mixins/add_stable_index_to_collection',
      '/js/mixins/add_stable_index_to_collection',
    ],
    'js/mixins/api_access': ['https://ads-assets.pages.dev/js/mixins/api_access', '/js/mixins/api_access'],
    'js/mixins/dependon': ['https://ads-assets.pages.dev/js/mixins/dependon', '/js/mixins/dependon'],
    'js/mixins/discovery_bootstrap': [
      'https://ads-assets.pages.dev/js/mixins/discovery_bootstrap',
      '/js/mixins/discovery_bootstrap',
    ],
    'js/mixins/expose_metadata': [
      'https://ads-assets.pages.dev/js/mixins/expose_metadata',
      '/js/mixins/expose_metadata',
    ],
    'js/mixins/form_view_functions': [
      'https://ads-assets.pages.dev/js/mixins/form_view_functions',
      '/js/mixins/form_view_functions',
    ],
    'js/mixins/formatter': ['https://ads-assets.pages.dev/js/mixins/formatter', '/js/mixins/formatter'],
    'js/mixins/hardened': ['https://ads-assets.pages.dev/js/mixins/hardened', '/js/mixins/hardened'],
    'js/mixins/link_generator_mixin': [
      'https://ads-assets.pages.dev/js/mixins/link_generator_mixin',
      '/js/mixins/link_generator_mixin',
    ],
    'js/mixins/openurl_generator': [
      'https://ads-assets.pages.dev/js/mixins/openurl_generator',
      '/js/mixins/openurl_generator',
    ],
    'js/mixins/papers_utils': ['https://ads-assets.pages.dev/js/mixins/papers_utils', '/js/mixins/papers_utils'],
    'js/mixins/side_bar_manager': [
      'https://ads-assets.pages.dev/js/mixins/side_bar_manager',
      '/js/mixins/side_bar_manager',
    ],
    'js/mixins/user_change_rows': [
      'https://ads-assets.pages.dev/js/mixins/user_change_rows',
      '/js/mixins/user_change_rows',
    ],
    'js/mixins/widget_mixin_method': [
      'https://ads-assets.pages.dev/js/mixins/widget_mixin_method',
      '/js/mixins/widget_mixin_method',
    ],
    'js/mixins/widget_pagination': [
      'https://ads-assets.pages.dev/js/mixins/widget_pagination',
      '/js/mixins/widget_pagination',
    ],
    'js/mixins/widget_state_handling': [
      'https://ads-assets.pages.dev/js/mixins/widget_state_handling',
      '/js/mixins/widget_state_handling',
    ],
    'js/mixins/widget_state_manager': [
      'https://ads-assets.pages.dev/js/mixins/widget_state_manager',
      '/js/mixins/widget_state_manager',
    ],
    'js/mixins/widget_utility': ['https://ads-assets.pages.dev/js/mixins/widget_utility', '/js/mixins/widget_utility'],
    'js/modules/hello': ['https://ads-assets.pages.dev/js/modules/hello', '/js/modules/hello'],
    'js/modules/orcid/bio': ['https://ads-assets.pages.dev/js/modules/orcid/bio', '/js/modules/orcid/bio'],
    'js/modules/orcid/extension': [
      'https://ads-assets.pages.dev/js/modules/orcid/extension',
      '/js/modules/orcid/extension',
    ],
    'js/modules/orcid/item_view_extension': [
      'https://ads-assets.pages.dev/js/modules/orcid/item_view_extension',
      '/js/modules/orcid/item_view_extension',
    ],
    'js/modules/orcid/module': ['https://ads-assets.pages.dev/js/modules/orcid/module', '/js/modules/orcid/module'],
    'js/modules/orcid/orcid_api': [
      'https://ads-assets.pages.dev/js/modules/orcid/orcid_api',
      '/js/modules/orcid/orcid_api',
    ],
    'js/modules/orcid/profile': ['https://ads-assets.pages.dev/js/modules/orcid/profile', '/js/modules/orcid/profile'],
    'js/modules/orcid/widget/widget': [
      'https://ads-assets.pages.dev/js/modules/orcid/widget/widget',
      '/js/modules/orcid/widget/widget',
    ],
    'js/modules/orcid/work': ['https://ads-assets.pages.dev/js/modules/orcid/work', '/js/modules/orcid/work'],
    'js/page_managers/controller': [
      'https://ads-assets.pages.dev/js/page_managers/controller',
      '/js/page_managers/controller',
    ],
    'js/page_managers/master': ['https://ads-assets.pages.dev/js/page_managers/master', '/js/page_managers/master'],
    'js/page_managers/one_column_view': [
      'https://ads-assets.pages.dev/js/page_managers/one_column_view',
      '/js/page_managers/one_column_view',
    ],
    'js/page_managers/three_column_view': [
      'https://ads-assets.pages.dev/js/page_managers/three_column_view',
      '/js/page_managers/three_column_view',
    ],
    'js/page_managers/toc_controller': [
      'https://ads-assets.pages.dev/js/page_managers/toc_controller',
      '/js/page_managers/toc_controller',
    ],
    'js/page_managers/toc_widget': [
      'https://ads-assets.pages.dev/js/page_managers/toc_widget',
      '/js/page_managers/toc_widget',
    ],
    'js/page_managers/view_mixin': [
      'https://ads-assets.pages.dev/js/page_managers/view_mixin',
      '/js/page_managers/view_mixin',
    ],
    'js/plugins/cdn': ['https://ads-assets.pages.dev/js/plugins/cdn', '/js/plugins/cdn'],
    'js/plugins/es6': ['https://ads-assets.pages.dev/js/plugins/es6', '/js/plugins/es6'],
    'js/plugins/reactify': ['https://ads-assets.pages.dev/js/plugins/reactify', '/js/plugins/reactify'],
    'js/react/BumblebeeWidget': ['https://ads-assets.pages.dev/js/react/BumblebeeWidget', '/js/react/BumblebeeWidget'],
    'js/react/FeedbackForms/actions': [
      'https://ads-assets.pages.dev/js/react/FeedbackForms/actions',
      '/js/react/FeedbackForms/actions',
    ],
    'js/react/FeedbackForms/components/App.jsx': [
      'https://ads-assets.pages.dev/js/react/FeedbackForms/components/App.jsx',
      '/js/react/FeedbackForms/components/App.jsx',
    ],
    'js/react/FeedbackForms/containers/main': [
      'https://ads-assets.pages.dev/js/react/FeedbackForms/containers/main',
      '/js/react/FeedbackForms/containers/main',
    ],
    'js/react/FeedbackForms/index': [
      'https://ads-assets.pages.dev/js/react/FeedbackForms/index',
      '/js/react/FeedbackForms/index',
    ],
    'js/react/FeedbackForms/middleware': [
      'https://ads-assets.pages.dev/js/react/FeedbackForms/middleware',
      '/js/react/FeedbackForms/middleware',
    ],
    'js/react/FeedbackForms/models/index': [
      'https://ads-assets.pages.dev/js/react/FeedbackForms/models/index',
      '/js/react/FeedbackForms/models/index',
    ],
    'js/react/FeedbackForms/reducer': [
      'https://ads-assets.pages.dev/js/react/FeedbackForms/reducer',
      '/js/react/FeedbackForms/reducer',
    ],
    'js/react/LibraryCollaborators/actions': [
      'https://ads-assets.pages.dev/js/react/LibraryCollaborators/actions',
      '/js/react/LibraryCollaborators/actions',
    ],
    'js/react/LibraryCollaborators/components/AddCollaboratorModal.jsx': [
      'https://ads-assets.pages.dev/js/react/LibraryCollaborators/components/AddCollaboratorModal.jsx',
      '/js/react/LibraryCollaborators/components/AddCollaboratorModal.jsx',
    ],
    'js/react/LibraryCollaborators/components/Dashboard.jsx': [
      'https://ads-assets.pages.dev/js/react/LibraryCollaborators/components/Dashboard.jsx',
      '/js/react/LibraryCollaborators/components/Dashboard.jsx',
    ],
    'js/react/LibraryCollaborators/components/ManageButton.jsx': [
      'https://ads-assets.pages.dev/js/react/LibraryCollaborators/components/ManageButton.jsx',
      '/js/react/LibraryCollaborators/components/ManageButton.jsx',
    ],
    'js/react/LibraryCollaborators/components/PermissionEntry.jsx': [
      'https://ads-assets.pages.dev/js/react/LibraryCollaborators/components/PermissionEntry.jsx',
      '/js/react/LibraryCollaborators/components/PermissionEntry.jsx',
    ],
    'js/react/LibraryCollaborators/components/PermissionList.jsx': [
      'https://ads-assets.pages.dev/js/react/LibraryCollaborators/components/PermissionList.jsx',
      '/js/react/LibraryCollaborators/components/PermissionList.jsx',
    ],
    'js/react/LibraryCollaborators/constants': [
      'https://ads-assets.pages.dev/js/react/LibraryCollaborators/constants',
      '/js/react/LibraryCollaborators/constants',
    ],
    'js/react/LibraryCollaborators/index': [
      'https://ads-assets.pages.dev/js/react/LibraryCollaborators/index',
      '/js/react/LibraryCollaborators/index',
    ],
    'js/react/LibraryCollaborators/middleware': [
      'https://ads-assets.pages.dev/js/react/LibraryCollaborators/middleware',
      '/js/react/LibraryCollaborators/middleware',
    ],
    'js/react/LibraryCollaborators/reducer': [
      'https://ads-assets.pages.dev/js/react/LibraryCollaborators/reducer',
      '/js/react/LibraryCollaborators/reducer',
    ],
    'js/react/MyAdsDashboard/actions': [
      'https://ads-assets.pages.dev/js/react/MyAdsDashboard/actions',
      '/js/react/MyAdsDashboard/actions',
    ],
    'js/react/MyAdsDashboard/components/ActionsDropdown.jsx': [
      'https://ads-assets.pages.dev/js/react/MyAdsDashboard/components/ActionsDropdown.jsx',
      '/js/react/MyAdsDashboard/components/ActionsDropdown.jsx',
    ],
    'js/react/MyAdsDashboard/components/App.jsx': [
      'https://ads-assets.pages.dev/js/react/MyAdsDashboard/components/App.jsx',
      '/js/react/MyAdsDashboard/components/App.jsx',
    ],
    'js/react/MyAdsDashboard/components/ArxivClassList.jsx': [
      'https://ads-assets.pages.dev/js/react/MyAdsDashboard/components/ArxivClassList.jsx',
      '/js/react/MyAdsDashboard/components/ArxivClassList.jsx',
    ],
    'js/react/MyAdsDashboard/components/ArxivForm.jsx': [
      'https://ads-assets.pages.dev/js/react/MyAdsDashboard/components/ArxivForm.jsx',
      '/js/react/MyAdsDashboard/components/ArxivForm.jsx',
    ],
    'js/react/MyAdsDashboard/components/AuthorsForm.jsx': [
      'https://ads-assets.pages.dev/js/react/MyAdsDashboard/components/AuthorsForm.jsx',
      '/js/react/MyAdsDashboard/components/AuthorsForm.jsx',
    ],
    'js/react/MyAdsDashboard/components/CitationsEntry.jsx': [
      'https://ads-assets.pages.dev/js/react/MyAdsDashboard/components/CitationsEntry.jsx',
      '/js/react/MyAdsDashboard/components/CitationsEntry.jsx',
    ],
    'js/react/MyAdsDashboard/components/CitationsForm.jsx': [
      'https://ads-assets.pages.dev/js/react/MyAdsDashboard/components/CitationsForm.jsx',
      '/js/react/MyAdsDashboard/components/CitationsForm.jsx',
    ],
    'js/react/MyAdsDashboard/components/ClassicLoginForm.jsx': [
      'https://ads-assets.pages.dev/js/react/MyAdsDashboard/components/ClassicLoginForm.jsx',
      '/js/react/MyAdsDashboard/components/ClassicLoginForm.jsx',
    ],
    'js/react/MyAdsDashboard/components/Dashboard.jsx': [
      'https://ads-assets.pages.dev/js/react/MyAdsDashboard/components/Dashboard.jsx',
      '/js/react/MyAdsDashboard/components/Dashboard.jsx',
    ],
    'js/react/MyAdsDashboard/components/GeneralForm.jsx': [
      'https://ads-assets.pages.dev/js/react/MyAdsDashboard/components/GeneralForm.jsx',
      '/js/react/MyAdsDashboard/components/GeneralForm.jsx',
    ],
    'js/react/MyAdsDashboard/components/ImportNotificationsForm.jsx': [
      'https://ads-assets.pages.dev/js/react/MyAdsDashboard/components/ImportNotificationsForm.jsx',
      '/js/react/MyAdsDashboard/components/ImportNotificationsForm.jsx',
    ],
    'js/react/MyAdsDashboard/components/KeywordForm.jsx': [
      'https://ads-assets.pages.dev/js/react/MyAdsDashboard/components/KeywordForm.jsx',
      '/js/react/MyAdsDashboard/components/KeywordForm.jsx',
    ],
    'js/react/MyAdsDashboard/components/SelectTemplate.jsx': [
      'https://ads-assets.pages.dev/js/react/MyAdsDashboard/components/SelectTemplate.jsx',
      '/js/react/MyAdsDashboard/components/SelectTemplate.jsx',
    ],
    'js/react/MyAdsDashboard/components/TemplatePill.jsx': [
      'https://ads-assets.pages.dev/js/react/MyAdsDashboard/components/TemplatePill.jsx',
      '/js/react/MyAdsDashboard/components/TemplatePill.jsx',
    ],
    'js/react/MyAdsDashboard/constants': [
      'https://ads-assets.pages.dev/js/react/MyAdsDashboard/constants',
      '/js/react/MyAdsDashboard/constants',
    ],
    'js/react/MyAdsDashboard/containers/ArxivForm': [
      'https://ads-assets.pages.dev/js/react/MyAdsDashboard/containers/ArxivForm',
      '/js/react/MyAdsDashboard/containers/ArxivForm',
    ],
    'js/react/MyAdsDashboard/containers/AuthorsForm': [
      'https://ads-assets.pages.dev/js/react/MyAdsDashboard/containers/AuthorsForm',
      '/js/react/MyAdsDashboard/containers/AuthorsForm',
    ],
    'js/react/MyAdsDashboard/containers/CitationsForm': [
      'https://ads-assets.pages.dev/js/react/MyAdsDashboard/containers/CitationsForm',
      '/js/react/MyAdsDashboard/containers/CitationsForm',
    ],
    'js/react/MyAdsDashboard/containers/ClassicLoginForm': [
      'https://ads-assets.pages.dev/js/react/MyAdsDashboard/containers/ClassicLoginForm',
      '/js/react/MyAdsDashboard/containers/ClassicLoginForm',
    ],
    'js/react/MyAdsDashboard/containers/Dashboard': [
      'https://ads-assets.pages.dev/js/react/MyAdsDashboard/containers/Dashboard',
      '/js/react/MyAdsDashboard/containers/Dashboard',
    ],
    'js/react/MyAdsDashboard/containers/GeneralForm': [
      'https://ads-assets.pages.dev/js/react/MyAdsDashboard/containers/GeneralForm',
      '/js/react/MyAdsDashboard/containers/GeneralForm',
    ],
    'js/react/MyAdsDashboard/containers/ImportNotificationsForm': [
      'https://ads-assets.pages.dev/js/react/MyAdsDashboard/containers/ImportNotificationsForm',
      '/js/react/MyAdsDashboard/containers/ImportNotificationsForm',
    ],
    'js/react/MyAdsDashboard/containers/KeywordForm': [
      'https://ads-assets.pages.dev/js/react/MyAdsDashboard/containers/KeywordForm',
      '/js/react/MyAdsDashboard/containers/KeywordForm',
    ],
    'js/react/MyAdsDashboard/containers/SelectTemplate': [
      'https://ads-assets.pages.dev/js/react/MyAdsDashboard/containers/SelectTemplate',
      '/js/react/MyAdsDashboard/containers/SelectTemplate',
    ],
    'js/react/MyAdsDashboard/index': [
      'https://ads-assets.pages.dev/js/react/MyAdsDashboard/index',
      '/js/react/MyAdsDashboard/index',
    ],
    'js/react/MyAdsDashboard/middleware': [
      'https://ads-assets.pages.dev/js/react/MyAdsDashboard/middleware',
      '/js/react/MyAdsDashboard/middleware',
    ],
    'js/react/MyAdsDashboard/models/arxivClasses': [
      'https://ads-assets.pages.dev/js/react/MyAdsDashboard/models/arxivClasses',
      '/js/react/MyAdsDashboard/models/arxivClasses',
    ],
    'js/react/MyAdsDashboard/reducer': [
      'https://ads-assets.pages.dev/js/react/MyAdsDashboard/reducer',
      '/js/react/MyAdsDashboard/reducer',
    ],
    'js/react/MyAdsDashboard/typedefs': [
      'https://ads-assets.pages.dev/js/react/MyAdsDashboard/typedefs',
      '/js/react/MyAdsDashboard/typedefs',
    ],
    'js/react/MyAdsFreeform/actions': [
      'https://ads-assets.pages.dev/js/react/MyAdsFreeform/actions',
      '/js/react/MyAdsFreeform/actions',
    ],
    'js/react/MyAdsFreeform/components/App.jsx': [
      'https://ads-assets.pages.dev/js/react/MyAdsFreeform/components/App.jsx',
      '/js/react/MyAdsFreeform/components/App.jsx',
    ],
    'js/react/MyAdsFreeform/components/CollapsePanel.jsx': [
      'https://ads-assets.pages.dev/js/react/MyAdsFreeform/components/CollapsePanel.jsx',
      '/js/react/MyAdsFreeform/components/CollapsePanel.jsx',
    ],
    'js/react/MyAdsFreeform/components/SaveQueryForm.jsx': [
      'https://ads-assets.pages.dev/js/react/MyAdsFreeform/components/SaveQueryForm.jsx',
      '/js/react/MyAdsFreeform/components/SaveQueryForm.jsx',
    ],
    'js/react/MyAdsFreeform/constants': [
      'https://ads-assets.pages.dev/js/react/MyAdsFreeform/constants',
      '/js/react/MyAdsFreeform/constants',
    ],
    'js/react/MyAdsFreeform/containers/SaveQueryForm': [
      'https://ads-assets.pages.dev/js/react/MyAdsFreeform/containers/SaveQueryForm',
      '/js/react/MyAdsFreeform/containers/SaveQueryForm',
    ],
    'js/react/MyAdsFreeform/index': [
      'https://ads-assets.pages.dev/js/react/MyAdsFreeform/index',
      '/js/react/MyAdsFreeform/index',
    ],
    'js/react/MyAdsFreeform/middleware': [
      'https://ads-assets.pages.dev/js/react/MyAdsFreeform/middleware',
      '/js/react/MyAdsFreeform/middleware',
    ],
    'js/react/MyAdsFreeform/reducer': [
      'https://ads-assets.pages.dev/js/react/MyAdsFreeform/reducer',
      '/js/react/MyAdsFreeform/reducer',
    ],
    'js/react/PageManager': ['https://ads-assets.pages.dev/js/react/PageManager', '/js/react/PageManager'],
    'js/react/Recommender/actions': [
      'https://ads-assets.pages.dev/js/react/Recommender/actions',
      '/js/react/Recommender/actions',
    ],
    'js/react/Recommender/components/App.jsx': [
      'https://ads-assets.pages.dev/js/react/Recommender/components/App.jsx',
      '/js/react/Recommender/components/App.jsx',
    ],
    'js/react/Recommender/components/RecommendedList.jsx': [
      'https://ads-assets.pages.dev/js/react/Recommender/components/RecommendedList.jsx',
      '/js/react/Recommender/components/RecommendedList.jsx',
    ],
    'js/react/Recommender/components/SearchExamples.jsx': [
      'https://ads-assets.pages.dev/js/react/Recommender/components/SearchExamples.jsx',
      '/js/react/Recommender/components/SearchExamples.jsx',
    ],
    'js/react/Recommender/containers/main': [
      'https://ads-assets.pages.dev/js/react/Recommender/containers/main',
      '/js/react/Recommender/containers/main',
    ],
    'js/react/Recommender/index': [
      'https://ads-assets.pages.dev/js/react/Recommender/index',
      '/js/react/Recommender/index',
    ],
    'js/react/Recommender/middleware': [
      'https://ads-assets.pages.dev/js/react/Recommender/middleware',
      '/js/react/Recommender/middleware',
    ],
    'js/react/Recommender/models/index': [
      'https://ads-assets.pages.dev/js/react/Recommender/models/index',
      '/js/react/Recommender/models/index',
    ],
    'js/react/Recommender/models/searchExamples': [
      'https://ads-assets.pages.dev/js/react/Recommender/models/searchExamples',
      '/js/react/Recommender/models/searchExamples',
    ],
    'js/react/Recommender/reducer': [
      'https://ads-assets.pages.dev/js/react/Recommender/reducer',
      '/js/react/Recommender/reducer',
    ],
    'js/react/WithBackboneView': [
      'https://ads-assets.pages.dev/js/react/WithBackboneView',
      '/js/react/WithBackboneView',
    ],
    'js/react/configureStore': ['https://ads-assets.pages.dev/js/react/configureStore', '/js/react/configureStore'],
    'js/react/shared/components/ApiMessage.jsx': [
      'https://ads-assets.pages.dev/js/react/shared/components/ApiMessage.jsx',
      '/js/react/shared/components/ApiMessage.jsx',
    ],
    'js/react/shared/helpers': ['https://ads-assets.pages.dev/js/react/shared/helpers', '/js/react/shared/helpers'],
    'js/react/shared/middleware/api': [
      'https://ads-assets.pages.dev/js/react/shared/middleware/api',
      '/js/react/shared/middleware/api',
    ],
    'js/react/shared/middleware/index': [
      'https://ads-assets.pages.dev/js/react/shared/middleware/index',
      '/js/react/shared/middleware/index',
    ],
    'js/react/shared/middleware/main': [
      'https://ads-assets.pages.dev/js/react/shared/middleware/main',
      '/js/react/shared/middleware/main',
    ],
    'js/services/api': ['https://ads-assets.pages.dev/js/services/api', '/js/services/api'],
    'js/services/default_pubsub': [
      'https://ads-assets.pages.dev/js/services/default_pubsub',
      '/js/services/default_pubsub',
    ],
    'js/services/pubsub': ['https://ads-assets.pages.dev/js/services/pubsub', '/js/services/pubsub'],
    'js/services/storage': ['https://ads-assets.pages.dev/js/services/storage', '/js/services/storage'],
    'js/utils': ['https://ads-assets.pages.dev/js/utils', '/js/utils'],
    'js/widgets/abstract/widget': [
      'https://ads-assets.pages.dev/js/widgets/abstract/widget',
      '/js/widgets/abstract/widget',
    ],
    'js/widgets/alerts/modal_view': [
      'https://ads-assets.pages.dev/js/widgets/alerts/modal_view',
      '/js/widgets/alerts/modal_view',
    ],
    'js/widgets/alerts/page_top_alert': [
      'https://ads-assets.pages.dev/js/widgets/alerts/page_top_alert',
      '/js/widgets/alerts/page_top_alert',
    ],
    'js/widgets/alerts/widget': ['https://ads-assets.pages.dev/js/widgets/alerts/widget', '/js/widgets/alerts/widget'],
    'js/widgets/api_query/widget': [
      'https://ads-assets.pages.dev/js/widgets/api_query/widget',
      '/js/widgets/api_query/widget',
    ],
    'js/widgets/api_request/widget': [
      'https://ads-assets.pages.dev/js/widgets/api_request/widget',
      '/js/widgets/api_request/widget',
    ],
    'js/widgets/api_response/widget': [
      'https://ads-assets.pages.dev/js/widgets/api_response/widget',
      '/js/widgets/api_response/widget',
    ],
    'js/widgets/associated/components/app.jsx': [
      'https://ads-assets.pages.dev/js/widgets/associated/components/app.jsx',
      '/js/widgets/associated/components/app.jsx',
    ],
    'js/widgets/associated/containers/app': [
      'https://ads-assets.pages.dev/js/widgets/associated/containers/app',
      '/js/widgets/associated/containers/app',
    ],
    'js/widgets/associated/redux/configure-store': [
      'https://ads-assets.pages.dev/js/widgets/associated/redux/configure-store',
      '/js/widgets/associated/redux/configure-store',
    ],
    'js/widgets/associated/redux/middleware/api': [
      'https://ads-assets.pages.dev/js/widgets/associated/redux/middleware/api',
      '/js/widgets/associated/redux/middleware/api',
    ],
    'js/widgets/associated/redux/middleware/ui': [
      'https://ads-assets.pages.dev/js/widgets/associated/redux/middleware/ui',
      '/js/widgets/associated/redux/middleware/ui',
    ],
    'js/widgets/associated/redux/modules/api': [
      'https://ads-assets.pages.dev/js/widgets/associated/redux/modules/api',
      '/js/widgets/associated/redux/modules/api',
    ],
    'js/widgets/associated/redux/modules/ui': [
      'https://ads-assets.pages.dev/js/widgets/associated/redux/modules/ui',
      '/js/widgets/associated/redux/modules/ui',
    ],
    'js/widgets/associated/widget.jsx': [
      'https://ads-assets.pages.dev/js/widgets/associated/widget.jsx',
      '/js/widgets/associated/widget.jsx',
    ],
    'js/widgets/authentication/widget': [
      'https://ads-assets.pages.dev/js/widgets/authentication/widget',
      '/js/widgets/authentication/widget',
    ],
    'js/widgets/author_affiliation_tool/actions/index': [
      'https://ads-assets.pages.dev/js/widgets/author_affiliation_tool/actions/index',
      '/js/widgets/author_affiliation_tool/actions/index',
    ],
    'js/widgets/author_affiliation_tool/components/AffiliationRow.jsx': [
      'https://ads-assets.pages.dev/js/widgets/author_affiliation_tool/components/AffiliationRow.jsx',
      '/js/widgets/author_affiliation_tool/components/AffiliationRow.jsx',
    ],
    'js/widgets/author_affiliation_tool/components/Closer.jsx': [
      'https://ads-assets.pages.dev/js/widgets/author_affiliation_tool/components/Closer.jsx',
      '/js/widgets/author_affiliation_tool/components/Closer.jsx',
    ],
    'js/widgets/author_affiliation_tool/components/ExportFormatControl.jsx': [
      'https://ads-assets.pages.dev/js/widgets/author_affiliation_tool/components/ExportFormatControl.jsx',
      '/js/widgets/author_affiliation_tool/components/ExportFormatControl.jsx',
    ],
    'js/widgets/author_affiliation_tool/components/LastActiveDateRow.jsx': [
      'https://ads-assets.pages.dev/js/widgets/author_affiliation_tool/components/LastActiveDateRow.jsx',
      '/js/widgets/author_affiliation_tool/components/LastActiveDateRow.jsx',
    ],
    'js/widgets/author_affiliation_tool/components/Loading.jsx': [
      'https://ads-assets.pages.dev/js/widgets/author_affiliation_tool/components/Loading.jsx',
      '/js/widgets/author_affiliation_tool/components/Loading.jsx',
    ],
    'js/widgets/author_affiliation_tool/components/Message.jsx': [
      'https://ads-assets.pages.dev/js/widgets/author_affiliation_tool/components/Message.jsx',
      '/js/widgets/author_affiliation_tool/components/Message.jsx',
    ],
    'js/widgets/author_affiliation_tool/components/Row.jsx': [
      'https://ads-assets.pages.dev/js/widgets/author_affiliation_tool/components/Row.jsx',
      '/js/widgets/author_affiliation_tool/components/Row.jsx',
    ],
    'js/widgets/author_affiliation_tool/components/SelectionButtons.jsx': [
      'https://ads-assets.pages.dev/js/widgets/author_affiliation_tool/components/SelectionButtons.jsx',
      '/js/widgets/author_affiliation_tool/components/SelectionButtons.jsx',
    ],
    'js/widgets/author_affiliation_tool/constants/actionNames': [
      'https://ads-assets.pages.dev/js/widgets/author_affiliation_tool/constants/actionNames',
      '/js/widgets/author_affiliation_tool/constants/actionNames',
    ],
    'js/widgets/author_affiliation_tool/containers/App.jsx': [
      'https://ads-assets.pages.dev/js/widgets/author_affiliation_tool/containers/App.jsx',
      '/js/widgets/author_affiliation_tool/containers/App.jsx',
    ],
    'js/widgets/author_affiliation_tool/models/authorAffiliation': [
      'https://ads-assets.pages.dev/js/widgets/author_affiliation_tool/models/authorAffiliation',
      '/js/widgets/author_affiliation_tool/models/authorAffiliation',
    ],
    'js/widgets/author_affiliation_tool/reducers/index': [
      'https://ads-assets.pages.dev/js/widgets/author_affiliation_tool/reducers/index',
      '/js/widgets/author_affiliation_tool/reducers/index',
    ],
    'js/widgets/author_affiliation_tool/widget.jsx': [
      'https://ads-assets.pages.dev/js/widgets/author_affiliation_tool/widget.jsx',
      '/js/widgets/author_affiliation_tool/widget.jsx',
    ],
    'js/widgets/base/base_widget': [
      'https://ads-assets.pages.dev/js/widgets/base/base_widget',
      '/js/widgets/base/base_widget',
    ],
    'js/widgets/breadcrumb/widget': [
      'https://ads-assets.pages.dev/js/widgets/breadcrumb/widget',
      '/js/widgets/breadcrumb/widget',
    ],
    'js/widgets/bubble_chart/widget': [
      'https://ads-assets.pages.dev/js/widgets/bubble_chart/widget',
      '/js/widgets/bubble_chart/widget',
    ],
    'js/widgets/citation_helper/widget': [
      'https://ads-assets.pages.dev/js/widgets/citation_helper/widget',
      '/js/widgets/citation_helper/widget',
    ],
    'js/widgets/classic_form/widget': [
      'https://ads-assets.pages.dev/js/widgets/classic_form/widget',
      '/js/widgets/classic_form/widget',
    ],
    'js/widgets/config': ['https://ads-assets.pages.dev/js/widgets/config', '/js/widgets/config'],
    'js/widgets/dropdown-menu/widget': [
      'https://ads-assets.pages.dev/js/widgets/dropdown-menu/widget',
      '/js/widgets/dropdown-menu/widget',
    ],
    'js/widgets/export/actions/index': [
      'https://ads-assets.pages.dev/js/widgets/export/actions/index',
      '/js/widgets/export/actions/index',
    ],
    'js/widgets/export/components/ClipboardBtn.jsx': [
      'https://ads-assets.pages.dev/js/widgets/export/components/ClipboardBtn.jsx',
      '/js/widgets/export/components/ClipboardBtn.jsx',
    ],
    'js/widgets/export/components/Closer.jsx': [
      'https://ads-assets.pages.dev/js/widgets/export/components/Closer.jsx',
      '/js/widgets/export/components/Closer.jsx',
    ],
    'js/widgets/export/components/Export.jsx': [
      'https://ads-assets.pages.dev/js/widgets/export/components/Export.jsx',
      '/js/widgets/export/components/Export.jsx',
    ],
    'js/widgets/export/components/Setup.jsx': [
      'https://ads-assets.pages.dev/js/widgets/export/components/Setup.jsx',
      '/js/widgets/export/components/Setup.jsx',
    ],
    'js/widgets/export/components/Slider.jsx': [
      'https://ads-assets.pages.dev/js/widgets/export/components/Slider.jsx',
      '/js/widgets/export/components/Slider.jsx',
    ],
    'js/widgets/export/containers/App.jsx': [
      'https://ads-assets.pages.dev/js/widgets/export/containers/App.jsx',
      '/js/widgets/export/containers/App.jsx',
    ],
    'js/widgets/export/reducers/index': [
      'https://ads-assets.pages.dev/js/widgets/export/reducers/index',
      '/js/widgets/export/reducers/index',
    ],
    'js/widgets/export/widget.jsx': [
      'https://ads-assets.pages.dev/js/widgets/export/widget.jsx',
      '/js/widgets/export/widget.jsx',
    ],
    'js/widgets/facet/actions': ['https://ads-assets.pages.dev/js/widgets/facet/actions', '/js/widgets/facet/actions'],
    'js/widgets/facet/create_store': [
      'https://ads-assets.pages.dev/js/widgets/facet/create_store',
      '/js/widgets/facet/create_store',
    ],
    'js/widgets/facet/facet-container.jsx': [
      'https://ads-assets.pages.dev/js/widgets/facet/facet-container.jsx',
      '/js/widgets/facet/facet-container.jsx',
    ],
    'js/widgets/facet/facet-dropdown.jsx': [
      'https://ads-assets.pages.dev/js/widgets/facet/facet-dropdown.jsx',
      '/js/widgets/facet/facet-dropdown.jsx',
    ],
    'js/widgets/facet/factory': ['https://ads-assets.pages.dev/js/widgets/facet/factory', '/js/widgets/facet/factory'],
    'js/widgets/facet/graph-facet/base_graph': [
      'https://ads-assets.pages.dev/js/widgets/facet/graph-facet/base_graph',
      '/js/widgets/facet/graph-facet/base_graph',
    ],
    'js/widgets/facet/graph-facet/h_index_graph': [
      'https://ads-assets.pages.dev/js/widgets/facet/graph-facet/h_index_graph',
      '/js/widgets/facet/graph-facet/h_index_graph',
    ],
    'js/widgets/facet/graph-facet/widget': [
      'https://ads-assets.pages.dev/js/widgets/facet/graph-facet/widget',
      '/js/widgets/facet/graph-facet/widget',
    ],
    'js/widgets/facet/graph-facet/year_graph': [
      'https://ads-assets.pages.dev/js/widgets/facet/graph-facet/year_graph',
      '/js/widgets/facet/graph-facet/year_graph',
    ],
    'js/widgets/facet/reducers': [
      'https://ads-assets.pages.dev/js/widgets/facet/reducers',
      '/js/widgets/facet/reducers',
    ],
    'js/widgets/facet/toggle_list.jsx': [
      'https://ads-assets.pages.dev/js/widgets/facet/toggle_list.jsx',
      '/js/widgets/facet/toggle_list.jsx',
    ],
    'js/widgets/facet/widget': ['https://ads-assets.pages.dev/js/widgets/facet/widget', '/js/widgets/facet/widget'],
    'js/widgets/factory': ['https://ads-assets.pages.dev/js/widgets/factory', '/js/widgets/factory'],
    'js/widgets/filter_visualizer/widget': [
      'https://ads-assets.pages.dev/js/widgets/filter_visualizer/widget',
      '/js/widgets/filter_visualizer/widget',
    ],
    'js/widgets/footer/widget': ['https://ads-assets.pages.dev/js/widgets/footer/widget', '/js/widgets/footer/widget'],
    'js/widgets/graphics/widget': [
      'https://ads-assets.pages.dev/js/widgets/graphics/widget',
      '/js/widgets/graphics/widget',
    ],
    'js/widgets/green_button/widget': [
      'https://ads-assets.pages.dev/js/widgets/green_button/widget',
      '/js/widgets/green_button/widget',
    ],
    'js/widgets/hello_world/widget': [
      'https://ads-assets.pages.dev/js/widgets/hello_world/widget',
      '/js/widgets/hello_world/widget',
    ],
    'js/widgets/libraries_all/views/view_all_libraries': [
      'https://ads-assets.pages.dev/js/widgets/libraries_all/views/view_all_libraries',
      '/js/widgets/libraries_all/views/view_all_libraries',
    ],
    'js/widgets/libraries_all/widget': [
      'https://ads-assets.pages.dev/js/widgets/libraries_all/widget',
      '/js/widgets/libraries_all/widget',
    ],
    'js/widgets/library_actions/components/app.jsx': [
      'https://ads-assets.pages.dev/js/widgets/library_actions/components/app.jsx',
      '/js/widgets/library_actions/components/app.jsx',
    ],
    'js/widgets/library_actions/components/multi-control.jsx': [
      'https://ads-assets.pages.dev/js/widgets/library_actions/components/multi-control.jsx',
      '/js/widgets/library_actions/components/multi-control.jsx',
    ],
    'js/widgets/library_actions/components/radio-group.jsx': [
      'https://ads-assets.pages.dev/js/widgets/library_actions/components/radio-group.jsx',
      '/js/widgets/library_actions/components/radio-group.jsx',
    ],
    'js/widgets/library_actions/components/select.jsx': [
      'https://ads-assets.pages.dev/js/widgets/library_actions/components/select.jsx',
      '/js/widgets/library_actions/components/select.jsx',
    ],
    'js/widgets/library_actions/widget.jsx': [
      'https://ads-assets.pages.dev/js/widgets/library_actions/widget.jsx',
      '/js/widgets/library_actions/widget.jsx',
    ],
    'js/widgets/library_import/widget': [
      'https://ads-assets.pages.dev/js/widgets/library_import/widget',
      '/js/widgets/library_import/widget',
    ],
    'js/widgets/library_individual/views/library_header': [
      'https://ads-assets.pages.dev/js/widgets/library_individual/views/library_header',
      '/js/widgets/library_individual/views/library_header',
    ],
    'js/widgets/library_individual/views/manage_permissions': [
      'https://ads-assets.pages.dev/js/widgets/library_individual/views/manage_permissions',
      '/js/widgets/library_individual/views/manage_permissions',
    ],
    'js/widgets/library_individual/widget': [
      'https://ads-assets.pages.dev/js/widgets/library_individual/widget',
      '/js/widgets/library_individual/widget',
    ],
    'js/widgets/library_list/widget': [
      'https://ads-assets.pages.dev/js/widgets/library_list/widget',
      '/js/widgets/library_list/widget',
    ],
    'js/widgets/list_of_things/details_widget': [
      'https://ads-assets.pages.dev/js/widgets/list_of_things/details_widget',
      '/js/widgets/list_of_things/details_widget',
    ],
    'js/widgets/list_of_things/infinite_view': [
      'https://ads-assets.pages.dev/js/widgets/list_of_things/infinite_view',
      '/js/widgets/list_of_things/infinite_view',
    ],
    'js/widgets/list_of_things/item_view': [
      'https://ads-assets.pages.dev/js/widgets/list_of_things/item_view',
      '/js/widgets/list_of_things/item_view',
    ],
    'js/widgets/list_of_things/model': [
      'https://ads-assets.pages.dev/js/widgets/list_of_things/model',
      '/js/widgets/list_of_things/model',
    ],
    'js/widgets/list_of_things/paginated_view': [
      'https://ads-assets.pages.dev/js/widgets/list_of_things/paginated_view',
      '/js/widgets/list_of_things/paginated_view',
    ],
    'js/widgets/list_of_things/widget': [
      'https://ads-assets.pages.dev/js/widgets/list_of_things/widget',
      '/js/widgets/list_of_things/widget',
    ],
    'js/widgets/loading/widget': [
      'https://ads-assets.pages.dev/js/widgets/loading/widget',
      '/js/widgets/loading/widget',
    ],
    'js/widgets/meta_tags/widget': [
      'https://ads-assets.pages.dev/js/widgets/meta_tags/widget',
      '/js/widgets/meta_tags/widget',
    ],
    'js/widgets/metrics/d3-tip': [
      'https://ads-assets.pages.dev/js/widgets/metrics/d3-tip',
      '/js/widgets/metrics/d3-tip',
    ],
    'js/widgets/metrics/extractor_functions': [
      'https://ads-assets.pages.dev/js/widgets/metrics/extractor_functions',
      '/js/widgets/metrics/extractor_functions',
    ],
    'js/widgets/metrics/widget': [
      'https://ads-assets.pages.dev/js/widgets/metrics/widget',
      '/js/widgets/metrics/widget',
    ],
    'js/widgets/navbar/widget': ['https://ads-assets.pages.dev/js/widgets/navbar/widget', '/js/widgets/navbar/widget'],
    'js/widgets/network_vis/network_widget': [
      'https://ads-assets.pages.dev/js/widgets/network_vis/network_widget',
      '/js/widgets/network_vis/network_widget',
    ],
    'js/widgets/orcid-selector/components/orcid-selector-app.jsx': [
      'https://ads-assets.pages.dev/js/widgets/orcid-selector/components/orcid-selector-app.jsx',
      '/js/widgets/orcid-selector/components/orcid-selector-app.jsx',
    ],
    'js/widgets/orcid-selector/containers/orcid-selector-container': [
      'https://ads-assets.pages.dev/js/widgets/orcid-selector/containers/orcid-selector-container',
      '/js/widgets/orcid-selector/containers/orcid-selector-container',
    ],
    'js/widgets/orcid-selector/redux/configure-store': [
      'https://ads-assets.pages.dev/js/widgets/orcid-selector/redux/configure-store',
      '/js/widgets/orcid-selector/redux/configure-store',
    ],
    'js/widgets/orcid-selector/redux/modules/orcid-selector-app': [
      'https://ads-assets.pages.dev/js/widgets/orcid-selector/redux/modules/orcid-selector-app',
      '/js/widgets/orcid-selector/redux/modules/orcid-selector-app',
    ],
    'js/widgets/orcid-selector/widget.jsx': [
      'https://ads-assets.pages.dev/js/widgets/orcid-selector/widget.jsx',
      '/js/widgets/orcid-selector/widget.jsx',
    ],
    'js/widgets/paper_search_form/topterms': [
      'https://ads-assets.pages.dev/js/widgets/paper_search_form/topterms',
      '/js/widgets/paper_search_form/topterms',
    ],
    'js/widgets/paper_search_form/widget': [
      'https://ads-assets.pages.dev/js/widgets/paper_search_form/widget',
      '/js/widgets/paper_search_form/widget',
    ],
    'js/widgets/preferences/views/application': [
      'https://ads-assets.pages.dev/js/widgets/preferences/views/application',
      '/js/widgets/preferences/views/application',
    ],
    'js/widgets/preferences/views/export': [
      'https://ads-assets.pages.dev/js/widgets/preferences/views/export',
      '/js/widgets/preferences/views/export',
    ],
    'js/widgets/preferences/views/openurl': [
      'https://ads-assets.pages.dev/js/widgets/preferences/views/openurl',
      '/js/widgets/preferences/views/openurl',
    ],
    'js/widgets/preferences/views/orcid': [
      'https://ads-assets.pages.dev/js/widgets/preferences/views/orcid',
      '/js/widgets/preferences/views/orcid',
    ],
    'js/widgets/preferences/widget': [
      'https://ads-assets.pages.dev/js/widgets/preferences/widget',
      '/js/widgets/preferences/widget',
    ],
    'js/widgets/query_info/query_info_widget': [
      'https://ads-assets.pages.dev/js/widgets/query_info/query_info_widget',
      '/js/widgets/query_info/query_info_widget',
    ],
    'js/widgets/recommender/widget': [
      'https://ads-assets.pages.dev/js/widgets/recommender/widget',
      '/js/widgets/recommender/widget',
    ],
    'js/widgets/resources/components/app.jsx': [
      'https://ads-assets.pages.dev/js/widgets/resources/components/app.jsx',
      '/js/widgets/resources/components/app.jsx',
    ],
    'js/widgets/resources/containers/app': [
      'https://ads-assets.pages.dev/js/widgets/resources/containers/app',
      '/js/widgets/resources/containers/app',
    ],
    'js/widgets/resources/redux/configure-store': [
      'https://ads-assets.pages.dev/js/widgets/resources/redux/configure-store',
      '/js/widgets/resources/redux/configure-store',
    ],
    'js/widgets/resources/redux/middleware/api': [
      'https://ads-assets.pages.dev/js/widgets/resources/redux/middleware/api',
      '/js/widgets/resources/redux/middleware/api',
    ],
    'js/widgets/resources/redux/middleware/ui': [
      'https://ads-assets.pages.dev/js/widgets/resources/redux/middleware/ui',
      '/js/widgets/resources/redux/middleware/ui',
    ],
    'js/widgets/resources/redux/modules/api': [
      'https://ads-assets.pages.dev/js/widgets/resources/redux/modules/api',
      '/js/widgets/resources/redux/modules/api',
    ],
    'js/widgets/resources/redux/modules/ui': [
      'https://ads-assets.pages.dev/js/widgets/resources/redux/modules/ui',
      '/js/widgets/resources/redux/modules/ui',
    ],
    'js/widgets/resources/widget.jsx': [
      'https://ads-assets.pages.dev/js/widgets/resources/widget.jsx',
      '/js/widgets/resources/widget.jsx',
    ],
    'js/widgets/results/widget': [
      'https://ads-assets.pages.dev/js/widgets/results/widget',
      '/js/widgets/results/widget',
    ],
    'js/widgets/search_bar/autocomplete': [
      'https://ads-assets.pages.dev/js/widgets/search_bar/autocomplete',
      '/js/widgets/search_bar/autocomplete',
    ],
    'js/widgets/search_bar/quick-field-desc': [
      'https://ads-assets.pages.dev/js/widgets/search_bar/quick-field-desc',
      '/js/widgets/search_bar/quick-field-desc',
    ],
    'js/widgets/search_bar/search_bar_widget': [
      'https://ads-assets.pages.dev/js/widgets/search_bar/search_bar_widget',
      '/js/widgets/search_bar/search_bar_widget',
    ],
    'js/widgets/sort/components/sort-app.jsx': [
      'https://ads-assets.pages.dev/js/widgets/sort/components/sort-app.jsx',
      '/js/widgets/sort/components/sort-app.jsx',
    ],
    'js/widgets/sort/containers/sort-container': [
      'https://ads-assets.pages.dev/js/widgets/sort/containers/sort-container',
      '/js/widgets/sort/containers/sort-container',
    ],
    'js/widgets/sort/redux/configure-store': [
      'https://ads-assets.pages.dev/js/widgets/sort/redux/configure-store',
      '/js/widgets/sort/redux/configure-store',
    ],
    'js/widgets/sort/redux/modules/sort-app': [
      'https://ads-assets.pages.dev/js/widgets/sort/redux/modules/sort-app',
      '/js/widgets/sort/redux/modules/sort-app',
    ],
    'js/widgets/sort/widget.jsx': [
      'https://ads-assets.pages.dev/js/widgets/sort/widget.jsx',
      '/js/widgets/sort/widget.jsx',
    ],
    'js/widgets/success/view': ['https://ads-assets.pages.dev/js/widgets/success/view', '/js/widgets/success/view'],
    'js/widgets/tabs/tabs_widget': [
      'https://ads-assets.pages.dev/js/widgets/tabs/tabs_widget',
      '/js/widgets/tabs/tabs_widget',
    ],
    'js/widgets/user_navbar/widget': [
      'https://ads-assets.pages.dev/js/widgets/user_navbar/widget',
      '/js/widgets/user_navbar/widget',
    ],
    'js/widgets/user_settings/widget': [
      'https://ads-assets.pages.dev/js/widgets/user_settings/widget',
      '/js/widgets/user_settings/widget',
    ],
    'js/widgets/widget_states': ['https://ads-assets.pages.dev/js/widgets/widget_states', '/js/widgets/widget_states'],
    'js/widgets/wordcloud/widget': [
      'https://ads-assets.pages.dev/js/widgets/wordcloud/widget',
      '/js/widgets/wordcloud/widget',
    ],
    'js/wraps/abstract_page_library_add/widget': [
      'https://ads-assets.pages.dev/js/wraps/abstract_page_library_add/widget',
      '/js/wraps/abstract_page_library_add/widget',
    ],
    'js/wraps/abstract_page_manager/abstract_page_manager': [
      'https://ads-assets.pages.dev/js/wraps/abstract_page_manager/abstract_page_manager',
      '/js/wraps/abstract_page_manager/abstract_page_manager',
    ],
    'js/wraps/affiliation_facet': [
      'https://ads-assets.pages.dev/js/wraps/affiliation_facet',
      '/js/wraps/affiliation_facet',
    ],
    'js/wraps/alerts_mediator': ['https://ads-assets.pages.dev/js/wraps/alerts_mediator', '/js/wraps/alerts_mediator'],
    'js/wraps/authentication_page_manager': [
      'https://ads-assets.pages.dev/js/wraps/authentication_page_manager',
      '/js/wraps/authentication_page_manager',
    ],
    'js/wraps/author_facet': ['https://ads-assets.pages.dev/js/wraps/author_facet', '/js/wraps/author_facet'],
    'js/wraps/author_network': ['https://ads-assets.pages.dev/js/wraps/author_network', '/js/wraps/author_network'],
    'js/wraps/bibgroup_facet': ['https://ads-assets.pages.dev/js/wraps/bibgroup_facet', '/js/wraps/bibgroup_facet'],
    'js/wraps/bibstem_facet': ['https://ads-assets.pages.dev/js/wraps/bibstem_facet', '/js/wraps/bibstem_facet'],
    'js/wraps/citations': ['https://ads-assets.pages.dev/js/wraps/citations', '/js/wraps/citations'],
    'js/wraps/coreads': ['https://ads-assets.pages.dev/js/wraps/coreads', '/js/wraps/coreads'],
    'js/wraps/data_facet': ['https://ads-assets.pages.dev/js/wraps/data_facet', '/js/wraps/data_facet'],
    'js/wraps/database_facet': ['https://ads-assets.pages.dev/js/wraps/database_facet', '/js/wraps/database_facet'],
    'js/wraps/discovery_mediator': [
      'https://ads-assets.pages.dev/js/wraps/discovery_mediator',
      '/js/wraps/discovery_mediator',
    ],
    'js/wraps/error_page_manager/error_page_manager': [
      'https://ads-assets.pages.dev/js/wraps/error_page_manager/error_page_manager',
      '/js/wraps/error_page_manager/error_page_manager',
    ],
    'js/wraps/export_dropdown': ['https://ads-assets.pages.dev/js/wraps/export_dropdown', '/js/wraps/export_dropdown'],
    'js/wraps/grants_facet': ['https://ads-assets.pages.dev/js/wraps/grants_facet', '/js/wraps/grants_facet'],
    'js/wraps/graph_tabs': ['https://ads-assets.pages.dev/js/wraps/graph_tabs', '/js/wraps/graph_tabs'],
    'js/wraps/home_page_manager/home_page_manager': [
      'https://ads-assets.pages.dev/js/wraps/home_page_manager/home_page_manager',
      '/js/wraps/home_page_manager/home_page_manager',
    ],
    'js/wraps/keyword_facet': ['https://ads-assets.pages.dev/js/wraps/keyword_facet', '/js/wraps/keyword_facet'],
    'js/wraps/landing_page_manager/landing_page_manager': [
      'https://ads-assets.pages.dev/js/wraps/landing_page_manager/landing_page_manager',
      '/js/wraps/landing_page_manager/landing_page_manager',
    ],
    'js/wraps/libraries_page_manager/libraries_page_manager': [
      'https://ads-assets.pages.dev/js/wraps/libraries_page_manager/libraries_page_manager',
      '/js/wraps/libraries_page_manager/libraries_page_manager',
    ],
    'js/wraps/ned_object_facet': [
      'https://ads-assets.pages.dev/js/wraps/ned_object_facet',
      '/js/wraps/ned_object_facet',
    ],
    'js/wraps/orcid-instructions-page-manager/manager': [
      'https://ads-assets.pages.dev/js/wraps/orcid-instructions-page-manager/manager',
      '/js/wraps/orcid-instructions-page-manager/manager',
    ],
    'js/wraps/orcid_page_manager/orcid_page_manager': [
      'https://ads-assets.pages.dev/js/wraps/orcid_page_manager/orcid_page_manager',
      '/js/wraps/orcid_page_manager/orcid_page_manager',
    ],
    'js/wraps/orcid_page_manager': [
      'https://ads-assets.pages.dev/js/wraps/orcid_page_manager',
      '/js/wraps/orcid_page_manager',
    ],
    'js/wraps/paper_export': ['https://ads-assets.pages.dev/js/wraps/paper_export', '/js/wraps/paper_export'],
    'js/wraps/paper_metrics': ['https://ads-assets.pages.dev/js/wraps/paper_metrics', '/js/wraps/paper_metrics'],
    'js/wraps/paper_network': ['https://ads-assets.pages.dev/js/wraps/paper_network', '/js/wraps/paper_network'],
    'js/wraps/public_libraries_page_manager/public_libraries_manager': [
      'https://ads-assets.pages.dev/js/wraps/public_libraries_page_manager/public_libraries_manager',
      '/js/wraps/public_libraries_page_manager/public_libraries_manager',
    ],
    'js/wraps/pubtype_facet': ['https://ads-assets.pages.dev/js/wraps/pubtype_facet', '/js/wraps/pubtype_facet'],
    'js/wraps/refereed_facet': ['https://ads-assets.pages.dev/js/wraps/refereed_facet', '/js/wraps/refereed_facet'],
    'js/wraps/references': ['https://ads-assets.pages.dev/js/wraps/references', '/js/wraps/references'],
    'js/wraps/results_page_manager': [
      'https://ads-assets.pages.dev/js/wraps/results_page_manager',
      '/js/wraps/results_page_manager',
    ],
    'js/wraps/sidebar-graphics-widget': [
      'https://ads-assets.pages.dev/js/wraps/sidebar-graphics-widget',
      '/js/wraps/sidebar-graphics-widget',
    ],
    'js/wraps/simbad_object_facet': [
      'https://ads-assets.pages.dev/js/wraps/simbad_object_facet',
      '/js/wraps/simbad_object_facet',
    ],
    'js/wraps/similar': ['https://ads-assets.pages.dev/js/wraps/similar', '/js/wraps/similar'],
    'js/wraps/table_of_contents': [
      'https://ads-assets.pages.dev/js/wraps/table_of_contents',
      '/js/wraps/table_of_contents',
    ],
    'js/wraps/user_settings_page_manager/user_page_manager': [
      'https://ads-assets.pages.dev/js/wraps/user_settings_page_manager/user_page_manager',
      '/js/wraps/user_settings_page_manager/user_page_manager',
    ],
    'js/wraps/visualization_dropdown': [
      'https://ads-assets.pages.dev/js/wraps/visualization_dropdown',
      '/js/wraps/visualization_dropdown',
    ],
    'js/wraps/vizier_facet': ['https://ads-assets.pages.dev/js/wraps/vizier_facet', '/js/wraps/vizier_facet'],
  },

  hbs: {
    templateExtension: 'html',
    helpers: false,
  },

  babel: {
    presets: ['env', 'react'],
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
      exports: 'Backbone',
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

    sinon: {
      exports: 'sinon',
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
