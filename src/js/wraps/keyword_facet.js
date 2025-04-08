import FacetFactory from 'js/widgets/facet/factory';

export default function() {
  var widget = FacetFactory.makeBasicCheckboxFacet({
    facetField: 'keyword_facet',
    facetTitle: 'Keywords',
    logicOptions: {
      single: ['limit to', 'exclude'],
      multiple: ['and', 'or', 'exclude'],
    },
  });
  return widget;
}
