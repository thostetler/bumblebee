define([], function () {
  var config = {
    core: {
      controllers: {
        FeedbackMediator: require('wraps/discovery_mediator'),
        QueryMediator: require('components/query_mediator'),
        Diagnostics: require('bugutils/diagnostics'),
        AlertsController: require('wraps/alerts_mediator'),
        Orcid: require('modules/orcid/module')
      },
      services: {
        Api: require('services/api'),
        PubSub: require('services/pubsub'),
        Navigator: require('services/navigator'),
        PersistentStorage: require('services/storage'),
        HistoryManager: require('components/history_manager')
      },
      objects: {
        User: require('components/user'),
        Session: require('components/session'),
        DynamicConfig: require('discovery.vars'),
        MasterPageManager: require('page_managers/master'),
        AppStorage: require('components/app_storage'),
        RecaptchaManager: require('components/recaptcha_manager'),
        CSRFManager: require('components/csrf_manager'),
        LibraryController: require('components/library_controller'),
        DocStashController: require('components/doc_stash_controller')
      },
      modules: {
        FacetFactory: require('widgets/facet/factory')
      }
    },
    widgets: {
      LandingPage: require('wraps/landing_page_manager/landing_page_manager'),
      SearchPage: require('wraps/results_page_manager'),
      DetailsPage: require('wraps/abstract_page_manager/abstract_page_manager'),
      AuthenticationPage: require('wraps/authentication_page_manager'),
      SettingsPage: require('wraps/user_settings_page_manager/user_page_manager'),
      OrcidPage: require('wraps/orcid_page_manager/orcid_page_manager'),
      OrcidInstructionsPage: require('wraps/orcid-instructions-page-manager/manager'),

      LibrariesPage: require('wraps/libraries_page_manager/libraries_page_manager'),
      HomePage: require('wraps/home_page_manager/home_page_manager'),
      PublicLibrariesPage: require('wraps/public_libraries_page_manager/public_libraries_manager'),
      ErrorPage: require('wraps/error_page_manager/error_page_manager'),

      Authentication: require('widgets/authentication/widget'),
      UserSettings: require('widgets/user_settings/widget'),
      UserPreferences: require('widgets/preferences/widget'),
      LibraryImport: require('widgets/library_import/widget'),
      BreadcrumbsWidget: require('widgets/filter_visualizer/widget'),
      NavbarWidget: require('widgets/navbar/widget'),
      UserNavbarWidget: require('widgets/user_navbar/widget'),
      AlertsWidget: require('widgets/alerts/widget'),
      ClassicSearchForm: require('widgets/classic_form/widget'),
      SearchWidget: require('widgets/search_bar/search_bar_widget'),
      PaperSearchForm: require('widgets/paper_search_form/widget'),
      Results: require('widgets/results/widget'),
      QueryInfo: require('widgets/query_info/query_info_widget'),
      QueryDebugInfo: require('widgets/api_query/widget'),
      ExportWidget: require('widgets/export/widget'),
      Sort: require('widgets/sort/widget'),
      ExportDropdown: require('wraps/export_dropdown'),
      VisualizationDropdown: require('wraps/visualization_dropdown'),
      AuthorNetwork: require('wraps/author_network'),
      PaperNetwork: require('wraps/paper_network'),
      ConceptCloud: require('widgets/wordcloud/widget'),
      BubbleChart: require('widgets/bubble_chart/widget'),
      AuthorAffiliationTool: require('widgets/author_affiliation_tool/widget'),

      Metrics: require('widgets/metrics/widget'),
      CitationHelper: require('widgets/citation_helper/widget'),
      OrcidBigWidget: require('modules/orcid/widget/widget'),
      OrcidSelector: require('widgets/orcid-selector/widget'),

      AffiliationFacet: require('wraps/affiliation_facet'),
      AuthorFacet: require('wraps/author_facet'),
      BibgroupFacet: require('wraps/bibgroup_facet'),
      BibstemFacet: require('wraps/bibstem_facet'),
      DataFacet: require('wraps/data_facet'),
      DatabaseFacet: require('wraps/database_facet'),
      GrantsFacet: require('wraps/grants_facet'),
      KeywordFacet: require('wraps/keyword_facet'),
      ObjectFacet: require('wraps/simbad_object_facet'),
      NedObjectFacet: require('wraps/ned_object_facet'),
      RefereedFacet: require('wraps/refereed_facet'),
      VizierFacet: require('wraps/vizier_facet'),
      GraphTabs: require('wraps/graph_tabs'),
      FooterWidget: require('widgets/footer/widget'),
      PubtypeFacet: require('wraps/pubtype_facet'),

      ShowAbstract: require('widgets/abstract/widget'),
      ShowGraphics: require('widgets/graphics/widget'),
      ShowGraphicsSidebar: require('wraps/sidebar-graphics-widget'),
      ShowReferences: require('wraps/references'),
      ShowCitations: require('wraps/citations'),
      ShowCoreads: require('wraps/coreads'),
      MetaTagsWidget: require('widgets/meta_tags/widget'),
      //can't camel case because router only capitalizes first letter
      ShowTableofcontents: require('wraps/table_of_contents'),
      ShowResources: require('widgets/resources/widget'),
      ShowAssociated: require('widgets/associated/widget'),
      ShowRecommender: require('widgets/recommender/widget'),
      ShowMetrics: require('wraps/paper_metrics'),
      ShowPaperExport: require('wraps/paper_export'),
      ShowLibraryAdd: require('wraps/abstract_page_library_add/widget'),

      IndividualLibraryWidget: require('widgets/library_individual/widget'),
      AllLibrariesWidget: require('widgets/libraries_all/widget'),
      LibraryListWidget: require('widgets/library_list/widget')
    },
    plugins: {}
  }

  return config;
});
