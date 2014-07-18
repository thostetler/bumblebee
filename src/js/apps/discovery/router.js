define([
    'jquery',
    'backbone',
    'js/components/api_query',
    'js/mixins/dependon'],
  function ($, Backbone, ApiQuery, Dependon) {

    "use strict";


    // Defining the application router.
    var Router = Backbone.Router.extend({

      initialize : function(options){
        options = options || {};
        this.pageControllers = options.pageControllers;
        this.history = options.history;

      },
      routes: {
        "": "index",
        "search/*query": 'search',
        'abs/:bibcode(/:subView)': 'viewAbstract'
      },

      index: function () {
        this.pageControllers.landingPage.showPage();
        this.history.addEntry({"landingPage": undefined})

      },

      search: function (query) {
        if (query) {
          if (_.isString(query)){
            this.history.addEntry({"resultsPage": query})
            query = new ApiQuery().load(query);
            this.pubsub.publish(this.pubsub.NEW_QUERY, query);
            this.pageControllers.resultsPage.showPage();

          }

        }
      },

      viewAbstract: function (bibcode, subView) {
        console.log("ROUTING")
        if (!subView) {
          subView = "abstract"
        }

        if (bibcode){
          //it's the default abstract view
          this.pageControllers.abstractPage.showPage(bibcode, subView);
          this.history.addEntry({"abstractPage": {bibcode: bibcode, subView : subView}})
        }

      },


      activate: function (beehive) {
        this.setBeeHive(beehive);
        this.pubsub = this.getBeeHive().Services.get('PubSub');
      }

    });

    _.extend(Router.prototype, Dependon.BeeHive);
    return Router;

  });