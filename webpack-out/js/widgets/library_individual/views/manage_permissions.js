define(['marionette', 'hbs!js/widgets/library_individual/templates/manage-permissions-container', 'hbs!js/widgets/library_individual/templates/make-public', 'hbs!js/widgets/library_individual/templates/transfer-ownership-modal', 'reactify!js/react/BumblebeeWidget?LibraryCollaborators'], function (Marionette, ManagePermissionsContainer, MakePublicTemplate, transferOwnershipModal, LibraryCollaboratorsComponent) {
  var PermissionsModel = Backbone.Model.extend({});
  var PermissionsCollection = Backbone.Collection.extend({
    model: PermissionsModel
  });
  var TransferOwnershipModalView = Backbone.View.extend({
    initialize: function initialize() {
      var _this = this;

      this.render = _.debounce(this.render, 500);
      this.onConfirm = _.debounce(this.onConfirm, 1000);
      this.model = new (Backbone.Model.extend({
        defaults: {
          error: false,
          loading: false
        }
      }))();
      var container = document.createElement('div');
      document.body.appendChild(container);
      this.setElement(container);
      this.model.on('change:error', function () {
        _this.showErrorMessage();
      });
      this.model.on('change:loading', function () {
        _this.showLoading();
      });
      this.model.on('change:success', function () {
        _this.showSuccessMessage();
      });
    },
    showErrorMessage: function showErrorMessage() {
      var error = this.model.get('error');
      var el = $('#error-message', this.el);

      if (error && error.length > 0) {
        el.fadeIn();
        $('span', el).text(error);
      } else {
        el.hide();
      }
    },
    showSuccessMessage: function showSuccessMessage() {
      var success = this.model.get('success');
      var el = $('#success-message', this.el);

      if (success && success.length > 0) {
        el.fadeIn();
        $('span', el).text(success);
      } else {
        el.hide();
      }
    },
    showLoading: function showLoading() {
      var loading = this.model.get('loading');
      var el = $('#loader', this.el);
      loading ? el.show() : el.hide();
    },
    getModal: function getModal() {
      return $('#transferOwnershipModal', this.$el);
    },
    render: function render() {
      var _this2 = this;

      this.$el.html(transferOwnershipModal(this.model.toJSON()));
      this.getModal().off().on('show.bs.modal', function () {
        _this2.model.clear().set(_this2.model.defaults);
      }).on('shown.bs.modal', function () {
        $('input', _this2.$el).focus();
      });
    },
    destroy: function destroy() {
      $('#transferOwnershipModal').parent().remove();
    },
    events: {
      'click .confirm-button': '_onConfirm',
      'submit form': '_onConfirm'
    },
    getEmailAddress: function getEmailAddress() {
      return $('input', this.el).val();
    },
    _onConfirm: function _onConfirm(e) {
      this.model.set({
        loading: true,
        error: false
      });
      var msg = 'Are you sure?';

      if (confirm(msg)) {
        this.onConfirm(e);
      } else {
        this.model.set({
          loading: false,
          error: true
        });
      }
    },
    onConfirm: function onConfirm(e) {
      var _this3 = this;

      e.preventDefault();
      var email = this.getEmailAddress();
      this.trigger('confirm-transfer-ownership', email, {
        done: function done() {
          _this3.model.set({
            success: "Success! Ownership has been transferred to ".concat(email),
            loading: false
          });

          setTimeout(function () {
            _this3.getModal().modal('hide');

            _this3.trigger('reset-and-navigate');
          }, 2000);
        },
        fail: function fail(_ref) {
          var responseJSON = _ref.responseJSON;

          if (responseJSON && responseJSON.error) {
            _this3.model.set({
              error: responseJSON.error,
              loading: false
            });
          }
        }
      });
    }
  });
  var ManagePermissionsView = Marionette.ItemView.extend({
    className: 'library-admin-view',
    initialize: function initialize() {
      var _this4 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.model.set('host', window.location.host);
      this.modal = new TransferOwnershipModalView(); // just forward any trigger calls

      this.modal.on('all', function () {
        return _this4.trigger.apply(_this4, arguments);
      });
      this.libraryCollaboratorsComponent = new LibraryCollaboratorsComponent();
      this.libraryCollaboratorsComponent.dispatch({
        type: 'SET_LIBRARY_DATA',
        result: this.model.toJSON()
      });
    },
    events: {
      'click .public-button': 'togglePublicState'
    },
    togglePublicState: function togglePublicState(e) {
      var pub = $(e.target).hasClass('make-public');
      this.trigger('update-public-status', pub);
    },
    modelEvents: {
      'change:public': 'render'
    },
    template: ManagePermissionsContainer,
    renderCollaboratorsView: function renderCollaboratorsView() {
      var $collabContainer = $('#permissions-list', this.$el);

      if ($collabContainer.has('*')) {
        this.libraryCollaboratorsComponent.view.setElement($collabContainer.get(0));
        this.libraryCollaboratorsComponent.view.render();
      }
    },
    onRender: function onRender() {
      this.$('.public-container').html(MakePublicTemplate(this.model.toJSON()));
      this.renderCollaboratorsView();
      this.modal.destroy();
      this.modal.render();
    }
  });
  return ManagePermissionsView;
});
