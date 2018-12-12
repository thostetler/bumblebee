define(['backbone', 'marionette',
  'components/api_query', 'components/api_request', 'widgets/base/base_widget'
], function (
  Backbone, Marionette, ApiQuery, ApiRequest, BaseWidget) {
  var Factory = {
    createSimpleWidget: function (view, coll) {
      var t = new BaseWidget();
      t.view = view;
      t.collection = coll;
      return t;
    },

    createSW: function (view, coll) {
      // check arguments
      var T = BaseWidget.extend({
        initialize: function (options) {
          this.view = options.view;
        }
      });
      return new T(view, coll);
    }
  };

  return Factory;
}
);
