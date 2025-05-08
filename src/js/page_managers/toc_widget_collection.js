import Backbone from 'backbone';

const WidgetData = Backbone.Model.extend({
  defaults: function() {
    return {
      id: undefined,
      path: undefined,
      title: undefined,
      showCount: false,
      category: undefined,
      isActive: false,
      isSelected: false,
      numFound: 0,
      alwaysThere: false,
    };
  },
});

const WidgetCollection = Backbone.Collection.extend({
  model: WidgetData,

  initialize: function(options) {
    this.on('change:isSelected', function(model) {
      if (model.get('isSelected')) {
        this.trigger('widget-selected', model);
      }
    });
  },

  selectOne: function(widgetId) {
    let selected = null;

    this.each(function(model) {
      if (model.id === widgetId) {
        selected = model;
      } else {
        model.set('isSelected', false, { silent: true });
      }
    });

    if (!selected) {
      console.warn(`Widget ID "${widgetId}" not found in collection.`);
      return;
    }

    selected.set('isSelected', true);
  },

  comparator: function(model) {
    return model.get('order');
  },
});



export { WidgetData, WidgetCollection };
