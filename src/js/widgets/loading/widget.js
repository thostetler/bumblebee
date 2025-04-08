/**
 * Created by alex on 7/24/14.
 */

import Backbone from 'backbone';
import loadingTemplate from 'hbs!js/widgets/loading/loading-template';
import BaseWidget from 'js/widgets/base/base_widget';
import Marionette from 'marionette';
import 'bootstrap';

var LoadingModel = Backbone.Model.extend({});

var LoadingView = Marionette.ItemView.extend({
  initialize: function(options) {
    options = options || {};

    this.model = new LoadingModel();
  },

  template: loadingTemplate,

  showLoad: function(options) {
    var that = this;
    var options = options || {};

    this.$('.modal').modal('show');
    if (options.autoAnimate) {
      that.changePercentLoaded(100);

      setTimeout(function() {
        that.hideLoad();
      }, 1000);
    }
  },

  changePercentLoaded: function(num) {
    this.$('.progress-bar').animate({ width: num + '%' }, 200);
  },

  hideLoad: function() {
    this.$('.modal').modal('hide');
  },

  onRender: function() {},
});

var LoadingWidget = BaseWidget.extend({
  activate: function(beehive) {},

  initialize: function(options) {
    this.view = new LoadingView();

    this.on('all', this.onAll);
  },

  onAll: function(ev, arg1, arg2) {
    if (ev === 'showLoading') {
      this.view.showLoad({ autoAnimate: true });
    } else if (ev === 'hideLoading') {
      this.view.hideLoad();
    }
  },
});

export default LoadingWidget;
