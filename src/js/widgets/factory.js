import Backbone from 'backbone';
import Marionette from 'marionette';
import ApiQuery from 'js/components/api_query';
import ApiRequest from 'js/components/api_request';
import BaseWidget from 'js/widgets/base/base_widget';
  var Factory = {
    createSimpleWidget: function(view, coll) {
      var t = new BaseWidget();
      t.view = view;
      t.collection = coll;
      return t;
    },

    createSW: function(view, coll) {
      // check arguments
      var T = BaseWidget.extend({
        initialize: function(options) {
          this.view = options.view;
        },
      });
      return new T(view, coll);
    },
  };

  export default Factory;

