//set validation callbacks used by authentication and user settings widgets
require(['backbone-validation'], function() {

  //this allows for instant validation of form fields using the backbone-validation plugin
  _.extend(Backbone.Validation.callbacks, {
    valid: function(view, attr, selector) {
      var $el = view.$('input[name=' + attr + ']');

      $el.closest('.form-group')
      .removeClass('has-error')
      .find('.help-block')
      .html('')
      .addClass('no-show');

    },
    invalid: function(view, attr, error, selector) {
      var $el = view.$('[name=' + attr + ']');
      $group = $el.closest('.form-group');

      if (view.submit === true) {
        //only show error states if there has been a submit event
        $group.addClass('has-error');
        $group.find('.help-block').html(error).removeClass('no-show');
      }
    }
  });
});
