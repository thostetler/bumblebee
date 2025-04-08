function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define(['jquery', 'backbone', 'underscore', 'js/widgets/base/base_widget', 'js/widgets/meta_tags/template/metatags.html', 'js/mixins/link_generator_mixin'], function ($, Backbone, _, BaseWidget, metatagsTemplate, LinkGenerator) {
  var View = Backbone.View.extend({
    destroy: function destroy() {
      this.remove();
    }
  });
  var Widget = BaseWidget.extend({
    initialize: function initialize(options) {
      this.options = options || {};
      this.view = new View();
      this._bibcode = null;
    },
    activate: function activate(beehive) {
      this.setBeeHive(beehive);
      var pubsub = beehive.getService('PubSub');

      _.bindAll(this, ['onDisplayDocuments', 'processResponse']);

      pubsub.subscribe(pubsub.DELIVERING_RESPONSE, this.processResponse);
      pubsub.subscribe(pubsub.DISPLAY_DOCUMENTS, this.onDisplayDocuments);
    },
    processResponse: function processResponse(apiResponse) {
      var data = apiResponse.get('response.docs[0]', false, {});
      this.updateMetaTags(data);
    },
    getCachedDoc: function getCachedDoc(bibcode) {
      var fields = this.defaultQueryArguments.fl.split(','); // Attempt to shortcut the request by using stashed docs

      var docs = this.getBeeHive().getObject('DocStashController').getDocs();
      var found = docs.find(function (doc) {
        return doc.bibcode === bibcode;
      });

      if (found) {
        // Most will have DOIs, but account for other identifier formats
        // These are optional
        var finalDoc = _objectSpread({
          issn: undefined,
          isbn: undefined
        }, found);

        var keys = Object.keys(finalDoc);
        var hasRequiredKeys = fields.every(function (f) {
          return keys.includes(f);
        });
        return hasRequiredKeys ? finalDoc : null;
      }

      return null;
    },
    onDisplayDocuments: function onDisplayDocuments(apiQuery) {
      var currentQuery = this.getCurrentQuery();

      if (_.isEqual(currentQuery.toJSON(), apiQuery.toJSON())) {
        return;
      }

      this.setCurrentQuery(apiQuery);
      var bibcode = this.parseIdentifierFromQuery(apiQuery);

      if (bibcode === 'null') {
        return;
      }

      var doc = this.getCachedDoc(bibcode);

      if (doc) {
        this.updateMetaTags(doc);
        return;
      }

      this.dispatchRequest(apiQuery.clone());
    },
    updateMetaTags: function updateMetaTags(data) {
      data.url = Backbone.history.location.href;
      var sources = {};

      try {
        sources = this.parseResourcesData(data);
      } catch (e) {// do nothing
      } // Look for `PDF` in title of the source


      if (_.isArray(sources.fullTextSources) && sources.fullTextSources.length > 0) {
        var found = _.find(sources.fullTextSources, function (source) {
          return /PDF/.test(source.name);
        });

        if (found) {
          data.pdfUrl = found.url;
        }
      }

      if (_.isArray(data.doi) && data.doi.length > 0) {
        data.doi = data.doi[0];
      }

      if (data.aff && data.author) {
        data.author = _.map(data.author, function (author, n) {
          return {
            name: author,
            aff: data.aff[n]
          };
        });
      } // Update the <head> with the meta tags


      $('head').append(function () {
        return $(metatagsTemplate(data)).filter(function () {
          var name = $(this).attr('name');

          if (name) {
            // check to see if the tag already exists
            return !$('head>meta[name="' + name + '"]').length;
          }

          return true;
        });
      }); // fire off dom events

      this.emitDOMEvents();
    },

    /**
     * Emit DOM events following render of metatags
     * this helps third-party extensions/applications which rely on events for
     * performing actions on the page
     */
    emitDOMEvents: function emitDOMEvents() {
      _.forEach(['ZoteroItemUpdated', 'ADSPageLoaded'], function (ev) {
        window.document.dispatchEvent(new Event(ev), {
          bubbles: true,
          cancelable: true
        });
      });
    },
    defaultQueryArguments: {
      fl: 'links_data,[citations],keyword,property,first_author,year,issn,isbn,title,aff,abstract,bibcode,pub,pub_raw,volume,author,issue,pubdate,doi,page,esources,data',
      rows: 1
    }
  });

  _.extend(Widget.prototype, LinkGenerator);

  return Widget;
});
