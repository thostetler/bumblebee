/**
 * Created by alex on 7/24/14.
 */
define(['marionette', 'backbone', 'js/widgets/base/base_widget', 'js/widgets/loading/loading-template.html', 'bootstrap'], function (Marionette, Backbone, BaseWidget, loadingTemplate) {
  var LoadingModel = Backbone.Model.extend({});
  var LoadingView = Marionette.ItemView.extend({
    initialize: function initialize(options) {
      options = options || {};
      this.model = new LoadingModel();
    },
    template: loadingTemplate,
    showLoad: function showLoad(options) {
      var that = this;
      var options = options || {};
      this.$('.modal').modal('show');

      if (options.autoAnimate) {
        that.changePercentLoaded(100);
        setTimeout(function () {
          that.hideLoad();
        }, 1000);
      }
    },
    changePercentLoaded: function changePercentLoaded(num) {
      this.$('.progress-bar').animate({
        width: num + '%'
      }, 200);
    },
    hideLoad: function hideLoad() {
      this.$('.modal').modal('hide');
    },
    onRender: function onRender() {}
  });
  var LoadingWidget = BaseWidget.extend({
    activate: function activate(beehive) {},
    initialize: function initialize(options) {
      this.view = new LoadingView();
      this.on('all', this.onAll);
    },
    onAll: function onAll(ev, arg1, arg2) {
      if (ev === 'showLoading') {
        this.view.showLoad({
          autoAnimate: true
        });
      } else if (ev === 'hideLoading') {
        this.view.hideLoad();
      }
    }
  });
  return LoadingWidget;
});
