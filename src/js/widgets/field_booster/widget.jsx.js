'use strict';
define([
  'jquery',
  'underscore',
  'backbone',
  'react',
  'react-redux',
  'react-dom',
  'redux',
  'es6!./redux/configureStore',
  'es6!./redux/modules/FieldBoosterApp',
  'js/components/api_query',
  'js/widgets/base/base_widget',
  'es6!./containers/FieldBoosterAppContainer'
], function (
  $, _, Backbone, React, ReactRedux, ReactDOM, Redux, configureStore,
  actions, ApiQuery, BaseWidget, App
) {

  /**
   * Main entry point
   * this is where react will take over control of the view
   */
  var View = Backbone.View.extend({
    initialize: function (options) {
      _.assign(this, options);
    },
    render: function () {
      ReactDOM.render(
        <ReactRedux.Provider store={this.store}>
          <App/>
        </ReactRedux.Provider>,
        this.el
      );
      return this;
    },
    destroy: function () {
      ReactDOM.unmountComponentAtNode(this.el);
    }
  });

  var Widget = BaseWidget.extend({

    /**
     * Initialize the widget
     */
    initialize: function () {

      this.store = configureStore(this);

      // create the view, passing in store
      this.view = new View({ store: this.store });
    },

    /**
     * Activate the widget
     *
     * @param {object} beehive
     */
    activate: function (beehive) {
      this.setBeeHive(beehive);
      this.activateWidget();
      let pubsub = this.getPubSub();
      pubsub.subscribe(pubsub.START_SEARCH, _.bind(this.parseQuery, this));
      pubsub.subscribe(pubsub.DELIVERING_REQUEST, (res) =>
        _.bind(this.parseQuery, this, res.get('query')));
    },

    parseQuery: function (apiQuery) {
      let query = apiQuery.toJSON();
      const { updateFields } = actions;

      if (query.qf) {
        try {
          let boosters = query.qf[0].split(' ');
          let fields = _.map(boosters, b => {
            let parts = b.split('^');
            return { key: parts[0], value: Number(parts[1]) };
          });
          this.store.dispatch(updateFields(fields));
        } catch (e) {
          console.error('having trouble parsing fields', e);
        }
      }
    },

    startNewSearch: function (fields) {
      const pubsub = this.getPubSub();
      let currentQuery = this.getBeeHive().getObject('AppStorage').getCurrentQuery();

      // generate the boosters
      let query = {
        'sticky_params': ['qf'],
        'qf': [_.map(fields, function (f) {
          return f.key + '^' + f.value;
        }).join(' ')]
      };

      // extend the current query, if available
      if (currentQuery) {
        query = _.assign({}, currentQuery.toJSON(), query);
      }

      // clean up the query before submitting
      if (_.isEmpty(fields)) {
        delete query.qf;
        if (query.sticky_params.length === 1) {
          delete query.sticky_params;
        } else {
          query.sticky_params = _.without(query.sticky_params, 'qf');
        }
      }

      // send off the query
      pubsub.publish(pubsub.START_SEARCH, new ApiQuery(query));
    }
  });

  return Widget;
});
