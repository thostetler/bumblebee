define(['underscore', 'backbone', 'react', 'react-dom', 'react-redux', 'analytics', 'js/components/api_query', 'js/components/api_request', 'js/components/api_targets', 'js/widgets/base/base_widget', 'js/widgets/associated/redux/configure-store', 'js/widgets/associated/redux/modules/api', 'js/widgets/associated/redux/modules/ui', 'js/widgets/associated/containers/app'], function (_, Backbone, React, ReactDOM, ReactRedux, analytics, ApiQuery, ApiRequest, ApiTargets, BaseWidget, configureStore, api, ui, App) {
  var View = Backbone.View.extend({
    initialize: function initialize(options) {
      // provide this with all the options passed in
      _.assign(this, options);
    },
    render: function render() {
      // create provider component, that passes the store to <App>
      ReactDOM.render( /*#__PURE__*/React.createElement(ReactRedux.Provider, {
        store: this.store
      }, /*#__PURE__*/React.createElement(App, null)), this.el);
      return this;
    },
    destroy: function destroy() {
      // on destroy, make sure the React DOM is unmounted
      ReactDOM.unmountComponentAtNode(this.el);
    }
  });
  var Widget = BaseWidget.extend({
    initialize: function initialize() {
      // create the store, using the configurator
      this.store = configureStore(this); // create the view, passing in store

      this.view = new View({
        store: this.store
      });

      if (!window.__BUMBLEBEE_TESTING_MODE__) {
        this.processAbstractData = _.debounce(_.bind(this.processAbstractData, this), 300);
      }
    },
    defaultQueryArguments: {},
    activate: function activate(beehive) {
      var _this = this;

      var dispatch = this.store.dispatch;
      this.setBeeHive(beehive);
      this.activateWidget();
      this.attachGeneralHandler(this.onApiFeedback);
      var pubsub = this.getPubSub();
      pubsub.subscribe(pubsub.CUSTOM_EVENT, function (event, data) {
        if (event === 'latest-abstract-data') {
          var currentId = _this.store.getState().api.bibcode;

          var id = data.bibcode || data.identifier;
          id = Array.isArray(id) ? id[0] : id;

          if (!id || currentId === id) {
            return;
          }

          dispatch(ui.reset());
          dispatch(api.setBibcode(id));

          _this.processAbstractData(data);
        }
      });
      pubsub.subscribe(pubsub.DELIVERING_RESPONSE, function (apiResponse) {
        if (apiResponse && _.isFunction(apiResponse.toJSON)) {
          dispatch(api.processResponse(apiResponse.toJSON()));
        } else {
          dispatch(ui.setError('did not receive response from server'));
        }
      });
    },
    processAbstractData: function processAbstractData(data) {
      var dispatch = this.store.dispatch;

      if (data && data.property && data.property.includes('ASSOCIATED')) {
        this.dispatchRequest(new ApiQuery());
      } else {
        dispatch(ui.setError('no associated property'));
      }
    },
    composeRequest: function composeRequest() {
      var bibcode = this.store.getState().api.bibcode;
      return new ApiRequest({
        target: "".concat(ApiTargets.RESOLVER, "/").concat(bibcode, "/associated"),
        query: new ApiQuery()
      });
    },
    emitAnalytics: function emitAnalytics(data) {
      analytics('send', 'event', 'interaction', 'associated-link-followed', {
        target: 'associated',
        url: data.rawUrl
      });
    },
    onApiFeedback: function onApiFeedback(feedback) {
      var dispatch = this.store.dispatch;

      if (_.isPlainObject(feedback.error)) {
        dispatch(ui.setError(feedback.error));
        dispatch(api.fallbackOnError());
      }
    }
  });
  return Widget;
});
