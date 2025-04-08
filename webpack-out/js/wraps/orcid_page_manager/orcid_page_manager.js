define(['js/page_managers/controller', 'js/page_managers/one_column_view', 'js/wraps/orcid_page_manager/orcid-page-layout.html'], function (PageManagerController, PageManagerView, PageManagerTemplate) {
  var PageManager = PageManagerController.extend({
    createView: function createView(options) {
      options = options || {};
      options.template = PageManagerTemplate;
      return new PageManagerView({
        template: PageManagerTemplate,
        className: 's-orcid-layout',
        id: 'orcid-page-layout'
      });
    }
  });
  return PageManager;
});
