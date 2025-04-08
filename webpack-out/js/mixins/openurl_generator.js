function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define(['underscore'], function (_) {
  /**
   * @typedef Metadata
   * @property {string[]} page
   * @property {string[]} doi
   * @property {string} doctype
   * @property {string} bibcode
   * @property {string} author
   * @property {string} issue
   * @property {string} volume
   * @property {string} pub
   * @property {string} year
   * @property {string[]} title
   * @property {string[]} issn
   * @property {string[]} isbn
   */

  /**
   * check if value is string
   * @param {any} val value to test
   * @returns {boolean}
   */
  var isString = function isString(val) {
    return _.isString(val);
  };
  /**
   * Check if value is an array
   * @param {any} val value to test
   * @returns {boolean}
   */


  var isArray = function isArray(val) {
    return _.isArray(val);
  };
  /**
   * ADS specific fields
   */


  var STATIC_FIELDS = {
    url_ver: 'Z39.88-2004',
    rft_val_fmt: 'info:ofi/fmt:kev:mtx:',
    rfr_id: 'info:sid/ADS',
    sid: 'ADS'
  };
  /**
   * Generates an OpenUrl using metadata and a linkServer
   * @param {object} options
   * @param {Metadata} options.metadata field data from database
   * @param {string} options.linkServer base url to use for generating link
   * @returns {string} the openUrl url
   */

  var getOpenUrl = function getOpenUrl(options) {
    var _ref = options || {},
        metadata = _ref.metadata,
        _ref$linkServer = _ref.linkServer,
        linkServer = _ref$linkServer === void 0 ? '' : _ref$linkServer;

    var _ref2 = metadata || {},
        page = _ref2.page,
        doi = _ref2.doi,
        doctype = _ref2.doctype,
        bibcode = _ref2.bibcode,
        author = _ref2.author,
        issue = _ref2.issue,
        volume = _ref2.volume,
        pub = _ref2.pub,
        year = _ref2.year,
        title = _ref2.title,
        issn = _ref2.issn,
        isbn = _ref2.isbn; // parse out degree based on bibcode


    var degree = isString(bibcode) && (bibcode.includes('PhDT') ? 'PhD' : bibcode.includes('MsT') ? 'Masters' : false); // genre is "disseration" for phd thesis, otherwise use doctype/article

    var genre = isString(doctype) && isString(bibcode) && bibcode.includes('PhDT') ? 'dissertation' : isString(doctype) ? doctype : 'article'; // parse various fields to create a context object

    var parsed = _objectSpread({}, STATIC_FIELDS, {
      'rft.spage': isArray(page) ? page[0].split('-')[0] : false,
      id: isArray(doi) ? 'doi:' + doi[0] : false,
      genre: genre,
      rft_id: [isArray(doi) ? 'info:doi/' + doi[0] : false, isString(bibcode) ? 'info:bibcode/' + bibcode : false],
      'rft.degree': degree,
      'rft.aulast': isString(author) ? author.split(', ')[0] : false,
      'rft.aufirst': isString(author) ? author.split(', ')[1] : false,
      'rft.issue': isString(issue) ? issue : false,
      'rft.volume': isString(volume) ? volume : false,
      'rft.jtitle': isString(pub) ? pub : false,
      'rft.date': isString(year) ? year : false,
      'rft.atitle': isArray(title) ? title[0] : false,
      'rft.issn': isArray(issn) ? issn[0] : false,
      'rft.isbn': isArray(isbn) ? isbn[0] : false,
      'rft.genre': genre,
      rft_val_fmt: STATIC_FIELDS.rft_val_fmt + (isString(doctype) ? doctype : 'article')
    }); // add extra fields to context object


    var context = _objectSpread({}, parsed, {
      spage: parsed['rft.spage'],
      volume: parsed['rft.volume'],
      title: parsed['rft.jtitle'],
      atitle: parsed['rft.atitle'],
      aulast: parsed['rft.aulast'],
      aufirst: parsed['rft.aufirst'],
      date: parsed['rft.date'],
      isbn: parsed['rft.isbn'],
      issn: parsed['rft.issn']
    }); // if the linkServer has query string, just append to the end


    var openUrl = linkServer.includes('?') ? linkServer + '&' : linkServer + '?'; // generate array of query params from the context object

    var fields = Object.keys(context).filter(function (k) {
      return context[k];
    }).map(function (key) {
      if (context[key]) {
        if (isArray(context[key])) {
          return context[key].filter(function (v) {
            return v;
          }).map(function (val) {
            return "".concat(key, "=").concat(val);
          }).join('&');
        }

        return "".concat(key, "=").concat(context[key]);
      }
    });
    return encodeURI(openUrl + fields.join('&'));
  };

  return {
    getOpenUrl: getOpenUrl
  };
});
