import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import React from 'react';
import ReactRedux from 'react-redux';
import ReactDOM from 'react-dom';
import Redux from 'redux';
import ReduxThunk from 'redux-thunk';
import ApiTargets from 'js/components/api_targets';
import ApiQuery from 'js/components/api_query';
import ApiRequest from 'js/components/api_request';
import BaseWidget from 'js/widgets/base/base_widget';
import App from 'js/widgets/author_affiliation_tool/containers/App.jsx';
import ACTIONS from 'js/widgets/author_affiliation_tool/constants/actionNames';
import actions from 'js/widgets/author_affiliation_tool/actions/index';
import reducers from 'js/widgets/author_affiliation_tool/reducers/index';
  /**
   * Main entry point
   * this is where react will take over control of the view
   */
  var View = Backbone.View.extend({
    initialize: function(options) {
      _.assign(this, options);
    },
    render: function() {
      ReactDOM.render(
        <ReactRedux.Provider store={this.store}>
          <App />
        </ReactRedux.Provider>,
        this.el
      );
      return this;
    },
    destroy: function() {
      ReactDOM.unmountComponentAtNode(this.el);
    },
  });

  var Widget = BaseWidget.extend({
    /**
     * Initialize the widget
     */
    initialize: function() {
      // setup the thunk middleware
      var middleware = Redux.applyMiddleware(
        ReduxThunk.default.withExtraArgument(this)
      );

      // add redux devtools extension hook (safe for production)
      const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;

      // setup the store
      this.store = Redux.createStore(reducers, composeEnhancers(middleware));

      // create the view, passing in store
      this.view = new View({ store: this.store });
    },

    /**
     * Activate the widget
     *
     * @param {object} beehive
     */
    activate: function(beehive) {
      this.setBeeHive(beehive);
      this.activateWidget();
    },

    /**
     * Take the current query object and fetch corresponding affiliation data
     *
     * @param {object} currentQuery
     */
    renderWidgetForCurrentQuery: function({ currentQuery }) {
      const pubsub = this.getPubSub();

      // reset on load
      this.store.dispatch(actions.appReset());

      // do nothing if we don't get a query
      if (currentQuery) {
        const q = currentQuery.clone();
        q.unlock();

        // get the first 1000 rows
        q.set('rows', 1000);
        q.set('fl', 'bibcode');
        const req = this.composeRequest(q);

        req.set('options', {
          // extract ids
          done: (res) => {
            const ids = _.map(res.response.docs, 'bibcode');
            this.fetchAffiliationData(ids);
          },

          // handle errors
          fail: () => this.onError(),

          // stop loading after this either way
          always: () => {
            this.store.dispatch({ type: ACTIONS.setLoading, value: false });
          },
        });

        pubsub.publish(pubsub.EXECUTE_REQUEST, req);
        this.store.dispatch({ type: ACTIONS.fetchData });
      }
    },

    /**
     * Take an array of ids and fetch corresponding affiliation data
     *
     * @param {Array} ids
     * @returns {*}
     */
    renderWidgetForListOfBibcodes: function(ids) {
      // reset on load
      this.store.dispatch(actions.appReset());
      return this.fetchAffiliationData(ids);
    },

    /**
     * Take an array of ids and fetch affiliation data about them
     * this will actually make the request
     *
     * @param {Array} [ids=[]] ids - the list of identifiers
     * @param {number} [numyears=4] numyears - the years to go back
     * @param {number} [maxauthor=4] maxauthor - max number of authors to list
     */
    fetchAffiliationData: function(ids = [], numyears = 4, maxauthor = 3) {
      const pubsub = this.getPubSub();
      const $dd = $.Deferred();

      // start loading (pending) action
      this.store.dispatch({ type: ACTIONS.fetchData, value: ids });

      const req = new ApiRequest({
        target: ApiTargets.AUTHOR_AFFILIATION_SEARCH,
        query: new ApiQuery({ bibcode: ids, numyears, maxauthor }),
        options: {
          type: 'post',
          processData: false,
          dataType: 'json',
          contentType: 'application/json',
          done: (...args) => $dd.resolve(...args),
          fail: (...args) => $dd.reject(...args),
          always: (...args) => $dd.always(...args),
        },
      });

      // when done set the data into the store
      $dd.done((data) => {
        try {
          this.store.dispatch(actions.setAffiliationData(data.data));
        } catch (e) {
          console.error(e);
        }
      });

      // handle errors
      $dd.fail(() => this.onError());

      // stop loading either way
      $dd.always(() =>
        this.store.dispatch({
          type: ACTIONS.setLoading,
          value: false,
        })
      );

      pubsub.publish(pubsub.EXECUTE_REQUEST, req);
      return $dd.promise();
    },

    /**
     * Export the current data
     *
     * @param {object} data
     */
    exportAffiliationData: function(data) {
      const pubsub = this.getPubSub();
      const $dd = $.Deferred();

      const req = new ApiRequest({
        target: ApiTargets.AUTHOR_AFFILIATION_EXPORT,
        query: new ApiQuery(),
        options: {
          useFetch: true,
          fetchOptions: {
            body: JSON.stringify(data),
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          },
          done: (...args) => $dd.resolve(...args),
          fail: (...args) => $dd.reject(...args),
          always: (...args) => $dd.always(...args),
        },
      });

      // handle errors
      $dd.fail(() => this.onError());

      // stop loading either way
      $dd.always(() =>
        this.store.dispatch({
          type: ACTIONS.setLoading,
          value: false,
        })
      );

      pubsub.publish(pubsub.EXECUTE_REQUEST, req);
      return $dd.promise();
    },

    /**
     * Close the widget
     */
    closeWidget: function() {
      const pubsub = this.getPubSub();
      pubsub.publish(pubsub.NAVIGATE, 'results-page');
    },

    /**
     * Show an error message
     */
    onError: function() {
      const { dispatch } = this.store;
      dispatch(
        actions.showMessage(
          'danger',
          'Something happened during the request, please try again',
          0
        )
      );
    },
  });

  export default Widget;

