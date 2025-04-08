import PageManagerTemplate from 'js/wraps/error_page_manager/404.html';
import PageManagerController from 'js/page_managers/controller';
import PageManagerView from 'js/page_managers/one_column_view';
import utils from 'utils';

const initialState = {
  error: {
    message: 'Page Not Found',
  },
};

var PageManager = PageManagerController.extend({
  createView: function(options) {
    options = options || {};
    return new PageManagerView({
      template: PageManagerTemplate,
      className: 'error-page-layout s-100-height',
      model: new Backbone.Model(initialState),
      modelEvents: {
        change: 'render',
      },
    });
  },

  setMessage({ xhr, message }) {
    const error = utils.extractErrorMessageFromAjax(xhr);

    if (typeof error === 'string' || typeof message === 'string') {
      this.view.model.set('error', { error, message });
    }
  },
});
export default PageManager;
