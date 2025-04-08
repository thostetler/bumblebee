function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * The main 'navigation' endpoints (the part executed inside
 * the application) - this is a companion to the 'router'
 */
define(['jquery', 'backbone', 'underscore', 'js/components/navigator', 'js/components/api_feedback', 'js/components/api_query_updater', 'js/components/json_response', 'js/components/api_query', 'js/components/api_request', 'js/components/api_targets', '404.html', 'js/apps/discovery/templates/orcid-modal-template.html', 'js/mixins/api_access', 'react-redux'], function ($, Backbone, _, Navigator, ApiFeedback, ApiQueryUpdater, JsonResponse, ApiQuery, ApiRequest, ApiTargets, ErrorTemplate, OrcidModalTemplate, ApiAccessMixin, ReactRedux) {
  var NavigatorService = Navigator.extend({
    start: function start(app) {
      /**
       * These 'transitions' are what happens inside 'discovery' application
       *
       * As a convention, navigation events are all lowercase, and widgets/page managers
       * are CamelCase (for example the table of contents menu on the left side of the
       * abstract/detail page is triggering navigation events using just the name of
       * the widget, e.g. ShowReferences - when References tab was selected)
       *
       */
      var self = this;
      var queryUpdater = new ApiQueryUpdater('navigator');

      var publishFeedback = function publishFeedback(data) {
        self.getPubSub().publish(self.getPubSub().FEEDBACK, new ApiFeedback(data));
      }; // right now, user navbar widget depends on this to show the correct highlighted pill


      var publishPageChange = function publishPageChange(pageName) {
        self.getPubSub().publish(self.getPubSub().PAGE_CHANGE, pageName);
      };

      var searchPageAlwaysVisible = ['Results', 'MyAdsFreeform', 'QueryInfo', 'AffiliationFacet', 'AuthorFacet', 'DatabaseFacet', 'RefereedFacet', 'KeywordFacet', 'BibstemFacet', 'BibgroupFacet', 'DataFacet', 'ObjectFacet', 'NedObjectFacet', 'VizierFacet', 'GraphTabs', 'QueryDebugInfo', 'ExportDropdown', 'VisualizationDropdown', 'SearchWidget', 'Sort', 'BreadcrumbsWidget', 'PubtypeFacet', 'OrcidSelector'];
      var detailsPageAlwaysVisible = ['TOCWidget', 'SearchWidget', 'ShowResources', 'ShowAssociated', 'ShowGraphicsSidebar', 'ShowLibraryAdd', 'MetaTagsWidget'];

      function redirectIfNotSignedIn(next) {
        var loggedIn = app.getBeeHive().getObject('User').isLoggedIn();

        if (!loggedIn) {
          // redirect to authentication page
          app.getService('Navigator').navigate('authentication-page', {
            subView: 'login',
            redirect: true,
            next: next
          });
          return true;
        }

        return false;
      }

      function makeProxyHandler(id) {
        return function () {
          var proxy = self.get(id);
          var args = Array.prototype.slice.call(arguments, 1);
          return proxy.execute.apply(proxy, [id].concat(args));
        };
      }

      this.set('index-page', function (data) {
        var that = this;
        var defer = $.Deferred();
        app.getObject('MasterPageManager').show('LandingPage', ['SearchWidget', 'RecommenderWidget']).then(function () {
          return app.getWidget('LandingPage').then(function (widget) {
            if (data && data.origin === 'SearchWidget') {
              // we know it came from the searchWidget handler, so call it without extra params
              widget.setActive('SearchWidget');
            } else {
              // only set the origin flag if we know it wasn't a redirect from the other handler (SearchWidget)
              widget.setActive('SearchWidget', null, {
                origin: 'index-page'
              });
            }

            that.route = '';
            that.title = '';
            defer.resolve();
          });
        });
        return defer.promise();
      });
      this.set('SearchWidget', function () {
        // you must set a route within the function, even if you are calling
        // another function that sets a route
        var that = this;
        var defer = $.Deferred();

        var exec = _.bind(self.get('index-page').execute, this, {
          origin: 'SearchWidget'
        });

        exec().then(function () {
          that.route = '';
          that.title = '';
          defer.resolve();
        });
        return defer.promise();
      });
      this.set('404', /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_widget) {
          var errorProps,
              _args = arguments;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  errorProps = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                  _context.next = 3;
                  return app.getObject('MasterPageManager');

                case 3:
                  void _context.sent.show('ErrorPage');
                  _context.next = 6;
                  return app.getWidget('ErrorPage');

                case 6:
                  _context.t0 = errorProps;
                  void _context.sent.setMessage(_context.t0);

                  /**
                   * only replace if this 404 page was truly an internal re-route,
                   * and not due to a broken link or some other routing issue
                   */
                  if (Object.keys(errorProps).length > 0) {
                    this.replace = true;
                  } // set url route


                  this.route = '404';

                case 10:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
      this.set('ClassicSearchForm', function (widgetName, _ref2) {
        var query = _ref2.query;
        var defer = $.Deferred();
        var that = this;
        app.getObject('MasterPageManager').show('LandingPage', [widgetName]).then(function () {
          app.getWidget('LandingPage').done(function (widget) {
            widget.setActive(widgetName);
            widget.widgets[widgetName].applyQueryParams(query);
          });
          that.route = '#classic-form';
          that.title = 'Classic Form';
          defer.resolve();
        });
        return defer.promise();
      });
      this.set('PaperSearchForm', function () {
        var defer = $.Deferred();
        var that = this;
        app.getObject('MasterPageManager').show('LandingPage', ['PaperSearchForm']).then(function () {
          app.getWidget('LandingPage').done(function (widget) {
            widget.setActive('PaperSearchForm');
          });
          that.route = '#paper-form';
          that.title = 'Paper Form';
          defer.resolve();
        });
        return defer.promise();
      });
      this.set('LibraryImport', function (page, data) {
        var defer = $.Deferred();
        var that = this;

        if (redirectIfNotSignedIn(that.endpoint)) {
          defer.resolve();
          return defer.promise();
        }

        app.getObject('MasterPageManager').show('SettingsPage', ['LibraryImport', 'UserNavbarWidget']).then(function () {
          app.getWidget('SettingsPage').done(function (widget) {
            widget.setActive('LibraryImport');
            that.route = '#user/settings/libraryimport';
            that.title = 'Library Import';
            publishPageChange('settings-page');
            defer.resolve();
          });
        });
        return defer.promise();
      });

      function settingsPreferencesView(widgetName, defaultView, title) {
        return function (page, data) {
          var defer = $.Deferred();
          var that = this;

          if (redirectIfNotSignedIn(that.endpoint)) {
            defer.resolve();
            return defer.promise();
          }

          var subView = data.subView || defaultView;

          if (!subView) {
            console.error('no subview or default view provided /' + 'to the navigator function!');
          }

          app.getObject('MasterPageManager').show('SettingsPage', [widgetName, 'UserNavbarWidget']).then(function () {
            app.getWidget('SettingsPage').done(function (widget) {
              widget.setActive(widgetName, subView);
            });
            that.route = '#user/settings/' + subView;
            that.title = 'Settings' + (title ? ' | ' + title : '');
            publishPageChange('settings-page');
            defer.resolve();
          });
          return defer.promise();
        };
      } // request for the widget


      this.set('UserSettings', settingsPreferencesView('UserSettings', undefined)); // request for the widget

      this.set('UserPreferences', settingsPreferencesView('UserPreferences', 'application', 'Search Settings'));
      this.set('MyAdsDashboard', function () {
        var defer = $.Deferred();
        var that = this;

        if (redirectIfNotSignedIn(that.endpoint)) {
          defer.resolve();
          return defer.promise();
        }

        app.getObject('MasterPageManager').show('SettingsPage', ['MyAdsDashboard', 'UserNavbarWidget']).then(function () {
          app.getWidget('SettingsPage').done(function (widget) {
            widget.setActive('MyAdsDashboard');
            that.route = '#user/settings/myads';
            that.title = 'myADS Notifications';
            publishPageChange('settings-page');
            defer.resolve();
          });
        });
        return defer.promise();
      });
      this.set('LibraryActionsWidget', function () {
        var $dd = $.Deferred();
        var that = this;

        if (redirectIfNotSignedIn(that.endpoint)) {
          return $dd.resolve().promise();
        }

        app.getObject('MasterPageManager').show('LibrariesPage', ['LibraryActionsWidget', 'UserNavbarWidget']).then(function () {
          app.getWidget('LibraryActionsWidget').done(function (widget) {
            widget.reset();
            that.route = '#user/libraries/actions';
            publishPageChange('libraries-page');
            $dd.resolve();
          });
        });
        return $dd.promise();
      });
      this.set('AllLibrariesWidget', function (widget, subView) {
        var defer = $.Deferred();
        var that = this;

        if (redirectIfNotSignedIn(that.endpoint)) {
          defer.resolve();
          return defer.promise();
        }

        var subView = subView || 'libraries';
        app.getObject('MasterPageManager').show('LibrariesPage', ['AllLibrariesWidget', 'UserNavbarWidget']).then(function () {
          app.getWidget('AllLibrariesWidget').done(function (widget) {
            widget.setSubView({
              view: subView
            });
            widget.reset();
            that.route = '#user/libraries/';
            that.title = 'My Libraries';
            publishPageChange('libraries-page');
          });
          defer.resolve();
        });
        return defer.promise();
      });
      this.set('LibraryAdminView', function (widget) {
        var defer = $.Deferred();
        var that = this; // this is NOT navigable from outside, so library already has data
        // only setting a nav event to hide previous widgets

        app.getObject('MasterPageManager').show('LibrariesPage', ['IndividualLibraryWidget', 'UserNavbarWidget']).then(function () {
          app.getWidget('IndividualLibraryWidget').done(function (widget) {
            widget.setSubView({
              subView: 'admin'
            });
          });
          publishPageChange('libraries-page');
          defer.resolve();
        });
        return defer.promise();
      });
      this.set('IndividualLibraryWidget', function (widget, data) {
        var defer = $.Deferred();
        var that = this; // data in form of { subView: subView, id: id, publicView: false }

        data.publicView = data.publicView ? data.publicView : false; // only check for logged in user if not public library

        if (!data.publicView && redirectIfNotSignedIn(that.endpoint)) {
          return defer.resolve().promise();
        }

        this.route = data.publicView ? '#public-libraries/' + data.id : '#user/libraries/' + data.id;
        var pub = data.publicView;
        app.getObject('MasterPageManager').show(pub ? 'PublicLibrariesPage' : 'LibrariesPage', pub ? ['IndividualLibraryWidget', 'LibraryListWidget'] : ['IndividualLibraryWidget', 'LibraryListWidget', 'UserNavbarWidget']).then(function () {
          app.getObject('LibraryController').getLibraryMetadata(data.id, !data.publicView).done(function (metadata) {
            data.editRecords = _.contains(['write', 'admin', 'owner'], metadata.permission) && !data.publicView;
            that.title = data.publicView ? 'Public' : 'Private' + ' Library | ' + metadata.name;
            app.getWidget('LibraryListWidget', 'IndividualLibraryWidget').then(function (w) {
              w['LibraryListWidget'].setData(data);
              w['IndividualLibraryWidget'].setSubView(data);

              if (pub) {
                publishPageChange('libraries-page');
              }

              defer.resolve();
            });
          });
        });
        return defer.promise();
      }); // for external widgets shown by library

      function navToLibrarySubView(widget, data) {
        var defer = $.Deferred();
        var that = this; // actual name of widget to be shown in main area

        var widgetName = data.widgetName; // additional info that the renderWidgetForListOfBibcodes function might need (only used by export right now)

        var additional = data.additional;
        var format = additional.format || 'bibtex'; // tab description for library widget

        var subView = data.subView; // id of library being shown

        var id = data.id;
        var publicView = data.publicView; // Author-affiliation has a specific widget

        if (widgetName === 'ExportWidget' && format === 'authoraff') {
          widgetName = 'AuthorAffiliationTool';
        }

        function renderLibrarySub(id) {
          var defer = $.Deferred();
          app.getObject('LibraryController').getLibraryBibcodes(id).done(function (bibcodes) {
            // XXX - this was async in the original version; likely wrong
            // one block should be main...
            app.getWidget('LibraryListWidget').then(function (listWidget) {
              var sort = listWidget.model.get('sort');
              app.getWidget(widgetName).then(function (subWidget) {
                additional = _.extend({}, additional, {
                  sort: sort
                });
                subWidget.renderWidgetForListOfBibcodes(bibcodes, additional);
                app.getWidget('IndividualLibraryWidget').then(function (indWidget) {
                  indWidget.setSubView({
                    subView: subView,
                    publicView: publicView,
                    id: id
                  });
                  defer.resolve();
                });
              });
            });
          });
          return defer.promise();
        } // clear current data


        app.getWidget(widgetName).done(function (widget) {
          if (widget.reset) widget.reset();else if (widget.resetWidget) widget.resetWidget();
        }).done(function () {
          // just stick the empty views in there, otherwise the interface lags as the lib controller
          // paginates through the library bibcodes
          if (!(widgetName === 'ExportWidget' && format === 'classic')) {
            // export to classic opens a new tab, nothing to update here
            if (publicView) {
              app.getObject('MasterPageManager').show('PublicLibrariesPage', ['IndividualLibraryWidget', widgetName]).then(function () {
                renderLibrarySub(id).done(function () {
                  that.route = '#public-libraries/' + data.id; // XXX:rca - i think this should be that.route

                  defer.resolve();
                });
              });
            } else {
              app.getObject('MasterPageManager').show('LibrariesPage', ['IndividualLibraryWidget', 'UserNavbarWidget', widgetName]).then(function () {
                renderLibrarySub(id).done(function () {
                  that.route = '#user/libraries/' + data.id;
                  publishPageChange('libraries-page');
                  defer.resolve();
                });
              });
            }
          } else {
            defer.resolve();
          }
        });
        return defer.promise();
      } // end navToLibrarySubview


      this.set('library-export', navToLibrarySubView);
      this.set('library-visualization', navToLibrarySubView);
      this.set('library-metrics', navToLibrarySubView);
      this.set('library-citation_helper', navToLibrarySubView);
      this.set('home-page', function () {
        var defer = $.Deferred();
        var that = this;

        if (redirectIfNotSignedIn(that.endpoint)) {
          return defer.resolve().promise();
        }

        app.getObject('MasterPageManager').show('HomePage', []).then(function () {
          publishPageChange('home-page');
          that.title = 'Home';
          that.route = '#user/home';
          defer.resolve();
        });
        return defer.promise();
      });
      this.set('authentication-page', function (page, data) {
        var defer = $.Deferred();
        var data = data || {},
            subView = data.subView || 'login',
            loggedIn = app.getBeeHive().getObject('User').isLoggedIn(),
            that = this;

        if (loggedIn) {
          // redirect to index
          self.get('index-page').execute().then(function () {
            defer.resolve();
          });
        } else {
          // redirect will be set if we are redirecting from an internal page
          if (data.redirect) {
            that.replace = true;
          }

          app.getObject('MasterPageManager').show('AuthenticationPage', ['Authentication']).then(function () {
            app.getWidget('Authentication').done(function (w) {
              if (data.next) {
                w.setNextNavigation(data.next);
              }

              w.setSubView(subView);
              that.route = '#user/account/' + subView;
              that.title = subView === 'login' ? 'Sign In' : subView === 'reset-password-1' || subView === 'reset-password-2' ? 'Reset Password' : subView === 'resend-verification-email' ? 'Resend Verification Eamil' : 'Register';
              defer.resolve();
            });
          });
        }

        return defer.promise();
      });
      this.set('results-page', function (widget, args) {
        var that = this;
        var defer = $.Deferred();
        app.getObject('MasterPageManager').show('SearchPage', searchPageAlwaysVisible).done(function () {
          // allowing widgets to override appstorage query (so far only used for orcid redirect)
          // XXX:rca - not sure I understand why
          var q = app.getObject('AppStorage').getCurrentQuery();

          if (q && q.get('__original_url')) {
            var route = '#search/' + q.get('__original_url');
            q.unset('__original_url');
          } else {
            var route = '#search/' + queryUpdater.clean(q).url();
          } // XXX:rca why here and not inside mediator???
          // update the pagination of the results widget


          if (q instanceof ApiQuery) {
            var update = {};

            var par = function par(str) {
              if (_.isString(str)) {
                try {
                  return parseInt(str);
                } catch (e) {// do nothing
                }
              }

              return false;
            };

            if (q.has('p_')) {
              var page = par(q.get('p_')[0]);
              update.page = page;
            } else {
              route += '&p_=0';
            }

            if (!_.isEmpty(update)) {
              app.getWidget('Results').then(function (w) {
                if (_.isFunction(w.updatePagination)) {
                  w.updatePagination(update);
                }
              });
            }
          } // taking care of inserting bigquery key here, not sure if right place
          // clean(q) above got rid of qid key, reinsert it


          if (q && q.get('__qid')) {
            route += '&__qid=' + q.get('__qid')[0];
          }

          that.title = q && q.get('q').length && q.get('q')[0];
          that.route = route;
          publishFeedback({
            code: ApiFeedback.CODES.UNMAKE_SPACE
          });
          defer.resolve();
        });
        return defer.promise();
      });
      this.set('export', function (nav, options) {
        var defer = $.Deferred();
        var format = options.format || 'bibtex';
        var storage = app.getObject('AppStorage');
        var that = this;
        app.getObject('MasterPageManager').show('SearchPage', ['ExportWidget'].concat(searchPageAlwaysVisible.slice(1))).then(function () {
          app.getWidget('ExportWidget').done(function (widget) {
            that.route = "#search/".concat(storage.getCurrentQuery().url(), "/export-").concat(format);

            if (format === 'authoraff') {
              if (options.onlySelected && storage.hasSelectedPapers()) {
                widget.getAuthorAffForm({
                  bibcodes: storage.getSelectedPapers()
                });
              } else {
                widget.getAuthorAffForm({
                  currentQuery: storage.getCurrentQuery()
                });
              }

              return;
            } // first, open central panel


            publishFeedback({
              code: ApiFeedback.CODES.MAKE_SPACE
            }); // is a special case, it opens in a new tab

            if (options.onlySelected && storage.hasSelectedPapers()) {
              widget.renderWidgetForListOfBibcodes(storage.getSelectedPapers(), {
                format: format,
                sort: storage.hasCurrentQuery() && storage.getCurrentQuery().get('sort')[0]
              });
            } // all records specifically requested
            else if (options.onlySelected === false && storage.hasCurrentQuery()) {
              widget.renderWidgetForCurrentQuery({
                format: format,
                currentQuery: storage.getCurrentQuery(),
                numFound: storage.get('numFound')
              });
            } // no request for selected or not selected, show selected
            else if (options.onlySelected === undefined && storage.hasSelectedPapers()) {
              widget.renderWidgetForListOfBibcodes(storage.getSelectedPapers(), {
                format: format
              });
            } // no selected, show all papers
            else if (storage.hasCurrentQuery()) {
              widget.exportQuery({
                format: format,
                currentQuery: storage.getCurrentQuery(),
                numFound: storage.get('numFound')
              });
            } else {
              var alerts = app.getController('AlertsController');
              alerts.alert({
                msg: 'There are no records to export yet (please search or select some)'
              });
              self.get('results-page')(); // XXX:rca - .execute?, also
            }
          }).done(function () {
            defer.resolve(); // XXX:rca - may cause problem when 'results-page' gets called
          });
        });
        return defer.promise();
      });
      this.set('export-query', function () {
        var defer = $.Deferred();
        var api = app.getService('Api');
        var q = app.getObject('AppStorage').getCurrentQuery();
        var alerter = app.getController('AlertsController'); // TODO: modify filters (move them to the main q)

        q = new ApiQuery({
          query: q.url()
        }); // save the query / obtain query id

        api.request(new ApiRequest({
          query: q,
          target: ApiTargets.MYADS_STORAGE + '/query',
          options: {
            done: function done() {},
            type: 'POST',
            xhrFields: {
              withCredentials: false
            }
          }
        })).done(function (data) {
          alerter.alert(new ApiFeedback({
            code: ApiFeedback.CODES.ALERT,
            msg: 'The query has been saved. You can insert the following snippet in a webpage: <br/>' + '<img src="' + ApiTargets.MYADS_STORAGE + '/query2svg/' + data.qid + '"></img><br/>' + '<br/><textarea rows="10" cols="50">' + '<a href="' + location.protocol + '//' + location.host + location.pathname + '#execute-query/' + data.qid + '"><img src="' + ApiTargets.MYADS_STORAGE + '/query2svg/' + data.qid + '"></img>' + '</a>' + '</textarea>',
            modal: true
          }));
          defer.resolve();
        });
        return defer.promise();
      });
      this.set('search-page', function (endPoint, data) {
        var isTugboat = false;

        try {
          isTugboat = document.referrer.indexOf('tugboat/adsabs') > -1;
        } catch (e) {}

        var defer = $.Deferred();
        var possibleSearchSubPages = ['Metrics', 'AuthorNetwork', 'PaperNetwork', 'ConceptCloud', 'BubbleChart'];
        var widgetName, pages; // convention is that a navigate command for search page widget starts with "show-"
        // waits for the navigate to results page emitted by the discovery_mediator
        // once the solr search has been received

        if (data.page) {
          widgetName = _.map(data.page.split('-').slice(1), function (w) {
            return w[0].toUpperCase() + w.slice(1);
          }).join('');
        }

        if (widgetName && possibleSearchSubPages.indexOf(widgetName) > -1) {
          pages = [widgetName].concat(searchPageAlwaysVisible.slice(1));
        } else {
          pages = searchPageAlwaysVisible;
        }

        var that = this;
        var ctx = data && data.context || {};
        showResultsPage(pages, ctx).then(function () {
          var handler = function handler() {
            // the current query should have been updated, use that instead
            var query = self.getBeeHive().getObject('AppStorage').getCurrentQuery();

            if (!query) {
              query = data.q;
            }

            var cleaned = queryUpdater.clean(query); // re-apply the qid if was lost

            if (query.has('__qid')) {
              cleaned.set('__qid', query.get('__qid'));
            }

            that.route = '#search/' + cleaned.url();

            if (query.has('__bigquerySource')) {
              that.title = query.get('__bigquerySource')[0];
            } else {
              that.title = query.get('q').length && query.get('q')[0];
            }

            if (isTugboat) {
              that.route += '&__tb=1';
            }

            var q = query;

            if (q instanceof ApiQuery) {
              var update = {};

              var par = function par(str) {
                if (_.isString(str)) {
                  try {
                    return parseInt(str);
                  } catch (e) {// do nothing
                  }
                }

                return false;
              };

              if (q.has('p_')) {
                var page = par(q.get('p_')[0]);
                update.page = page;
              } else {
                that.route += '&p_=0';
              }

              if (!_.isEmpty(update)) {
                app.getWidget('Results').then(function (w) {
                  if (_.isFunction(w.updatePagination)) {
                    w.updatePagination(update);
                  }
                });
              }
            } // check if there is a subpage, if so execute that handler w/ our current context


            if (data.page && self.get(data.page)) {
              var exec = _.bind(self.get(data.page).execute, that, data.page, {
                q: query
              });

              exec(data.page).then(function () {
                defer.resolve();
              });
            } else {
              defer.resolve();
            }
          }; // subscribe to the search cycle finished event
          // so that we know that the current query has been set


          var onFeedback = function onFeedback(feedback) {
            if (feedback && feedback.code === ApiFeedback.CODES.SEARCH_CYCLE_FINISHED) {
              handler();
              ps.unsubscribe(ps.FEEDBACK, onFeedback);
            }
          }; // make sure that we unfold sidebars


          publishFeedback({
            code: ApiFeedback.CODES.UNMAKE_SPACE
          });
          var ps = self.getPubSub();
          ps.subscribe(ps.FEEDBACK, onFeedback);
          ps.publish(ps.START_SEARCH, data.q);
        });
        return defer.promise();
      });
      this.set('execute-query', function (endPoint, queryId) {
        var defer = $.Deferred();
        var api = app.getService('Api');
        api.request(new ApiRequest({
          target: ApiTargets.MYADS_STORAGE + '/query/' + queryId,
          options: {
            done: function done(data) {
              var q = new ApiQuery().load(JSON.parse(data.query).query);
              self.getPubSub().publish(self.getPubSub().START_SEARCH, q);
              defer.resolve();
            },
            fail: function fail() {
              var alerter = app.getController('AlertsController');
              alerter.alert(new ApiFeedback({
                code: ApiFeedback.CODES.ERROR,
                msg: 'The query with the given UUID cannot be found'
              }));
              self.get('index-page').execute().then(function () {
                defer.resolve();
              });
            },
            type: 'GET',
            xhrFields: {
              withCredentials: false
            }
          }
        }));
        return defer.promise();
      });
      this.set('user-action', function (endPoint, data) {
        var failMessage = '',
            failTitle = '',
            route,
            done,
            defer = $.Deferred();
        var token = data.token,
            subView = data.subView;

        function fail(jqXHR, status, errorThrown) {
          self.get('index-page').execute().then(function () {
            var error = jqXHR.responseJSON && jqXHR.responseJSON.error ? jqXHR.responseJSON.error : 'error unknown'; // call alerts widget

            self.getPubSub().publish(self.getPubSub().ALERT, new ApiFeedback({
              code: 0,
              title: failTitle,
              msg: ' <b>' + error + '</b> <br/>' + failMessage,
              modal: true,
              type: 'danger'
            }));
            defer.reject();
          });
        }

        if (subView === 'register') {
          failTitle = 'Registration failed.';
          failMessage = '<p>Please try again, or contact <b> adshelp@cfa.harvard.edu for support </b></p>';
          route = ApiTargets.VERIFY + '/' + token;

          done = function done(reply) {
            // user has been logged in already by server
            // request bootstrap
            self.getApiAccess({
              reconnect: true
            }).done(function () {
              self.get('index-page').execute().then(function () {
                var msg = '<p>You have been successfully registered with the email</p> <p><b>' + reply.email + '</b></p>';
                self.getPubSub().publish(self.getPubSub().ALERT, new ApiFeedback({
                  code: 0,
                  title: 'Welcome to ADS',
                  msg: msg,
                  modal: true,
                  type: 'success'
                }));
                defer.resolve();
              });
            }).fail(function () {
              this.apply(fail, arguments); // XXX:rca - infinite loop?
            });
          };
        } else if (subView === 'change-email') {
          failTitle = 'Attempt to change email failed';
          failMessage = 'Please try again, or contact adshelp@cfa.harvard.edu for support';
          route = ApiTargets.VERIFY + '/' + token;

          done = function done(reply) {
            // user has been logged in already
            // request bootstrap
            self.getApiAccess({
              reconnect: true
            }).done(function () {
              self.get('index-page').execute().then(function () {
                var msg = 'Your new ADS email is <b>' + reply.email + '</b>';
                self.getPubSub().publish(self.getPubSub().ALERT, new ApiFeedback({
                  code: 0,
                  title: 'Email has been changed.',
                  msg: msg,
                  modal: true,
                  type: 'success'
                }));
                defer.resolve();
              });
            }).fail(function () {
              this.apply(fail, arguments);
            });
          };
        } else if (subView === 'reset-password') {
          done = function done() {
            // route to reset-password-2 form
            // set the token so that session can use it in the put request with the new password
            self.getBeeHive().getObject('Session').setChangeToken(token);
            self.getPubSub().publish(self.getPubSub().NAVIGATE, 'authentication-page', {
              subView: 'reset-password-2'
            });
            defer.resolve();
          };

          failTitle = 'Password reset failed';
          failMessage = 'Reset password token was invalid.';
          route = ApiTargets.RESET_PASSWORD + '/' + token;
        } else {
          defer.reject('Unknown subView: ' + subView);
          return defer.promise();
        }

        var request = new ApiRequest({
          target: route,
          options: {
            type: 'GET',
            context: self,
            done: done,
            fail: fail
          }
        });
        self.getBeeHive().getService('Api').request(request);
        return defer.promise();
      });
      this.set('orcid-instructions', function () {
        var that = this;
        var defer = $.Deferred();
        app.getObject('MasterPageManager').show('OrcidInstructionsPage').then(function () {
          that.route = '#orcid-instructions';
          that.title = 'Orcid Instructions';
        });
        return defer.promise();
      });
      this.set('orcid-page', function (view, targetRoute) {
        var defer = $.Deferred();
        var orcidApi = app.getService('OrcidApi');
        var persistentStorage = app.getService('PersistentStorage');
        var appStorage = app.getObject('AppStorage');
        var user = app.getObject('User');
        var that = this; // traffic from Orcid - user has authorized our access

        if (!orcidApi.hasAccess() && orcidApi.hasExchangeCode()) {
          // since app will exit, store the information that we're authenticating
          if (persistentStorage) {
            persistentStorage.set('orcidAuthenticating', true);
          } else {
            console.warn('no persistent storage service available');
          }

          orcidApi.getAccessData(orcidApi.getExchangeCode()).done(function (data) {
            orcidApi.saveAccessData(data);
            user.setOrcidMode(true);
            self.getPubSub().publish(self.getPubSub().APP_EXIT, {
              url: window.location.pathname + (targetRoute && _.isString(targetRoute) ? targetRoute : window.location.hash)
            });
          }).fail(function () {
            user.setOrcidMode(false);
            console.warn('Unsuccessful login to ORCID');
            var alerter = app.getController('AlertsController');
            alerter.alert(new ApiFeedback({
              code: ApiFeedback.CODES.ALERT,
              msg: 'Error getting OAuth code to access ORCID',
              modal: true,
              events: {
                click: 'button[data-dismiss=modal]'
              }
            })).done(function () {
              self.get('index-page').execute(); // after modal is closed
            });
          });
          return;
        } else if (orcidApi.hasAccess()) {
          // XXX:rca = this block is async; showing modals even if the page under may be
          // changing; likely not intended to be doing that but not sure...
          if (persistentStorage.get('orcidAuthenticating')) {
            persistentStorage.remove('orcidAuthenticating'); // check if we need to trigger modal alert to ask user to fill in necessary data
            // we only want to show this immediately after user has authenticated with orcid

            orcidApi.getADSUserData().done(function (data) {
              // don't show modal if we're just going to redirect to the ads-orcid form anyway
              if (!data.hasOwnProperty('authorizedUser') && JSON.stringify(appStorage.get('stashedNav')) !== '["UserPreferences",{"subView":"orcid"}]') {
                // the form has yet to be filled out by the user
                // now tailor the message depending on whether they are signed in to ADS or not
                var alerter = app.getController('AlertsController');
                alerter.alert(new ApiFeedback({
                  code: ApiFeedback.CODES.ALERT,
                  msg: OrcidModalTemplate({
                    adsLoggedIn: app.getObject('User').isLoggedIn()
                  }),
                  type: 'success',
                  title: 'You are now logged in to ORCID',
                  modal: true
                }));
              } // end check if user has already provided data

            }).fail(function (error) {
              console.warn(error);
            });
          }

          app.getObject('MasterPageManager').show('OrcidPage', ['OrcidBigWidget', 'SearchWidget']).then(function () {
            // go to the orcidbigwidget
            that.route = '/user/orcid';
            that.title = 'My Orcid';
            defer.resolve();
          });
        } else {
          // just redirect to index page, no orcid access
          self.get('index-page').execute().then(function () {
            that.route = '';
            defer.resolve();
          });
        }

        return defer.promise();
      });
      /*
       * functions for showing "explore" widgets on results page
       * */

      function showResultsPageWidgetWithUniqueUrl(command, options) {
        var defer = $.Deferred(),
            that = this;
        options = options || {};
        var q = app.getObject('AppStorage').getCurrentQuery();

        if (!q && options.q) {
          q = options.q;
        } else if (!q && !options.q) {
          return defer.resolve().promise();
        }

        publishFeedback({
          code: ApiFeedback.CODES.MAKE_SPACE
        });

        var widgetName = _.map(command.split('-').slice(1), function (w) {
          return w[0].toUpperCase() + w.slice(1);
        }).join('');

        app.getObject('MasterPageManager').show('SearchPage', [widgetName].concat(searchPageAlwaysVisible.slice(1))).done(function () {
          var route = '#search/' + queryUpdater.clean(q.clone()).url() + '/' + command.split('-').slice(1).join('-'); // show selected, need to explicitly tell widget to show bibcodes

          if (options && options.onlySelected) {
            app.getWidget(widgetName).done(function (w) {
              var selected = app.getObject('AppStorage').getSelectedPapers();
              w.renderWidgetForListOfBibcodes(selected);
              that.route = route;
              defer.resolve();
            });
          } else {
            app.getWidget(widgetName).done(function (w) {
              w.renderWidgetForCurrentQuery({
                currentQuery: q
              });
              that.route = route;
              defer.resolve();
            });
          }
        });
        return defer.promise();
      }

      this.set('show-author-network', function (command, options) {
        return showResultsPageWidgetWithUniqueUrl.apply(this, arguments);
      });
      this.set('show-concept-cloud', function (command, options) {
        return showResultsPageWidgetWithUniqueUrl.apply(this, arguments);
      });
      this.set('show-paper-network', function (command, options) {
        return showResultsPageWidgetWithUniqueUrl.apply(this, arguments);
      });
      this.set('show-bubble-chart', function (command, options) {
        return showResultsPageWidgetWithUniqueUrl.apply(this, arguments);
      });
      this.set('show-metrics', function (command, options) {
        return showResultsPageWidgetWithUniqueUrl.apply(this, arguments);
      });
      this.set('visualization-closed', this.get('results-page'));

      var showResultsPage = function showResultsPage(pages, ctx) {
        return app.getObject('MasterPageManager').show('SearchPage', pages, ctx);
      };
      /*
       * Below are functions for abstract pages
       */


      var showDetail = function showDetail(pages, toActivate) {
        var defer = $.Deferred();
        app.getObject('MasterPageManager').show('DetailsPage', pages).then(function () {
          return app.getWidget('DetailsPage').then(function (w) {
            defer.resolve(w);
          });
        });
        return defer.promise();
      };

      this.set('verify-abstract', function () {
        // XXX:rca - moved from router; not in a working state
        // check we are using the canonical bibcode and redirect to it if necessary
        var q,
            req,
            defer = $.Deferred,
            that = this;
        q = new ApiQuery({
          q: 'identifier:' + this.queryUpdater.quoteIfNecessary(bibcode),
          fl: 'bibcode'
        });
        req = new ApiRequest({
          query: q,
          target: ApiTargets.SEARCH,
          options: {
            done: function done(resp) {
              var navigateString, href;

              if (!subPage) {
                navigateString = 'ShowAbstract';
              } else {
                navigateString = 'Show' + subPage[0].toUpperCase() + subPage.slice(1);
                href = '#abs/' + bibcode + '/' + subPage;
              } //self.routerNavigate(navigateString, { href: href });


              if (resp.response && resp.response.docs && resp.response.docs[0]) {
                bibcode = resp.response.docs[0].bibcode;
                self.getPubSub().publish(self.getPubSub().DISPLAY_DOCUMENTS, new ApiQuery({
                  q: 'bibcode:' + bibcode
                }));
              } else if (resp.response && resp.response.docs && !resp.response.docs.length) {
                console.error('the query  ' + q.get('q')[0] + '  did not return any bibcodes');
              }
            },
            fail: function fail() {
              console.log('Cannot identify page to load, bibcode: ' + bibcode);
              self.getPubSub().publish(this.getPubSub().NAVIGATE, 'index-page');
            }
          }
        });
        this.getPubSub().publish(this.getPubSub().EXECUTE_REQUEST, req);
      }); // translate identifier to bibcode, this only sends a request if the identifier is NOT bibcode-like

      var translateIdentifier = function translateIdentifier(id) {
        var $dd = $.Deferred();
        var ps = self.getPubSub(); // super naive bibcode confirmation

        if (id.length === 19 && /^\d{4}[A-z].*\d[A-z]$/.test(id)) {
          return $dd.resolve(id).promise();
        }

        var request = new ApiRequest({
          target: ApiTargets.SEARCH,
          query: new ApiQuery({
            q: 'identifier:' + id,
            fl: 'bibcode',
            rows: 1
          }),
          options: {
            done: function done(res) {
              if (res && res.response && res.response.numFound > 0) {
                $dd.resolve(res.response.docs[0].bibcode);
              }

              $dd.resolve('null');
            },
            fail: function fail() {
              $dd.resolve('null');
            }
          }
        });
        ps.publish(ps.EXECUTE_REQUEST, request);
        return $dd.promise();
      };

      var showDetailsSubPage = function showDetailsSubPage(_ref3) {
        var id = _ref3.id,
            bibcode = _ref3.bibcode,
            page = _ref3.page,
            prefix = _ref3.prefix,
            subView = _ref3.subView;
        var ps = self.getPubSub();
        ps.publish(ps.DISPLAY_DOCUMENTS, new ApiQuery({
          q: "identifier:".concat(bibcode)
        }));
        page.setActive(id, subView);

        if (prefix) {
          // we can grab the current title from storage and just add our prefix from there
          var title = app.getObject('AppStorage').getDocumentTitle();

          if (title && title.indexOf(prefix) === -1) {
            this.title = prefix + ' | ' + title;
          }
        } else {
          // get the title from the list of stashed docs, if available
          var doc = _.find(self.getBeeHive().getObject('DocStashController').getDocs() || [], {
            bibcode: bibcode
          });

          if (doc) {
            this.title = doc.title && doc.title[0];
          }
        }
      };

      this.set('ShowAbstract', function (id, data) {
        var _this = this;

        var defer = $.Deferred();
        showDetail([id].concat(detailsPageAlwaysVisible), id).then(function (page) {
          if (!data.bibcode) {
            return;
          }

          translateIdentifier(data.bibcode).then(function (bibcode) {
            showDetailsSubPage.call(_this, {
              id: id,
              bibcode: bibcode,
              page: page
            });
            _this.route = data.href;
            _this.replace = true;
            defer.resolve();
          });
        });
        return defer.promise();
      });
      this.set('ShowCitations', function (id, data) {
        var _this2 = this;

        var defer = $.Deferred();
        showDetail([id].concat(detailsPageAlwaysVisible), id).then(function (page) {
          if (!data.bibcode) {
            return;
          }

          translateIdentifier(data.bibcode).then(function (bibcode) {
            showDetailsSubPage.call(_this2, {
              id: id,
              bibcode: bibcode,
              page: page,
              prefix: 'Citations'
            });
            _this2.route = data.href;
            _this2.replace = true;
            defer.resolve();
          });
        });
        return defer.promise();
      });
      this.set('ShowReferences', function (id, data) {
        var _this3 = this;

        var defer = $.Deferred();
        showDetail([id].concat(detailsPageAlwaysVisible), id).then(function (page) {
          if (!data.bibcode) {
            return;
          }

          translateIdentifier(data.bibcode).then(function (bibcode) {
            showDetailsSubPage.call(_this3, {
              id: id,
              bibcode: bibcode,
              page: page,
              prefix: 'References'
            });
            _this3.route = data.href;
            _this3.replace = true;
            defer.resolve();
          });
        });
        return defer.promise();
      });
      this.set('ShowCoreads', function (id, data) {
        var _this4 = this;

        var defer = $.Deferred();
        showDetail([id].concat(detailsPageAlwaysVisible), id).then(function (page) {
          if (!data.bibcode) {
            return;
          }

          translateIdentifier(data.bibcode).then(function (bibcode) {
            showDetailsSubPage.call(_this4, {
              id: id,
              bibcode: bibcode,
              page: page,
              prefix: 'Co-Reads'
            });
            _this4.route = data.href;
            _this4.replace = true;
            defer.resolve();
          });
        });
        return defer.promise();
      });
      this.set('ShowSimilar', function (id, data) {
        var _this5 = this;

        var defer = $.Deferred();
        showDetail([id].concat(detailsPageAlwaysVisible), id).then(function (page) {
          if (!data.bibcode) {
            return;
          }

          translateIdentifier(data.bibcode).then(function (bibcode) {
            showDetailsSubPage.call(_this5, {
              id: id,
              bibcode: bibcode,
              page: page,
              prefix: 'Similar Papers'
            });
            _this5.route = data.href;
            _this5.replace = true;
            defer.resolve();
          });
        });
        return defer.promise();
      });
      this.set('ShowToc', function (id, data) {
        var _this6 = this;

        var defer = $.Deferred();
        showDetail([id].concat(detailsPageAlwaysVisible), id).then(function (page) {
          if (!data.bibcode) {
            return;
          }

          translateIdentifier(data.bibcode).then(function (bibcode) {
            showDetailsSubPage.call(_this6, {
              id: id,
              bibcode: bibcode,
              page: page,
              prefix: 'Volume Content'
            });
            _this6.route = data.href;
            _this6.replace = true;
            defer.resolve();
          });
        });
        return defer.promise();
      });
      this.set('ShowMetrics', function (id, data) {
        var _this7 = this;

        var defer = $.Deferred();
        showDetail([id].concat(detailsPageAlwaysVisible), id).then(function (page) {
          if (!data.bibcode) {
            return;
          }

          translateIdentifier(data.bibcode).then(function (bibcode) {
            showDetailsSubPage.call(_this7, {
              id: id,
              bibcode: bibcode,
              page: page,
              prefix: 'Metrics'
            });
            _this7.route = data.href;
            _this7.replace = true;
            defer.resolve();
          });
        });
        return defer.promise();
      });
      this.set('ShowExportcitation', function (id, data) {
        var _this8 = this;

        var defer = $.Deferred(); // the default subView should be `default`

        var format = data.subView || 'default';
        app.getObject('MasterPageManager').show('DetailsPage', [id].concat(detailsPageAlwaysVisible)).done(function () {
          app.getWidget('DetailsPage').done(function (page) {
            if (!data.bibcode) {
              return;
            }

            translateIdentifier(data.bibcode).then(function (bibcode) {
              self.getPubSub().publish(self.getPubSub().DISPLAY_DOCUMENTS, new ApiQuery({
                q: 'identifier:' + bibcode
              }));

              if (bibcode === 'null') {
                return page.setActive(null);
              } // guarantees the bibcode is set on the widget


              page.widgets[id].ingestBroadcastedPayload(bibcode);
              page.setActive(id, format);
              _this8.route = data.href;
              _this8.replace = true;
              defer.resolve();
            });
          });
        });
        return defer.promise();
      });
      this.set('ShowGraphics', function (id, data) {
        var _this9 = this;

        var defer = $.Deferred();
        showDetail([id].concat(detailsPageAlwaysVisible), id).then(function (page) {
          if (!data.bibcode) {
            return;
          }

          translateIdentifier(data.bibcode).then(function (bibcode) {
            showDetailsSubPage.call(_this9, {
              bibcode: bibcode,
              page: page,
              id: id,
              prefix: 'Graphics'
            });
            _this9.route = data.href;
            _this9.replace = true;
            defer.resolve();
          });
        });
        return defer.promise();
      });
      this.set('show-author-affiliation-tool', function (id, options) {
        var defer = $.Deferred(),
            that = this;
        var q = app.getObject('AppStorage').getCurrentQuery();
        app.getObject('MasterPageManager').show('SearchPage', ['AuthorAffiliationTool'].concat(searchPageAlwaysVisible.slice(1))).done(function () {
          publishFeedback({
            code: ApiFeedback.CODES.MAKE_SPACE
          });
          app.getWidget('AuthorAffiliationTool').done(function (w) {
            if (options && options.onlySelected) {
              var selected = app.getObject('AppStorage').getSelectedPapers();
              w.renderWidgetForListOfBibcodes(selected);
            } else {
              w.renderWidgetForCurrentQuery({
                currentQuery: q
              });
            }

            that.route = '#search/' + queryUpdater.clean(q).url();
            defer.resolve();
          });
        });
        return defer.promise();
      }); // ---- react components ----

      var createReactPage = /*#__PURE__*/function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
          var pm, widget;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return app._getWidget('ReactPageManager');

                case 2:
                  pm = _context2.sent;
                  _context2.next = 5;
                  return app._getWidget(id);

                case 5:
                  widget = _context2.sent;
                  pm.widgets[id] = widget.render();
                  pm.view = pm.createView({
                    widgets: _defineProperty({}, id, pm.widgets[id])
                  });
                  _context2.next = 10;
                  return app.getObject('MasterPageManager').show('ReactPageManager', [id]);

                case 10:
                  return _context2.abrupt("return", widget);

                case 11:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function createReactPage(_x2) {
          return _ref4.apply(this, arguments);
        };
      }();

      this.set('ShowFeedback', /*#__PURE__*/function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id, _ref5) {
          var subview, bibcode, widget, form;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  subview = _ref5.subview, bibcode = _ref5.bibcode;
                  _context3.next = 3;
                  return createReactPage('ShowFeedback');

                case 3:
                  widget = _context3.sent;
                  ReactRedux.batch(function () {
                    widget.dispatch({
                      type: 'SET_FORM',
                      payload: subview
                    });
                    widget.dispatch({
                      type: 'SET_BIBCODE',
                      payload: bibcode
                    });
                  });
                  form = widget.getState().main.form;
                  publishPageChange("feedback-".concat(form));
                  this.title = 'Feedback';

                case 8:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        return function (_x3, _x4) {
          return _ref6.apply(this, arguments);
        };
      }());
    }
  });

  _.extend(NavigatorService.prototype, ApiAccessMixin);

  return NavigatorService;
});
