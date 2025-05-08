import BumblebeeWidget from './BumblebeeWidget';
import RecommenderComponent from './Recommender/index';

export default BumblebeeWidget.extend({
  initialize(args) {
    this.view = new RecommenderComponent();

    // Call parent initialize with componentId injected
    BumblebeeWidget.prototype.initialize.call(this, { componentId: 'Recommender', ...args });
  },
});
