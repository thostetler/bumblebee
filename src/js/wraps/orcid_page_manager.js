import PageManagerTemplate from 'hbs!js/wraps/templates/orcid-page-layout';
import PageManagerController from 'js/page_managers/controller';
import PageManagerView from 'js/page_managers/one_column_view';

var PageManager = PageManagerController.extend({
  createView: function(options) {
    options = options || {};
    options.template = options.template || PageManagerTemplate;
    return new PageManagerView({ template: PageManagerTemplate });
  },

  activate: function(beehive) {
    this.setBeeHive(beehive);
    this.debug = beehive.getDebug(); // XXX:rca - think of st better
    this.view = this.createView({ debug: this.debug, widgets: this.widgets });
  },
});
export default PageManager;
