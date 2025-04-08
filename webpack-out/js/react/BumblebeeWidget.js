function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// this module is not loaded directly, it must be loaded using reactify!
// in order for the view to be dynamically injected
define(['underscore', 'js/widgets/base/base_widget', 'js/components/api_request', 'js/components/api_query', 'analytics'], function (_, BaseWidget, ApiRequest, ApiQuery, analytics) {
  var _getBeeHive = function getBeeHive() {
    return window.bbb.getBeeHive();
  };

  var getPubSub = function getPubSub() {
    var beehive = _getBeeHive();

    var ps = beehive.getService('PubSub');
    return ps;
  };

  var subscribe = function subscribe() {
    var ps = getPubSub();

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    ps.subscribe.apply(ps, [ps.pubSubKey].concat(args));
  };

  var publish = function publish() {
    var ps = getPubSub();

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    ps.publish.apply(ps, [ps.pubSubKey].concat(args));
  };

  var BumblebeeWidget = BaseWidget.extend({
    /**
     * @override
     */
    getBeeHive: function getBeeHive() {
      return _getBeeHive();
    },

    /**
     * @override
     */
    hasBeeHive: function hasBeeHive() {
      return true;
    },
    initialize: function initialize(_ref) {
      var _this = this;

      var componentId = _ref.componentId;
      this.view.on({
        sendRequest: _.bind(this.onSendRequest, this),
        subscribeToPubSub: _.bind(this.subscribeToPubSub, this),
        publishToPubSub: _.bind(this.publishToPubSub, this),
        doSearch: _.bind(this.doSearch, this),
        getCurrentQuery: _.bind(this.onGetCurrentQuery, this),
        isLoggedIn: _.bind(this.isLoggedIn, this),
        analyticsEvent: _.bind(this.analyticsEvent, this)
      });
      this.listenTo(this, 'page-manager-message', function (ev, data) {
        if (ev === 'widget-selected' && data.idAttribute === componentId) {
          _this.view.destroy().render();
        }
      });
      this.activate();
      this.onSendRequest = _.debounce(this.onSendRequest, 1000, {
        leading: true,
        trailing: false
      });

      if (this.view._store) {
        this._store = this.view._store;
      }
    },
    dispatch: function dispatch(_ref2) {
      var type = _ref2.type,
          args = _objectWithoutProperties(_ref2, ["type"]);

      if (this._store && typeof this._store.dispatch === 'function') {
        this._store.dispatch(_objectSpread({
          type: type
        }, args));
      }
    },
    getState: function getState() {
      return this._store.getState();
    },
    activate: function activate() {
      var ps = getPubSub();
      subscribe(ps.USER_ANNOUNCEMENT, this.handleUserAnnouncement.bind(this));
      subscribe(ps.NAVIGATE, this.handleNavigation.bind(this));
      var user = this.getBeeHive().getObject('User');

      if (user && typeof user.getUserName === 'function') {
        this.dispatch({
          type: 'USER_ANNOUNCEMENT/user_signed_in',
          payload: user.getUserName()
        });
      }
    },
    handleNavigation: function handleNavigation(event, payload) {
      var type = "NAVIGATE/".concat(event);
      this.dispatch({
        type: type,
        payload: payload
      });
    },
    handleUserAnnouncement: function handleUserAnnouncement(event, payload) {
      var type = "USER_ANNOUNCEMENT/".concat(event);
      this.dispatch({
        type: type,
        payload: payload
      });
    },
    isLoggedIn: function isLoggedIn(cb) {
      var user = this.getBeeHive().getObject('User');

      if (typeof cb === 'function') {
        cb(user.isLoggedIn());
      }
    },
    onGetCurrentQuery: function onGetCurrentQuery(callback) {
      callback(this.getCurrentQuery());
    },
    subscribeToPubSub: function subscribeToPubSub(event, callback) {
      var ps = getPubSub();
      subscribe(ps[event], callback);
    },
    publishToPubSub: function publishToPubSub(event) {
      var ps = getPubSub();

      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      publish.apply(void 0, [ps[event]].concat(args));
    },
    doSearch: function doSearch(queryParams) {
      var query = new ApiQuery();

      if (_.isString(queryParams)) {
        query.load(queryParams);
      } else {
        query.set(_objectSpread({}, queryParams));
      }

      this.publishToPubSub('NAVIGATE', 'search-page', {
        q: query
      });
    },
    onSendRequest: function onSendRequest(_ref3) {
      var options = _ref3.options,
          target = _ref3.target,
          query = _ref3.query;
      var ps = getPubSub();
      var request = new ApiRequest({
        target: target,
        query: new ApiQuery(query)
      });
      request.set('options', _objectSpread({}, options, {
        contentType: target === 'search/query' ? 'application/x-www-form-urlencoded' : options.contentType,
        data: target === 'search/query' ? request.get('query').url() : options.data
      }));
      publish(ps.EXECUTE_REQUEST, request);
    },
    analyticsEvent: function analyticsEvent() {
      analytics.apply(void 0, arguments);
    }
  });
  return BumblebeeWidget;
});
