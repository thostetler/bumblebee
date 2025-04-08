define(['underscore', 'jquery', 'backbone', 'js/components/api_query', 'js/mixins/dependon', 'js/components/api_feedback', 'js/components/api_request', 'js/components/api_targets', 'js/mixins/api_access', 'js/components/api_query_updater'], function (_, $, Backbone, ApiQuery, Dependon, ApiFeedback, ApiRequest, ApiTargets, ApiAccessMixin, ApiQueryUpdater) {
  var Router = Backbone.Router.extend({
    initialize: function initialize(options) {
      options = options || {};
      this.queryUpdater = new ApiQueryUpdater('Router');
    },
    execute: function execute(callback, args) {
      // the routes assume the query params are the first arg, so make sure it isn't undefined
      var argsToPass = args.filter(function (a) {
        return a !== undefined;
      });

      if (_.isFunction(callback)) {
        callback.apply(this, argsToPass);
      }
    },
    activate: function activate(beehive) {
      this.setBeeHive(beehive);

      if (!this.hasPubSub()) {
        throw new Error('Ooops! Who configured this #@$%! There is no PubSub service!');
      }
    },

    /*
     * if you don't want the navigator to duplicate the route in history,
     * use this function instead of pubsub.publish(pubsub.NAVIGATE ...)
     * */
    routerNavigate: function routerNavigate(route, options) {
      var options = options || {};
      this.getPubSub().publish(this.getPubSub().NAVIGATE, route, options);
    },
    routes: {
      '/': 'index',
      '': 'index',
      'classic-form(/)': 'classicForm',
      'paper-form(/)': 'paperForm',
      'index/(:query)': 'index',
      'search/(:query)(/)(:widgetName)': 'search',
      'search(/)(?:query)': 'search',
      'execute-query/(:query)': 'executeQuery',
      'feedback/(:subview)': 'feedbackPage',
      'abs/*path': 'view',

      /*
       * user endpoints require user to be logged in, either
       * to orcid or to ads
       * */
      'user/orcid*(:subView)': 'orcidPage',
      'user/account(/)(:subView)': 'authenticationPage',
      'user/account/verify/(:subView)/(:token)': 'routeToVerifyPage',
      'user/settings(/)(:subView)(/)': 'settingsPage',
      'user/libraries(/)(:id)(/)(:subView)(/)(:subData)(/)': 'librariesPage',
      'user/home(/)': 'homePage',

      /* end user routes */
      'orcid-instructions(/)': 'orcidInstructions',
      'public-libraries/(:id)(/)': 'publicLibraryPage',
      '*invalidRoute': 'noPageFound'
    },
    index: function index(query) {
      this.routerNavigate('index-page');
    },
    classicForm: function classicForm() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      this.routerNavigate('ClassicSearchForm', {
        query: new ApiQuery().load(query)
      });
    },
    paperForm: function paperForm() {
      this.routerNavigate('PaperSearchForm');
    },
    feedbackPage: function feedbackPage(subview) {
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var bibcode = '';

      try {
        // if necessary encode ampersands present in the bibcode
        query = query.replace('&', encodeURIComponent('&'));
        var params = new URLSearchParams(query);
        bibcode = params.get('bibcode');
      } catch (e) {
        bibcode = '';
      }

      this.routerNavigate("ShowFeedback", {
        subview: subview,
        href: "#feedback/".concat(subview),
        bibcode: bibcode
      });
    },
    search: function search(query, widgetName) {
      if (query) {
        try {
          var q = new ApiQuery().load(query);
          this.routerNavigate('search-page', {
            q: q,
            page: widgetName && 'show-' + widgetName,
            replace: true
          });
        } catch (e) {
          console.error('Error parsing query from a string: ', query, e);
          this.getPubSub().publish(this.getPubSub().NAVIGATE, 'index-page');
          this.getPubSub().publish(this.getPubSub().BIG_FIRE, new ApiFeedback({
            code: ApiFeedback.CODES.CANNOT_ROUTE,
            reason: 'Cannot parse query',
            query: query
          }));
          return this.getPubSub().publish(this.getPubSub().ALERT, new ApiFeedback({
            code: ApiFeedback.CODES.ALERT,
            msg: 'unable parse query',
            type: 'danger',
            modal: true
          }));
        }
      } else {
        this.getPubSub().publish(this.getPubSub().NAVIGATE, 'index-page', {
          replace: true
        });
      }
    },
    executeQuery: function executeQuery(queryId) {
      this.getPubSub().publish(this.getPubSub().NAVIGATE, 'execute-query', queryId);
    },
    view: function view(path) {
      if (!path) {
        return this.routerNavigate('404');
      } // break apart the path


      var parts = path.split('/'); // check for a subpage

      var subPage;
      var subPageRegex = /^(abstract|citations|references|coreads|similar|toc|graphics|metrics|exportcitation)$/;

      if (parts[parts.length - 1].match(subPageRegex)) {
        subPage = parts.pop();
      } // take the rest and combine into the identifier


      var id = parts.join('/');
      var navigateString, href;

      if (!subPage) {
        navigateString = 'ShowAbstract';
        href = '#abs/' + encodeURIComponent(id) + '/abstract';
      } else {
        navigateString = 'Show' + subPage[0].toUpperCase() + subPage.slice(1);
        href = '#abs/' + encodeURIComponent(id) + '/' + subPage;
      }

      this.routerNavigate(navigateString, {
        href: href,
        bibcode: id
      });
    },
    routeToVerifyPage: function routeToVerifyPage(subView, token) {
      this.getPubSub().publish(this.getPubSub().NAVIGATE, 'user-action', {
        subView: subView,
        token: token
      });
    },
    orcidPage: function orcidPage() {
      this.getPubSub().publish(this.getPubSub().NAVIGATE, 'orcid-page');
    },
    orcidInstructions: function orcidInstructions() {
      this.getPubSub().publish(this.getPubSub().NAVIGATE, 'orcid-instructions');
    },
    authenticationPage: function authenticationPage(subView) {
      // possible subViews: "login", "register", "reset-password"
      if (subView && !_.contains(['login', 'register', 'reset-password-1', 'reset-password-2', 'resend-verification-email'], subView)) {
        throw new Error("that isn't a subview that the authentication page knows about");
      }

      this.routerNavigate('authentication-page', {
        subView: subView
      });
    },
    settingsPage: function settingsPage(subView) {
      // possible subViews: "token", "password", "email", "preferences"
      if (_.contains(['token', 'password', 'email', 'delete'], subView)) {
        this.routerNavigate('UserSettings', {
          subView: subView
        });
      } else if (_.contains(['librarylink', 'orcid', 'application', 'export'], subView)) {
        // show preferences if no subview provided
        this.routerNavigate('UserPreferences', {
          subView: subView
        });
      } else if (_.contains(['libraryimport'], subView)) {
        this.routerNavigate('LibraryImport');
      } else if (_.contains(['myads'], subView)) {
        this.routerNavigate('MyAdsDashboard');
      } else {
        // just default to showing the library link page for now
        this.routerNavigate('UserPreferences', {
          subView: undefined
        });
      }
    },
    librariesPage: function librariesPage(id, subView, subData) {
      if (id) {
        if (id === 'actions') {
          return this.routerNavigate('LibraryActionsWidget', 'libraries');
        } // individual libraries view


        var subView = subView || 'library';

        if (_.contains(['library', 'admin'], subView)) {
          this.routerNavigate('IndividualLibraryWidget', {
            subView: subView,
            id: id
          });
        } else if (_.contains(['export', 'metrics', 'visualization'], subView)) {
          subView = 'library-' + subView;

          if (subView == 'library-export') {
            this.routerNavigate(subView, {
              subView: subData || 'bibtex',
              id: id
            });
          } else if (subView == 'library-metrics') {
            this.routerNavigate(subView, {
              id: id
            });
          }
        } else {
          throw new Error('did not recognize subview for library view');
        }
      } else {
        // main libraries view
        this.routerNavigate('AllLibrariesWidget', 'libraries');
      }
    },
    publicLibraryPage: function publicLibraryPage(id) {
      // main libraries view
      this.getPubSub().publish(this.getPubSub().NAVIGATE, 'IndividualLibraryWidget', {
        id: id,
        publicView: true,
        subView: 'library'
      });
    },
    homePage: function homePage(subView) {
      this.routerNavigate('home-page', {
        subView: subView
      });
    },
    noPageFound: function noPageFound() {
      this.routerNavigate('404');
    },
    _extractParameters: function _extractParameters(route, fragment) {
      return _.map(route.exec(fragment).slice(1), function (param) {
        // do not decode api queries
        if (/q\=/.test(param)) {
          return param;
        }

        return param ? decodeURIComponent(param) : param;
      });
    }
  });

  _.extend(Router.prototype, Dependon.BeeHive, ApiAccessMixin);

  return Router;
});
