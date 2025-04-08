import PageManagerTemplate from 'hbs!js/apps/bumblebox/templates/embedded-page';
import PageManagerController from 'js/page_managers/controller';
import PageManagerView from 'js/page_managers/one_column_view';

var PageManager = PageManagerController.extend({
  createView: function(options) {
    options = options || {};
    options.template = PageManagerTemplate;
    return new PageManagerView({
      template: PageManagerTemplate,
      className: 's-embedded-layout',
    });
  },
});

export default PageManager;
