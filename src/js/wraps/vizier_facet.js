import FacetFactory from 'js/widgets/facet/factory';

export default function() {
  var widget = FacetFactory.makeBasicCheckboxFacet({
    facetField: 'vizier_facet',
    facetTitle: 'Vizier Tables',
    logicOptions: {
      single: ['limit to', 'exclude'],
      multiple: ['and', 'or', 'exclude'],
    },
  });
  return widget;
}
