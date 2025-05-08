import BumblebeeWidget from './BumblebeeWidget';
import FeedbackForms from './FeedbackForms';

export default BumblebeeWidget.extend({
  initialize(args) {
    this.view = new FeedbackForms();

    // Call parent initialize with componentId injected
    BumblebeeWidget.prototype.initialize.call(this, { componentId: 'Recommender', ...args });
  },
});
