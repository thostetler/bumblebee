define([
  'page_managers/toc_controller',
  'page_managers/toc_widget',
  'page_managers/three_column_view',
  'wraps/libraries_page_manager/libraries-page-layout.html',
  'wraps/libraries_page_manager/libraries-nav.html'
], function (
  TOCController,
  TOCView,
  PageManagerView,
  PageManagerTemplate,
  TOCTemplate
) {
  var PageManager = TOCController.extend({

    TOCTemplate: TOCTemplate,

    TOCEvents: {

      'click button.create-library': function () {
        function createLib() {
          var that = this;
          this.getBeeHive().getObject('LibraryController')
            .createLibrary()
            .done(function (data) {
              that.getPubSub().publish(that.getPubSub().NAVIGATE, 'IndividualLibraryWidget', { sub: 'library', id: data.id });
            });
        }
        this.trigger('page-manager-event', 'apply-function', { func: createLib });
      }

    },

    createView: function (options) {
      options = options || {};
      options.template = options.template || PageManagerTemplate;

      return new PageManagerView({
        template: PageManagerTemplate,
        className: 's-libraries-layout s-100-height',
        id: 'libraries-layout'
      });
    },

    navConfig: []

  });
  return PageManager;
});
