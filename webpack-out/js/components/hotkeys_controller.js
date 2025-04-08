function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

define(['js/components/generic_module', 'js/mixins/dependon', 'js/mixins/hardened', 'js/components/api_feedback', 'hotkeys'], function (GenericModule, Dependon, Hardened, ApiFeedback, hotkeys) {
  var MODIFIER = 'alt+shift';

  var mod = function mod(val) {
    var arr = Array.isArray(val) ? val : [val];
    return arr.map(function (key) {
      return "".concat(MODIFIER, "+").concat(key);
    }).join(', ');
  };

  var HOTKEYS = [{
    hotkey: mod('a'),
    event: 'search',
    description: 'Focus on search bar'
  }, {
    hotkey: mod('left'),
    event: 'prev',
    description: 'Previous results page'
  }, {
    hotkey: mod('right'),
    event: 'next',
    description: 'Next results page'
  }, {
    hotkey: mod('down'),
    event: 'item-next',
    description: 'Focus on next result entry'
  }, {
    hotkey: mod('up'),
    event: 'item-prev',
    description: 'Focus on previous result entry'
  }, {
    hotkey: mod('s'),
    event: 'item-select',
    description: 'Select currently focused result entry'
  }, {
    hotkey: mod('`'),
    event: 'show-help',
    description: 'Show help dialog'
  }];
  var HotkeysController = GenericModule.extend({
    initialize: function initialize() {},
    createEvent: function createEvent(name) {
      var ps = this.getPubSub();
      return function (e) {
        ps.publish(ps.CUSTOM_EVENT, name, e);
      };
    },
    activate: function activate(beehive) {
      var _this = this;

      this.setBeeHive(beehive);
      HOTKEYS.forEach(function (_ref) {
        var hotkey = _ref.hotkey,
            event = _ref.event;
        hotkeys(hotkey, _this.createEvent("hotkey/".concat(event)));
      });
      var ps = this.getPubSub();
      ps.subscribe(ps.CUSTOM_EVENT, function (e) {
        if (e === 'hotkey/show-help') {
          _this.showHelpModal();
        }
      });
    },
    getHotkeys: function getHotkeys() {
      return HOTKEYS;
    },
    showHelpModal: function showHelpModal() {
      var pubsub = this.getPubSub();
      pubsub.publish(pubsub.FEEDBACK, new ApiFeedback({
        code: ApiFeedback.CODES.ALERT,
        msg: this.getModalMessage(),
        title: 'Hotkeys',
        modal: true
      }));
    },
    getModalMessage: function getModalMessage() {
      return ['<dl style="display: flex; flex-flow: row wrap;">'].concat(_toConsumableArray(HOTKEYS.map(function (_ref2) {
        var hotkey = _ref2.hotkey,
            description = _ref2.description;
        var hotkeyList = hotkey.split(', ').map(function (c) {
          return "<code>".concat(c, "</code>");
        }).join(', ');
        return "\n            <dt style=\"flex-basis: 40%; text-align: right; padding-right: 10px\">".concat(hotkeyList, "</dt>\n            <dd style=\"flex-basis: 60%\">").concat(description, "</dd>\n          ");
      })), ['</dl>']).join('');
    },
    hardenedInterface: {}
  });

  _.extend(HotkeysController.prototype, Dependon.BeeHive, Hardened);

  return HotkeysController;
});
