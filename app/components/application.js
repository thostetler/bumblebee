/**
 * Application object contains methods for asynochronous loading of other modules
 * It will load BeeHive by default, and it recognizes the following types of
 * objects
 *
 *  core:
 *    modules - any module you want to load and give it access to the full
 *              BeeHive (these guys are loaded first)
 *    services - these instances will be inserted into Beehive.Services
 *              (loaded after modules)
 *    objects - these will be inserted into BeeHive.Objects
 *              (loaded after services)
 *
 *  plugins - any object you want to instantiate
 *  widgets - any visual object you want to instantiate
 *
 *
 *  this is the normal workflow
 *
 *  var app = new Application();
 *  var promise = app.loadModules({
 *       core: {
 *         services: {
 *           PubSub: 'services/pubsub',
 *           Api: 'services/api'
 *         },
 *         modules: {
 *           QueryMediator: 'components/query_mediator'
 *         }
 *       },
 *       widgets: {
 *         YearFacet: 'widgets/facets/factory'
 *       }
 *     });
 *   promise.done(function() {
 *     app.activate();
 *     //....continue setting up layout etc
 *   });
 *
 *
 */

define([
  'underscore',
  'jquery',
  'backbone',
  'module',
  'components/beehive',
  'mixins/api_access',
], function (
  _,
  $,
  Backbone,
  module,
  BeeHive,
  ApiAccess
) {
  var Application = function (options) {
    options || (options = {});
    this.aid = _.uniqueId('application');
    this.debug = true;
    _.extend(this, _.pick(options, ['timeout', 'debug']));
    this.initialize.apply(this, arguments);
  };

  var Container = function () {
    this.container = {};
  };
  _.extend(Container.prototype, {
    has: function (name) {
      return this.container.hasOwnProperty(name);
    },
    get: function (name) {
      return this.container[name];
    },
    remove: function (name) {
      delete this.container[name];
    },
    add: function (name, obj) {
      this.container[name] = obj;
    }
  });

  _.extend(Application.prototype, {

    initialize: function (config, options) {
      // these are core (elevated access)
      this.__beehive = new BeeHive();
      this.__modules = new Container();
      this.__controllers = new Container();

      // these are barbarians behind the gates
      this.__widgets = new Container();
      this.__plugins = new Container();
      this.__barbarianRegistry = {};
      this.__barbarianInstances = {};
    },

    /*
     * code that accounts for browser deficiencies
     */

    shim: function () {
      if (!window.location.origin) {
        window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
      }
    },

    /**
     * Purpose of this call is to load dynamically all modules
     * that you pass in a configuration. We'll load them using
     * requirejs and set them into BeeHive
     *
     * This method returns 'Deferred' object, which tells you
     * whether initialization has finished. You *have to* use it
     * in the following way;
     *
     * app = new Application();
     * defer = app.loadModules(config, options);
     * defer.done(function() {
     *    // .... do something with the application
     * })
     *
     * @param config
     * @param options
     */
    loadModules: function (config, options) {
      var promises = [];
      var self = this;
      var promise;

      var core = config.core;
      if (core) {
        _.each(['controllers', 'modules', 'services', 'objects'], function (name) {
          if (core[name]) {
            promise = self._loadModules(name, core[name]);
            if (promise) promises.push(promise);
          }
        });
      }

      var plugins = config.plugins;
      if (plugins) {
        promise = self._loadModules('plugins', plugins);
        if (promise) promises.push(promise);
      }

      var widgets = config.widgets;
      if (widgets) {
        promise = self._loadModules('widgets', widgets);
        if (promise) promises.push(promise);
      }

      if (promises.length == 1) {
        promises.push(promise); // hack, so that $.when() always returns []
      }

      var bigPromise = $.when.apply($, promises)
        .then(function () {
          _.each(arguments, function (promisedValues, idx) {
            if (_.isArray(promisedValues)) {
              if (self.debug) {
                console.log('application: registering ' + promisedValues[0]);
              }
              self._registerLoadedModules.apply(self, promisedValues);
            }
          });
        })
        .fail(function () {
          console.error('Generic error - we were not successul in loading all modules for config', config);
          if (arguments.length) console.error(arguments);
          // throw new Error("We are screwed!"); do not throw errors because then .fail() callbacks cannot be used
        });

      return bigPromise;
    },

    getBeeHive: function () {
      return this.__beehive;
    },

    registerModules: function (modules) {
      var register = _.bind(this._registerLoadedModules, this);
      // core
      _.forEach(modules.core, function (v, k) {
        register(k, v);
      });
      register('widgets', modules.widgets);
    },

    _registerLoadedModules: function (section, modules) {
      var beehive = this.getBeeHive();
      var key,
        module;
      var hasKey,
        addKey,
        removeKey,
        createInstance;
      var self = this;

      createInstance = function (key, module) {
        if (!module) {
          console.warn('Object ' + key + ' is empty, cannot instantiate it!');
          return;
        }
        if (self.debug) {
          console.log('Creating instance of: ' + key);
        }
        if (module.prototype) {
          return new module();
        }
        if (module && module.hasOwnProperty(key)) {
          return module[key];
        }
        return module;
      };

      // console.log('registering', section, modules);

      if (section == 'controllers') {
        hasKey = _.bind(this.hasController, this);
        removeKey = _.bind(function (key) { this.__controllers.remove(key); }, this);
        addKey = _.bind(function (key, module) { this.__controllers.add(key, module); }, this);
      } else if (section == 'services') {
        hasKey = _.bind(beehive.hasService, beehive);
        removeKey = _.bind(beehive.removeService, beehive);
        addKey = _.bind(beehive.addService, beehive);
      } else if (section == 'objects') {
        hasKey = _.bind(beehive.hasObject, beehive);
        removeKey = _.bind(beehive.removeObject, beehive);
        addKey = _.bind(beehive.addObject, beehive);
      } else if (section == 'modules') {
        createInstance = function (key, module) { return module; };
        hasKey = _.bind(this.hasModule, this);
        removeKey = _.bind(function (key) { this.__modules.remove(key); }, this);
        addKey = _.bind(function (key, module) { this.__modules.add(key, module); }, this);
      } else if (section == 'widgets') {
        hasKey = _.bind(this.hasWidget, this);
        removeKey = _.bind(function (key) { this.__widgets.remove(key); }, this);
        addKey = _.bind(function (key, module) { this.__widgets.add(key, module); }, this);
        createInstance = function (key, module) { return module; };
      } else if (section == 'plugins') {
        hasKey = _.bind(this.hasPlugin, this);
        removeKey = _.bind(function (key) { this.__plugins.remove(key); }, this);
        addKey = _.bind(function (key, module) { this.__plugins.add(key, module); }, this);
        createInstance = function (key, module) { return module; };
      } else {
        throw new Error('Unknown section: ' + section);
      }

      _.each(_.pairs(modules), function (m) {
        key = m[0], module = m[1];
        if (hasKey(key)) {
          console.warn('Removing (existing) object into [' + section + ']: ' + key);
          removeKey(key);
        }
        var inst = createInstance(key, module);
        if (!inst) {
          console.warn('Removing ' + key + '(because it is null!)');
          return;
        }
        addKey(key, inst);
      });
    },

    _checkPrescription: function (modulePrescription) {
      // basic checking
      _.each(_.pairs(modulePrescription), function (module, idx, list) {
        var symbolicName = module[0];
        var impl = module[1];

        if (!_.isString(symbolicName) || !_.isString(impl)) throw new Error('You are kidding me, the key/implementation must be string values');
      });
    },

    /**
     * Loads modules *asynchronously* from the following structure
     *
     * {
     *  'Api': 'services/api',
     *  'PubSub': 'services/pubsub'
     * },
     *
     * Returns Deferred - once that deferred object is resolved
     * all modules have been loaded.
     *
     * @param modulePrescription
     * @private
     */
    _loadModules: function (sectionName, modulePrescription, ignoreErrors) {
      var self = this;
      this._checkPrescription(modulePrescription);

      if (this.debug) {
        console.log('application: loading ' + sectionName, modulePrescription);
      }

      var ret = {};

      // create the promise object - load the modules asynchronously
      var implNames = _.keys(modulePrescription);
      var modsLeft = implNames.slice(0);
      var impls = _.values(modulePrescription);
      var defer = $.Deferred();

      var callback = function (moduleName, module) {
        // if (self.debug) console.timeEnd('startLoading' + sectionName);
        ret[moduleName] = module;
        modsLeft.pop();
        console.log('module loaded: ', moduleName);
        console.log('mods: ', modsLeft)
        if (modsLeft.length === 0) {
          defer.resolve(sectionName, ret);
        }
        if (self.debug) {
          console.log('Loaded: type=' + sectionName + ' state=' + defer.state(), ret);
        }
      };

      var errback = function (err) {
        console.error(err);
        return;
        var symbolicName = err.requireModules && err.requireModules[0];
        if (self.debug) console.warn('Error loading impl=' + symbolicName, err.requireMap);
        if (ignoreErrors) {
          if (self.debug) console.warn('Ignoring error');
          return;
        }
        defer.reject(err);
      };

      if (self.debug) console.time('startLoading' + sectionName);

      // start loading the modules
      // console.log('loading', implNames, impls)
      _.forEach(implNames, function (name) {
        switch(name) {
          case 'LandingPage': require(['wraps/landing_page_manager/landing_page_manager'], _.partial(callback, 'LandingPage'), _.partial(errback, 'LandingPage')); break;
          case 'SearchPage': require(['wraps/results_page_manager'], _.partial(callback, 'SearchPage'), _.partial(errback, 'SearchPage')); break;
          case 'DetailsPage': require(['wraps/abstract_page_manager/abstract_page_manager'], _.partial(callback, 'DetailsPage'), _.partial(errback, 'DetailsPage')); break;
          case 'AuthenticationPage': require(['wraps/authentication_page_manager'], _.partial(callback, 'AuthenticationPage'), _.partial(errback, 'AuthenticationPage')); break;
          case 'SettingsPage': require(['wraps/user_settings_page_manager/user_page_manager'], _.partial(callback, 'SettingsPage'), _.partial(errback, 'SettingsPage')); break;
          case 'OrcidPage': require(['wraps/orcid_page_manager/orcid_page_manager'], _.partial(callback, 'OrcidPage'), _.partial(errback, 'OrcidPage')); break;
          case 'OrcidInstructionsPage': require(['wraps/orcid-instructions-page-manager/manager'], _.partial(callback, 'OrcidInstructionsPage'), _.partial(errback, 'OrcidInstructionsPage')); break;
          case 'LibrariesPage': require(['wraps/libraries_page_manager/libraries_page_manager'], _.partial(callback, 'LibrariesPage'), _.partial(errback, 'LibrariesPage')); break;
          case 'HomePage': require(['wraps/home_page_manager/home_page_manager'], _.partial(callback, 'HomePage'), _.partial(errback, 'HomePage')); break;
          case 'PublicLibrariesPage': require(['wraps/public_libraries_page_manager/public_libraries_manager'], _.partial(callback, 'PublicLibrariesPage'), _.partial(errback, 'PublicLibrariesPage')); break;
          case 'ErrorPage': require(['wraps/error_page_manager/error_page_manager'], _.partial(callback, 'ErrorPage'), _.partial(errback, 'ErrorPage')); break;
          case 'Authentication': require(['widgets/authentication/widget'], _.partial(callback, 'Authentication'), _.partial(errback, 'Authentication')); break;
          case 'UserSettings': require(['widgets/user_settings/widget'], _.partial(callback, 'UserSettings'), _.partial(errback, 'UserSettings')); break;
          case 'UserPreferences': require(['widgets/preferences/widget'], _.partial(callback, 'UserPreferences'), _.partial(errback, 'UserPreferences')); break;
          case 'LibraryImport': require(['widgets/library_import/widget'], _.partial(callback, 'LibraryImport'), _.partial(errback, 'LibraryImport')); break;
          case 'BreadcrumbsWidget': require(['widgets/filter_visualizer/widget'], _.partial(callback, 'BreadcrumbsWidget'), _.partial(errback, 'BreadcrumbsWidget')); break;
          case 'NavbarWidget': require(['widgets/navbar/widget'], _.partial(callback, 'NavbarWidget'), _.partial(errback, 'NavbarWidget')); break;
          case 'UserNavbarWidget': require(['widgets/user_navbar/widget'], _.partial(callback, 'UserNavbarWidget'), _.partial(errback, 'UserNavbarWidget')); break;
          case 'AlertsWidget': require(['widgets/alerts/widget'], _.partial(callback, 'AlertsWidget'), _.partial(errback, 'AlertsWidget')); break;
          case 'ClassicSearchForm': require(['widgets/classic_form/widget'], _.partial(callback, 'ClassicSearchForm'), _.partial(errback, 'ClassicSearchForm')); break;
          case 'SearchWidget': require(['widgets/search_bar/search_bar_widget'], _.partial(callback, 'SearchWidget'), _.partial(errback, 'SearchWidget')); break;
          case 'PaperSearchForm': require(['widgets/paper_search_form/widget'], _.partial(callback, 'PaperSearchForm'), _.partial(errback, 'PaperSearchForm')); break;
          case 'Results': require(['widgets/results/widget'], _.partial(callback, 'Results'), _.partial(errback, 'Results')); break;
          case 'QueryInfo': require(['widgets/query_info/query_info_widget'], _.partial(callback, 'QueryInfo'), _.partial(errback, 'QueryInfo')); break;
          case 'QueryDebugInfo': require(['widgets/api_query/widget'], _.partial(callback, 'QueryDebugInfo'), _.partial(errback, 'QueryDebugInfo')); break;
          case 'ExportWidget': require(['widgets/export/widget'], _.partial(callback, 'ExportWidget'), _.partial(errback, 'ExportWidget')); break;
          case 'Sort': require(['widgets/sort/widget'], _.partial(callback, 'Sort'), _.partial(errback, 'Sort')); break;
          case 'ExportDropdown': require(['wraps/export_dropdown'], _.partial(callback, 'ExportDropdown'), _.partial(errback, 'ExportDropdown')); break;
          case 'VisualizationDropdown': require(['wraps/visualization_dropdown'], _.partial(callback, 'VisualizationDropdown'), _.partial(errback, 'VisualizationDropdown')); break;
          case 'AuthorNetwork': require(['wraps/author_network'], _.partial(callback, 'AuthorNetwork'), _.partial(errback, 'AuthorNetwork')); break;
          case 'PaperNetwork': require(['wraps/paper_network'], _.partial(callback, 'PaperNetwork'), _.partial(errback, 'PaperNetwork')); break;
          case 'ConceptCloud': require(['widgets/wordcloud/widget'], _.partial(callback, 'ConceptCloud'), _.partial(errback, 'ConceptCloud')); break;
          case 'BubbleChart': require(['widgets/bubble_chart/widget'], _.partial(callback, 'BubbleChart'), _.partial(errback, 'BubbleChart')); break;
          case 'AuthorAffiliationTool': require(['widgets/author_affiliation_tool/widget'], _.partial(callback, 'AuthorAffiliationTool'), _.partial(errback, 'AuthorAffiliationTool')); break;
          case 'Metrics': require(['widgets/metrics/widget'], _.partial(callback, 'Metrics'), _.partial(errback, 'Metrics')); break;
          case 'CitationHelper': require(['widgets/citation_helper/widget'], _.partial(callback, 'CitationHelper'), _.partial(errback, 'CitationHelper')); break;
          case 'OrcidBigWidget': require(['modules/orcid/widget/widget'], _.partial(callback, 'OrcidBigWidget'), _.partial(errback, 'OrcidBigWidget')); break;
          case 'OrcidSelector': require(['widgets/orcid-selector/widget'], _.partial(callback, 'OrcidSelector'), _.partial(errback, 'OrcidSelector')); break;
          case 'AffiliationFacet': require(['wraps/affiliation_facet'], _.partial(callback, 'AffiliationFacet'), _.partial(errback, 'AffiliationFacet')); break;
          case 'AuthorFacet': require(['wraps/author_facet'], _.partial(callback, 'AuthorFacet'), _.partial(errback, 'AuthorFacet')); break;
          case 'BibgroupFacet': require(['wraps/bibgroup_facet'], _.partial(callback, 'BibgroupFacet'), _.partial(errback, 'BibgroupFacet')); break;
          case 'BibstemFacet': require(['wraps/bibstem_facet'], _.partial(callback, 'BibstemFacet'), _.partial(errback, 'BibstemFacet')); break;
          case 'DataFacet': require(['wraps/data_facet'], _.partial(callback, 'DataFacet'), _.partial(errback, 'DataFacet')); break;
          case 'DatabaseFacet': require(['wraps/database_facet'], _.partial(callback, 'DatabaseFacet'), _.partial(errback, 'DatabaseFacet')); break;
          case 'GrantsFacet': require(['wraps/grants_facet'], _.partial(callback, 'GrantsFacet'), _.partial(errback, 'GrantsFacet')); break;
          case 'KeywordFacet': require(['wraps/keyword_facet'], _.partial(callback, 'KeywordFacet'), _.partial(errback, 'KeywordFacet')); break;
          case 'ObjectFacet': require(['wraps/simbad_object_facet'], _.partial(callback, 'ObjectFacet'), _.partial(errback, 'ObjectFacet')); break;
          case 'NedObjectFacet': require(['wraps/ned_object_facet'], _.partial(callback, 'NedObjectFacet'), _.partial(errback, 'NedObjectFacet')); break;
          case 'RefereedFacet': require(['wraps/refereed_facet'], _.partial(callback, 'RefereedFacet'), _.partial(errback, 'RefereedFacet')); break;
          case 'VizierFacet': require(['wraps/vizier_facet'], _.partial(callback, 'VizierFacet'), _.partial(errback, 'VizierFacet')); break;
          case 'GraphTabs': require(['wraps/graph_tabs'], _.partial(callback, 'GraphTabs'), _.partial(errback, 'GraphTabs')); break;
          case 'FooterWidget': require(['widgets/footer/widget'], _.partial(callback, 'FooterWidget'), _.partial(errback, 'FooterWidget')); break;
          case 'PubtypeFacet': require(['wraps/pubtype_facet'], _.partial(callback, 'PubtypeFacet'), _.partial(errback, 'PubtypeFacet')); break;
          case 'ShowAbstract': require(['widgets/abstract/widget'], _.partial(callback, 'ShowAbstract'), _.partial(errback, 'ShowAbstract')); break;
          case 'ShowGraphics': require(['widgets/graphics/widget'], _.partial(callback, 'ShowGraphics'), _.partial(errback, 'ShowGraphics')); break;
          case 'ShowGraphicsSidebar': require(['wraps/sidebar-graphics-widget'], _.partial(callback, 'ShowGraphicsSidebar'), _.partial(errback, 'ShowGraphicsSidebar')); break;
          case 'ShowReferences': require(['wraps/references'], _.partial(callback, 'ShowReferences'), _.partial(errback, 'ShowReferences')); break;
          case 'ShowCitations': require(['wraps/citations'], _.partial(callback, 'ShowCitations'), _.partial(errback, 'ShowCitations')); break;
          case 'ShowCoreads': require(['wraps/coreads'], _.partial(callback, 'ShowCoreads'), _.partial(errback, 'ShowCoreads')); break;
          case 'MetaTagsWidget': require(['widgets/meta_tags/widget'], _.partial(callback, 'MetaTagsWidget'), _.partial(errback, 'MetaTagsWidget')); break;
          case 'ShowTableofcontents': require(['wraps/table_of_contents'], _.partial(callback, 'ShowTableofcontents'), _.partial(errback, 'ShowTableofcontents')); break;
          case 'ShowResources': require(['widgets/resources/widget'], _.partial(callback, 'ShowResources'), _.partial(errback, 'ShowResources')); break;
          case 'ShowAssociated': require(['widgets/associated/widget'], _.partial(callback, 'ShowAssociated'), _.partial(errback, 'ShowAssociated')); break;
          case 'ShowRecommender': require(['widgets/recommender/widget'], _.partial(callback, 'ShowRecommender'), _.partial(errback, 'ShowRecommender')); break;
          case 'ShowMetrics': require(['wraps/paper_metrics'], _.partial(callback, 'ShowMetrics'), _.partial(errback, 'ShowMetrics')); break;
          case 'ShowPaperExport': require(['wraps/paper_export'], _.partial(callback, 'ShowPaperExport'), _.partial(errback, 'ShowPaperExport')); break;
          case 'ShowLibraryAdd': require(['wraps/abstract_page_library_add/widget'], _.partial(callback, 'ShowLibraryAdd'), _.partial(errback, 'ShowLibraryAdd')); break;
          case 'IndividualLibraryWidget': require(['widgets/library_individual/widget'], _.partial(callback, 'IndividualLibraryWidget'), _.partial(errback, 'IndividualLibraryWidget')); break;
          case 'AllLibrariesWidget': require(['widgets/libraries_all/widget'], _.partial(callback, 'AllLibrariesWidget'), _.partial(errback, 'AllLibrariesWidget')); break;
          case 'LibraryListWidget': require(['widgets/library_list/widget'], _.partial(callback, 'LibraryListWidget'), _.partial(errback, 'LibraryListWidget')); break;
          case 'FeedbackMediator': require(['wraps/discovery_mediator'], _.partial(callback, 'FeedbackMediator'), _.partial(errback, 'FeedbackMediator')); break;
          case 'QueryMediator': require(['components/query_mediator'], _.partial(callback, 'QueryMediator'), _.partial(errback, 'QueryMediator')); break;
          case 'Diagnostics': require(['bugutils/diagnostics'], _.partial(callback, 'Diagnostics'), _.partial(errback, 'Diagnostics')); break;
          case 'AlertsController': require(['wraps/alerts_mediator'], _.partial(callback, 'AlertsController'), _.partial(errback, 'AlertsController')); break;
          case 'Orcid': require(['modules/orcid/module'], _.partial(callback, 'Orcid'), _.partial(errback, 'Orcid')); break;
          case 'Api': require(['services/api'], _.partial(callback, 'Api'), _.partial(errback, 'Api')); break;
          case 'PubSub': require(['services/pubsub'], _.partial(callback, 'PubSub'), _.partial(errback, 'PubSub')); break;
          case 'Navigator': require(['apps/discovery/navigator'], _.partial(callback, 'Navigator'), _.partial(errback, 'Navigator')); break;
          case 'PersistentStorage': require(['services/storage'], _.partial(callback, 'PersistentStorage'), _.partial(errback, 'PersistentStorage')); break;
          case 'HistoryManager': require(['components/history_manager'], _.partial(callback, 'HistoryManager'), _.partial(errback, 'HistoryManager')); break;
          case 'User': require(['components/user'], _.partial(callback, 'User'), _.partial(errback, 'User')); break;
          case 'Session': require(['components/session'], _.partial(callback, 'Session'), _.partial(errback, 'Session')); break;
          case 'DynamicConfig': require(['discovery.vars'], _.partial(callback, 'DynamicConfig'), _.partial(errback, 'DynamicConfig')); break;
          case 'MasterPageManager': require(['page_managers/master'], _.partial(callback, 'MasterPageManager'), _.partial(errback, 'MasterPageManager')); break;
          case 'AppStorage': require(['components/app_storage'], _.partial(callback, 'AppStorage'), _.partial(errback, 'AppStorage')); break;
          case 'RecaptchaManager': require(['components/recaptcha_manager'], _.partial(callback, 'RecaptchaManager'), _.partial(errback, 'RecaptchaManager')); break;
          case 'CSRFManager': require(['components/csrf_manager'], _.partial(callback, 'CSRFManager'), _.partial(errback, 'CSRFManager')); break;
          case 'LibraryController': require(['components/library_controller'], _.partial(callback, 'LibraryController'), _.partial(errback, 'LibraryController')); break;
          case 'DocStashController': require(['components/doc_stash_controller'], _.partial(callback, 'DocStashController'), _.partial(errback, 'DocStashController')); break;
          case 'FacetFactory': require(['widgets/facet/factory'], _.partial(callback, 'FacetFactory'), _.partial(errback, 'FacetFactory')); break;
        }
      });

      //require(impls, callback, errback);

      return this._setTimeout(defer).promise();
    },


    _setTimeout: function (deferred) {
      setTimeout(function () {
        if (deferred.state() != 'resolved') {
          deferred.reject('Timeout, application is loading too long');
        }
      }, this.timeout || 30000);
      return deferred;
    },


    destroy: function () {
      this.getBeeHive().destroy();
    },


    activate: function (options) {
      var beehive = this.getBeeHive();
      var self = this;

      // services are activated by beehive itself
      if (self.debug) { console.log('application: beehive.activate()'); }
      beehive.activate(beehive);

      // controllers receive application itself and elevated beehive object
      // all of them must succeed; we don't catch errors
      _.each(this.getAllControllers(), function (el) {
        if (self.debug) { console.log('application: controllers: ' + el[0] + '.activate(beehive, app)'); }
        var plugin = el[1];
        if ('activate' in plugin) {
          plugin.activate(beehive, self);
        }
      });

      // modules receive elevated beehive object
      _.each(this.getAllModules(), function (el) {
        try {
          if (self.debug) {
            console.log('application: modules: ' + el[0] + '.activate(beehive)');
          }
          var plugin = el[1];
          if ('activate' in plugin) {
            plugin.activate(beehive);
          }
        } catch (e) {
          console.error('Error activating:' + el[0]);
          console.error(e);
        }
      });

      this.__activated = true;
    },


    isActivated: function () {
      return this.__activated || false;
    },

    hasService: function (name) {
      return this.getBeeHive().hasService(name);
    },
    getService: function (name) {
      return this.getBeeHive().getService(name);
    },

    hasObject: function (name) {
      return this.getBeeHive().hasObject(name);
    },
    getObject: function (name) {
      return this.getBeeHive().getObject(name);
    },

    hasController: function (name) {
      return this.__controllers.has(name);
    },

    getController: function (name) {
      return this.__controllers.get(name);
    },

    hasModule: function (name) {
      return this.__modules.has(name);
    },

    getModule: function (name) {
      return this.__modules.get(name);
    },

    hasWidget: function (name) {
      return this.__widgets.has(name);
    },

    getWidgetRefCount: function (name, prefix) {
      var ds = this.__barbarianInstances[(prefix || 'widget:') + name];
      if (ds) {
        return ds.counter;
      }

      return -1;
    },

    getWidget: function (name) {
      var defer = $.Deferred();
      var self = this;

      var w = {};
      if (arguments.length > 1) {
        w = {};
        _.each(arguments, function (x) {
          if (!x) return;
          try {
            w[x] = self._getWidget(x);
          } catch (er) {
            console.error('Error loading: ' + x);
            _.each(w, function (val, key) {
              self.returnWidget(key);
              delete w[key];
            });
            throw er;
          }
        });
      } else if (name) {
        w = this._getWidget(name);
      }

      // this happens right after the callback
      setTimeout(function () {
        defer.done(function (widget) {
          if (_.isArray(name)) {
            _.each(name, function (x) {
              self.returnWidget(x);
            });
          } else {
            self.returnWidget(name);
          }
        });
      }, 1);

      defer.resolve(w);
      return defer.promise();
    },

    _getWidget: function (name) {
      var w = this._getOrCreateBarbarian('widget', name);
      this.__barbarianInstances['widget:' + name].counter++;
      return w;
    },

    returnWidget: function (name) {
      var ds = this.__barbarianInstances['widget:' + name];
      // very rarely, a widget will want to be kept in memory
      if (ds && ds.parent.dontKillMe) return;
      if (ds) {
        ds.counter--;
        this._killBarbarian('widget:' + name);
        return ds.counter;
      }
      return -1;
    },

    hasPlugin: function (name) {
      return this.__plugins.has(name);
    },

    /**
     * Increase the plugin counter and return the instance
     * (already activated, with proper beehive in place)
     *
     * @param name
     * @return {*}
     */
    getPlugin: function (name) {
      var defer = $.Deferred();
      var self = this;

      var w = {};
      if (arguments.length > 1) {
        w = {};
        _.each(arguments, function (x) {
          if (!x) return;
          try {
            w[x] = self._getPlugin(x);
          } catch (er) {
            console.error('Error loading: ' + x);
            _.each(w, function (val, key) {
              self.returnPlugin(key);
              delete w[key];
            });
            throw er;
          }
        });
      } else if (name) {
        w = this._getPlugin(name);
      }

      setTimeout(function () {
        defer.done(function (widget) {
          if (_.isArray(name)) {
            _.each(name, function (x) {
              self.returnPlugin(x);
            });
          } else {
            self.returnPlugin(name);
          }
        });
      }, 1);

      defer.resolve(w);
      return defer.promise();
    },

    getPluginRefCount: function (name) {
      return this.getWidgetRefCount(name, 'plugin:');
    },

    _getPlugin: function (name) {
      var w = this._getOrCreateBarbarian('plugin', name);
      this.__barbarianInstances['plugin:' + name].counter++;
      return w;
    },

    /**
     * Decrease the instance counter; when we reach zero
     * the plugin will be destroyed automatically
     *
     * @param name
     */
    returnPlugin: function (name) {
      var ds = this.__barbarianInstances['plugin:' + name];
      if (ds) {
        ds.counter--;
        this._killBarbarian('plugin:' + name);
        return ds.counter;
      }
      return -1;
    },

    /**
     * Given the pubsub key, it finds the name of the widget
     * (provided the widget is registered with the application)
     * Returns undefined for other components, such as controllers
     * objects etc (it searches only plugins and widgets)
     *
     * @param psk
     * @returns {*}
     */
    getPluginOrWidgetName: function (psk) {
      if (!_.isString(psk)) throw Error('The psk argument must be a string');
      var k;
      if (this.__barbarianRegistry[psk]) {
        k = this.__barbarianRegistry[psk];
      } else {
        return undefined;
      }
      return k;
    },


    getPluginOrWidgetByPubSubKey: function (psk) {
      var k = this.getPluginOrWidgetName(psk);
      if (k === undefined) return undefined;

      if (this._isBarbarianAlive(k)) return this._getBarbarian(k);

      throw new Error('Eeeek, thisis unexpectEED bEhAvjor! Cant find barbarian with ID: ' + psk);
    },

    getPskOfPluginOrWidget: function (symbolicName) {
      var parts = symbolicName.split(':');
      var psk;
      if (this._isBarbarianAlive(symbolicName)) {
        var b = this._getBarbarian(symbolicName);
        if (b.getPubSub && b.getPubSub().getCurrentPubSubKey) return b.getPubSub().getCurrentPubSubKey().getId();
      }
      return psk;
    },

    /**
     * I think the analogy is getting over-stretched; it is true that the author of this application
     * loves history, and you could find many analogies...but let me hope that I would never treat
     * humans in the same way I name variable names and methods :_)
     *
     * @param category
     * @param name
     * @private
     */
    _getOrCreateBarbarian: function (cat, name) {
      var symbolicName = cat + ':' + name;

      if ((cat == 'plugin' && !this.hasPlugin(name)) || (cat == 'widget' && !this.hasWidget(name))) {
        throw new Error('We cannot give you ' + symbolicName + ' (cause there is no constructor for it)');
      }

      if (this._isBarbarianAlive(symbolicName)) return this._getBarbarian(symbolicName);

      var constructor = (cat == 'plugin') ? this.__plugins.get(name) : this.__widgets.get(name);
      var instance = new constructor();
      var hardenedBee = this.getBeeHive().getHardenedInstance(),
        children;


      // we'll monitor all new pubsub instances (created by the widget) - we don't want to rely
      // on widgets to do the right thing (and tells us what children they made)

      var pubsub = this.getService('PubSub');
      var existingSubscribers = _.keys(pubsub._issuedKeys);

      if ('activate' in instance) {
        if (this.debug) { console.log('application: ' + symbolicName + '.activate(beehive)'); }
        children = instance.activate(hardenedBee);
      }

      var newSubscribers = _.without(_.keys(pubsub._issuedKeys), _.keys(pubsub._issuedKeys));
      this._registerBarbarian(symbolicName, instance, children, hardenedBee, newSubscribers);
      return instance;
    },

    _isBarbarianAlive: function (symbolicName) {
      return !!this.__barbarianInstances[symbolicName];
    },

    _getBarbarian: function (symbolicName) {
      return this.__barbarianInstances[symbolicName].parent;
    },

    _registerBarbarian: function (symbolicName, instance, children, hardenedBee, illegitimateChildren) {
      this._killBarbarian(symbolicName);

      if ('getBeeHive' in instance) {
        this.__barbarianRegistry[instance.getBeeHive().getService('PubSub').getCurrentPubSubKey().getId()] = symbolicName;
      } else {
        this.__barbarianRegistry[hardenedBee.getService('PubSub').getCurrentPubSubKey().getId()] = symbolicName;
      }

      var childNames = [];
      if (children) {
        childNames = this._registerBarbarianChildren(symbolicName, children);
      }

      if (illegitimateChildren) {
        _.each(illegitimateChildren, function (childKey) {
          if (this.__barbarianRegistry[childKey]) // already declared
          { delete illegitimateChildren[childKey]; }
        }, this);
      }

      this.__barbarianInstances[symbolicName] = {
        parent: instance,
        children: childNames,
        beehive: hardenedBee,
        counter: 0,
        psk: hardenedBee.getService('PubSub').getCurrentPubSubKey(),
        bastards: illegitimateChildren // no, i'm not mean, i'm French
      };
    },

    /**
     *
     * @param prefix
     *  (String) the name of the father
     * @param children
     *  (Object) where keys are the 'strings' (names) and values are
     *  instances (of the widgets)
     * @return {Array}
     * @private
     */
    _registerBarbarianChildren: function (prefix, children) {
      var childrenNames = [];
      _.each(children, function (child, key) {
        var name = prefix + '-' + (child.name || key);
        if (this.debug) console.log('adding child object to registry: ' + name);


        if (this._isBarbarianAlive(name)) {
          throw new Error('Contract breach, there already exists instance with a name: ' + name);
        }

        if (('getBeeHive' in child)) {
          var childPubKey = child.getBeeHive().getService('PubSub').getCurrentPubSubKey().getId();

          if (this.__barbarianRegistry[childPubKey]) throw new Error('Contract breach, the child of ' + prefix + 'is using the same pub-sub-key');

          this.__barbarianRegistry[childPubKey] = name;
        }

        childrenNames.unshift(name);
      }, this);
      return childrenNames;
    },


    /**
     * Remove/destroy the instance - but only if the counter reaches zero (or if the
     * force parameter is true) - that means that the children are exterminated together
     * with their parents. this is to avoid polluting the memory, because every child
     * has a name of the parent. So if the parent is not used by anyone, then the
     * counter is zero
     *
     * @param symbolicName
     * @param force
     * @private
     */
    _killBarbarian: function (symbolicName, force) {
      var b = this.__barbarianInstances[symbolicName];

      if (!b) return;

      if (b.counter > 0 && force !== true) // keep it alive, it is referenced somewhere else
      { return; }

      if (b.children) {
        _.each(b.children, function (childName) {
          this._killBarbarian(childName, true);
        }, this);
      }

      _.each(this.__barbarianRegistry, function (value, key) {
        if (value == symbolicName) delete this.__barbarianRegistry[key];
      }, this);

      // unsubscribe this widget from pubsub (don't rely on the widget
      // doing the right thing)
      var pubsub = this.getService('PubSub');
      if (b.psk) {
        pubsub.unsubscribe(b.psk);
      }

      // painstaikingly discover undeclared children and unsubscribe them
      if (b.bastards && false) { // deactivate, it causes problems
        var kmap = {};
        _.each(b.bastards, function (psk) {
          kmap[psk] = 1;
        }, this);

        _.each(pubsub._events, function (val, evName) {
          _.each(val, function (v) {
            if (v.ctx.getId && kmap[v.ctx.getId()]) {
              pubsub.unsubscribe(v.ctx);
            }
          }, this);
        }, this);
      }

      b.parent.destroy();

      delete this.__barbarianInstances[symbolicName];
      if ('setBeeHive' in b.parent) b.parent.setBeeHive({ fake: 'one' });

      b = null;

      if (this.debug) console.log('Destroyed: ' + symbolicName);
    },


    getAllControllers: function () {
      return _.pairs(this.__controllers.container);
    },

    getAllModules: function () {
      return _.pairs(this.__modules.container);
    },

    getAllPlugins: function (key) {
      key = key || 'plugin:';
      var defer = $.Deferred();
      var w = [];
      _.each(this.__barbarianInstances, function (val, k) {
        if (k.indexOf(key) > -1) w.unshift(k.replace(key, ''));
      });

      var getter = key.indexOf('plugin:') > -1 ? this.getPlugin : this.getWidget;
      getter.apply(this, w)
        .done(function (widget) {
          var out = [];
          if (w.length > 1) {
            out = _.pairs(widget);
          } else if (w.length == 1) {
            out = [[w[0], widget]];
          }
          defer.resolve(out);
        });
      return defer.promise();
    },

    getAllWidgets: function () {
      return this.getAllPlugins('widget:');
    },

    getAllServices: function () {
      return this.getBeeHive().getAllServices();
    },

    getAllObjects: function () {
      return this.getBeeHive().getAllObjects();
    },


    /**
     * Helper method to invoke a 'function' on all objects
     * that are inside the application
     *
     * @param funcName
     * @param options
     */
    triggerMethodOnAll: function (funcName, options) {
      this.triggerMethod(this.getAllControllers(), 'controllers', funcName, options);
      this.triggerMethod(this.getAllModules(), 'modules', funcName, options);
      var self = this;
      this.getAllPlugins().done(function (plugins) {
        if (plugins.length) self.triggerMethod(plugins, 'plugins', funcName, options);
      });
      this.getAllWidgets().done(function (widgets) {
        if (widgets.length) self.triggerMethod(widgets, 'widgets', funcName, options);
      });
      this.triggerMethod(this.getBeeHive().getAllServices(), 'BeeHive:services', funcName, options);
      this.triggerMethod(this.getBeeHive().getAllObjects(), 'BeeHive:objects', funcName, options);
    },

    triggerMethod: function (objects, msg, funcName, options) {
      var self = this;
      var rets = _.map(objects, function (el) {
        var obj = el[1];
        if (funcName in obj) {
          if (self.debug) { console.log('application.triggerMethod: ' + msg + ': ' + el[0] + '.' + funcName + '()'); }
          obj[funcName].call(obj, options);
        } else if (_.isFunction(funcName)) {
          if (self.debug) { console.log('application.triggerMethod: ' + msg + ': ' + el[0] + ' customCallback()'); }
          funcName.call(obj, msg + ':' + el[0], options);
        }
      });
      return rets;
    }
  });


  // give it subclassing functionality
  Application.extend = Backbone.Model.extend;
  return Application.extend(ApiAccess);
});
