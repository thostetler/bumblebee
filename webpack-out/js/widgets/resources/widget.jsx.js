define(['underscore', 'backbone', 'react', 'react-dom', 'react-redux', 'analytics', 'js/components/api_query', 'js/widgets/base/base_widget', 'js/mixins/link_generator_mixin', 'js/widgets/resources/redux/configure-store', 'js/widgets/resources/redux/modules/api', 'js/widgets/resources/redux/modules/ui', 'js/widgets/resources/containers/app'], function (_, Backbone, React, ReactDOM, ReactRedux, analytics, ApiQuery, BaseWidget, LinkGenerator, configureStore, api, ui, App) {
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
    },
    defaultQueryArguments: {
      fl: 'bibcode,data,doctype,doi,esources,first_author,genre,isbn,issn,issue,page,property,pub,title,volume,year,links_data,publisher'
    },
    activate: function activate(beehive) {
      var dispatch = this.store.dispatch;
      var self = this;
      this.setBeeHive(beehive);
      this.activateWidget();
      var pubsub = this.getPubSub();
      pubsub.subscribe(pubsub.DISPLAY_DOCUMENTS, function (apiQuery) {
        var currentQuery = self.store.getState().api.query;

        if (apiQuery && _.isFunction(apiQuery.toJSON)) {
          var query = apiQuery.toJSON(); // break out early if the currentQuery is different than the incoming one

          if (_.isEqual(currentQuery, query)) {
            return;
          }

          dispatch(ui.reset());
          dispatch(api.displayDocuments(query));
        } else {
          dispatch(ui.setError('did not receive query'));
        }
      });
      pubsub.subscribe(pubsub.DELIVERING_RESPONSE, function (apiResponse) {
        if (apiResponse && _.isFunction(apiResponse.toJSON)) {
          dispatch(api.processResponse(apiResponse.toJSON()));
        } else {
          dispatch(ui.setError('did not receive response from server'));
        }
      });
      this.attachGeneralHandler(this.onApiFeedback);

      this._updateLinkServer();
    },
    _updateLinkServer: function _updateLinkServer() {
      var dispatch = this.store.dispatch;
      var beehive = this.getBeeHive();

      if (_.isPlainObject(beehive)) {
        var user = beehive.getObject('User');

        if (_.isPlainObject(user) && user.getUserData) {
          var userData = user.getUserData();

          if (_.isString(userData.link_server)) {
            dispatch(api.setLinkServer(userData.link_server));
          }
        }
      }
    },
    dispatchRequest: function dispatchRequest(options) {
      var query = new ApiQuery(options);
      BaseWidget.prototype.dispatchRequest.call(this, query);
    },
    emitAnalytics: function emitAnalytics(source, value) {
      analytics('send', 'event', 'interaction', "".concat(source === 'ftl' ? 'full-text' : 'data', "-link-followed"), {
        link_followed: value
      });
    },
    onApiFeedback: function onApiFeedback(feedback) {
      var dispatch = this.store.dispatch;

      if (_.isPlainObject(feedback.error)) {
        dispatch(ui.setError(feedback.error));
      }
    }
  });

  _.extend(Widget.prototype, LinkGenerator);

  return Widget;
});
