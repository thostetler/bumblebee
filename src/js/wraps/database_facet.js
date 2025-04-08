import FacetFactory from 'js/widgets/facet/factory';

export default function() {
  var widget = FacetFactory.makeBasicCheckboxFacet({
    facetField: 'database',
    facetTitle: 'Collections',
    openByDefault: true,
    logicOptions: {
      single: ['limit to', 'exclude'],
      multiple: ['and', 'or', 'exclude'],
    },
  });
  return widget;
}
