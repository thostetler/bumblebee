import PageManagerTemplate from 'js/wraps/orcid-instructions-page-manager/orcid-instructions.html';
import PageManagerController from 'js/page_managers/controller';
import PageManagerView from 'js/page_managers/one_column_view';

var PageManager = PageManagerController.extend({
  createView: function(options) {
    options = options || {};
    options.template = PageManagerTemplate;
    return new PageManagerView({
      template: PageManagerTemplate,
      className: 'orcid-info',
    });
  },
});

export default PageManager;
