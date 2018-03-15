define([
  'js/page_managers/controller',
  'js/page_managers/one_column_view',
  'hbs!js/wraps/error_page_manager/404'
], function (
    PageManagerController,
    PageManagerView,
    PageManagerTemplate
) {

  var PageManager = PageManagerController.extend({
    createView: function () {
      return new PageManagerView({
        template: PageManagerTemplate,
        className : 'error-page-layout s-100-height'
      });
    },
  });

  return PageManager;
});
