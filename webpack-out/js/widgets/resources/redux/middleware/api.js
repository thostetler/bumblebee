define(['underscore', 'js/widgets/resources/redux/modules/api', 'js/widgets/resources/redux/modules/ui'], function (_, api, ui) {
  var _api$actions = api.actions,
      QUERY_PROVIDED = _api$actions.QUERY_PROVIDED,
      RECEIVED_RESPONSE = _api$actions.RECEIVED_RESPONSE,
      CURRENT_QUERY_UPDATED = _api$actions.CURRENT_QUERY_UPDATED,
      FETCH_DATA = _api$actions.FETCH_DATA,
      FETCHING_DATA = _api$actions.FETCHING_DATA,
      SEND_ANALYTICS = _api$actions.SEND_ANALYTICS;
  var _ui$actions = ui.actions,
      SET_LOADING = _ui$actions.SET_LOADING,
      SET_NO_RESULTS = _ui$actions.SET_NO_RESULTS,
      SET_HAS_ERROR = _ui$actions.SET_HAS_ERROR,
      SET_FULL_TEXT_SOURCES = _ui$actions.SET_FULL_TEXT_SOURCES,
      SET_DATA_PRODUCTS = _ui$actions.SET_DATA_PRODUCTS,
      LINK_CLICKED = _ui$actions.LINK_CLICKED;
  /**
   * Fires off request, delegating to the outer context for the actual
   * fetch
   */

  var fetchData = function fetchData(ctx, _ref) {
    var dispatch = _ref.dispatch;
    return function (next) {
      return function (action) {
        next(action);

        if (action.type === FETCH_DATA) {
          var query = {
            q: "identifier:".concat(action.result)
          };
          dispatch({
            type: FETCHING_DATA,
            result: query
          });
          dispatch({
            type: SET_LOADING,
            result: true
          });
          ctx.dispatchRequest(query);
        }
      };
    };
  };
  /**
   * Extracts the bibcode from the incoming query and makes a new request
   * for document data.
   */


  var displayDocuments = function displayDocuments(ctx, _ref2) {
    var dispatch = _ref2.dispatch;
    return function (next) {
      return function (action) {
        next(action);

        if (action.type === QUERY_PROVIDED) {
          var query = action.result;
          dispatch({
            type: SET_LOADING,
            result: true
          });
          dispatch({
            type: CURRENT_QUERY_UPDATED,
            result: query
          }); // check the query

          if (_.isPlainObject(query)) {
            var identifier = query.q;

            if (_.isArray(identifier) && identifier.length > 0) {
              if (/^(identifier|bibcode):/.test(identifier[0])) {
                identifier = identifier[0].replace(/^(identifier|bibcode):/, '');
                dispatch({
                  type: FETCH_DATA,
                  result: identifier
                });
                ctx.trigger('page-manager-event', 'widget-ready', {
                  isActive: true
                });
              } else {
                dispatch({
                  type: SET_HAS_ERROR,
                  result: 'unable to parse bibcode from query'
                });
              }
            } else {
              dispatch({
                type: SET_HAS_ERROR,
                result: 'did not receive a bibcode in query'
              });
            }
          } else {
            dispatch({
              type: SET_HAS_ERROR,
              result: 'query is not a plain object'
            });
          }
        }
      };
    };
  };
  /**
   * Sorts a set of sources by type and then groups them by name
   * @param {Array} sources sources to reformat
   * @returns {object} object keyed by the source shortnames
   */


  var groupSources = function groupSources(sources) {
    var groups = {};

    if (sources.length === 0) {
      return groups;
    } // group the sources by name, maintaining the incoming order


    sources.forEach(function (source) {
      // if the source is not in the groups object, add it
      if (!groups[source.shortName]) {
        groups[source.shortName] = [];
      } // add the source to the groups object


      groups[source.shortName].push(source);
    });
    return groups;
  };
  /**
   * Processes incoming response from server and sends the data off to the
   * link generator, finally dispatching the parsed sources
   */


  var processResponse = function processResponse(ctx, _ref3) {
    var dispatch = _ref3.dispatch,
        getState = _ref3.getState;
    return function (next) {
      return function (action) {
        next(action);

        if (action.type === RECEIVED_RESPONSE) {
          // update the link server
          ctx._updateLinkServer();

          var linkServer = getState().api.linkServer;
          var response = action.result;

          if (_.isPlainObject(response)) {
            var docs = response.response && response.response.docs;

            if (_.isArray(docs) && docs.length > 0) {
              if (_.isString(linkServer)) {
                docs[0].link_server = linkServer;
              }

              var data;

              try {
                data = ctx.parseResourcesData(docs[0]);
              } catch (e) {
                return dispatch({
                  type: SET_HAS_ERROR,
                  result: 'unable to parse resource data'
                });
              }

              if (data.fullTextSources.length > 0) {
                var fullTextSources = groupSources(data.fullTextSources);
                dispatch({
                  type: SET_FULL_TEXT_SOURCES,
                  result: fullTextSources
                });
              }

              if (data.dataProducts.length > 0) {
                dispatch({
                  type: SET_DATA_PRODUCTS,
                  result: data.dataProducts
                });
              }

              if (data.dataProducts.length === 0 && data.fullTextSources.length === 0) {
                dispatch({
                  type: SET_NO_RESULTS,
                  result: true
                });
              }

              dispatch({
                type: SET_LOADING,
                result: false
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
   * Emit an analytics event
   */


  var sendAnalytics = function sendAnalytics(ctx, _ref4) {
    var dispatch = _ref4.dispatch,
        getState = _ref4.getState;
    return function (next) {
      return function (action) {
        next(action);

        if (action.type === SEND_ANALYTICS) {
          ctx.emitAnalytics(action.source, action.result);
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

  return withContext(displayDocuments, processResponse, fetchData, sendAnalytics);
});
