define(['js/page_managers/controller', 'js/page_managers/one_column_view', 'hbs!js/wraps/error_page_manager/404', 'utils'], function (PageManagerController, PageManagerView, PageManagerTemplate, utils) {
  var initialState = {
    error: {
      message: 'Page Not Found'
    }
  };
  var PageManager = PageManagerController.extend({
    createView: function createView(options) {
      options = options || {};
      return new PageManagerView({
        template: PageManagerTemplate,
        className: 'error-page-layout s-100-height',
        model: new Backbone.Model(initialState),
        modelEvents: {
          change: 'render'
        }
      });
    },
    setMessage: function setMessage(_ref) {
      var xhr = _ref.xhr,
          message = _ref.message;
      var error = utils.extractErrorMessageFromAjax(xhr);

      if (typeof error === 'string' || typeof message === 'string') {
        this.view.model.set('error', {
          error: error,
          message: message
        });
      }
    }
  });
  return PageManager;
});
