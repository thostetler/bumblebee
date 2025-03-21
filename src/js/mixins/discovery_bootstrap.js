/*
 * This module contains a set of utilities to bootstrap Discovery app
 */
define([
  'underscore',
  'backbone',
  'js/components/api_query',
  'js/components/api_request',
  'js/components/pubsub_events',
  'hbs',
  'js/components/api_targets',
], function(
  _,
  Backbone,
  ApiQuery,
  ApiRequest,
  PubSubEvents,
  HandleBars,
  ApiTargets
) {
  var startGlobalHandler = function() {
    var routes = [
      'classic-form',
      'paper-form',
      'index',
      'search',
      'execute-query',
      'abs',
      'user',
      'orcid-instructions',
      'public-libraries',
    ];
    var regx = new RegExp('^#?(/?(' + routes.join('|') + ').*/?)?$', 'i');

    var isPushState = function() {
      return (
        Backbone.history &&
        Backbone.history.options &&
        Backbone.history.options.pushState
      );
    };

    var transformHref = _.memoize(function(href) {
      return regx.test(href) ? href.replace(/^\/?#\/?/, '/') : false;
    });

    var navigate = function(ev) {
      if (window.bbb) {
        try {
          var nav = bbb.getBeeHive().getService('Navigator');
          nav.router.navigate(ev.data.url, { trigger: true, replace: false });
          return false;
        } catch (e) {
          console.error(e.message);
        }
      } else {
        console.error('cannot find application object');
      }
    };

    var metaKey = false;
    var handleNavigation = function(event) {
      if (!isPushState()) return;
      var $el = $(this);

      // elements can set `data-dont-handle="true"` to explicitly tell handler to skip
      if ($el.data().dontHandle) {
        return;
      }
      var url = transformHref($el.attr('href'));
      if (url) {
        var old = $el.attr('href');

        // update the href on the element
        $el.attr('href', url);

        // handle metakey presses
        if (event.metaKey || event.ctrlKey) {
          metaKey = true;
          return;
        }
        if (metaKey && event.type === 'focusin') {
          metaKey = false;
          return;
        }
        metaKey = false;

        // add the click handler (run once)
        $el.one('click', { url: url }, navigate);

        // reset to the old url
        $el.one('mouseup blur', function() {
          $el.attr('href', old);
        });
        return false;
      }
    };
    $(document).on('mousedown focus', 'a', handleNavigation);
  };

  var Mixin = {
    configure: function() {
      var conf = this.getObject('DynamicConfig');

      if (conf) {
        var beehive = this.getBeeHive();
        var api = beehive.getService('Api');

        if (conf.root) {
          api.url = conf.root + '/' + api.url;
          this.root = conf.root;
        }
        if (conf.debug !== undefined) {
          beehive.debug = conf.debug;
          this.getController('QueryMediator').debug = conf.debug;
        }

        if (conf.apiRoot) {
          api.url = conf.apiRoot;
        }

        if (conf.version) {
          api.clientVersion = conf.version;
        }

        // ApiTargets has a _needsCredentials array that contains all endpoints
        // that require cookies
        api.modifyRequestOptions = function(opts, request) {
          // there is a list of endpoints that DONT require cookies, if this endpoint
          // is not in that list,
          if (
            ApiTargets._doesntNeedCredentials.indexOf(request.get('target')) ==
            -1
          ) {
            opts.xhrFields = {
              withCredentials: true,
            };
          }
        };

        var orcidApi = beehive.getService('OrcidApi');

        if (conf.orcidProxy) {
          orcidApi.orcidProxyUri = location.origin + conf.orcidProxy;
        }

        this.bootstrapUrls = conf.bootstrapUrls;

        if (conf.useCache) {
          this.triggerMethodOnAll('activateCache');
        }
      }
    },

    bootstrap: function() {
      // XXX:rca - solve this better, through config
      var beehive = this.getBeeHive();
      var dynConf = this.getObject('DynamicConfig');
      var timeout = 10000;
      var defer = $.Deferred();

      // check out the local storage to see if we have a copy
      var storage = beehive.getService('PersistentStorage');
      var config = storage.get('appConfig');
      if (
        config &&
        config.expires_at &&
        config.expires_at > Math.floor(Date.now() / 1000)
      ) {
        return defer.resolve(config).promise();
      }
      // this is the application dynamic config
      var api = this.getBeeHive().getService('Api');

      // load configuration from remote endpoints
      if (this.bootstrapUrls) {
        var pendingReqs = this.bootstrapUrls.length;
        var retVal = {};

        // harvest information from the remote urls and merge it into one object
        var opts = {
          done: function(data) {
            pendingReqs--;
            _.extend(retVal, data);
            if (pendingReqs <= 0) defer.resolve(retVal);
          },
          fail: function() {
            pendingReqs--;
            if (pendingReqs <= 0) defer.resolve(retVal);
          },
          type: 'GET',
          timeout: timeout - 1,
        };

        _.each(this.bootstrapUrls, function(url) {
          if (url.indexOf('http') > -1) {
            opts.u = url;
            api.request(
              new ApiRequest({
                query: new ApiQuery(),
                target: '',
              }),
              opts
            );
          } else {
            delete opts.u;
            api.request(
              new ApiRequest({
                query: new ApiQuery(),
                target: url,
              }),
              opts
            );
          }
        });

        setTimeout(function() {
          if (defer.state() === 'resolved') {
            return;
          }
          defer.reject(new Error('Timed out while loading modules'));
        }, timeout);
      } else {
        setTimeout(function() {
          defer.resolve({});
        }, 1);
      }
      return defer;
    },

    /**
     * Reload the application - by simply changing the URL (append bbbRedirect=1)
     * If the url already contains 'bbbRedirect', redirect to the error page.
     * @param errorPage
     */
    reload: function(endPage) {
      if (location.search.indexOf('debug') > -1) {
        console.warn('Debug stop, normally would reload to: ' + endPage);
        return; // do nothing
      }

      if (location.search && location.search.indexOf('bbbRedirect=1') > -1) {
        return this.redirect(endPage);
      }
      location.search = location.search
        ? location.search + '&bbbRedirect=1'
        : 'bbbRedirect=1';
    },

    redirect: function(endPage) {
      if (this.router) {
        location.pathname = this.router.root + endPage;
      }
      // let's replace the last element from pathname - this code will run only when
      // router is not yet available; therefore it should hit situations when the app
      // was not loaded (but it is not bulletproof - the urls can vary greatly)
      // TODO: intelligently explore the rigth url (by sending HEAD requests)
      location.href =
        location.protocol +
        '//' +
        location.hostname +
        ':' +
        location.port +
        location.pathname.substring(0, location.pathname.lastIndexOf('/')) +
        '/' +
        endPage;
    },

    start: function(Router) {
      var defer = $.Deferred();
      var app = this;
      var beehive = this.getBeeHive();
      var api = beehive.getService('Api');
      var conf = this.getObject('DynamicConfig');

      // set the config into the appstorage
      // TODO: find a more elegant solution
      this.getBeeHive()
        .getObject('AppStorage')
        .setConfig(conf);

      var complain = function(x) {
        throw new Error(
          'Ooops. Check you config! There is no ' + x + ' component @#!'
        );
      };

      var navigator = app.getBeeHive().Services.get('Navigator');
      if (!navigator) complain('services.Navigator');

      var masterPageManager = app.getObject('MasterPageManager');
      if (!masterPageManager) complain('objects.MasterPageManager');

      // get together all pages and insert widgets there
      masterPageManager.assemble(app).done(function() {
        // attach the master page to the body
        var $main = $('div#body-template-container');
        if (window.__PRERENDERED) {
          var $content = $('div#content-container');
          $($content.selector, masterPageManager.view.el).html($content.html());
          $main.html(masterPageManager.view.el);
        } else {
          $main.html(masterPageManager.view.el);
        }

        // kick off routing
        app.router = new Router();
        app.router.activate(beehive.getHardenedInstance());

        // get ready to handle navigation signals
        navigator.start(app);
        navigator.router = app.router; // this feels hackish

        var noPushState = location.search.indexOf('pushstate=false') > -1;

        // Trigger the initial route and enable HTML5 History API support
        var newConf = _.defaults(
          {
            pushState: noPushState ? false : undefined,
          },
          conf && conf.routerConf
        );
        Backbone.history.start(newConf);

        // apply a global link handler for push state (after router is started)
        startGlobalHandler();
        defer.resolve();
      });

      return defer.promise();
    },
  };

  return Mixin;
});
