import PageManagerTemplate from 'hbs!js/page_managers/templates/authentication-page-layout';
import PageManagerController from 'js/page_managers/controller';
import PageManagerView from 'js/page_managers/one_column_view';

var PageManager = PageManagerController.extend({
  createView: function(options) {
    options = options || {};
    options.template = options.template || PageManagerTemplate;
    return new PageManagerView({
      template: PageManagerTemplate,
      className: 's-authentication-page-layout s-100-height',
      id: 'user-page-layout',
    });
  },
});
export default PageManager;
