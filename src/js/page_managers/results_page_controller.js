

//knows about the central region manager (passed it on instantiation) and can manipulate it (also it can add sub regions)

//listens to any events that request the abstract page or a sub part of it and displays the necessary views

//provides an api that can be used by the router



define(["marionette", "hbs!./templates/results-page-layout"], function(Marionette, threeColumnTemplate){

  var  widgetDict, history;



  //  router can make use of these functions

  API = {

    insertTemplate : function(){

      $("#body-template-container").children().detach()

      $("#body-template-container").append(threeColumnTemplate())

    },



    displayFacets : function(){

      var $leftCol = $("#s-left-col-container")

      $leftCol
        .append(widgetDict.authorFacets.render().el)
        .append(widgetDict.database.render().el)
        .append(widgetDict.refereed.render().el)
        .append(widgetDict.keywords.render().el)
        .append(widgetDict.pub.render().el)
        .append(widgetDict.bibgroup.render().el)
        .append(widgetDict.data.render().el)
        .append(widgetDict.vizier.render().el)
        .append(widgetDict.grants.render().el);


    },

    displayRightColumn : function(){
      var $rightCol = $("#s-right-col-container");

      $rightCol.append(widgetDict.queryInfo.render().el)
        .append(widgetDict.graphTabs.render().el)
        .append(widgetDict.queryDebugInfo.render().el);



    },

    displaySearchBar : function(){
      $("#search-bar-row").children().detach();
      $("#search-bar-row").append(widgetDict.searchBar.render().el);

    },

    displayResultsList : function(){

      $middleCol = $("#s-middle-col-container")

      $middleCol.append(widgetDict.results.render().el)

      $(".list-of-things").removeClass("hide")

    }


  }

  var ResultsController = Marionette.Controller.extend({


    initialize: function (options) {

      options = options || {};

      widgetDict = options.widgetDict;

      history = options.history;


    },

    showPage: function (page) {
              console.log("displaying results")

              API.insertTemplate()
              API.displaySearchBar();
              API.displayFacets();
              API.displayRightColumn();
              API.displayResultsList()

            }

  })


return ResultsController

})