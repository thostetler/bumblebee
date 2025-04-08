import FacetFactory from 'js/widgets/facet/factory';
  export default function() {
    var widget = FacetFactory.makeBasicCheckboxFacet({
      facetField: 'bibstem_facet',
      facetTitle: 'Publications',
      logicOptions: {
        single: ['limit to', 'exclude'],
        multiple: ['or', 'exclude'],
      },
    });
    return widget;
  };

