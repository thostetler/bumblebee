'use strict';
define([
  'underscore',
  'backbone',
  'react',
  'react-redux',
  'react-dom',
  'redux',
  'es6!./redux/configure-store',
  'es6!./redux/modules/filter-app',
  'js/components/api_query',
  'js/widgets/base/base_widget',
  'es6!./containers/filter-app-container'
], function (
  _, Backbone, React, ReactRedux, ReactDOM, Redux, configureStore,
  FilterApp, ApiQuery, BaseWidget, FilterAppContainer
) {

  const View = Backbone.View.extend({
    initialize: function (options) {
      _.assign(this, options);
    },
    render: function () {
      ReactDOM.render(
        <ReactRedux.Provider store={this.store}>
          <FilterAppContainer/>
        </ReactRedux.Provider>,
        this.el
      );
      return this;
    },
    destroy: function () {
      ReactDOM.unmountComponentAtNode(this.el);
    }
  });

  const Widget = BaseWidget.extend({

    /**
     * Initialize the widget
     */
    initialize: function () {

      this.store = configureStore(this);

      // create the view, passing in store
      this.view = new View({store: this.store});
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
    }

  });

  return Widget;
});