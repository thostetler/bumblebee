import Marionette from 'marionette';
import 'js/widgets/base/base_widget';

var OneColumnView = Marionette.ItemView.extend({
  initialize: function(options) {
    var options = options || {};
    this.widgets = options.widgets;
  },

  onRender: function() {
    var self = this;
    // var widgets = this.getWidgetsFromTemplate(this.$el,
    //  !Marionette.getOption(this, "debug"));
    // _.extend(this.widgets, widgets);
  },
});
export default OneColumnView;
