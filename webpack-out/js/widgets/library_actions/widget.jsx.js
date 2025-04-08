function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

define(['underscore', 'backbone', 'react', 'react-dom', 'js/widgets/base/base_widget', 'js/widgets/library_actions/components/app.jsx'], function (_, Backbone, React, ReactDOM, BaseWidget, App) {
  var Model = Backbone.Model.extend({
    defaults: {
      items: [],
      loading: true,
      submitting: false
    }
  });
  var View = Backbone.View.extend({
    initialize: function initialize(options) {
      // provide this with all the options passed in
      _.assign(this, options);

      this.listenTo(this.model, 'change', this.render);
      this.component = null;
    },
    render: function render() {
      var _this = this;

      ReactDOM.render( /*#__PURE__*/React.createElement(App, {
        loading: this.model.get('loading'),
        items: this.model.get('items'),
        submitting: this.model.get('submitting'),
        onSubmit: function onSubmit(data) {
          return _this.trigger('submit', data);
        },
        onRef: function onRef(ref) {
          return _this.component = ref;
        }
      }), this.el);
      return this;
    },
    destroy: function destroy() {
      // on destroy, make sure the React DOM is unmounted
      ReactDOM.unmountComponentAtNode(this.el);
    },
    reset: function reset() {
      this.destroy();
      this.model.set(this.model.defaults);
      this.render();
    }
  });
  var Widget = BaseWidget.extend({
    initialize: function initialize() {
      this.model = new Model(); // create the view, passing in store

      this.view = new View({
        model: this.model
      });
      this.listenTo(this.view, 'submit', this.onSubmit);
    },
    reset: function reset() {
      this.view.reset();
      this.getData();
    },
    getData: function getData() {
      var _this2 = this;

      if (this.hasBeeHive()) {
        this.model.set('loading', true);
        this.getBeeHive().getObject('LibraryController').getLibraryMetadata().done(function (data) {
          if (!data || data.length === 0) {
            return _this2.close();
          } // only allow libraries where user has owner/admin/write permission


          var libs = _.reduce(data, function (acc, d) {
            if (/^(owner|admin|write)$/i.test(d.permission)) {
              var lib = _.pick(d, ['id', 'name']);

              if (d.permission !== 'owner') lib.name = "".concat(lib.name, "  (").concat(d.owner, ")");
              acc.push(lib);
            }

            return acc;
          }, []); // sort library items by name


          libs = _.sortBy(libs, 'name');

          _this2.model.set({
            items: libs,
            loading: false
          });
        }).fail(function () {
          _this2.close();
        });
      } else {
        this.close();
      }
    },
    close: function close() {
      var ps = this.getPubSub();
      ps.publish(ps.NAVIGATE, 'AllLibrariesWidget');
    },
    onSubmit: function onSubmit(_ref) {
      var _this3 = this;

      var action = _ref.action,
          secondary = _ref.secondary,
          source = _ref.source,
          target = _ref.target;

      var updateStatus = _.bind(this.view.component.updateStatus, this.view.component);

      this.model.set('submitting', true);
      this.getBeeHive().getObject('LibraryController').performLibraryOperation(source, {
        action: action,
        libraries: secondary,
        name: target || undefined
      }).done(function (_ref2) {
        var id = _ref2.id,
            name = _ref2.name;

        var ps = _this3.getPubSub();

        ps.publish(ps.CUSTOM_EVENT, 'invalidate-library-metadata');
        var message = '';

        if (id && name) {
          message += "<u><a href=\"#/user/libraries/".concat(id, "\">").concat(name, "</a></u> created");

          var libs = _.sortBy([].concat(_toConsumableArray(_this3.model.get('items')), [{
            id: id,
            name: name
          }]), 'name');

          _this3.model.set('items', libs);
        }

        updateStatus({
          result: 'success',
          message: message
        });
      }).fail(function (ev) {
        var message = ev.responseJSON && ev.responseJSON.error || '';
        updateStatus({
          result: 'error',
          message: message
        });
      }).always(function () {
        _this3.model.set('submitting', false);
      });
    }
  });
  return Widget;
});
