import Reducer from 'js/widgets/facet/reducers';
import Redux from 'redux';
import Thunk from 'redux-thunk';
import _ from 'underscore';

export default function createStore(config) {
  // pass in specific default config vars (e.g. preprocessors)
  // these come from the facet widget's initialize method
  var config = {
    config: _.assign({}, Reducer.defaultState.config, config),
  };
  var store = _.assign({}, _.cloneDeep(Reducer.defaultState), config);
  return Redux.createStore(Reducer, store, Redux.applyMiddleware(Thunk.default));
}
export default createStore;
