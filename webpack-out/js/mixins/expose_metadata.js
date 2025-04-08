define(['underscore', 'js/components/api_targets', 'js/components/api_query', 'js/components/api_request'], function (_, ApiTargets, ApiQuery, ApiRequest) {
  var NAME = '__EXPORT_RESULTS_AS_BIBTEX__';
  var mixin = {
    /**
     *
     * Gets an array of documents and exposes a function on
     * the global object which, when called, will make a request
     * to `/export` to retrieve a bibtex string.
     *
     * This global method can't be called
     * more than once per cycle.
     *
     * @param {object[]} docs - array of documents
     */
    __exposeMetadata: function __exposeMetadata() {
      var _this = this;

      var docs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      window[NAME] = _.once(function () {
        return new Promise(function (resolve, reject) {
          var ids = docs.map(function (d) {
            return _.isArray(d.identifier) ? d.identifier[0] : d.identifier;
          });

          var ps = _this.getPubSub();

          var request = new ApiRequest({
            target: ApiTargets.EXPORT + 'bibtex',
            query: new ApiQuery({
              bibcode: ids
            }),
            options: {
              type: 'POST',
              done: function done(_ref) {
                var bibtexString = _ref.export;
                resolve({
                  identifiers: ids,
                  bibtexString: bibtexString
                });
              },
              fail: function fail(ev) {
                return reject(ev);
              }
            }
          });
          ps.publish(ps.EXECUTE_REQUEST, request);
        });
      });
    }
  };
  return mixin;
});
