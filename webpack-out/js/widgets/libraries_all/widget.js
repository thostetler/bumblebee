define(['marionette', 'js/widgets/base/base_widget', 'js/widgets/libraries_all/views/view_all_libraries', 'utils'], function (Marionette, BaseWidget, LibrariesView, utils) {
  var LibraryModel = Backbone.Model.extend({
    defaults: function defaults() {
      return {
        name: undefined,
        description: undefined,
        id: undefined,
        permission: undefined,
        num_papers: 0,
        date_created: undefined,
        date_last_modified: undefined
      };
    }
  });
  var LibraryContainerModel = Backbone.Model.extend({
    // this determines initial sort order
    defaults: {
      loading: true,
      error: false,
      sort: 'name',
      order: 'asc',
      type: 'string'
    }
  });
  var LibraryCollection = Backbone.Collection.extend({
    initialize: function initialize(models, options) {
      this.containerModel = new LibraryContainerModel();
      this.options = options;
    },
    model: LibraryModel,
    comparator: function comparator(model1, model2) {
      var sort = this.containerModel.get('sort');
      var type = this.containerModel.get('type');
      var order = this.containerModel.get('order');

      if (type == 'string') {
        if (order == 'asc') {
          return model1.get(sort).localeCompare(model2.get(sort));
        }

        return -model1.get(sort).localeCompare(model2.get(sort));
      }

      if (type == 'date') {
        if (order == 'asc') {
          return new Date(model1.get(sort)) - new Date(model2.get(sort));
        }

        return new Date(model2.get(sort)) - new Date(model1.get(sort));
      }

      if (type == 'permission') {
        var permissionHierarchy = ['read', 'write', 'admin', 'owner'];

        if (order == 'asc') {
          return permissionHierarchy.indexOf(model1.get(sort)) - permissionHierarchy.indexOf(model2.get(sort));
        }

        return permissionHierarchy.indexOf(model2.get(sort)) - permissionHierarchy.indexOf(model1.get(sort));
      }

      if (type == 'int') {
        if (order == 'asc') {
          return model1.get(sort) - model2.get(sort);
        }

        return model2.get(sort) - model1.get(sort);
      }
    }
  }); // layout container

  var ContainerView = Marionette.LayoutView.extend({
    className: 'all-libraries-widget s-all-libraries-widget',
    template: function template() {
      return '<div class="all-libraries-container"></div>';
    },
    regions: {
      container: '.all-libraries-container'
    }
  }); // widget controller

  var LibrariesWidget = BaseWidget.extend({
    initialize: function initialize(options) {
      var options = options || {};
      this._oldCollection = null;
      this.view = new ContainerView();
      this.libraryCollection = new LibraryCollection();
    },
    activate: function activate(beehive) {
      this.setBeeHive(beehive);

      _.bindAll(this);

      var ps = this.getPubSub();
      ps.subscribe(ps.LIBRARY_CHANGE, this.updateCollection);
      ps.subscribe(ps.CUSTOM_EVENT, this.onCustomEvent); // initial data request

      this.getData();
    },
    reset: function reset() {
      this.getData();
    },
    getData: function getData() {
      var that = this;
      this.getBeeHive().getObject('LibraryController').getLibraryMetadata().done(function (data) {
        that.updateCollection.call(that, data);
      });
    },
    onCustomEvent: function onCustomEvent(event) {
      if (event === 'libraries:request:fail') {
        this.libraryCollection.containerModel.set({
          loading: false,
          error: true
        });
      }
    },
    updateCollection: function updateCollection(data) {
      this.libraryCollection.containerModel.set({
        loading: false,
        error: false
      });
      this.libraryCollection.reset(data);
    },
    setSubView: function setSubView(data) {
      var view = data.view;

      switch (view) {
        case 'libraries':
          var subView = new LibrariesView({
            collection: this.libraryCollection,
            model: this.libraryCollection.containerModel
          });
          subView.on('all', this.handleSubViewEvents);
          this.view.container.show(subView);
          break;
      }
    },
    filterLibraries: function filterLibraries() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      if (value === '') {
        if (this._oldCollection) {
          this.updateCollection(this._oldCollection.toArray());
        }

        return;
      }

      if (!this._oldCollection) {
        this._oldCollection = this.libraryCollection.clone();
      }

      var regex = new RegExp("^.*".concat(utils.escapeRegExp(value), ".*$"), 'gi');

      var result = this._oldCollection.clone().filter(function (m) {
        return m.get('name').match(regex) || m.get('description').match(regex);
      });

      this.updateCollection(result);
    },
    handleSubViewEvents: function handleSubViewEvents(event, arg1, arg2) {
      var pubsub = this.getPubSub();

      switch (event) {
        case 'navigate:library':
          // where arg1 = library's id
          pubsub.publish(pubsub.NAVIGATE, 'IndividualLibraryWidget', {
            subView: 'library',
            id: arg1
          });
          break;

        case 'search:libraries':
          this.filterLibraries(arg1);
          break;
      }
    }
  });
  return LibrariesWidget;
});
