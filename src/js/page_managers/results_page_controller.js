/**
 * This widget knows about the central region manager (passed it on instantiation)
 * and can manipulate it (also it can add sub regions)
 *
 * It listens to any events that request the abstract page or a sub part of it and
 * displays the necessary views
 *
 * Exposes an api that can be used by the router (to change what is currently
 * displayed)
 *
 */


define([
    "marionette",
    "hbs!./templates/results-page-layout",
    'js/widgets/base/base_widget',
    'js/widgets/loading/widget',
    'hbs!./templates/results-control-row'],
  function (
    Marionette,
    threeColumnTemplate,
    BaseWidget,
    LoadingWidget,
    resultsControlRowTemplate) {



    ResultsControllerView = Marionette.ItemView.extend({

      initialize : function(options){

        var options = options || {};
        this.widgetDict = options.widgetDict;

        //listen to window resize to figure out what we need to do with the 3rd column
        //should this go here?

        $(window).resize(function() {

          if (this.$(".right-expand").css("display") == "none") {

            //move third col to first col if it's not already there

            if (!this.$("#results-left-column").find(".right-col-container").length){
              this.$("#results-left-column").append(this.$(".right-col-container"))
            }

          }
          else {

            //move third col back into third col if it's not already there

            if (!this.$("#results-right-column").find(".right-col-container").length){

              this.$("#results-right-column").append(this.$(".right-col-container"))

            }
          }

        });

      },

      template : threeColumnTemplate,

      resultsControlRowTemplate  : resultsControlRowTemplate,

      onRender : function(){

        this.displayControlRow();
        this.displayFacets();
        //the order of the next two are important
        // the right col checks for css value of expander buttons
        //to decide where to render itself
        this.displayResultsList();
        this.displayRightColumn();
      },


      displayFacets: function() {

        this.$(".s-left-col-container")
          .append(this.widgetDict.authorFacets.render().el)
          .append(this.widgetDict.database.render().el)
          .append(this.widgetDict.refereed.render().el)
          .append(this.widgetDict.keywords.render().el)
          .append(this.widgetDict.pub.render().el)
          .append(this.widgetDict.bibgroup.render().el)
          .append(this.widgetDict.data.render().el)
          .append(this.widgetDict.vizier.render().el)
          .append(this.widgetDict.grants.render().el);

      },

      displayControlRow: function () {

        this.$("#results-control-row")
          .append(this.resultsControlRowTemplate());

        this.$("#query-info-container")
          .append(this.widgetDict.queryInfo.render().el)
      },

      displayRightColumn: function () {
        //check for width-- if we are medium sized, append to third col
        //else append to bottom of left col

        this.$(".right-col-container")
          .append(this.widgetDict.graphTabs.render().el);

        if (Marionette.getOption(this, "debug")) {
          this.$(".right-col-container")
            .append(this.widgetDict.queryDebugInfo.render().el);

        }

          if (this.$(".right-expand").css("display") == "none" ){

          // it's a tablet or smaller

          this.$("#results-left-column").append(this.$(".right-col-container"))

        }

      },

      displayResultsList: function () {

        this.widgetDict.results.view.sortView = this.widgetDict.sort.view;

        this.$(".main-content-container")
          .append(this.widgetDict.results.render().el);


      },

      onShow : function(){

        //these functions must be called every time the template is inserted
        this.displaySearchBar();

      },

      displaySearchBar: function () {
        $("#search-bar-row")
          .append(this.widgetDict.searchBar.render().el)

      },

      events : {
        "click .btn-expand" : "toggleColumns"
      },

      returnBootstrapClasses :  function () {

        var classes = this.classList
        var toRemove = []
        _.each(classes, function (c) {
          if (c.indexOf("col-") !== -1) {
            toRemove.push(c)
          }
        })
        return toRemove.join(" ")
      },

      makeCenterFullWidth  : function(){

        var $leftCol =  this.$(".s-results-left-column");
        var $rightCol =  this.$(".s-results-right-column");

        this.$("#results-middle-column")
          .removeClass(this.returnBootstrapClasses)
          .addClass("col-md-12 col-sm-12");

        this.$(".btn-expand").addClass("btn-reversed");

        $leftCol.children().width(0).fadeOut(500).hide();

        $leftCol.addClass("hidden-col");

        $rightCol.find(".right-col-container").width(0).hide(500);

        $rightCol.addClass("hidden-col");

      },

      returnColWidthsToDefault : function(){

        var $leftCol =  this.$(".s-results-left-column");
        var $rightCol =  this.$(".s-results-right-column");

        this.$("#results-middle-column")
          .removeClass(this.returnBootstrapClasses)
          .addClass("col-md-7 col-sm-8 ");

        $leftCol.removeClass("hidden-col");
        $leftCol.children().width('').fadeIn(500).children().show();

        $rightCol.removeClass("hidden-col");
        $rightCol.find(".right-col-container").width('').fadeIn(500);


      },


      toggleColumns :function(e){

        //this will remove all bootstrap column classes, it's used below


        var $t = $(e.currentTarget);
        var $leftCol =  this.$(".s-results-left-column");
        var $rightCol =  this.$(".s-results-right-column");

        if ($t.hasClass("btn-reversed")){

          $t.removeClass("btn-reversed");

          if ($t.hasClass("left-expand")){

            $leftCol.removeClass("hidden-col")
            $leftCol.children().show(500);

          }
          else {
            $rightCol.removeClass("hidden-col");

            $rightCol.find(".right-col-container").show(500);

          }

          if (!$rightCol.hasClass("hidden-col") && !$leftCol.hasClass("hidden-col")){
            this.$("#results-middle-column")
              .removeClass(this.returnBootstrapClasses)
              .addClass("col-md-7 col-sm-8 ")

          }
          else if ($leftCol.hasClass("hidden-col")){
            this.$("#results-middle-column")
              .removeClass(this.returnBootstrapClasses)
              .addClass("col-md-9 col-sm-12")

          }
          else {
            this.$("#results-middle-column")
              .removeClass(this.returnBootstrapClasses)
              .addClass("col-md-10 col-sm-8")

          }

        }
        else {
          $t.addClass("btn-reversed");

          if ($t.hasClass("left-expand")){

            $leftCol.children().hide();

            $leftCol.addClass("hidden-col")

          }
          else {
            //expand to the right

            $rightCol.find(".right-col-container").hide();

            $rightCol.addClass("hidden-col");


          }

          if ($rightCol.hasClass("hidden-col") && $leftCol.hasClass("hidden-col")){
            this.$("#results-middle-column")
              .removeClass(this.returnBootstrapClasses)
              .addClass("col-md-12 col-sm-12")

          }
          else if ($rightCol.hasClass("hidden-col")){
            this.$("#results-middle-column")
              .removeClass(this.returnBootstrapClasses)
              .addClass("col-md-10 col-sm-10")
          }
          else {
            this.$("#results-middle-column")
              .removeClass(this.returnBootstrapClasses)
              .addClass("col-md-9 col-sm-12")

          }

        }
      }

    });


    var ResultsController = BaseWidget.extend({

      initialize: function (options) {

        options = options || {};

        _.bindAll(this, 'showPage');


        if (!options.widgetDict){
          throw new Error("page managers need a dictionary of widgets to render")
        }

        this.widgetDict = options.widgetDict;

      },

      //don't subscribe to events

      activate: function (beehive) {
        this.pubsub = beehive.Services.get('PubSub');

        //this has to go here to get information from beehive
        //better place to put it?

        this.controllerView = new ResultsControllerView({widgetDict : this.widgetDict, debug : beehive.getDebug()});


      },

      insertResultsControllerView : function(){

          var $b = $("#body-template-container");

          $b.children().detach();

          //don't call render each time or else we
          //would have to re-delegate widget events

          $b.append(this.controllerView.el);

          this.controllerView.triggerMethod("show");

      },

      showPage: function (options) {

        var inDom = options.inDom;

        if (!inDom){
          this.insertResultsControllerView();
        }

      }


    });

    return ResultsController

  });

