function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

define(['underscore', 'marionette', 'hbs!js/widgets/preferences/templates/application', 'js/widgets/config'], function (_, Marionette, ApplicationTemplate, config) {
  var DEFAULTS = {
    numAuthors: {
      initialOptions: _.range(1, 11).concat(['all']),
      initialValue: 4
    },
    externalLinks: {
      initialOptions: ['Auto', 'Open new tab', 'Open in current tab'],
      initialValue: 'Auto'
    },
    homePage: {
      initialOptions: ['Modern Form', 'Classic Form', 'Paper Form'],
      initialValue: 'Modern Form'
    },
    database: {
      'All': false,
      'Physics': false,
      'Astronomy': false,
      'General': false,
      'Earth Science': false
    },
    hideSidebars: {
      initialValue: 'Show',
      initialOptions: ['Show', 'Hide']
    }
  };

  var isEqualToDefault = function isEqualToDefault(prop, value) {
    if (prop === 'numAuthorsSelected') {
      return value === DEFAULTS.numAuthors.initialValue;
    }

    if (prop === 'externalLinksSelected') {
      return value === DEFAULTS.externalLinks.initialValue;
    }

    if (prop === 'homePageSelected') {
      return value === DEFAULTS.homePage.initialValue;
    }

    if (prop === 'hideSideBarsSelected') {
      return value === DEFAULTS.hideSidebars.initialValue;
    }

    if (prop === 'databaseSelected') {
      return _.isEqual(value, DEFAULTS.database.initialValue);
    }

    return false;
  };
  /**
   * Incoming database isa an array of objects, we need to transform and merge it to our internal format
   * @param databases
   * @returns {*|*[]}
   */


  var mergeDatabases = function mergeDatabases(databases) {
    if (!Array.isArray(databases) || Array.isArray(databases) && databases.length === 0) {
      return DEFAULTS.database;
    } // remove any undefined values


    var cleanedDbs = databases.filter(function (d) {
      return !!d;
    });
    var merged = {};
    Object.keys(DEFAULTS.database).forEach(function (name) {
      var found = cleanedDbs.find(function (d) {
        return d.name === name;
      });
      merged[name] = found ? !!found.value : DEFAULTS.database[name];
    });
    return merged;
  };
  /**
   * Transform the internal database format to the external format
   * @param databases
   */


  var transformDatabases = function transformDatabases(databases) {
    return Object.keys(databases).map(function (name) {
      return {
        name: name,
        value: databases[name]
      };
    });
  };

  var watchedProps = ['numAuthorsSelected', 'externalLinksSelected', 'databaseSelected', 'homePageSelected', 'hideSideBarsSelected'];
  var ApplicationView = Marionette.ItemView.extend({
    initialize: function initialize() {
      // Get the latest value from the incoming model, or just take the default
      var numAuthors = this.model.get('minAuthorsPerResult') || DEFAULTS.numAuthors.initialValue;
      var externalLinks = this.model.get('externalLinkAction') || DEFAULTS.externalLinks.initialValue;
      var homePage = this.model.get('homePage') || DEFAULTS.homePage.initialValue;
      var hideSidebars = this.model.get('defaultHideSidebars') || DEFAULTS.hideSidebars.initialValue;
      var databases = mergeDatabases(this.model.get('defaultDatabase')); // must clone the props that will get mutated

      this.model.set({
        numAuthorsOptions: DEFAULTS.numAuthors.initialOptions,
        numAuthorsDefault: DEFAULTS.numAuthors.initialValue,
        numAuthorsSelected: this._convertToNumber(_.clone(numAuthors)),
        externalLinksOptions: DEFAULTS.externalLinks.initialOptions,
        externalLinksDefault: DEFAULTS.externalLinks.initialValue,
        externalLinksSelected: _.clone(externalLinks),
        // remove the 'All' database from the list, so it doesn't get rendered as a button
        databaseSelected: databases,
        databaseOptions: Object.keys(databases).filter(function (name) {
          return name !== 'All';
        }),
        homePageOptions: DEFAULTS.homePage.initialOptions,
        homePageDefault: DEFAULTS.homePage.initialValue,
        homePageSelected: _.clone(homePage),
        hideSideBarsDefault: DEFAULTS.hideSidebars.initialValue,
        hideSideBarsOptions: DEFAULTS.hideSidebars.initialOptions,
        hideSideBarsSelected: _.clone(hideSidebars),
        modifySections: _toConsumableArray(Object.keys(databases).some(function (name) {
          return databases[name];
        }) ? ['database'] : [])
      });
      this.model.trigger('change');
      this.render = _.debounce(_.bind(this.render), 60);
    },
    template: ApplicationTemplate,
    className: 'panel panel-default s-form-container',
    events: {
      'click .database-select': 'onDatabaseSelect',
      'change #database_all': 'onDatabaseALLSelect',
      'change select': 'syncModel',
      'click .section-modify': 'onModifySection',
      'click .section-reset': 'onResetSection',
      'click .reset-to-defaults': 'onResetToDefaults'
    },
    modelEvents: {
      change: 'render'
    },
    onDatabaseALLSelect: function onDatabaseALLSelect(e) {
      var checked = $(e.currentTarget).prop('checked');
      this.model.set('databaseSelected', _objectSpread({}, DEFAULTS.database, {
        All: checked
      }));
      this.model.trigger('change');
    },
    onDatabaseSelect: function onDatabaseSelect(e) {
      var dbState = this.model.get('databaseSelected'); // if 'ALL' selected, then the other options are disabled

      if (dbState.All) {
        return;
      }

      var id = $(e.currentTarget).data('id');
      this.model.set('databaseSelected', _objectSpread({}, dbState, _defineProperty({}, id, !dbState[id])));
      this.model.trigger('change');
    },
    onModifySection: function onModifySection(e) {
      var section = $(e.currentTarget).data('section');
      this.model.set('modifySections', [].concat(_toConsumableArray(this.model.get('modifySections')), [section]));
    },
    onResetSection: function onResetSection(e) {
      var section = $(e.currentTarget).data('section');
      this.model.set(_objectSpread({
        modifySections: this.model.get('modifySections').filter(function (s) {
          return s !== section;
        })
      }, section === 'database' ? {
        databaseSelected: DEFAULTS.database
      } : {}));
      this.model.trigger('change');
    },
    _convertToNumber: function _convertToNumber(val) {
      try {
        return _.isNaN(Number(val)) ? val : Number(val);
      } catch (e) {
        return val;
      }
    },
    _convertToString: function _convertToString(val) {
      try {
        return String(val) !== '[object Object]' ? String(val) : val;
      } catch (e) {
        return val;
      }
    },
    syncModel: function syncModel() {
      var update = {};
      var convert = this._convertToNumber;
      $('.form-control', this.el).each(function () {
        var $el = $(this);
        var val = $el.val();

        if (!$el.data('noConvert')) {
          val = convert(val);
        }

        update[$el.attr('id') + 'Selected'] = val;
      });
      this.model.set(update);
    },
    onSubmit: function onSubmit() {
      this.model.set({
        updateSucceeded: false,
        updateFailed: false,
        loading: true
      });
      this.syncModel();
      this.trigger('change:applicationSettings', {
        minAuthorsPerResult: this._convertToString(this.model.get('numAuthorsSelected')),
        externalLinkAction: this.model.get('externalLinksSelected'),
        defaultDatabase: transformDatabases(this.model.get('databaseSelected')),
        defaultHideSidebars: this.model.get('hideSideBarsSelected'),
        homePage: this.model.get('homePageSelected')
      });
      return false;
    },
    onCancel: function onCancel(e) {
      this.initialize();
      return false;
    },
    onResetToDefaults: function onResetToDefaults() {
      // clear the model
      this.model.set({
        minAuthorsPerResult: undefined,
        externalLinkAction: undefined,
        defaultDatabase: undefined,
        defaultHideSidebars: undefined
      }, {
        unset: true
      });
      this.onCancel.apply(this, arguments);
    },
    onError: function onError() {
      var _this = this;

      var model = this.model;
      model.set({
        updateFailed: true,
        loading: false
      });
      setTimeout(function () {
        model.set('updateFailed', false, {
          silent: true
        });

        _this.hideMessage();
      }, 5000);
    },
    onSuccess: function onSuccess() {
      var _this2 = this;

      var model = this.model;
      model.set({
        updateSucceeded: true,
        loading: false
      });
      setTimeout(function () {
        model.set('updateSucceeded', false, {
          silent: true
        });

        _this2.hideMessage();
      }, 3000);
    },
    hideMessage: function hideMessage() {
      $('#app-settings-msg').fadeOut(500, function () {
        $(this).empty();
      });
    },
    onSortChange: function onSortChange(e, ui) {
      var items = _.clone(this.model.get('addCustomFormatOptions'));

      var index = this.$('#addCustomFormat .list-group-item').index(ui.item);
      var id = this.$(ui.item).data('id');

      var fIndex = _.findIndex(items, {
        id: id
      }); // swap


      if (index !== fIndex) {
        items.splice(index, 0, items.splice(fIndex, 1)[0]);
      }

      this.model.set('addCustomFormatOptions', items);
    },
    isEditing: function isEditing() {
      return _.any(this.model.get('addCustomFormatOptions'), {
        editing: true
      });
    },
    _renderCount: 1,
    onRender: function onRender() {
      var _this3 = this;

      // skip initial x renders, because when we first get data it'll render and detect a change
      if (this._renderCount > 0) {
        this._renderCount -= 1;
        return;
      }

      var onSortChange = _.bind(this.onSortChange, this);

      setTimeout(function () {
        $('#addCustomFormat').sortable({
          axis: 'y',
          items: '.list-group-item',
          update: onSortChange,
          scroll: true,
          scrollSensitivity: 80,
          scrollSpeed: 3
        });
      }, 100); // check if any of the watched props matched the ones changed

      _.forEach(watchedProps, function (p) {
        if (_this3.model.changed[p]) {
          // check if the prop is custom format
          if (p === 'addCustomFormatOptions') {
            var isEditing = _this3.isEditing(); // we don't want to submit if we're editing a custom format, just continue


            if (isEditing) {
              return true;
            }
          } // execute submit


          _this3.onSubmit();

          return false;
        }
      });
    }
  });
  return ApplicationView;
});
