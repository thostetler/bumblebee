define(['marionette', 'js/widgets/base/base_widget'], function (Marionette) {
  var OneColumnView = Marionette.ItemView.extend({
    initialize: function initialize(options) {
      var options = options || {};
      this.widgets = options.widgets;
    },
    onRender: function onRender() {
      var self = this; // var widgets = this.getWidgetsFromTemplate(this.$el,
      //  !Marionette.getOption(this, "debug"));
      // _.extend(this.widgets, widgets);
    }
  });
  return OneColumnView;
});
