function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _wrapRegExp() { _wrapRegExp = function _wrapRegExp(re, groups) { return new BabelRegExp(re, undefined, groups); }; var _super = RegExp.prototype; var _groups = new WeakMap(); function BabelRegExp(re, flags, groups) { var _this = new RegExp(re, flags); _groups.set(_this, groups || _groups.get(re)); return _setPrototypeOf(_this, BabelRegExp.prototype); } _inherits(BabelRegExp, RegExp); BabelRegExp.prototype.exec = function (str) { var result = _super.exec.call(this, str); if (result) result.groups = buildGroups(result, this); return result; }; BabelRegExp.prototype[Symbol.replace] = function (str, substitution) { if (typeof substitution === "string") { var groups = _groups.get(this); return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) { return "$" + groups[name]; })); } else if (typeof substitution === "function") { var _this = this; return _super[Symbol.replace].call(this, str, function () { var args = arguments; if (_typeof(args[args.length - 1]) !== "object") { args = [].slice.call(args); args.push(buildGroups(args, _this)); } return substitution.apply(this, args); }); } else { return _super[Symbol.replace].call(this, str, substitution); } }; function buildGroups(result, re) { var g = _groups.get(re); return Object.keys(g).reduce(function (groups, name) { groups[name] = result[g[name]]; return groups; }, Object.create(null)); } return _wrapRegExp.apply(this, arguments); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define(['underscore', 'jquery-ui', 'jquery', 'moment'], function (_, $ui, $, moment) {
  var Utils = {
    /**
     * Receives the  ISO8601 date string (actually, browsers will be able to parse
     * range of date strings, but you should be careful and not count on that!)
     *
     * And returns a string in requested format; when the minute is set to 0,
     * we will that the month was not given (ADS didn't know about it)
     *
     * @param dateString
     *    string in ISO8601 format
     * @param format
     *    string, jquery-ui datepicker for options
     * @param options
     * @returns {*}
     */
    formatDate: function formatDate(dateString) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _options$format = options.format,
          format = _options$format === void 0 ? 'YYYY/MM' : _options$format,
          _options$missing = options.missing,
          missingOpts = _options$missing === void 0 ? {} : _options$missing;

      var missing = _objectSpread({
        day: 'YYYY/MM',
        month: 'YYYY',
        dayAndMonth: 'YYYY'
      }, missingOpts); // break apart date


      var regex = _wrapRegExp(/^(\d{4})-(\d{2}|00)-(\d{2}|00)$/, {
        year: 1,
        month: 2,
        day: 3
      });

      var match = dateString.match(regex);

      if (match) {
        var _match$groups = match.groups,
            year = _match$groups.year,
            month = _match$groups.month,
            day = _match$groups.day;
        var monthMissing = month === '00';
        var dayMissing = day === '00';
        var date = [Number.parseInt(year, 10), // months are zero-based, everything else is one-based
        monthMissing ? 0 : Number.parseInt(month, 10) - 1, dayMissing ? 1 : Number.parseInt(day, 10)];
        var utc = moment.utc(date);

        if (!utc.isValid()) {
          // if for some reason the parsed date is invalid, and assuming the year is always there, use that
          return year;
        }

        if (monthMissing && dayMissing) {
          return utc.format(missing.dayAndMonth);
        }

        if (monthMissing) {
          return utc.format(missing.month);
        }

        if (dayMissing) {
          return utc.format(missing.day);
        }

        return utc.format(format);
      } // if the regex doesn't match, return a null value


      return null;
    },
    shortenAbstract: function shortenAbstract(abs, maxLen) {
      maxLen = maxLen || 300; // if this function returns undefined,
      // the template knows to just show the whole abstract

      if (abs.length <= maxLen) return undefined;
      var i = abs.slice(0, maxLen).lastIndexOf(' ');
      return abs.slice(0, i + 1) + '...';
    },

    /**
     * This method prepares data for consumption by the template on a per-doc basis
     *
     * @returns {*}
     */
    prepareDocForViewing: function prepareDocForViewing(data) {
      var shownAuthors;
      var maxAuthorNames = 3;

      if (data.author && data.author.length > maxAuthorNames) {
        data.extraAuthors = data.author.length - maxAuthorNames;
        shownAuthors = data.author.slice(0, maxAuthorNames);
      } else if (data.author) {
        shownAuthors = data.author;
      }

      if (data.author) {
        var format = function format(d, i, arr) {
          var l = arr.length - 1;

          if (i === l || l === 0) {
            return d; // last one, or only one
          }

          return d + ';';
        };

        data.authorFormatted = _.map(shownAuthors, format);
        data.allAuthorFormatted = _.map(data.author, format);
      }

      data.formattedDate = data.formattedDate || (data.pubdate ? this.formatDate(data.pubdate) : undefined);
      data.shortAbstract = data.abstract ? this.shortenAbstract(data.abstract) : undefined;
      data.details = data.details || {
        shortAbstract: data.shortAbstract,
        pub: data.pub,
        abstract: data.abstract
      };
      data.num_citations = data['[citations]'] ? data['[citations]'].num_citations : undefined;
      data.identifier = data.bibcode ? data.bibcode : data.identifier; // make sure undefined doesn't become "undefined"

      data.encodedIdentifier = _.isUndefined(data.identifier) ? data.identifier : encodeURIComponent(data.identifier);

      if (data.pubdate || data.shortAbstract) {
        data.popover = true;
      }

      if (this.model) data.orderNum = this.model.get('resultsIndex') + 1;
      return data;
    }
  };
  return Utils;
});
