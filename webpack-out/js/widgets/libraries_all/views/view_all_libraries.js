define(['marionette', 'hbs!js/widgets/libraries_all/templates/libraries-list-container', 'hbs!js/widgets/libraries_all/templates/library-item', 'hbs!js/widgets/libraries_all/templates/no-libraries', 'hbs!js/widgets/libraries_all/templates/loading-libraries', 'hbs!js/widgets/libraries_all/templates/error-libraries', 'hbs!js/widgets/libraries_all/templates/no-result', 'moment'], function (Marionette, LibraryContainer, LibraryItem, NoLibrariesTemplate, LoadingTemplate, ErrorTemplate, NoResultTemplate, moment) {
  var LibraryItemView = Marionette.ItemView.extend({
    // time is returned from library endpoint as utc time, but without info that it is utc
    formatDate: function formatDate(d) {
      return moment.utc(d).local().format('MMM D YYYY, h:mma');
    },
    serializeData: function serializeData() {
      var data = this.model.toJSON();
      data.libNum = Marionette.getOption(this, 'libNum');
      data.date_last_modified = this.formatDate(data.date_last_modified);
      return data;
    },
    template: LibraryItem,
    tagName: 'tr',
    triggers: {
      click: 'navigateToLibrary'
    }
  });
  var LibraryCollectionView = Marionette.CompositeView.extend({
    initialize: function initialize(options) {
      var _this = this;

      options = options || {};
      this.model.set('search_value', '');
      this.model.on('change:search_value', function () {
        return _this.triggerSearchLibraries();
      });
    },
    template: LibraryContainer,
    childViewContainer: '.libraries-list-container tbody',
    childView: LibraryItemView,
    childViewOptions: function childViewOptions(model, index) {
      return {
        libNum: index + 1
      };
    },
    childEvents: {
      navigateToLibrary: 'triggerNavigate'
    },
    events: {
      'click thead button': 'sortCollection',
      'click #library-actions': 'triggerActionsView',
      'keyup #library-search-bar': 'onLibrarySearchChange'
    },
    modelEvents: {
      change: function change() {
        this.collection.sort();
        this.render();
      }
    },
    collectionEvents: {
      reset: function reset() {
        this.collection.sort();
        this.render();
      }
    },
    triggerSearchLibraries: function triggerSearchLibraries() {
      this.trigger('search:libraries', this.model.get('search_value'));
    },
    onLibrarySearchChange: _.debounce(function () {
      this.model.set('search_value', $('#library-search-bar').val());
    }, 300),
    triggerNavigate: function triggerNavigate(childView) {
      this.trigger('navigate:library', childView.model.get('id'));
    },
    triggerActionsView: function triggerActionsView() {
      this.trigger('navigate:library-actions');
    },
    sortCollection: function sortCollection(e) {
      var sortData = $(e.currentTarget).data('sort');
      var sort = sortData.sort;
      var order = sort !== this.model.get('sort') ? 'asc' : this.model.get('order') == 'asc' ? 'desc' : 'asc';
      this.model.set({
        sort: sort,
        type: sortData.type,
        order: order
      });
    },
    render: function render() {
      if (this.collection.length > 0) {
        return Marionette.CompositeView.prototype.render.apply(this, arguments);
      } else if (this.model.get('loading')) {
        this.$el.html(LoadingTemplate());
      } else if (this.model.get('error')) {
        this.$el.html(ErrorTemplate());
      } else if (this.model.get('search_value') !== '') {
        this.$el.html(NoResultTemplate(this.model.toJSON()));
        this.focusAndSelectInput();
      } else {
        this.$el.html(NoLibrariesTemplate());
      }

      return this;
    },
    focusAndSelectInput: function focusAndSelectInput() {
      var _this2 = this;

      setTimeout(function () {
        _this2.$('#library-search-bar').focus().val(_this2.model.get('search_value'));
      }, 10);
    },
    onRender: function onRender() {
      this.focusAndSelectInput();
    }
  });
  return LibraryCollectionView;
});
