import TOCTemplate from 'js/wraps/home_page_manager/home-nav.html';
import PageManagerTemplate from 'js/wraps/home_page_manager/home-page-layout.html';
import PageManagerView from 'js/page_managers/three_column_view';
import PageManagerController from 'js/page_managers/toc_controller';

var PageManager = PageManagerController.extend({
  TOCTemplate: TOCTemplate,

  createView: function(options) {
    options = options || {};
    options.template = options.template || PageManagerTemplate;
    return new PageManagerView({
      template: PageManagerTemplate,
      className: 's-home-layout s-100-height',
      id: 'home-layout',
    });
  },

  navConfig: [],
});
export default PageManager;
