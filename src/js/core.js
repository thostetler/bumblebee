import FeedbackMediator from 'js/wraps/discovery_mediator';
import QueryMediator from 'js/components/query_mediator';
import AlertsController from 'js/wraps/alerts_mediator';
import Orcid from 'js/modules/orcid/module';
import SecondOrderController from 'js/components/second_order_controller';
import HotkeysController from 'js/components/hotkeys_controller';
import Api from 'js/services/api';
import PubSub from 'js/services/pubsub';
import Navigator from 'js/apps/discovery/navigator';
import PersistentStorage from 'js/services/storage';
import HistoryManager from 'js/components/history_manager';
import User from 'js/components/user';
import Session from 'js/components/session';
import DynamicConfig from 'config/discovery.vars';
import MasterPageManager from 'js/page_managers/master';
import AppStorage from 'js/components/app_storage';
// import RecaptchaManager from 'recaptcha!js/components/recaptcha_manager';
import CSRFManager from 'js/components/csrf_manager';
import LibraryController from 'js/components/library_controller';
import DocStashController from 'js/components/doc_stash_controller';
import FacetFactory from 'js/widgets/facet/factory';

import LandingPage from 'js/wraps/landing_page_manager/landing_page_manager';
import SearchPage from 'js/wraps/results_page_manager';
import DetailsPage from 'js/wraps/abstract_page_manager/abstract_page_manager';
import AuthenticationPage from 'js/wraps/authentication_page_manager';
import SettingsPage from 'js/wraps/user_settings_page_manager/user_page_manager';
import OrcidPage from 'js/wraps/orcid_page_manager/orcid_page_manager';
import OrcidInstructionsPage from 'js/wraps/orcid-instructions-page-manager/manager';
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
import ExportWidget from 'js/widgets/export/widget.jsx';
import Sort from 'js/widgets/sort/widget.jsx';
import ExportDropdown from 'js/wraps/export_dropdown';
import VisualizationDropdown from 'js/wraps/visualization_dropdown';
import AuthorNetwork from 'js/wraps/author_network';
import PaperNetwork from 'js/wraps/paper_network';
import ConceptCloud from 'js/widgets/wordcloud/widget';
import BubbleChart from 'js/widgets/bubble_chart/widget';
import AuthorAffiliationTool from 'js/widgets/author_affiliation_tool/widget.jsx';
import Metrics from 'js/widgets/metrics/widget';
import CitationHelper from 'js/widgets/citation_helper/widget';
import OrcidBigWidget from 'js/modules/orcid/widget/widget';
import OrcidSelector from 'js/widgets/orcid-selector/widget.jsx';
import AffiliationFacet from 'js/wraps/affiliation_facet';
import AuthorFacet from 'js/wraps/author_facet';
import BibgroupFacet from 'js/wraps/bibgroup_facet';
import BibstemFacet from 'js/wraps/bibstem_facet';
import DataFacet from 'js/wraps/data_facet';
import DatabaseFacet from 'js/wraps/database_facet';
import GrantsFacet from 'js/wraps/grants_facet';
import KeywordFacet from 'js/wraps/keyword_facet';
import ObjectFacet from 'js/wraps/simbad_object_facet';
import NedObjectFacet from 'js/wraps/ned_object_facet';
import RefereedFacet from 'js/wraps/refereed_facet';
import VizierFacet from 'js/wraps/vizier_facet';
import GraphTabs from 'js/wraps/graph_tabs';
import FooterWidget from 'js/widgets/footer/widget';
import PubtypeFacet from 'js/wraps/pubtype_facet';
import ShowAbstract from 'js/widgets/abstract/widget';
import ShowGraphics from 'js/widgets/graphics/widget';
import ShowGraphicsSidebar from 'js/wraps/sidebar-graphics-widget';
import ShowReferences from 'js/wraps/references';
import ShowCitations from 'js/wraps/citations';
import ShowCoreads from 'js/wraps/coreads';
import ShowSimilar from 'js/wraps/similar';
import MetaTagsWidget from 'js/widgets/meta_tags/widget';
import ShowToc from 'js/wraps/table_of_contents';
import ShowResources from 'js/widgets/resources/widget.jsx';
import ShowAssociated from 'js/widgets/associated/widget.jsx';
import ShowRecommender from 'js/widgets/recommender/widget';
import ShowMetrics from 'js/wraps/paper_metrics';
import ShowExportcitation from 'js/wraps/paper_export';
import ShowLibraryAdd from 'js/wraps/abstract_page_library_add/widget';
import IndividualLibraryWidget from 'js/widgets/library_individual/widget';
import LibraryActionsWidget from 'js/widgets/library_actions/widget.jsx';
import AllLibrariesWidget from 'js/widgets/libraries_all/widget';
import LibraryListWidget from 'js/widgets/library_list/widget';

export default {
  core: {
    controllers: {
      FeedbackMediator,
      QueryMediator,
      AlertsController,
      Orcid,
      SecondOrderController,
      HotkeysController,
    },
    services: {
      Api,
      PubSub,
      Navigator,
      PersistentStorage,
      HistoryManager,
    },
    objects: {
      User,
      Session,
      DynamicConfig,
      MasterPageManager,
      AppStorage,
      // RecaptchaManager,
      CSRFManager,
      LibraryController,
      DocStashController,
    },
    modules: {
      FacetFactory,
    },
    widgets: {
      LandingPage,
      SearchPage,
      DetailsPage,
      AuthenticationPage,
      SettingsPage,
      OrcidPage,
      OrcidInstructionsPage,
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
      AuthorAffiliationTool,
      Metrics,
      CitationHelper,
      OrcidBigWidget,
      OrcidSelector,
      AffiliationFacet,
      AuthorFacet,
      BibgroupFacet,
      BibstemFacet,
      DataFacet,
      DatabaseFacet,
      GrantsFacet,
      KeywordFacet,
      ObjectFacet,
      NedObjectFacet,
      RefereedFacet,
      VizierFacet,
      GraphTabs,
      FooterWidget,
      PubtypeFacet,
      ShowAbstract,
      ShowGraphics,
      ShowGraphicsSidebar,
      ShowReferences,
      ShowCitations,
      ShowCoreads,
      ShowSimilar,
      MetaTagsWidget,
      ShowToc,
      ShowResources,
      ShowAssociated,
      ShowRecommender,
      ShowMetrics,
      ShowExportcitation,
      ShowLibraryAdd,
      IndividualLibraryWidget,
      LibraryActionsWidget,
      AllLibrariesWidget,
      LibraryListWidget,
    },
  },
};
