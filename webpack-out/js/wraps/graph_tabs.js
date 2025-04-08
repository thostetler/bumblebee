function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define(['js/widgets/tabs/tabs_widget', 'js/widgets/facet/factory', 'js/widgets/facet/graph-facet/year_graph', 'js/widgets/facet/graph-facet/h_index_graph', 'js/mixins/formatter', 'analytics'], function (TabsWidget, FacetFactory, YearGraphView, HIndexGraph, FormatMixin, analytics) {
  return function () {
    var yearGraphWidget = FacetFactory.makeGraphFacet({
      graphView: YearGraphView,
      facetField: 'year',
      defaultQueryArguments: {
        'facet.pivot': 'property,year',
        facet: 'true',
        'facet.minCount': '1',
        'facet.limit': '2000'
      },
      graphViewOptions: {
        yAxisTitle: 'article count',
        xAxisTitle: 'years',
        name: 'Years'
      },
      processResponse: function processResponse(apiResponse) {
        var _this = this;

        this.setCurrentQuery(apiResponse.getApiQuery());

        var noData = function noData() {
          _this.model.set({
            graphData: []
          }); // update widget state


          _this.updateState(_this.STATES.IDLE);
        }; // check if we have enough data


        if (apiResponse.get('response.numFound') <= 1) {
          return noData();
        }

        var facetData = apiResponse.get('facet_counts.facet_pivot.property,year');
        var yearMap = new Map(); // grab only the 2 property types we want (refereed and non-refereed)

        facetData.forEach(function (_ref) {
          var value = _ref.value,
              pivot = _ref.pivot;

          if (['refereed', 'notrefereed'].includes(value)) {
            // loop through each pivot and add the years to our map
            pivot.forEach(function (_ref2) {
              var yearString = _ref2.value,
                  _ref2$count = _ref2.count,
                  count = _ref2$count === void 0 ? 0 : _ref2$count;
              var year = parseInt(yearString, 10);
              yearMap.set(year, _objectSpread({
                refereed: 0,
                notrefereed: 0
              }, yearMap.get(year), _defineProperty({}, value, count)));
            });
          }
        }); // get the year range (min and max) so we can fill in gaps

        var years = Array.from(yearMap.keys());
        var min = Math.min.apply(Math, _toConsumableArray(years));
        var max = Math.max.apply(Math, _toConsumableArray(years)); // fill in all the years between min and max that don't have values

        var finalData = Array.from({
          length: max - min + 1
        }, function (_v, i) {
          return min + i;
        }).map(function (year) {
          // if the year exists, then grab it, otherwise fill with an empty (x,y)
          if (yearMap.has(year)) {
            var _yearMap$get = yearMap.get(year),
                refereed = _yearMap$get.refereed,
                notrefereed = _yearMap$get.notrefereed;

            return {
              x: year,
              y: refereed + notrefereed,
              refCount: refereed
            };
          }

          return {
            x: year,
            y: 0,
            refCount: 0
          };
        });

        if (finalData.length <= 1) {
          return noData();
        }

        this.model.set({
          graphData: finalData
        }); // update widget state

        this.updateState(this.STATES.IDLE);
      }
    });
    var citationGraphWidget = FacetFactory.makeGraphFacet({
      graphView: HIndexGraph,
      facetField: 'citation_count',
      defaultQueryArguments: {
        'json.facet': "{\"citation_count\":{\"type\":\"terms\",\"field\":\"citation_count\",\"sort\":{\"index\":\"desc\"},\"limit\":2000}}",
        stats: 'true',
        'stats.field': 'citation_count'
      },
      graphViewOptions: {
        yAxisTitle: 'citations',
        xAxisTitle: 'number of records',
        pastTenseTitle: 'cited',
        name: 'Citations'
      },
      processResponse: function processResponse(apiResponse) {
        var _this2 = this;

        this.setCurrentQuery(apiResponse.getApiQuery());

        var noData = function noData() {
          _this2.model.set({
            graphData: []
          }); // update widget state


          _this2.updateState(_this2.STATES.IDLE);
        }; // check if we have enough data


        if (apiResponse.get('response.numFound') <= 1) {
          return noData();
        }

        var counts = apiResponse.get('facets.citation_count.buckets');
        var maxDataPoints = 2000; // map counts into coordinates for graph

        var finalData = [];
        var xCounter = 0;
        var yCounter = 0;
        counts.some(function (item) {
          xCounter += item.count; // one dot per paper (this way we'll only plot the top ranked X - fraction of results)

          while (xCounter > finalData.length && finalData.length < maxDataPoints) {
            yCounter += item.val;
            finalData.push({
              y: item.val,
              x: finalData.length + 1
            });
          }

          if (finalData.length > maxDataPoints) {
            return true;
          }

          return false;
        });
        var statsCount = apiResponse.toJSON().stats ? FormatMixin.formatNum(apiResponse.get('stats.stats_fields.citation_count.sum')) : 0;

        if (finalData.length <= 1) {
          return noData();
        }

        this.model.set({
          section: 'citations',
          graphData: finalData,
          statsCount: statsCount.toLocaleString(),
          totalCount: finalData.length.toLocaleString(),
          subTotal: yCounter.toLocaleString(),
          showTotalMessage: finalData.length === maxDataPoints
        });
      }
    });
    var readsGraphWidget = FacetFactory.makeGraphFacet({
      graphView: HIndexGraph,
      facetField: 'read_count',
      defaultQueryArguments: {
        'json.facet': "{\"read_count\":{\"type\":\"terms\",\"field\":\"read_count\",\"sort\":{\"index\":\"desc\"},\"limit\":2000}}",
        stats: 'true',
        'stats.field': 'read_count'
      },
      graphViewOptions: {
        yAxisTitle: 'recent reads',
        xAxisTitle: 'number of records',
        pastTenseTitle: 'read',
        name: 'Reads'
      },
      processResponse: function processResponse(apiResponse) {
        var _this3 = this;

        this.setCurrentQuery(apiResponse.getApiQuery());

        var noData = function noData() {
          _this3.model.set({
            graphData: []
          }); // update widget state


          _this3.updateState(_this3.STATES.IDLE);
        }; // check if we have enough data


        if (apiResponse.get('response.numFound') <= 1) {
          return noData();
        }

        var counts = apiResponse.get('facets.read_count.buckets');
        var maxDataPoints = 2000; // map counts into coordinates for graph

        var finalData = [];
        var yCounter = 0;
        var xCounter = 0;
        counts.some(function (item) {
          xCounter += item.count; // one dot per paper (this way we'll only plot the top ranked X - fraction of results)

          while (xCounter > finalData.length && finalData.length < maxDataPoints) {
            yCounter += item.val;
            finalData.push({
              y: item.val,
              x: finalData.length + 1
            });
          }

          if (finalData.length > maxDataPoints) {
            return true;
          }

          return false;
        });
        var statsCount = apiResponse.toJSON().stats ? FormatMixin.formatNum(apiResponse.get('stats.stats_fields.read_count.sum')) : 0;

        if (finalData.length <= 1) {
          return noData();
        }

        this.model.set({
          section: 'reads',
          graphData: finalData,
          statsCount: statsCount.toLocaleString(),
          totalCount: finalData.length.toLocaleString(),
          subTotal: yCounter.toLocaleString(),
          showTotalMessage: finalData.length === maxDataPoints
        });
      }
    });
    var tab = new TabsWidget({
      tabs: [{
        title: 'Years',
        widget: yearGraphWidget,
        id: 'year-facet',
        default: true
      }, {
        title: 'Citations',
        widget: citationGraphWidget,
        id: 'citations-facet',
        onActive: function onActive() {
          analytics('send', 'event', 'interaction', 'graph-tab-active', 'Citations');
        }
      }, {
        title: 'Reads',
        widget: readsGraphWidget,
        id: 'reads-facet',
        onActive: function onActive() {
          analytics('send', 'event', 'interaction', 'graph-tab-active', 'Reads');
        }
      }]
    }); // for tests

    tab.yearGraphWidget = yearGraphWidget;
    tab.citationGraphWidget = citationGraphWidget;
    tab.readsGraphWidget = readsGraphWidget;
    return tab;
  };
});
