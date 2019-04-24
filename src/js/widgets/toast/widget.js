define([
  'js/widgets/base/base_widget',
  'toastr'
], function (BaseWidget, toastr) {

  const widget = BaseWidget.extend({
    activate: function () {
      BaseWidget.prototype.activate.apply(this, arguments);
      const ps = this.getPubSub();
      ps.subscribe(ps.ALERT, this.onAlert.bind(this));
    },

    onAlert: function () {
      console.log('alert', arguments);
      console.log(toastr);
    }
  });

  return widget;
});
