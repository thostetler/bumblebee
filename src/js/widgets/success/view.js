import SuccessTemplate from 'hbs!js/widgets/success/success_template';
import Marionette from 'marionette';

var SuccessView = Marionette.ItemView.extend({
  initialize: function(options) {
    _.extend(this, options);
  },

  title: 'Success!',
  message: 'Check your email for further instructions.',
  template: SuccessTemplate,

  serializeData: function() {
    return { title: this.title, message: this.message };
  },
});

export default SuccessView;
