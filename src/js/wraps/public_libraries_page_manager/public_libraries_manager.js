import PageManagerTemplate from 'js/wraps/public_libraries_page_manager/public-libraries-page-layout.html';
import PageManagerController from 'js/page_managers/controller';
import PageManagerView from 'js/page_managers/one_column_view';

var PageManager = PageManagerController.extend({
  createView: function(options) {
    options = options || {};
    options.template = PageManagerTemplate;
    return new PageManagerView({
      template: PageManagerTemplate,
      className: 's-public-libraries-layout s-libraries-layout',
      id: 'landing-page-layout',
    });
  },
});

export default PageManager;
