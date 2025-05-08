define(['./toc_widget_collection'], function(
  { WidgetCollection }
) {

  const WidgetModel = Backbone.Model.extend({
    defaults: function() {
      return {
        bibcode: undefined,
        query: undefined,
        path: undefined,
        idAttribute: undefined,
      };
    },
  });

  /*
   * Widget to coordinate the showing of other widgets within the framework of a TOC page manager.
   * Requires:
   *   - A template with nav elements using data attributes corresponding to NAV EVENTS (e.g. "ShowAbstract")
   *   - A navConfig object with structure:
   *       {
   *         SomeWidgetId: { title: "...", path: "...", category: "...", ... }
   *       }
   */
  return Marionette.ItemView.extend({
    initialize: function(options = {}) {
      this.collection = options.collection || new WidgetCollection();
      this.model = options.model || new WidgetModel();
      this.on('page-manager-message', this.onPageManagerMessage);

      this.listenTo(this.collection, 'widget-selected', function(model) {
        const val = model.get('id').split('__');
        this.model.set({
          path: model.get('path'),
          idAttribute: val[0],
          subView: val.length > 1 ? val[1] : undefined,
        });

        this.triggerSelection();
      });

      if (!options.template) {
        this.template = () => '';
      }
    },

    noDetach: true,

    serializeData: function() {
      const data = this.model.toJSON();
      const col = this.collection.toJSON();

      const hasCategories = _.some(col, (c) => c.category !== undefined);

      if (hasCategories) {
        const grouped = _.groupBy(col, (obj) => obj.category);
        return _.extend(data, grouped);
      }

      return _.extend(data, { tabs: col });
    },

    events: {
      'click a': 'navigateToPage',
    },

    navigateToPage: function(e) {
      const $target = $(e.currentTarget);
      const idAttribute = $target.attr('data-widget-id');

      if ($target.find('div').hasClass('s-nav-inactive')) return false;

      if (idAttribute !== this.$('.s-nav-selected').attr('data-widget-id')) {
        this.collection.selectOne(idAttribute);
        this.$el.parent('.nav-container').removeClass('show');
        $('button.toggle-menu').html('<i class="fa fa-bars" aria-hidden="true"></i> Show Menu');
      }

      return false;
    },

    modelEvents: {
      'change:bibcode': 'resetActiveStates',
      change: 'render',
    },

    collectionEvents: {
      add: 'render',
      'change:isActive': 'render',
      'change:isSelected': 'render',
      'change:numFound': 'render',
    },

    resetActiveStates: function() {
      const path = this.model.get('path');

      this.collection.each(function(model) {
        model.set({
          isActive: true,
          numFound: 0,
        });
        if (path && path === model.get('path')) {
          model.set('isSelected', true);
        }
      });

      this.triggerSelection();
    },

    triggerSelection: function() {
      if (this.collection.where({ isSelected: true }).length === 0) {
        return this.collection.selectOne('ShowAbstract');
      }

      const path = this.model.get('path') || 'abstract';
      const encodedId = encodeURIComponent(this.model.get('bibcode'));

      const data = {
        idAttribute: this.model.get('idAttribute') || 'showAbstract',
        subView: this.model.get('subView') || '',
        href: `abs/${encodedId || ''}/${path}`,
        bibcode: this.model.get('bibcode'),
      };

      this.trigger('page-manager-event', 'widget-selected', data);
    },

    selectDefaultNavItem: function() {
      const tocConfig = Marionette.getOption(this, 'navConfig');
      let found = Object.keys(tocConfig)[0];

      _.each(tocConfig, function(v, k) {
        if (v.isSelected) {
          found = k;
          return false;
        }
      });

      this.collection.selectOne(found);
    },
    onPageManagerMessage: function(event, data) {
      if (event === 'new-widget') {
        const widgetId = data;
        const tocData = Marionette.getOption(this, 'navConfig');
        const widgetData = tocData[widgetId];

        if (widgetData) {
          const toAdd = _.extend(_.clone(widgetData), { id: widgetId });
          this.collection.add(toAdd);
        } else {
          const widgetsWithSubViews = _.pick(tocData, function(v, k) {
            return k.split('__')[0] === widgetId;
          });

          _.each(
            widgetsWithSubViews,
            function(v, k) {
              const toAdd = _.extend(_.clone(v), { id: k });
              this.collection.add(toAdd);
            },
            this
          );
        }
      } else if (event === 'widget-ready') {
        if (data.noDocs) {
          return this.selectDefaultNavItem();
        }

        const model = this.collection.get(data.widgetId);
        _.defaults(data, { isActive: !!data.numFound });

        if (model) {
          model.set(_.pick(data, model.keys()));
        }

        if (data.shouldReset) {
          if (model && model.get('isSelected')) {
            this.selectDefaultNavItem();
          }
          if (model) {
            model.set('isActive', false);
          }
        }
      } else if (event === 'broadcast-payload') {
        this.model.set('bibcode', data.bibcode);
      } else if (event === 'dynamic-nav') {
        // expects object like {links : [{title: x, id : y}]}
        // insert dynamic nav entries into the nav template
      }

      if (event === 'new-widget') {
        // if no items are selected, select the default
        if (this.collection.where({ isSelected: true }).length === 0) {
          const defaultId = this.model.get('idAttribute') || 'SearchWidget';
          this.collection.selectOne(defaultId);
        }
      }
    },
  });
});
