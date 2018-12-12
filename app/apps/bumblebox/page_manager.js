define([
  'page_managers/controller',
  'page_managers/one_column_view',
  'apps/bumblebox/templates/embedded-page.html'
], function (
  PageManagerController,
  PageManagerView,
  PageManagerTemplate) {
  var PageManager = PageManagerController.extend({

    createView: function (options) {
      options = options || {};
      options.template = PageManagerTemplate;
      return new PageManagerView({ template: PageManagerTemplate, className: 's-embedded-layout' });
    }
  });

  return PageManager;
});
