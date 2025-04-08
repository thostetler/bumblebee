function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define([], function () {
  var actions = {
    GET_RECOMMENDATIONS: 'GET_RECOMMENDATIONS',
    GET_DOCS: 'GET_DOCS',
    SET_DOCS: 'SET_DOCS',
    SET_QUERY: 'SET_QUERY',
    UPDATE_SEARCH_BAR: 'UPDATE_SEARCH_BAR',
    GET_FULL_LIST: 'GET_FULL_LIST',
    EMIT_ANALYTICS: 'EMIT_ANALYTICS',
    SET_TAB: 'SET_TAB',
    SET_ORACLE_TARGET: 'SET_ORACLE_TARGET',
    SET_QUERY_PARAMS: 'SET_QUERY_PARAMS',
    UPDATE_USERNAME: 'UPDATE_USERNAME'
  };
  var actionCreators = {
    getRecommendations: function getRecommendations() {
      return {
        type: actions.GET_RECOMMENDATIONS
      };
    },
    getDocs: function getDocs(query) {
      return {
        type: 'API_REQUEST',
        scope: actions.GET_DOCS,
        options: {
          type: 'GET',
          target: 'search/query',
          query: query
        }
      };
    },
    setDocs: function setDocs(docs) {
      return {
        type: actions.SET_DOCS,
        payload: docs
      };
    },
    setQuery: function setQuery(query) {
      return {
        type: actions.SET_QUERY,
        payload: query
      };
    },
    setQueryParams: function setQueryParams(payload) {
      return {
        type: actions.SET_QUERY_PARAMS,
        payload: payload
      };
    },
    updateSearchBar: function updateSearchBar(text) {
      return {
        type: actions.UPDATE_SEARCH_BAR,
        payload: text
      };
    },
    updateUserName: function updateUserName(text) {
      return {
        type: actions.UPDATE_USERNAME,
        payload: text
      };
    },
    getFullList: function getFullList() {
      return {
        type: actions.GET_FULL_LIST
      };
    },
    emitAnalytics: function emitAnalytics(payload) {
      return {
        type: actions.EMIT_ANALYTICS,
        payload: payload
      };
    },
    setTab: function setTab(tab) {
      return {
        type: actions.SET_TAB,
        payload: tab
      };
    },
    setOracleTarget: function setOracleTarget(target) {
      return {
        type: actions.SET_ORACLE_TARGET,
        payload: target
      };
    }
  };
  return _objectSpread({}, actions, actionCreators);
});
