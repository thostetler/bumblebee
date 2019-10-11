define([
  'js/widgets/base/base_widget',
  'js/components/api_query',
  'js/components/api_feedback',
  'hbs!js/widgets/paper_search_form/form',
  './topterms',
  'jquery-ui'
], function (
  BaseWidget,
  ApiQuery,
  ApiFeedback,
  FormTemplate,
  AutocompleteData,
  JQueryUI
) {
  var FormModel = Backbone.Model.extend({

    defaults: function () {
      return {};
    }

  });


  var FormView = Marionette.ItemView.extend({

    template: FormTemplate,

    className: 'paper-search-form',

    events: {
      'keyup .paper-form input': 'checkPaperFormDisabled',
      'enter .paper-form input': 'submitPaperForm',
      'click .paper-form button[type=submit]': 'submitPaperForm',
      'click .paper-form button[type=reset]': 'clearPaperForm',

      'keyup .bibcode-form textarea': 'checkBibcodeFormDisabled',
      'enter .bibcode-form textarea': 'submitBibcodeForm',
      'click .bibcode-form button[type=submit]': 'submitBibcodeForm',
      'click .bibcode-form button[type=reset]': 'clearBibcodeForm'
    },

    onRender: function (e) {
      var $inputs = this.$('.paper-form input:not(#pub-input)', this.$el);
      $inputs.keyup(function (e) {
        if (e.keyCode === 13) {
          $(this).trigger('enter');
        }
      });
      this.$('#pub-input').autocomplete({
        minLength: 1,
        autoFocus: true,
        source: function (request, response) {
          var matches = $.map(AutocompleteData, function (item) {
            if (_.isString(request.term)) {
              var term = request.term.toUpperCase();
              var bibstem = item.value.toUpperCase();
              var label = item.label.toUpperCase();
              if (
                bibstem.indexOf(term) === 0
                || label.indexOf(term) === 0
                || label.replace(/^THE\s/, '').indexOf(term) === 0
              ) {
                return item;
              }
            }
          });
          return response(matches);
        }
      }).data('ui-autocomplete')._renderItem = function (ul, item) {
        var re = new RegExp('(' + this.term + ')', 'i');
        var label = item.label.replace(re,
          '<span class="ui-state-highlight">$1</span>'
        );
        var $li = $('<li/>').appendTo(ul);
        $('<a/>').html(label).appendTo($li);
        return $li;
      };
    },

    clearPaperForm: function () {
      this.$('.paper-form input').val('').first().focus();
      return false;
    },

    clearBibcodeForm: function () {
      this.$('.bibcode-form textarea').val('').focus();
      return false;
    },

    checkPaperFormDisabled: function () {
      // require at least 1 character to be in at least 1 input field
      var fields = this.$('input:not(.parse-reference)').map(function () {
        return $(this).val();
      }).get();

      if (fields.join('').match(/\w+/)) {
        this.$('.paper-form button[type=submit]').prop('disabled', false);
      } else {
        this.$('.paper-form button[type=submit]').prop('disabled', true);
      }
    },

    checkBibcodeFormDisabled: function () {
      if (this.$('.bibcode-form textarea').val().match(/\w+/)) {
        this.$('.bibcode-form button[type=submit]').prop('disabled', false);
      } else {
        this.$('.bibcode-form button[type=submit]').prop('disabled', true);
      }
    },

    submitPaperForm: function (e) {
      this.$('.paper-form button[type=submit]').html('<i class="icon-loading"/>  Loading...');

      var terms = this.$('.paper-form input:not(.parse-reference)').map(function () {
        var $t = $(this);
        $t.val() ? toReturn = $t.data('term') + ':' + $t.val() : toReturn = undefined;
        return toReturn;
      }).get();

      terms = _.filter(terms, function (t) { if (t) { return t; } });

      if (_.isEmpty(terms)) {
        this.$('.paper-form button[type=submit]').html('<i class="fa fa-search"></i> Search');
        this.checkPaperFormDisabled();
        return false;
      }

      this.trigger('submit', terms.join(' '));
      return false;
    },

    submitBibcodeForm: function (e) {
      this.$('.bibcode-form button[type=submit]').html('<i class="icon-loading"/>  Loading...');
      var terms = this.$('.bibcode-form textarea').val().split(/\s+/);
      terms = _.filter(terms, function (t) { if (t) { return t; } });

      if (_.isEmpty(terms)) {
        this.$('.bibcode-form button[type=submit]').html('<i class="fa fa-search"></i> Search');
        this.checkBibcodeFormDisabled();
        return false;
      }

      this.trigger('submit-bigquery', terms);
      return false;
    }
  });

  FormWidget = BaseWidget.extend({

    initialize: function (options) {
      options = options || {};
      this.model = new FormModel();
      this.view = new FormView({ model: this.model });
      this.listenTo(this.view, 'submit', this.submitForm);
      this.listenTo(this.view, 'submit-bigquery', this.submitBigQuery);
    },

    activate: function (beehive) {
      this.setBeeHive(beehive);
      var ps = this.getPubSub();
      var self = this;
      ps.subscribe(ps.CUSTOM_EVENT, function (ev) {
        if (ev === 'start-new-search') {
          self.onNewSearch();
        }
      });
    },

    onNewSearch: function () {
      this.model.set(this.model.defaults());
      this.view.$('input,textarea').val('');
    },

    submitForm: function (query) {
      var newQuery = new ApiQuery({
        q: query,
        sort: ['date desc']
      });

      var ps = this.getPubSub();
      ps.publish(ps.NAVIGATE, 'search-page', {
        q: newQuery,
        context: {
          referrer: 'PaperSearchForm'
        }
      });
    },

    submitBigQuery: function (bibcodes) {
      var newQuery = new ApiQuery({
        __bigquery: bibcodes,
        sort: ['date desc']
      });

      var ps = this.getPubSub();
      ps.publish(ps.NAVIGATE, 'search-page', {
        q: newQuery,
        context: {
          referrer: 'PaperSearchForm'
        }
      });
    },

    /**
     * quick loop that waits for the element to be actually visible before
     * setting the focus
     * @param {string} selector
     */
    setFocus: function (selector) {
      var $_ = _.bind(this.view.$, this.view);
      (function check(c) {
        var $el = $_(selector);
        if ($el.is(':visible') || c <= 0) return $el.focus();
        setTimeout(check, 100, --c);
      })(10);
    },

    onShow: function () {
      this.view.render();
      this.setFocus('input#pub-input');
    }

  });

  return FormWidget;
});
