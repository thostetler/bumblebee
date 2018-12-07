define([], function () {
  var config = {
    core: {
      controllers: {
        FeedbackMediator: require('js/wraps/discovery_mediator'),
        QueryMediator: require('js/components/query_mediator'),
        Diagnostics: require('js/bugutils/diagnostics'),
        AlertsController: require('js/wraps/alerts_mediator'),
        Orcid: require('js/modules/orcid/module')
      },
      services: {
        Api: require('js/services/api'),
        PubSub: require('js/services/pubsub'),
        Navigator: require('js/apps/discovery/navigator'),
        PersistentStorage: require('js/services/storage'),
        HistoryManager: require('js/components/history_manager')
      },
      objects: {
        User: require('js/components/user'),
        Session: require('js/components/session'),
        DynamicConfig: require('discovery.vars'),
        MasterPageManager: require('js/page_managers/master'),
        AppStorage: require('js/components/app_storage'),
        RecaptchaManager: require('js/components/recaptcha_manager'),
        CSRFManager: "js/components/csrf_manager",
        LibraryController: require('js/components/library_controller'),
        DocStashController: require('js/components/doc_stash_controller')
      },
      modules: {
        FacetFactory: require('js/widgets/facet/factory')
      }
    },
    widgets: {
      LandingPage: require('js/wraps/landing_page_manager/landing_page_manager'),
      SearchPage: require('js/wraps/results_page_manager'),
      DetailsPage: require('js/wraps/abstract_page_manager/abstract_page_manager'),
      AuthenticationPage: require('js/wraps/authentication_page_manager'),
      SettingsPage: require('js/wraps/user_settings_page_manager/user_page_manager'),
      OrcidPage: require('js/wraps/orcid_page_manager/orcid_page_manager'),
      OrcidInstructionsPage: require('js/wraps/orcid-instructions-page-manager/manager'),

      LibrariesPage: require('js/wraps/libraries_page_manager/libraries_page_manager'),
      HomePage: require('js/wraps/home_page_manager/home_page_manager'),
      PublicLibrariesPage: require('js/wraps/public_libraries_page_manager/public_libraries_manager'),
      ErrorPage: require('js/wraps/error_page_manager/error_page_manager'),

      Authentication: require('js/widgets/authentication/widget'),
      UserSettings: require('js/widgets/user_settings/widget'),
      UserPreferences: require('js/widgets/preferences/widget'),
      LibraryImport: require('js/widgets/library_import/widget'),
      BreadcrumbsWidget: require('js/widgets/filter_visualizer/widget'),
      NavbarWidget: require('js/widgets/navbar/widget'),
      UserNavbarWidget: require('js/widgets/user_navbar/widget'),
      AlertsWidget: require('js/widgets/alerts/widget'),
      ClassicSearchForm: require('js/widgets/classic_form/widget'),
      SearchWidget: require('js/widgets/search_bar/search_bar_widget'),
      PaperSearchForm: require('js/widgets/paper_search_form/widget'),
      Results: require('js/widgets/results/widget'),
      QueryInfo: require('js/widgets/query_info/query_info_widget'),
      QueryDebugInfo: require('js/widgets/api_query/widget'),
      ExportWidget: require('js/widgets/export/widget.jsx'),
      Sort: require('js/widgets/sort/widget.jsx'),
      ExportDropdown: require('js/wraps/export_dropdown'),
      VisualizationDropdown: require('js/wraps/visualization_dropdown'),
      AuthorNetwork: require('js/wraps/author_network'),
      PaperNetwork: require('js/wraps/paper_network'),
      ConceptCloud: require('js/widgets/wordcloud/widget'),
      BubbleChart: require('js/widgets/bubble_chart/widget'),
      AuthorAffiliationTool: require('js/widgets/author_affiliation_tool/widget.jsx'),

      Metrics: require('js/widgets/metrics/widget'),
      CitationHelper: require('js/widgets/citation_helper/widget'),
      OrcidBigWidget: require('js/modules/orcid/widget/widget'),
      OrcidSelector: require('js/widgets/orcid-selector/widget.jsx'),

      AffiliationFacet: require('js/wraps/affiliation_facet'),
      AuthorFacet: require('js/wraps/author_facet'),
      BibgroupFacet: require('js/wraps/bibgroup_facet'),
      BibstemFacet: require('js/wraps/bibstem_facet'),
      DataFacet: require('js/wraps/data_facet'),
      DatabaseFacet: require('js/wraps/database_facet'),
      GrantsFacet: require('js/wraps/grants_facet'),
      KeywordFacet: require('js/wraps/keyword_facet'),
      ObjectFacet: require('js/wraps/simbad_object_facet'),
      NedObjectFacet: require('js/wraps/ned_object_facet'),
      RefereedFacet: require('js/wraps/refereed_facet'),
      VizierFacet: require('js/wraps/vizier_facet'),
      GraphTabs: require('js/wraps/graph_tabs'),
      FooterWidget: require('js/widgets/footer/widget'),
      PubtypeFacet: require('js/wraps/pubtype_facet'),

      ShowAbstract: require('js/widgets/abstract/widget'),
      ShowGraphics: require('js/widgets/graphics/widget'),
      ShowGraphicsSidebar: require('js/wraps/sidebar-graphics-widget'),
      ShowReferences: require('js/wraps/references'),
      ShowCitations: require('js/wraps/citations'),
      ShowCoreads: require('js/wraps/coreads'),
      MetaTagsWidget: require('js/widgets/meta_tags/widget'),
      //can't camel case because router only capitalizes first letter
      ShowTableofcontents: require('js/wraps/table_of_contents'),
      ShowResources: require('js/widgets/resources/widget.jsx'),
      ShowAssociated: require('js/widgets/associated/widget.jsx'),
      ShowRecommender: require('js/widgets/recommender/widget'),
      ShowMetrics: require('js/wraps/paper_metrics'),
      ShowPaperExport: require('js/wraps/paper_export'),
      ShowLibraryAdd: require('js/wraps/abstract_page_library_add/widget'),

      IndividualLibraryWidget: require('js/widgets/library_individual/widget'),
      AllLibrariesWidget: require('js/widgets/libraries_all/widget'),
      LibraryListWidget: require('js/widgets/library_list/widget')
    },
    plugins: {}
  }

  return config;
});
