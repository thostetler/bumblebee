import FacetFactory from 'js/widgets/facet/factory';
import _ from 'underscore';

export default function(options) {
  var widget = FacetFactory.makeHierarchicalCheckboxFacet(
    _.extend(
      {
        facetField: 'aff_facet_hier',
        facetTitle: 'Institutions',
        openByDefault: false,
        logicOptions: {
          single: ['limit to', 'exclude'],
          multiple: ['and', 'or', 'exclude'],
        },
      },
      options
    )
  );

  return widget;
}
