import FacetFactory from 'js/widgets/facet/factory';
  export default function() {
    var widget = FacetFactory.makeBasicCheckboxFacet({
      facetField: 'data_facet',
      facetTitle: 'Data',
      logicOptions: {
        single: ['limit to', 'exclude'],
        multiple: ['and', 'or', 'exclude'],
      },
    });
    return widget;
  };

