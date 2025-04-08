function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(['jquery', 'underscore', 'analytics', 'react', 'js/components/api_query', 'js/components/api_request'], function ($, _, analytics, React, ApiQuery, ApiRequest) {
  var qs = function qs(key, str, separator) {
    // eslint-disable-next-line no-useless-escape
    var k = key.replace(/[*+?^$.[\]{}()|\\\/]/g, '\\$&'); // escape RegEx meta chars

    var pattern = '(^|[\\?&])' + k + '=[^&]*';
    var match = (str || window.location.hash).match(new RegExp(pattern, 'g'));

    if (!match) {
      return null;
    }

    var clean = []; // remove 'key=' from string, combine with optional separator and unquote spaces

    for (var i = 0; i < match.length; i += 1) {
      clean.push(match[i].replace(new RegExp('(^|[\\?&])' + k + '='), ''));
    }

    if (separator) {
      var msg = clean.join(separator); // works even if separator is undefined

      return decodeURIComponent(msg.replace(/\+/g, ' '));
    }

    if (separator === false) {
      return _.map(clean, function (msg) {
        return decodeURIComponent(msg.replace(/\+/g, ' '));
      });
    }

    return null;
  };

  var updateHash = function updateHash(key, value, hash) {
    // eslint-disable-next-line no-useless-escape
    var k = key.replace(/[*+?^$.[\]{}()|\\\/]/g, '\\$&');
    var h = _.isString(hash) ? hash : window.location.hash;
    var match = h.match(new RegExp('&?' + k + '=([^&]+)(&|$)'));

    if (match) {
      var mat = match[0].replace(match[1], value);
      return h.replace(match[0], mat);
    }

    return hash;
  };

  var difference = function difference(obj, base) {
    return _.transform(obj, function (result, value, key) {
      if (!_.isEqual(value, base[key])) {
        result[key] = _.isObject(value) && _.isObject(base[key]) ? difference(value, base[key]) : value;
      }
    });
  }; // get the current browser information


  var getBrowserInfo = function getBrowserInfo() {
    // do this inline, so we only request when necessary
    var $dd = $.Deferred(); // reject after 3 seconds

    var timeoutId = setTimeout(function () {
      $dd.reject();
    }, 3000);

    window.require(['bowser'], function (bowser) {
      window.clearTimeout(timeoutId);
      $dd.resolve(bowser.parse(window.navigator.userAgent));
    }, function () {
      $dd.reject();
    });

    return $dd.promise();
  };

  var TimingEvent = /*#__PURE__*/function () {
    function TimingEvent() {
      var timingVar = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Timers';
      var timingCategory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Generic Timer';
      var timingLabel = arguments.length > 2 ? arguments[2] : undefined;

      _classCallCheck(this, TimingEvent);

      this.timingCategory = timingCategory;
      this.timingVar = timingVar;
      this.timingLabel = timingLabel;
      this.time = null;
    }

    _createClass(TimingEvent, [{
      key: "start",
      value: function start() {
        this.time = +new Date();
        this._emitted = false;
      }
    }, {
      key: "stop",
      value: function stop() {
        // do not emit an event if we haven't started timing or already emitted
        if (this._emitted) {
          return;
        }

        var time = +new Date() - this.time;
        analytics('send', 'timing', {
          timingCategory: this.timingCategory,
          timingVar: this.timingVar,
          timingLabel: this.timingLabel,
          timingValue: time
        });
        this._emitted = true;
      }
    }]);

    return TimingEvent;
  }();

  var waitForSelector = function waitForSelector() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var $dd = $.Deferred();
    var timeout = 3100; // 31 seconds

    var ref = null;

    (function check(n) {
      var $el = $.apply(void 0, args);

      if ($el.length) {
        return $dd.resolve($el);
      }

      if (n >= timeout) {
        return $dd.reject('timeout');
      }

      ref = setTimeout(function () {
        window.requestAnimationFrame(function () {
          check(n += 1);
        });
      }, 100);
      return null;
    })(0);

    $dd.promise.destroy = function () {
      window.clearTimeout(ref);
      $dd.reject();
    };

    return $dd.promise();
  };

  var withPrerenderedContent = function withPrerenderedContent(view) {
    view.handlePrerenderedContent = function (content, $el) {
      // setup the elements so events are properly delegated
      var selector = view.tagName + '.' + view.className;
      view.$el = $(selector, $el); // stops mathjax from pre-rendering before we replace the content

      $('>', view.$el).addClass('tex2jax_ignore');
      view.el = view.$el.get(0);
      view.delegateEvents(); // replace the current marionette template renderer for a moment

      var _renderTmpl = view._renderTemplate;

      view._renderTemplate = function () {}; // reset template renderer on first model change


      view.model.once('change', function () {
        view._renderTemplate = _renderTmpl;
      });
    };

    return view;
  };

  var escapeRegExp = function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  var makeApiQuery = function makeApiQuery(params) {
    return new ApiQuery(params);
  };

  var makeApiRequest = function makeApiRequest(params) {
    return new ApiRequest(params);
  };

  var extractErrorMessageFromAjax = function extractErrorMessageFromAjax(maybeXHR, defaultMessage) {
    if (typeof maybeXHR !== 'undefined' && typeof maybeXHR.responseJSON !== 'undefined') {
      if (typeof maybeXHR.responseJSON.error === 'string') {
        return maybeXHR.responseJSON.error;
      } else if (typeof maybeXHR.responseJSON.message === 'string') {
        return maybeXHR.responseJSON.message;
      }
    }

    return defaultMessage;
  };

  return {
    qs: qs,
    updateHash: updateHash,
    difference: difference,
    getBrowserInfo: getBrowserInfo,
    TimingEvent: TimingEvent,
    waitForSelector: waitForSelector,
    withPrerenderedContent: withPrerenderedContent,
    escapeRegExp: escapeRegExp,
    makeApiQuery: makeApiQuery,
    makeApiRequest: makeApiRequest,
    extractErrorMessageFromAjax: extractErrorMessageFromAjax
  };
});
