define([
  'backbone',
  'marionette',
  'js/components/api_query',
  'js/components/api_request',
  'js/mixins/widget_mixin_method',
  'js/components/api_targets',
  'js/mixins/dependon',
  'js/mixins/widget_state_manager',
], function(Backbone, Marionette, ApiQuery, ApiRequest, WidgetMixin, ApiTargets, Dependon, WidgetStateManagerMixin) {
  /**
   * Default PubSub based widget; the main functionality is inside
   *
   *  dispa tchRequest()
   *    - publishes ApiRequest object into PubSub (to initiate search)
   *
   *  processResponse()
   *    - receives ApiResponse object as a direct reply for the previous
   *      request
   *
   * You will want to override 'processResponse' method and possibly
   * some of the other methods like this;
   *
   * var newWidgetClass = BaseWidget.extend({
   *   composeRequest : function(){},
   *   processRequest : function(){}
   * });
   *
   * var newInstance = new newWidgetClass();
   *
   *
   * If you need to provide your own views, do initalization etc., override
   * initialize
   *
   * * var newWidgetClass = BaseWidget.extend({
   *   initialize: function() {
   *      // do something
   *      BaseWidget.prototype.initialize.apply(this, arguments);
   *   }
   * });
   *
   *
   * Some other options include:
   *
   *  defaultQueryArguments: this is a list of parameters added to each query
   *
   */
  var BaseWidget = Marionette.Controller.extend(
    {
      initialize: function(options) {
        options = options || {};

        // these methods are called by PubSub as handlers so we bind them to 'this' object
        // and they will carry their own context 'this'
        _.bindAll(this, 'dispatchRequest', 'processResponse');

        this._currentQuery = new ApiQuery();
        this.defaultQueryArguments = this.defaultQueryArguments || {};
        if (options.defaultQueryArguments) {
          this.defaultQueryArguments = _.extend(this.defaultQueryArguments, options.defaultQueryArguments);
        }

        if (options.view) {
          this.view = options.view;
          this.collection = options.view.collection;
        }

        // our way of listening to views/models
        if (this.view) Marionette.bindEntityEvents(this, this.view, Marionette.getOption(this, 'viewEvents'));
        if (this.model) Marionette.bindEntityEvents(this, this.model, Marionette.getOption(this, 'modelEvents'));
      },

      /**
       * Called by Bumblebee application when a widget is about to be registered
       * it receives a BeeHive object, that contais methods/attributes that a
       * widget needs to communicate with the app
       *
       * This is the place where you want to subscribe to events
       *
       * @param beehive
       */
      activate: function(beehive) {
        this.setBeeHive(beehive);
        var pubsub = beehive.getService('PubSub');

        // custom dispatchRequest function goes here
        pubsub.subscribe(pubsub.INVITING_REQUEST, _.bind(this.dispatchRequest, this));
        // custom handleResponse function goes here
        pubsub.subscribe(pubsub.DELIVERING_RESPONSE, _.bind(this.processResponse, this));
      },

      /**
       * You should use this method when you want to initiaze global search action
       * (ie. send a query to the pubsub)
       *
       * @param apiQuery
       */
      dispatchNewQuery: function(apiQuery) {
        // remove the arguments that are useful only to this widget
        _.each(this.defaultQueryArguments, function(v, k) {
          apiQuery.unset(k);
        });
        var pubsub = this.getPubSub();
        pubsub.publish(pubsub.NAVIGATE, 'search-page', { q: apiQuery });
      },

      /**
       * Default callback to be called by PubSub on 'INVITING_REQUEST'
       */
      dispatchRequest: function(apiQuery) {
        this._dispatchRequest(apiQuery);
      },

      _dispatchRequest: function(apiQuery) {
        var q = this.customizeQuery(apiQuery);
        if (q) {
          var req = this.composeRequest(q);
          if (req) {
            var pubsub = this.getPubSub();
            pubsub.publish(pubsub.DELIVERING_REQUEST, req);
          }
        }
      },

      /**
       * Default action to modify ApiQuery (called from inside dispatchRequest)
       *
       * @param apiQuery
       */
      customizeQuery: function(apiQuery) {
        const q = apiQuery instanceof ApiQuery ? apiQuery.clone() : this.getCurrentQuery();

        q.unlock();
        if (this.defaultQueryArguments) {
          return this.composeQuery(this.defaultQueryArguments, q);
        }
        return q;
      },

      /**
       * Default callback to be called by PubSub on 'DELIVERING_RESPONSE'
       * @param apiResponse
       */
      processResponse: function(apiResponse) {
        // in your widget, you should always set the current query like this
        var q = apiResponse.getApiQuery();
        this.setCurrentQuery(q);

        throw new Error('you need to customize this function');
      },

      /**
       * This function should return a request IFF we want to get some
       * data - it is called from inside 'dispatchRequest' event handler
       *
       * @param object with params to add
       * @returns {ApiRequest}
       */
      composeRequest: function(apiQuery) {
        return new ApiRequest({
          target: ApiTargets.SEARCH,
          query: apiQuery,
        });
      },

      /**
       * Will save a clone of the apiQuery into the widget (for future use and
       * reference)
       *
       * @param apiQuery
       */
      setCurrentQuery: function(apiQuery) {
        this._currentQuery = apiQuery;
      },

      /**
       * Returns the current ApiQuery
       * if a query hasn't been set, it will check if there is one in storage,
       * if not, it will return an empty query
       *
       * @returns {ApiQuery|*}
       */
      getCurrentQuery: function() {
        var currQuery = new ApiQuery({});
        var beehive;
        try {
          if (this._currentQuery instanceof ApiQuery) {
            currQuery = this._currentQuery;
          } else if (_.isFunction(this.getBeeHive)) {
            beehive = this.getBeeHive();
            if (beehive.hasObject('AppStorage')) {
              var q = beehive.getObject('AppStorage').getCurrentQuery();
              if (q instanceof ApiQuery) {
                currQuery = q;
              }
            }
          }
        } catch (e) {
          console.error(e.message);
        } finally {
          return currQuery;
        }
      },

      /**
       * All purpose function for making a new query. It returns an apiQuery ready for
       * newQuery event or for insertion into  apiRequest.
       *
       * @param queryParams
       * @param apiQuery
       * @returns {*}
       */
      composeQuery: function(queryParams, apiQuery) {
        var query;
        if (!apiQuery) {
          query = this.getCurrentQuery();
          query = query.clone();
        } else {
          query = apiQuery;
        }

        if (queryParams) {
          _.each(queryParams, function(v, k) {
            if (!query.has(k)) query.set(k, v);
          });
        }
        return query;
      },

      onDestroy: function() {
        this.view.destroy();
      },

      /**
       * Convention inside Backbone and Marionette is to return 'this'
       * - since 'this' usually refers to a 'View', we'll return the
       * view's el here
       * doesn't render unless it has to
       *
       * @returns {view.el}
       */
      getEl: function() {
        if (this.view.el && this.view.$el.children().length) {
          return this.view.el;
        }

        return this.view.render().el;
      },
      /*
       *
       * convenience function for tests, always re-renders
       *
       * */

      render: function() {
        return this.view.render();
      },

      /**
       * Extracts identifier from a query object
       *
       * @param {ApiQuery} apiQuery
       */
      parseIdentifierFromQuery: function(apiQuery) {
        if (!apiQuery.hasVal('q')) {
          throw 'no query';
        }
        const q = apiQuery.get('q')[0];
        try {
          if (/^(?:identifier|bibcode):(.*)$/.test(q)) {
            return q.split(':')[1];
          }
        } catch (e) {
          throw 'unable to parse bibcode';
        }
        throw 'query must be in the format of identifer:foo or bibcode:foo';
      },
    },
    { mixin: WidgetMixin }
  );

  _.extend(BaseWidget.prototype, Dependon.BeeHive, WidgetStateManagerMixin);

  return BaseWidget;
});
