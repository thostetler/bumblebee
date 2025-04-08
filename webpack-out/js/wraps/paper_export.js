define(['js/widgets/export/widget.jsx', 'js/components/api_query', 'js/components/json_response'], function (ExportWidget, ApiQuery, JsonResponse) {
  var Widget = ExportWidget.extend({
    initialize: function initialize(options) {
      // other widgets can send us data through page manager
      this.on('page-manager-message', function (event, data) {
        if (event === 'broadcast-payload') {
          this.ingestBroadcastedPayload(data);
        }
      });
      ExportWidget.prototype.initialize.call(this, options);
    },
    activate: function activate(beehive) {
      this.setBeeHive(beehive);

      _.bindAll(this, 'setCurrentQuery', 'processResponse');

      var pubsub = this.getPubSub();
      pubsub.subscribe(pubsub.DELIVERING_RESPONSE, this.processResponse);
      ExportWidget.prototype.activate.call(this, beehive);
    },
    ingestBroadcastedPayload: function ingestBroadcastedPayload(bibcode) {
      if (bibcode) {
        this.bibcode = bibcode;
      }
    },
    setSubView: function setSubView(format) {
      if (this.bibcode && format) {
        this.renderWidgetForListOfBibcodes([this.bibcode], {
          format: format
        });
      }
    }
  });
  return Widget;
});
