define([
  'js/page_managers/controller',
  'js/page_managers/three_column_view',
  'hbs!js/page_managers/templates/results-page-layout',
  'js/components/api_feedback'
], function (
  PageManagerController,
  PageManagerView,
  PageManagerTemplate,
  ApiFeedback
) {
  var PageManager = PageManagerController.extend({

    persistentWidgets: [
      'PubtypeFacet', 'SearchWidget', 'BreadcrumbsWidget', 'Sort',
      'ExportDropdown', 'VisualizationDropdown', 'AffiliationFacet', 'AuthorFacet',
      'DatabaseFacet', 'RefereedFacet', 'KeywordFacet', 'BibstemFacet',
      'BibgroupFacet', 'DataFacet', 'VizierFacet', 'GrantsFacet', 'Results',
      'OrcidBigWidget', 'QueryInfo', 'GraphTabs', 'OrcidSelector'
    ],

    createView: function (options) {
      options = options || {};
      options.template = options.template || PageManagerTemplate;

      this.view = new PageManagerView({
        template: PageManagerTemplate
      });

      var hide = this.getSidebarsValueFromUserData();
      if (hide) {
        this.view.model.set(_.extend({}, options.model, {
          left: 'hide',
          right: 'hide'
        }));
      }
      console.log(this.view);
      var self = this;
      (function check (cnt) {
        if (Object.keys(self.widgets).indexOf('Results') > -1 || cnt >= 100) {
          console.log(self.widgets.Results);
          setTimeout(function () {
            self.widgets.Results.model.set('makeSpace', hide);
            self.widgets.Results.model.trigger('change:makeSpace');
          }, 100);
          // self.getSidebarsValueFromUserData();
          return;
        }
        setTimeout(check, 10, ++cnt);
      })(0);

      return this.view;
    },

    activate: function () {
      PageManagerController.prototype.activate.apply(this, arguments);
      var ps = this.getPubSub();
      ps.subscribe(ps.FEEDBACK, _.bind(this.onFeedback, this));
    },

    getSidebarsValueFromUserData: function () {
      var userData = this.getUserData();
      var ps = this.getPubSub();

      // get the state from user data or take the current value
      var sideBarsState = (_.has(userData, 'defaultHideSidebars') ?
        userData.defaultHideSidebars : 'show').toUpperCase();

      var code = sideBarsState === 'HIDE' ? 'MAKE_SPACE' : 'UNMAKE_SPACE';
      ps.publish(ps.FEEDBACK, new ApiFeedback({
        code: ApiFeedback.CODES[code],
        _hideSideBars: code === 'MAKE_SPACE'
      }));
      return code === 'MAKE_SPACE';
    },

    getUserData: function () {
      try {
        var beehive = _.isFunction(this.getBeeHive) && this.getBeeHive();
        var user = _.isFunction(beehive.getObject) && beehive.getObject('User');
        if (_.isPlainObject(user)) {
          return _.isFunction(user.getUserData) && user.getUserData('USER_DATA');
        }
        return {};
      } catch (e) {
        return {};
      }
    },

    onFeedback: _.debounce(function (feedback) {
      console.log('FEEDBACK --- ', feedback);

      if (feedback.code === ApiFeedback.CODES['MAKE_SPACE']) {
        console.log('MAKE SPACE');
        // this.createView({ left: 'hide', right: 'hide' });
      } else if (feedback.code === ApiFeedback.CODES['UNMAKE_SPACE']) {
        console.log('UNMAKE_SPACE');
        // this.createView({ model: { left: 'show', right: 'show' } });
      }

      PageManagerController.prototype.onFeedback &&
        PageManagerController.prototype.onFeedback.apply(this, arguments);
    }, 300)
  });
  return PageManager;
});
