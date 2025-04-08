import PageManagerTemplate from 'js/wraps/orcid_page_manager/orcid-page-layout.html';
import PageManagerController from 'js/page_managers/controller';
import PageManagerView from 'js/page_managers/one_column_view';

var PageManager = PageManagerController.extend({
  createView: function(options) {
    options = options || {};
    options.template = PageManagerTemplate;
    return new PageManagerView({
      template: PageManagerTemplate,
      className: 's-orcid-layout',
      id: 'orcid-page-layout',
    });
  },
});

export default PageManager;
