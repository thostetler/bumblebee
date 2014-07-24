define(["marionette", "hbs!./templates/landing-page-layout"], function(Marionette, fullLengthLayout){

  var widgetDict, history;

  var API = {

    insertTemplate : function(){
      $("#body-template-container").children().detach().end()
        .append(fullLengthLayout())

    },

    displayLandingPage : function(){
      this.insertTemplate();
      $("#row-1-content").text("Welcome to bumblebee !!!!")
      $("#row-2-content").append(widgetDict.searchBar.render().el)

    }

  };

  var LandingPageController = Marionette.Controller.extend({



   initialize : function(options){

    options = options || {};

    this.API = API;

     widgetDict = options.widgetDict;
     history = options.history;



   },

  showPage : function(page){

      console.log("displayingLandingpage!!")
      API.displayLandingPage()


  }

  })


 return LandingPageController


})