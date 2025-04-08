define(['underscore', 'js/widgets/associated/redux/modules/api', 'js/widgets/associated/redux/modules/ui'], function (_, api, ui) {
  var _api$actions = api.actions,
      RECEIVED_RESPONSE = _api$actions.RECEIVED_RESPONSE,
      SEND_ANALYTICS = _api$actions.SEND_ANALYTICS,
      FALLBACK_ON_ERROR = _api$actions.FALLBACK_ON_ERROR;
  var _ui$actions = ui.actions,
      SET_LOADING = _ui$actions.SET_LOADING,
      SET_HAS_ERROR = _ui$actions.SET_HAS_ERROR,
      SET_ITEMS = _ui$actions.SET_ITEMS;
  /**
   * Map the array of items to the format we need { url, name, id, etc }
   *
   * @param {array} items - The array to parse
   */

  var parseItems = function parseItems(items, bibcode) {
    var parseUrl = function parseUrl(url) {
      try {
        if (url.indexOf('http') >= 0) return decodeURIComponent(url); // decode and rip the "/#abs..." part off the url and any leading slash

        return decodeURIComponent(url.slice(url.indexOf(':') + 1)).replace(/^\//, '#');
      } catch (e) {
        return url;
      }
    };

    return _.map(items, function (i) {
      var url = parseUrl(i.url);
      return {
        rawUrl: i.url,
        url: url,
        circular: url.indexOf(bibcode, url.indexOf(':')) > -1,
        external: url.indexOf('http') > -1,
        name: i.title,
        id: _.uniqueId()
      };
    });
  };
  /**
   * Processes incoming response from server and sends the data off to the
   * link generator, finally dispatching the parsed sources
   */


  var processResponse = function processResponse(ctx, _ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        next(action);

        if (action.type === RECEIVED_RESPONSE) {
          var response = action.result;
          var bibcode = getState().api.bibcode;

          if (_.isPlainObject(response)) {
            var docs = response.links && response.links.records;

            if (_.isArray(docs) && docs.length > 0) {
              dispatch({
                type: SET_LOADING,
                result: false
              });
              dispatch({
                type: SET_ITEMS,
                result: parseItems(docs, bibcode)
              });
            } else {
              dispatch({
                type: SET_HAS_ERROR,
                result: 'did not receive docs'
              });
            }
          } else {
            dispatch({
              type: SET_HAS_ERROR,
              result: 'did not receive docs'
            });
          }
        }
      };
    };
  };
  /**
   * In the case of an error, attempt to fallback on the data we already retrieved
   * If there is no data, then do nothing and the widget will not show
   */


  var fallbackOnError = function fallbackOnError(ctx, _ref2) {
    var dispatch = _ref2.dispatch,
        getState = _ref2.getState;
    return function (next) {
      return function (action) {
        next(action);

        if (action.type === FALLBACK_ON_ERROR) {
          var bibcode = getState().api.bibcode;
          var items = getState().ui.items;

          if (_.isArray(items) && items.length > 0) {
            dispatch({
              type: SET_ITEMS,
              result: parseItems(items.map(function (i) {
                return {
                  url: i.rawUrl,
                  title: i.name
                };
              }), bibcode)
            });
          }
        }
      };
    };
  };
  /**
   * Emit an analytics event
   */


  var sendAnalytics = function sendAnalytics(ctx, _ref3) {
    var dispatch = _ref3.dispatch,
        getState = _ref3.getState;
    return function (next) {
      return function (action) {
        next(action);

        if (action.type === SEND_ANALYTICS) {
          ctx.emitAnalytics(action.result);
        }
      };
    };
  };
  /**
   * Wrap the middleware with a function that, when called,
   * binds it's first argument to the first argument of the middleware function
   * returns the wrapped middleware function
   */


  var withContext = function withContext() {
    for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
      fns[_key] = arguments[_key];
    }

    return function (context) {
      return fns.map(function (fn) {
        return _.partial(fn, context);
      });
    };
  };

  return withContext(processResponse, sendAnalytics, fallbackOnError);
});
