const path = require('node:path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  resolve: {
    fallback: {
      fs: false,
      path: require.resolve('path-browserify'),
      assert: require.resolve('assert/'),
    },
    modules: [path.resolve(__dirname, 'src/libs'), path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      analytics: path.resolve('src/js/components/analytics'),
      utils: path.resolve(__dirname, 'src/js/utils'),
      reactify: path.resolve(__dirname, 'src/js/plugins/reactify'),
      es6: path.resolve(__dirname, 'src/js/plugins/es6'),
      pubsub_service_impl: path.resolve(__dirname, 'src/js/services/default_pubsub'),

      // libraries
      bootstrap: path.resolve(__dirname, 'src/libs/bootstrap/bootstrap'),
      marionette: path.resolve(__dirname, 'src/libs/backbone.marionette'),
      filesaver: path.resolve(__dirname, 'src/libs/file-saver'),
      cache: path.resolve('./src/libs/cache'),
      polyfill: path.resolve('libs/polyfill'),
      yup: path.resolve('libs/yup'),
      hbs: path.resolve(__dirname, 'src/libs/requirejs-plugins/hbs'),
      async: path.resolve(__dirname, 'src/libs/requirejs-plugins/async'),

      // suit
      suit: path.resolve(__dirname, 'shared/dist/index.umd.development'),
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'handlebars-loader',
        options: {
          partialResolver: function (partial, cb) {
            cb(null, path.join(__dirname, 'src', `${partial}.html`));
          },
          knownHelpers: ['compare']
        }
      },
      {
        test: /\.(js|jsx|tsx|ts|jsx\.js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  entry: {
    // controllers
    FeedbackMediator: 'js/wraps/discovery_mediator',
    QueryMediator: 'js/components/query_mediator',
    Diagnostics: 'js/bugutils/diagnostics',
    AlertsController: 'js/wraps/alerts_mediator',
    Orcid: 'js/modules/orcid/module',
    SecondOrderController: 'js/components/second_order_controller',
    HotkeysController: 'js/components/hotkeys_controller',
    Experiments: 'js/components/experiments',

    // services
    Api: 'js/services/api',
    PubSub: 'js/services/pubsub',
    Navigator: 'js/apps/discovery/navigator',
    PersistentStorage: 'js/services/storage',
    HistoryManager: 'js/components/history_manager',

    // objects
    User: 'js/components/user',
    Session: 'js/components/session',
    DynamicConfig: 'config/discovery.vars',
    MasterPageManager: 'js/page_managers/master',
    AppStorage: 'js/components/app_storage',
    CSRFManager: 'js/components/csrf_manager',
    LibraryController: 'js/components/library_controller',
    DocStashController: 'js/components/doc_stash_controller',
    Utils: 'utils',

    // modules
    FacetFactory: 'js/widgets/facet/factory',

    // widgets
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
    ShowLibraryAdd: 'js/wraps/abstract_page_library_add/widget',
    IndividualLibraryWidget: 'js/widgets/library_individual/widget',
    LibraryActionsWidget: 'js/widgets/library_actions/widget.jsx',
    AllLibrariesWidget: 'js/widgets/libraries_all/widget',
    LibraryListWidget: 'js/widgets/library_list/widget',

    MyAdsFreeform: 'reactify!js/react/BumblebeeWidget?MyAdsFreeform',
    ShowFeedback: 'reactify!js/react/BumblebeeWidget?FeedbackForms',
    MyAdsDashboard: 'reactify!js/react/BumblebeeWidget?MyAdsDashboard',
    RecommenderWidget: 'reactify!js/react/BumblebeeWidget?Recommender',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'webpack-out'),
    clean: true,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]|[\\/]src[\\/]libs[\\/]/,
          name: 'vendor',
          chunks: 'all',
          enforce: true,
        },
        common: {
          name: 'common',
          minChunks: 2, // only pull code shared in 2+ entry points
          chunks: 'all',
          priority: -5,
          enforce: true,
          test: (module) => {
            // Exclude vendor modules
            const isVendor =
              /[\\/]node_modules[\\/]/.test(module.identifier()) || /[\\/]src[\\/]libs[\\/]/.test(module.identifier());
            return !isVendor;
          },
        },
      },
    },
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/reactify/, path.resolve(__dirname, 'src/js/plugins/reactify.js')),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    {
      apply(compiler) {
        compiler.hooks.normalModuleFactory.tap('RewriteHbsPlugin', (nmf) => {
          nmf.hooks.beforeResolve.tap('RewriteHbsPlugin', (result) => {
            if (!result) return;

            if (result.request.startsWith('hbs!')) {
              const base = result.request.slice(4);
              // Update the request directly (mutate the object)
              if (!base.endsWith('.html') && !base.endsWith('.hbs')) {
                result.request = `${base}.html`;
              } else {
                result.request = base;
              }
            }
            // return nothing (undefined)
          });
        });
      },
    },
  ],
};
