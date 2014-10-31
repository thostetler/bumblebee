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


    ResultsStateModel = Backbone.Model.extend({

       defaults : function(){

         return {
           left : "open",
           right : "open",
           largerThanTablet : true

         }
       }
    })



    ResultsControllerView = Marionette.ItemView.extend({

      initialize: function (options) {

        var options = options || {};
        this.model = new ResultsStateModel;
        this.widgetDict = options.widgetDict;

        //listen to window resize to figure out what we need to do with the 3rd column
        //should this go here?

        var that = this;

        $(window).resize(function() {

          if (that.$(".right-expand").css("display") == "none") {
            that.model.set("largerThanTablet", false)
          }
          else {
            that.model.set("largerThanTablet", true)

          }

        });

      },

      template: threeColumnTemplate,

      resultsControlRowTemplate: resultsControlRowTemplate,

      onRender: function () {

        this.displayControlRow();
        this.displayFacets();
        //the order of the next two are important
        // the right col checks for css value of expander buttons
        //to decide where to render itself
        this.displayResultsList();
        this.displayRightColumn();
      },


      displayFacets: function () {

        this.$(".left-col-container")
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

        if (this.$(".right-expand").css("display") == "none") {

          // it's a tablet or smaller

          this.$("#results-left-column").append(this.$(".right-col-container"))

        }

      },

      displayResultsList: function () {

        this.widgetDict.results.view.sortView = this.widgetDict.sort.view;

        this.$(".main-content-container")
          .append(this.widgetDict.results.render().el);


      },

      onShow: function () {

        //these functions must be called every time the template is inserted
        this.displaySearchBar();

      },

      displaySearchBar: function () {
        $("#search-bar-row")
          .append(this.widgetDict.searchBar.render().el)

      },

      modelEvents: {
        "change:left": "toggleColumns",
        "change:right": "toggleColumns",
        "change:largerThanTablet": "updateColumnContent"
      },

      events: {

        "click .btn-expand": "toggleStateModel"
      },

      updateColumnContent: function () {

        var leftHidden = (this.model.get("left") === "closed");

        if (this.model.get("largerThanTablet")) {
          // it's a three column layout

          this.$("#results-right-column").append(this.$(".right-col-container"))

          if (leftHidden) {

            this.$(".right-col-container").show();

          }

        }
        else {
          // two column layout
          this.$("#results-left-column").append(this.$(".right-col-container"));
          if (leftHidden) {

            this.$(".right-col-container").show();
          }

        }

      },

      toggleStateModel: function (e) {

        var name, $button, state;

        $button = $(e.currentTarget);

        $button.toggleClass("btn-reversed");

        name = $button.hasClass("left-expand") ? "left" : "right";

        state = this.model.get(name) === "open" ? "closed" : "open";

        this.model.set(name, state);

      },

      returnBootstrapClasses: function () {

        var classes = this.classList;
        var toRemove = []
        _.each(classes, function (c) {
          if (c.indexOf("col-") !== -1) {
            toRemove.push(c)
          }
        })
        return toRemove.join(" ")
      },

      makeCenterFullWidth: function () {

        this.model.set("left", "closed");

        this.model.set("right", "closed");

      },

      returnColWidthsToDefault: function () {

        this.model.set("left", "open");

        this.model.set("right", "open");

      },


      toggleColumns: function (e) {

        var leftState, rightState, $leftCol, $rightCol, $middleCol;

        leftState = this.model.get("left");

        rightState = this.model.get("right");

        //this will remove all bootstrap column classes, it's used below

        $leftCol = this.$("#results-left-column");
        $rightCol = this.$("#results-right-column");
        $middleCol = this.$("#results-middle-column");

        if (leftState === "open" && rightState === "open") {

          $leftCol.removeClass("hidden-col")
            .children().show(500);

          $rightCol.removeClass("hidden-col")
            .find(".right-col-container").show(500);

          $middleCol.removeClass(this.returnBootstrapClasses)
            .addClass("col-md-7 col-sm-8")


        }
        else if (leftState === "closed" && rightState === "open") {

          $rightCol.removeClass("hidden-col")
            .find(".right-col-container").show(500);

          $leftCol
            .addClass("hidden-col")
            .children().hide();

          $middleCol.removeClass(this.returnBootstrapClasses)
            .addClass("col-md-9 col-sm-12")

        }

        else if (leftState === "open" && rightState === "closed") {

          $leftCol.removeClass("hidden-col")
            .children().show(500);

          $rightCol.addClass("hidden-col")
            .find(".right-col-container").hide()

          $middleCol.removeClass(this.returnBootstrapClasses)
            .addClass("col-md-10 col-sm-10")

        }

        else if (leftState === "closed" && rightState === "closed") {

          $rightCol.addClass("hidden-col")
            .find(".right-col-container")
            .hide();

          $leftCol.addClass("hidden-col")
            .children()
            .hide();

          $middleCol.removeClass(this.returnBootstrapClasses)
            .addClass("col-md-12 col-sm-12")

        }


      }


    });


    var ResultsController = BaseWidget.extend({

      initialize: function (options) {

        var that = this;

        options = options || {};

        _.bindAll(this, 'showPage');


        if (!options.widgetDict){
          throw new Error("page managers need a dictionary of widgets to render")
        }

        this.widgetDict = options.widgetDict;

        //listen to results list for data load
        this.listenTo(this.widgetDict.results.collection, "collection:augmented", function(){

          this.ariaWaitingForResults = false;

        });

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

          this.pubsub.publish(this.pubsub.ARIA_ANNOUNCEMENT, "Loading results page")


        }

      }


    });

    return ResultsController

  });

