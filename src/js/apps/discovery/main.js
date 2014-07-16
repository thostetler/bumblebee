
define(["config", 'module'], function(config, module) {

  // Kick off the application
  require(["router", 'js/components/application',
      'js/page_managers/abstract_page_controller', 'js/page_managers/results_page_controller',
      'js/page_managers/landing_page_controller'],
    function(Router, Application, AbstractController, ResultsController, LandingPageController) {

    // load the objects/widgets/modules (as specified inside the main config
    // in the section config.main
    var app = new Application();
    var defer = app.loadModules(module.config());

    // after they are loaded; let's start the application
    defer.done(function() {

      // this will activate all loaded modules
      app.activate();

      // this is the application dynamic config
      var conf = app.getObject('DynamicConfig');

      // the central component
      var beehive = app.getBeeHive();
      var api = beehive.getService('Api');

      if (conf.root) {
        api.url = conf.root + api.url;
        app.root = conf.root;
      }
      if (conf.debug !== undefined) {
        app.getObject('QueryMediator').debug = conf.debug;
      }

      // XXX:rca - this will need to be moved somewhere else (it is getting confusing -- to long)

      // create composite widgets

      var FacetFactory = app.getModule("FacetFactory")

      resultsWidgetDict = {}

      resultsWidgetDict.authorFacets = FacetFactory.makeHierarchicalCheckboxFacet({
        facetField: "author_facet_hier",
        facetTitle: "Authors",
        openByDefault: true,
        logicOptions: {single: ['limit to', 'exclude'], 'multiple': ['and', 'or', 'exclude']},
        responseProcessors: [
          function(v) {var vv = v.split('/'); return vv[vv.length-1]}
        ]
      });

      // XXX:rca - another hack
      resultsWidgetDict.authorFacets.handleLogicalSelection = function(operator) {
        var q = this.getCurrentQuery();
        var paginator = this.findPaginator(q).paginator;
        var conditions = this.queryUpdater.removeTmpEntry(q, 'SelectedItems');

        //XXX:rca - hack ; this logic is triggerd multiple times
        // we need to prevent that

        var self = this;

        if (conditions && _.keys(conditions).length > 0) {


          conditions = _.values(conditions);
          _.each(conditions, function(c, i, l) {
            l[i] = "author:\"" + c.title + "\"";
          });

          q = q.clone();

          var fieldName = 'fq_author';

          if (operator == 'and' || operator == 'limit to') {
            this.queryUpdater.updateQuery(q, fieldName, 'limit', conditions);
          }
          else if (operator == 'or') {
            this.queryUpdater.updateQuery(q, fieldName, 'expand', conditions);
          }
          else if (operator == 'exclude' || operator == 'not') {
            this.queryUpdater.updateQuery(q, fieldName, 'exclude', conditions);
          }

          var fq = '{!type=aqp cache=false cost=150 v=$' + fieldName +'}';
          var fqs = q.get('fq');
          if (!fqs) {
            q.set('fq', [fq]);
          }
          else {
            var i = _.indexOf(fqs, fq);
            if (i == -1) {
              fqs.push(fq);
            }
            q.set('fq', fqs);
          }
          q.unset('facet.prefix');
          q.unset('facet');
          this.dispatchNewQuery(paginator.cleanQuery(q));
        }
      };


      resultsWidgetDict.keywords = FacetFactory.makeBasicCheckboxFacet({
        facetField: "keyword_facet",
        facetTitle: "Keywords",
        openByDefault: false,
        logicOptions: {single: ['limit to', 'exclude'], 'multiple': ['and', 'or', 'exclude']}
      });

      resultsWidgetDict.database = FacetFactory.makeBasicCheckboxFacet({
        facetField: "database",
        facetTitle: "Collections",
        openByDefault: true,
        logicOptions: {single: ['limit to', 'exclude'], 'multiple': ['and', 'or', 'exclude']}

      });
      resultsWidgetDict.data = FacetFactory.makeBasicCheckboxFacet({
        facetField: "data_facet",
        facetTitle: "Data",
        openByDefault: false,
        logicOptions: {single: ['limit to', 'exclude'], 'multiple': ['and', 'or', 'exclude']}

      });

      resultsWidgetDict.vizier = FacetFactory.makeBasicCheckboxFacet({
        facetField: "vizier_facet",
        facetTitle: "Vizier Tables",
        openByDefault: false,
        logicOptions: {single: ['limit to', 'exclude'], 'multiple': ['and', 'or', 'exclude']}

      });

      resultsWidgetDict.pub = FacetFactory.makeBasicCheckboxFacet({
        facetField: "bibstem_facet",
        facetTitle: "Publications",
        openByDefault: false,
        logicOptions: {single: ['limit to', 'exclude'], multiple: ["or", "exclude"]}
      });

      resultsWidgetDict.bibgroup = FacetFactory.makeBasicCheckboxFacet({
        facetField: "bibgroup_facet",
        facetTitle: "Bib Groups",
        openByDefault: false,
        logicOptions: {single: ['limit to', 'exclude'], multiple: ["or", "exclude"]}
      });

      resultsWidgetDict.grants = FacetFactory.makeHierarchicalCheckboxFacet({
        facetField: "grant_facet_hier",
        facetTitle: "Grants",
        openByDefault: false,
        logicOptions: {single: ['limit to', 'exclude'], multiple: ["or", "exclude"]},
        responseProcessors: [
          function(v) {var vv = v.split('/'); return vv[vv.length-1]}
        ]
      });


      resultsWidgetDict.grants.handleLogicalSelection = function(operator) {
        var q = this.getCurrentQuery();
        var paginator = this.findPaginator(q).paginator;
        var conditions = this.queryUpdater.removeTmpEntry(q, 'SelectedItems');

        //XXX:rca - hack ; this logic is triggerd multiple times
        // we need to prevent that

        var self = this;

        if (conditions && _.keys(conditions).length > 0) {


          conditions = _.values(conditions);
          _.each(conditions, function(c, i, l) {
            l[i] = "grant:\"" + c.title + "\"";
          });

          q = q.clone();

          var fieldName = 'fq_grant';

          if (operator == 'and' || operator == 'limit to') {
            this.queryUpdater.updateQuery(q, fieldName, 'limit', conditions);
          }
          else if (operator == 'or') {
            this.queryUpdater.updateQuery(q, fieldName, 'expand', conditions);
          }
          else if (operator == 'exclude' || operator == 'not') {
            this.queryUpdater.updateQuery(q, fieldName, 'exclude', conditions);
          }

          var fq = '{!type=aqp cache=false cost=150 v=$' + fieldName +'}';
          var fqs = q.get('fq');
          if (!fqs) {
            q.set('fq', [fq]);
          }
          else {
            var i = _.indexOf(fqs, fq);
            if (i == -1) {
              fqs.push(fq);
            }
            q.set('fq', fqs);
          }
          q.unset('facet.prefix');
          q.unset('facet');
          this.dispatchNewQuery(paginator.cleanQuery(q));
        }
      };

      resultsWidgetDict.refereed = FacetFactory.makeBasicCheckboxFacet({
        facetField: "property",
        facetTitle: "Refereed Status",
        openByDefault: true,
        defaultQueryArguments: {
          "facet": "true",
          "facet.mincount": "1",
          "fl": "id",
          "facet.query": 'property:refereed'
        },
        // this is optimization, we'll execute only one query (we don't even facet on
        // other values). There is a possibility is is OK (but could also be wrong;
        // need to check)
        extractionProcessors:
          function(apiResponse) {
            var returnList = [];
            if (apiResponse.has('facet_counts.facet_queries')) {
              var queries = apiResponse.get('facet_counts.facet_queries');
              var v, found = 0;
              _.each(_.keys(queries), function(k) {
                v = queries[k];
                if (k.indexOf(':refereed') > -1) {
                  found = v;
                  returnList.push("refereed", v);
                }
              });

              returnList.push('notrefereed', apiResponse.get('response.numFound') - found);
              return returnList;
            }
          },
        logicOptions: {single: ['limit to', 'exclude'], 'multiple': ['invalid choice']}

      });

      resultsWidgetDict.refereed.handleLogicalSelection = function(operator) {
        var q = this.getCurrentQuery();
        var paginator = this.findPaginator(q).paginator;
        var conditions = this.queryUpdater.removeTmpEntry(q, 'SelectedItems');

        //XXX:rca - hack ; this logic is triggerd multiple times
        // we need to prevent that

        var self = this;

        if (conditions && _.keys(conditions).length > 0) {


          conditions = _.values(conditions);
          _.each(conditions, function(c, i, l) {
            l[i] = 'property:' + self.queryUpdater.escapeInclWhitespace(c.value);
          });

          q = q.clone();

          var fieldName = 'fq_' + this.facetField;

          if (operator == 'and' || operator == 'limit to') {
            this.queryUpdater.updateQuery(q, fieldName, 'limit', conditions);
          }
          else if (operator == 'or') {
            this.queryUpdater.updateQuery(q, fieldName, 'expand', conditions);
          }
          else if (operator == 'exclude' || operator == 'not') {
            this.queryUpdater.updateQuery(q, fieldName, 'exclude', conditions);
          }

          var fq = '{!type=aqp v=$' + fieldName +'}';
          var fqs = q.get('fq');
          if (!fqs) {
            q.set('fq', [fq]);
          }
          else {
            var i = _.indexOf(fqs, fq);
            if (i == -1) {
              fqs.push(fq);
            }
            q.set('fq', fqs);
          }

          this.dispatchNewQuery(paginator.cleanQuery(q));
        }
      };

      resultsWidgetDict.authorFacets.activate(beehive.getHardenedInstance());
      resultsWidgetDict.database.activate(beehive.getHardenedInstance());
      resultsWidgetDict.keywords.activate(beehive.getHardenedInstance());
      resultsWidgetDict.pub.activate(beehive.getHardenedInstance());
      resultsWidgetDict.bibgroup.activate(beehive.getHardenedInstance());
      resultsWidgetDict.data.activate(beehive.getHardenedInstance());
      resultsWidgetDict.vizier.activate(beehive.getHardenedInstance());
      resultsWidgetDict.grants.activate(beehive.getHardenedInstance());
      resultsWidgetDict.refereed.activate(beehive.getHardenedInstance());

      resultsWidgetDict.results = app.getWidget('Results')
      resultsWidgetDict.results.activate(beehive.getHardenedInstance());

      resultsWidgetDict.graphTabs = app.getWidget('GraphTabs')

      resultsWidgetDict.searchBar = app.getWidget('SearchBar')

      resultsWidgetDict.queryInfo = app.getWidget('QueryInfo');
      resultsWidgetDict.graphTabs = app.getWidget('GraphTabs');
      resultsWidgetDict.queryDebugInfo = app.getWidget('QueryDebugInfo');



      _.each(resultsWidgetDict.graphTabs.widgets, function(w){
        w.activate(beehive.getHardenedInstance());
      });

      var abstract = app.getWidget('Abstract')
      abstract.activate(beehive.getHardenedInstance())
      var references = app.getWidget('References');
      references.activate(beehive.getHardenedInstance())



      var pageControllers = {};
      var bumblebeeHistory = {history: [],
        getPriorPage : function(){return _.keys(_.last(this.history, 1)[0])[0]},
        getPriorPageVal : function(){return _.values(_.last(this.history, 1)[0])[0]},
        addEntry: function(item){
          if(this.history.length == 0 || _.keys(item)[0]!== _.keys(_.last(this.history)[0])[0]){
            this.history.push(item)
          }
        }};

      //     all sub-views have their own controllers}
     pageControllers.resultsPage = new ResultsController({widgetDict : resultsWidgetDict, history : bumblebeeHistory});


     pageControllers.abstractPage = new AbstractController({widgetDict :
          {abstract : abstract, references :references },
     history : bumblebeeHistory});

     pageControllers.landingPage  = new LandingPageController({widgetDict : {searchBar: resultsWidgetDict.searchBar},
     history: bumblebeeHistory});

      pageControllers.abstractPage.activate(beehive.getHardenedInstance())



      app.router = new Router({pageControllers : pageControllers, history : bumblebeeHistory});
      app.router.activate(beehive.getHardenedInstance());

      // Trigger the initial route and enable HTML5 History API support, set the
      // root folder to '/' by default.  Change in app.js.
      var histOpts = {}
      if (conf.root) {
        histOpts['root'] = conf.root;
      }
      Backbone.history.start(histOpts);


      $(document).on("click", "a[href^='/']",  function(e){
        href = $(e.target).attr('href')

        //Remove leading slashes and hash bangs (backward compatablility)
        url = href.replace(/^\//,'').replace('\#\!\/','')

        //Instruct Backbone to trigger routing events
        app.router.navigate(url, { trigger: true })

        return false

      })

      $(document).on("submit", "form", function(e)
      {
        var action = $(e.target).attr("action")

        //Remove leading slashes and hash bangs (backward compatablility)
        action = action.replace(/^\//,'').replace('\#\!\/','')

        console.log(action+ $(this).serialize())

        //Instruct Backbone to trigger routing events
        app.router.navigate(action+ $(this).serialize(), { trigger: true })

        return false

      })




    });


  });
});
