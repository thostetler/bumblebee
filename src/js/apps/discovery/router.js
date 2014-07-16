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
        'abs/:bibcode': 'viewAbstract'
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
            this.pageControllers.resultsPage.showPage();

          }


        }
      },

      viewAbstract: function (bibcode) {
        if (bibcode) {
          console.log("bib!!", bibcode)
          this.pageControllers.abstractPage.showPage(bibcode);
          this.history.addEntry({"abstractPage": bibcode})

        }
      },


      activate: function (beehive) {
        this.setBeeHive(beehive);
        var pubsub = this.getBeeHive().Services.get('PubSub');
      }

    });

    _.extend(Router.prototype, Dependon.BeeHive);
    return Router;

  });