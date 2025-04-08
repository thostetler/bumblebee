define(['marionette', 'js/widgets/success/success_template.html'], function (Marionette, SuccessTemplate) {
  var SuccessView = Marionette.ItemView.extend({
    initialize: function initialize(options) {
      _.extend(this, options);
    },
    title: 'Success!',
    message: 'Check your email for further instructions.',
    template: SuccessTemplate,
    serializeData: function serializeData() {
      return {
        title: this.title,
        message: this.message
      };
    }
  });
  return SuccessView;
});
