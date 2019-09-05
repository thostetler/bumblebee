define([
  'js/widgets/base/base_widget',
  'react',
  'react-dom',
  'redux',
  'react-redux',
  'js/mixins/formatter',
  'es6!./components/App',
  'js/mixins/link_generator_mixin',
  'js/mixins/papers_utils',
  'es6!./reducer',
  './actions',
  'js/components/api_query',
  'js/components/api_targets',
  'js/components/api_request',
], function (BaseWidget, React, ReactDOM, Redux, ReactRedux, FormatMixin,
    App, LinkGeneratorMixin, PapersUtilsMixin, reducer, actions, ApiQuery, ApiTargets, ApiRequest) {

  const configureStore = (context) => {
    const { createStore, compose } = Redux;
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(reducer, composeEnhancers());
  }

  const LibraryList = BaseWidget.extend({
    initialize: function () {
      const store = this.store = configureStore(this);

      this.view = new (Backbone.View.extend({
        render: function () {
          const { Provider } = ReactRedux;
          ReactDOM.render(React.createElement(Provider, { store },
            React.createElement(App)
          ), this.el);
          return this;
        },
        destroy: function () {
          ReactDOM.unmountComponentAtNode(this.el);
        }
      }));
    },
    setData: function (data) {
      this._data = data;
      this.dispatchRequest();
    },
    composeRequest: function (apiQuery) {
      const { id: libraryId } = this._data;
      const endpoint = `${ ApiTargets.LIBRARIES }/${ libraryId }`;

      return new ApiRequest({
        target: endpoint,
        query: apiQuery,
        options: {
          context: this,
          contentType: 'application/x-www-form-urlencoded',
          done: ({ solr, ...args }) => {
            console.log(args)
            this.store.dispatch(actions.setLoading(false));
            this.store.dispatch(actions.setItems(this.parseDocs(solr.response.docs)));
          },
          fail: (...args) => {
            console.log('fail', ...args);
          }
        }
      });
    },
    dispatchRequest: function () {
      if (!this._data || !this._data.id) {
        return;
      }
      const q = this.customizeQuery(new ApiQuery());
      this.getBeeHive().getService('Api').request(this.composeRequest(q));
    },
    defaultQueryArguments: {
      fl: 'title,bibcode,author,keyword,pub,aff,volume,year,links_data,[citations],property,esources,data,pubdate,abstract',
      rows: 25,
      start: 0,
      sort: 'date desc'
    },
    parseDocs: function (docs) {

      const maxAuthors = 3;
      const newDocs = docs.map((doc) => {
        const acc = { ...doc };

        acc['identifier'] = doc.bibcode ? doc.bibcode : doc.identifier;

        let shownAuthors;
        if (doc.author && doc.author.length > maxAuthors) {
          acc['extraAuthors'] = doc.author.length - maxAuthors;
          shownAuthors = doc.author.slice(0, maxAuthors);
        } else if (doc.author) {
          shownAuthors = doc.author;
        }

        if (shownAuthors) {
          acc['authorFormatted'] = shownAuthors.join('; ');
        }

        if (doc['[citations]'] && doc['[citations]'].num_citations > 0) {
          acc['num_citations'] = this.formatNum(doc['[citations]'].num_citations);
        } else {
          acc['num_citations'] = 0;
        }

        acc['formattedDate'] = doc.pubdate && this.formatDate(doc.pubdate, {
          format: 'yy/mm', missing: { day: 'yy/mm', month: 'yy' }
        });

        acc['shortAbstract'] = doc.abstract && this.shortenAbstract(doc.abstract);

        return acc;
      }, {});

      try {
        newDocs = this.parseLinksData(newDocs);
      } catch (e) {
        // do nothing
      }

      for(let i = 1000; i > 0; i--) {
        newDocs.push({ ...newDocs[0] });
      }

      console.log(newDocs);

      return newDocs;
    }
  });

  Object.assign(
    LibraryList.prototype,
    LinkGeneratorMixin,
    PapersUtilsMixin,
    FormatMixin
  );

  return LibraryList;
});
