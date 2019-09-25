// this module is not loaded directly, it must be loaded using reactify!
// in order for the view to be dynamically injected

define([
  'underscore',
  'js/widgets/base/base_widget',
  'js/components/api_request',
  'js/components/api_query',
], function(_, BaseWidget, ApiRequest, ApiQuery) {
  const BumblebeeWidget = BaseWidget.extend({
    initialize({ componentId }) {
      this.view.on({
        sendRequest: _.bind(this.onSendRequest, this),
        subscribeToPubSub: _.bind(this.subscribeToPubSub, this),
        publishToPubSub: _.bind(this.publishToPubSub, this),
        doSearch: _.bind(this.doSearch, this),
        getCurrentQuery: _.bind(this.onGetCurrentQuery, this),
        isLoggedIn: _.bind(this.isLoggedIn, this),
      });

      this.listenTo(this, 'page-manager-message', (ev, data) => {
        if (ev === 'widget-selected' && data.idAttribute === componentId) {
          this.view.destroy().render();
        }
      });
    },
    activate(beehive) {
      this.setBeeHive(beehive);
      const ps = this.getPubSub();
      ps.subscribe(
        ps.USER_ANNOUNCEMENT,
        this.handleUserAnnouncement.bind(this)
      );
    },
    handleUserAnnouncement(event, data) {
      const user = this.getBeeHive().getObject('User');
      if (event == user.USER_SIGNED_IN) {
      } else if (event == user.USER_SIGNED_OUT) {
      }
    },
    isLoggedIn(cb) {
      const user = this.getBeeHive().getObject('User');
      cb(user.isLoggedIn());
    },
    onGetCurrentQuery(callback) {
      callback(this.getCurrentQuery());
    },
    subscribeToPubSub(event, callback) {
      const ps = this.getPubSub();
      ps.subscribe(ps[event], callback);
    },
    publishToPubSub(event, ...args) {
      const ps = this.getPubSub();
      ps.publish(ps[event], ...args);
    },
    doSearch(queryParams) {
      const query = new ApiQuery();
      _.isString(queryParams)
        ? query.load(queryParams)
        : query.set({ ...queryParams });
      this.publishToPubSub('NAVIGATE', 'search-page', {
        q: query,
      });
    },
    onSendRequest({ options, target, query }) {
      const ps = this.getPubSub();
      const request = new ApiRequest({
        target,
        query: new ApiQuery(query),
        options,
      });
      ps.publish(ps.EXECUTE_REQUEST, request);
    },
  });

  return BumblebeeWidget;
});
