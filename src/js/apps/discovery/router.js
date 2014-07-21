define([
    'jquery',
    'backbone',
    'js/components/api_query',
    'js/mixins/dependon',
     'backbone-query-parameters',],
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
        "search/": 'search',
        'abs/:bibcode(/:subView)': 'viewAbstract'
      },


      index: function () {
        this.pageControllers.landingPage.showPage();
        this.history.addEntry({"landingPage": undefined})

      },

      search: function (query) {
        var serializedQuery = $.param(query);

        if (serializedQuery) {
            this.history.addEntry({"resultsPage": serializedQuery})
            var q= new ApiQuery().load(serializedQuery);
            this.pubsub.publish(this.pubsub.NEW_QUERY, q);
            this.pageControllers.resultsPage.showPage();

        }
      },

      viewAbstract: function (bibcode, subView) {
        var fromWithinPage;

        if (!subView) {
          subView = "abstract"
        }
        //notifies manager if it is just a simple shift from abstract to cited list, for example
        if (this.history.getPriorPage() === "abstractPage" && this.history.getPriorPageVal().bibcode === bibcode){
         fromWithinPage = true;
        }
        else {
          fromWithinPage = false;
        }

        if (bibcode){
          //it's the default abstract view
          this.pageControllers.abstractPage.showPage(bibcode, subView, fromWithinPage);
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