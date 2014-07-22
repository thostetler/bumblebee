

//knows about the central region manager (passed it on instantiation) and can manipulate it (also it can add sub regions)

//listens to any events that request the abstract page or a sub part of it and displays the necessary views

//provides an api that can be used by the router



define(["marionette", "hbs!./templates/abstract-page-layout",
    'js/widgets/base/paginated_base_widget', 'hbs!./templates/abstract-title',
    'js/components/api_query', 'hbs!./templates/abstract-nav'],
  function(Marionette, threeColumnTemplate, PaginatedBaseWidget,
    abstractTitleTemplate, ApiQuery, abstractNavTemplate){


    var AbstractTitleView = Backbone.View.extend({

      template : abstractTitleTemplate,

      render : function(bibcode, data, queryDocs){

        var queryDocVals;

        var title = data["title"];

        var prevBib = undefined,
          nextBib= undefined;

        if (queryDocs){

          queryDocVals = _.values(queryDocs);
          prevBib = _.where(queryDocVals, {order : data["order"] - 1})
          nextBib = _.where(queryDocVals, {order : data["order"] + 1})
          prevBib = prevBib.length === 1 ? prevBib[0]["bibcode"] : undefined
          nextBib = nextBib.length === 1 ? nextBib[0]["bibcode"] : undefined

        }

        this.$el.html(this.template({description: "Abstract for:" , title: title, prev: prevBib, next : nextBib}))

        return this

      },

      events : {"click .abstract-paginator-next" : "checkLoadMore"},

      checkLoadMore : function(){
       this.trigger("nextEvent")
      }

    })


    var API = {

      insertTemplate : function(){

        $("#body-template-container").children().detach()

        $("#body-template-container").append(threeColumnTemplate())

      },

      loadWidgetData : function(){
        var that = this;

        _.each(this.abstractSubViews, function(v, k){

          if(k === "abstract"){

            v.widget.loadBibcodeData(this._bibcode);
            this.activateNavButton(k)

          }
          else {
            var promise= v.widget.loadBibcodeData(this._bibcode);

              promise.done(function () {
                if (v.widget.collection.length >=1) {
                  that.activateNavButton(k, v.showNumFound, v.widget.collection.length)
                  console.log("activating", k)
                }
                else {
                  console.log("deactivating", k)
                  that.deactivateNavButton(k)
                }

              })
          }

        }, this)

      },

      activateNavButton : function(k, showNumFound, colLength){

        var $navButton = $("#"+k);

        if (showNumFound){
          $navButton.removeClass("s-abstract-nav-inactive")
            .find(".num-items").text("("+colLength +")")
        }
        else {
          $navButton.parent().off(this, this.deactivateLink)
          $navButton.removeClass("s-abstract-nav-inactive")
        }

      },

      deactivateLink : function(){
      return false
    },


      deactivateNavButton : function(k){
        console.log("deactivating!", k)

        var $navButton = $("#"+k);

        $navButton.addClass("s-abstract-nav-inactive")

        $navButton.parent().on("click", this.deactivateLink)

      },


      displayAbstractNav: function(){

        var $leftCol = $("#s-left-col-container")

        $leftCol.append(abstractNavTemplate({bibcode : this._bibcode}))

      },

      showTitle : function(){
        var $titleRow = $("#abstract-title-container");

        $titleRow.append(this.view.el)

      },

      showAbstractSubView: function(viewName) {

        if (!viewName){
          console.warn("viewname undefined")
          return
        }

        var $middleCol = $("#s-middle-col-container");

        $middleCol.children().detach();

        //removing highlight for another view nav
        $(".abstract-nav").removeClass("s-abstract-nav-active")

        var widget = this.abstractSubViews[viewName]["widget"];



        $middleCol.append(widget.render().el);

        //also amending the title
        $(".abstract-title-info-row").text(this.abstractSubViews[viewName]["descriptor"])

        //also highlighting the relevant nav

        $("#"+viewName).addClass("s-abstract-nav-active")

      },

      displayRightColumn : function(){
        var $rightCol = $("#s-right-col-container")

      },

      displayTopRow : function(){
        var $searchBar = $("#search-bar-row");

        var currentSearchVal = this.history.getCurrentSearchVal()

        $searchBar.append(this.widgetDict.searchBar.render().el)
        if (this.history.getPriorPage() === "resultsPage" ||this.history.getPriorPage() === "abstractPage" ){
          $(".opt-nav-button").append("<a href=" + "../../search/?" + currentSearchVal
            + " class=\"btn btn-sm \"> <i class=\"glyphicon glyphicon-arrow-left\"></i> back to results</a>")
        }

      }

    };


    var AbstractController = PaginatedBaseWidget.extend({

      activate: function (beehive) {

        this.pubsub = beehive.Services.get('PubSub');

        _.bindAll(this, ['onNewQuery', 'dispatchRequest', 'processResponse']);
        this.pubsub.subscribe(this.pubsub.NEW_QUERY, this.onNewQuery);

        //custom dispatchRequest function goes here
        this.pubsub.subscribe(this.pubsub.INVITING_REQUEST, this.dispatchRequest);

        //custom handleResponse function goes here
        this.pubsub.subscribe(this.pubsub.DELIVERING_RESPONSE, this.processResponse);
      },

      initialize : function(options){

        options = options || {};

        this.view = new AbstractTitleView();

        //this widget has two main variables, listed below:

        //refilled only on "new_query"
        this._current_query_docs = {};

        //represents the current bibcode (always only 1)
        this._bibcode = undefined;

        this.widgetDict = options.widgetDict

        _.extend(this, API);

        this.history = options.history;

        _.bindAll(this, "processResponse")


//      to be explicit, transferring only those widgets considered "sub views" to this dict
        this.abstractSubViews = {
          //the keys are also the sub-routes
          "abstract": {widget: this.widgetDict.abstract, title:"Abstract", descriptor: "Abstract for:"},
          "references": {widget: this.widgetDict.references, title:"References", descriptor: "References in:", showNumFound : true},
          "citations": {widget: this.widgetDict.citations, title: "Citations", descriptor: "Papers that cite:", showNumFound : true},
          "coreads" : {widget: this.widgetDict.coreads, title: "Co-Reads", descriptor: "Other papers read by those who read:"},
          "tableofcontents" : {widget: this.widgetDict.tableOfContents, title: "Table of Contents", descriptor: "Table of Contents for:", showNumFound : true},
          "similar": {widget : this.widgetDict.similar, title : "Similar Papers", descriptor : "Papers with similar characteristics to:"}
        };

        this.listenTo(this.view, "all", this.onAllInternalEvents)

        PaginatedBaseWidget.prototype.initialize.apply(this, arguments);

      },

      onAllInternalEvents : function(ev, arg1, arg2){

        if (ev.indexOf("nextEvent")!== -1){
          this.checkLoadMore()
          console.log("current number of docs: ", _.keys(this._current_query_docs).length)
        }

      },

      checkLoadMore : function(){
        console.log("checkLoadmore!!!")

        //first, find position of current bib in this._docs
        var bibList = _.keys(this._current_query_docs);
        var ind = bibList.indexOf(this._bibcode);

        //fetch more if there are 4 or fewer records remaining
        if (bibList.length - ind <= 4 ){
          this.dispatchRequest(this.getCurrentQuery())

        }

      },

      onNewQuery: function () {

        this.resetWidget();
      },

      defaultQueryArguments: {
        fl: 'title,bibcode'
      },

      renderNewBibcode: function (bibcode, data) {
        //first, check if we have the info in current query docs
        if (this._current_query_docs[bibcode]) {

          this.view.render(bibcode, this._current_query_docs[bibcode], this._current_query_docs);

        }
        else if (data){
          this.view.render(bibcode, data);
        }
        else {
          //we dont have the bibcode
          //processResponse will re-call this function, but with the data parameter
          this.dispatchRequest(new ApiQuery({'q': 'bibcode:' + bibcode, '__show': this._bibcode}));
        }
      },

      resetWidget : function(){
        this.paginator.reset();
        this._current_query_docs = {};

      },

      processResponse: function (apiResponse) {

        var r = apiResponse.toJSON();

        //it's an individual bibcode, just render it
        if (apiResponse.has('responseHeader.params.__show')) {
          //make the dict of associated data
          var data = r.response.docs[0]
          if (!data){
            throw new Error("did not recieve bibcode data")
          }
          var data = {title: data.title, bibcode : data.bibcode}
          this.renderNewBibcode(this._bibcode, data);
        }
        else {
          //it's from "inviting_request"
          var q = apiResponse.getApiQuery();
          this.setCurrentQuery(q);

          if (r.response && r.response.docs) {

            var counter = _.size(this._current_query_docs);

            _.each(r.response.docs, function (doc) {
              counter++
              this._current_query_docs[doc.bibcode] = {title: doc.title, bibcode : doc.bibcode, order: counter}

            }, this);
          }
        }
      },

      //   called by the router

      showPage : function(bib, subPage, fromWithinPage){

        if (fromWithinPage){
          //just need to switch out the subPage
          this.showAbstractSubView(subPage)

        }
        else {
          this._bibcode = bib;

          this.renderNewBibcode(bib);

          this.insertTemplate();
          this.showTitle();
          this.displayAbstractNav();
          this.displayRightColumn();
          this.displayTopRow();

          //this calls "displayNav" upon individual widget completion
          this.loadWidgetData();

          this.showAbstractSubView("abstract");

        }

      }

    })

    return AbstractController


  })