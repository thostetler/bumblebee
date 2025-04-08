/*
 widgets can attach callbacks to a deferred that waits until
 * a new csrf token has been requested
 *
 * */
import Backbone from 'backbone';
import GenericModule from 'js/components/generic_module';
import Hardened from 'js/mixins/hardened';
import ApiRequest from 'js/components/api_request';
import ApiTargets from 'js/components/api_targets';
import Dependon from 'js/mixins/dependon';
  var CSRFManager = GenericModule.extend({
    activate: function(beehive) {
      this.setBeeHive(beehive);
      var pubsub = this.getPubSub();

      _.bindAll(this, ['resolvePromiseWithNewKey']);
      pubsub.subscribe(
        pubsub.DELIVERING_RESPONSE,
        this.resolvePromiseWithNewKey
      );
    },

    getCSRF: function() {
      this.deferred = $.Deferred();

      var request = new ApiRequest({
        target: ApiTargets.CSRF,
      });

      var pubsub = this.getPubSub();
      pubsub.publish(pubsub.EXECUTE_REQUEST, request);
      return this.deferred.promise();
    },

    resolvePromiseWithNewKey: function(response) {
      // get csrf here
      var csrf = response.toJSON().csrf;
      this.deferred.resolve(csrf);
    },

    hardenedInterface: {
      getCSRF: 'getCSRF',
    },
  });

  _.extend(CSRFManager.prototype, Hardened, Dependon.BeeHive);

  export default CSRFManager;

