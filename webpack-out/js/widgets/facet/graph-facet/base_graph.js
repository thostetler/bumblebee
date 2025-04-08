define(['marionette', 'd3', 'jquery', 'jquery-ui', 'hbs!js/widgets/facet/graph-facet/templates/graph'], function (Marionette, d3, $, $ui, FacetGraphTemplate) {
  var ZoomableGraphView = Marionette.ItemView.extend({
    className: 'graph-facet',
    initialize: function initialize(options) {
      this.name = options.name;
      this.yAxisTitle = options.yAxisTitle;
      this.xAxisTitle = options.xAxisTitle;
      this.graphTitle = options.graphTitle;
      this.pastTenseTitle = options.pastTenseTitle;
      this.id = this.graphTitle + '-graph'; // setting some constants for the graph

      this.fullWidth = 110;
      this.fullHeight = 100;
      this.width = this.fullWidth - this.margin.left - this.margin.right;
      this.height = this.fullHeight - this.margin.top - this.margin.bottom; // for citation and reads graph

      this.currentScale = 'linear';
      this.on('facet:active', this.pulseApplyButton);
    },
    bins: 12,
    // will be around 12, depending on remainders
    margin: {
      top: 5,
      right: 5,
      bottom: 20,
      left: 20
    },
    template: FacetGraphTemplate,
    insertLegend: function insertLegend() {
      this.$('.graph-legend').html(this.legendTemplate({
        yAxisTitle: this.yAxisTitle
      }));
    },
    events: {
      'click .apply': 'submitFacet',
      'blur input[type=text]': 'triggerGraphChange'
    },
    modelEvents: {
      change: 'render'
    },
    pulseApplyButton: function pulseApplyButton() {
      this.$('.apply').addClass('draw-attention-primary-faded'); // this initiates an animation that lasts for 6 second

      setTimeout(function () {
        this.$('.apply').removeClass('draw-attention-primary-faded');
      }, 2000);
    },
    addDownloadButton: function addDownloadButton() {
      this.$('.graph-download').html("<button class=\"btn btn-link download s-download s-download-ur\">\n          <i class=\"fa fa-download fa-lg\" aria-hidden=\"true\" title=\"download data in csv\"></i>\n          <span class=\"sr-only\">download data in csv</span>\n        </button>");
    },
    download: function download() {
      var data = this.convertGraphDataToCSV();
      var encodedUri = encodeURI(data);
      var link = document.getElementById("download-link");
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', "".concat(this.name, ".csv"));
      link.click();
    },
    onRender: function onRender() {
      var self = this;
      if (!this.model.get('graphData')) return;

      if (this.model.get('graphData').length < 2) {
        this.$el.html('Too little data to make a useful graph.');
        return;
      }

      this.insertLegend();
      this.buildGraph();
      this.addSliderWindows();
      this.buildSlider();
      this.addDownloadButton();
      if (this.addToOnRender) this.addToOnRender();

      var graphUpdate = _.debounce(_.bind(this.triggerGraphChange, this), 100);

      $('input[type="text"]', this.$el).on('keyup', function (e) {
        graphUpdate();

        if (e && e.which === 13) {
          // make sure graph updates before submitting
          self.triggerGraphChange.call(self, true);
          self.submitFacet.call(self);
        }
      });
    }
  });
  return ZoomableGraphView;
});
