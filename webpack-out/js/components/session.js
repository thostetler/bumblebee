/*
 * A generic class that lazy-loads User info
 */
define(['backbone', 'js/components/api_request', 'js/components/api_targets', 'js/mixins/hardened', 'js/components/generic_module', 'js/mixins/dependon', 'js/components/api_query', 'js/components/user', 'js/components/api_feedback', 'js/mixins/api_access', 'utils'], function (Backbone, ApiRequest, ApiTargets, Hardened, GenericModule, Dependon, ApiQuery, User, ApiFeedback, ApiAccess, utils) {
  var SessionModel = Backbone.Model.extend({
    defaults: function defaults() {
      return {
        resetPasswordToken: undefined
      };
    }
  });
  var payloads = {
    login: ['email', 'password'],
    register: ['given_name', 'family_name', 'email', 'password1', 'password2', 'g-recaptcha-response'],
    resetPassword1: ['g-recaptcha-response'],
    resetPassword2: ['password1', 'password2']
  };

  var getPayload = function getPayload(data, type) {
    return JSON.stringify(_.pick(data, payloads[type]));
  };

  var Session = GenericModule.extend({
    initialize: function initialize(options) {
      var options = options || {}; // right now, this will only be used if someone forgot their password

      this.model = new SessionModel();
      this.test = options.test ? true : undefined;

      _.bindAll(this, ['loginSuccess', 'loginFail', 'registerSuccess', 'registerFail', 'resetPassword1Success', 'resetPassword1Fail', 'resetPassword2Success', 'resetPassword2Fail']);
    },
    activate: function activate(beehive) {
      this.setBeeHive(beehive);
    },

    /* methods that will be available to widgets */
    login: function login(data) {
      var d = $.Deferred();
      var that = this;
      this.sendRequestWithNewCSRF(function (csrfToken) {
        var request = new ApiRequest({
          target: ApiTargets.LOGIN,
          query: new ApiQuery({}),
          options: {
            type: 'POST',
            data: getPayload(data, 'login'),
            contentType: 'application/json',
            headers: {
              'X-CSRFToken': csrfToken
            },
            done: function done() {
              // allow widgets to listen for success or failure
              d.resolve.apply(d, arguments); // session response to success

              that.loginSuccess.apply(that, arguments);
            },
            fail: function fail() {
              d.reject.apply(d, arguments);
              that.loginFail.apply(that, arguments);
            },
            beforeSend: function beforeSend(jqXHR, settings) {
              jqXHR.session = this;
            }
          }
        });
        return this.getBeeHive().getService('Api').request(request);
      });
      return d.promise();
    },

    /*
     * every time a csrf token is required, csrf manager will request a new token,
     * and it allows you to attach callbacks to the promise it returns
     * */
    sendRequestWithNewCSRF: function sendRequestWithNewCSRF(callback) {
      callback = _.bind(callback, this);
      this.getBeeHive().getObject('CSRFManager').getCSRF().done(callback);
    },
    logout: function logout() {
      this.sendRequestWithNewCSRF(function (csrfToken) {
        var request = new ApiRequest({
          target: ApiTargets.LOGOUT,
          query: new ApiQuery({}),
          options: {
            context: this,
            type: 'POST',
            headers: {
              'X-CSRFToken': csrfToken
            },
            contentType: 'application/json',
            fail: this.logoutSuccess,
            done: this.logoutSuccess
          }
        });
        return this.getBeeHive().getService('Api').request(request);
      });
    },
    register: function register(data) {
      this.sendRequestWithNewCSRF(function (csrfToken) {
        var request = new ApiRequest({
          target: ApiTargets.USER,
          query: new ApiQuery({}),
          options: {
            type: 'POST',
            data: getPayload(data, 'register'),
            contentType: 'application/json',
            headers: {
              'X-CSRFToken': csrfToken
            },
            done: this.registerSuccess,
            fail: this.registerFail
          }
        });
        return this.getBeeHive().getService('Api').request(request);
      });
    },
    resetPassword1: function resetPassword1(data) {
      var email = data.email;

      var data = _.omit(data, 'email');

      this.sendRequestWithNewCSRF(function (csrfToken) {
        var request = new ApiRequest({
          target: ApiTargets.RESET_PASSWORD + '/' + email,
          query: new ApiQuery({}),
          options: {
            type: 'POST',
            data: getPayload(data, 'resetPassword1'),
            headers: {
              'X-CSRFToken': csrfToken
            },
            contentType: 'application/json',
            done: this.resetPassword1Success,
            fail: this.resetPassword1Fail
          }
        });
        return this.getBeeHive().getService('Api').request(request);
      });
    },
    resetPassword2: function resetPassword2(data) {
      this.sendRequestWithNewCSRF(function (csrfToken) {
        var request = new ApiRequest({
          target: ApiTargets.RESET_PASSWORD + '/' + this.model.get('resetPasswordToken'),
          query: new ApiQuery({}),
          options: {
            type: 'PUT',
            data: getPayload(data, 'resetPassword2'),
            contentType: 'application/json',
            headers: {
              'X-CSRFToken': csrfToken
            },
            done: this.resetPassword2Success,
            fail: this.resetPassword2Fail
          }
        });
        return this.getBeeHive().getService('Api').request(request);
      });
    },

    /**
     * Resend verification email
     * @param {string} email
     */
    resendVerificationEmail: function resendVerificationEmail(email) {
      var self = this;
      this.sendRequestWithNewCSRF(function (csrfToken) {
        var request = new ApiRequest({
          target: ApiTargets.RESEND_VERIFY.replace('{email}', email),
          query: new ApiQuery({}),
          options: {
            type: 'PUT',
            headers: {
              'X-CSRFToken': csrfToken
            },
            done: function done() {
              var pubsub = self.getPubSub();
              pubsub.publish(pubsub.USER_ANNOUNCEMENT, 'resend_verification_email_success');
            },
            fail: function fail(xhr) {
              var pubsub = self.getPubSub();
              var error = utils.extractErrorMessageFromAjax(xhr, 'error unknown');
              var message = "Resending verification email was unsuccessful (".concat(error, ")");
              pubsub.publish(pubsub.ALERT, new ApiFeedback({
                code: 0,
                msg: message,
                type: 'danger',
                fade: true
              }));
              pubsub.publish(pubsub.USER_ANNOUNCEMENT, 'resend_verification_email_fail', message);
            }
          }
        });
        return this.getBeeHive().getService('Api').request(request);
      });
    },
    setChangeToken: function setChangeToken(token) {
      this.model.set('resetPasswordToken', token);
    },

    /* private methods */
    loginSuccess: function loginSuccess(response, status, jqXHR) {
      // reset auth token by contacting Bootstrap, which will log user in
      var that = this;
      this.getApiAccess({
        reconnect: true
      }).done(function () {});
    },
    loginFail: function loginFail(xhr, status, errorThrown) {
      var pubsub = this.getPubSub();
      var error = utils.extractErrorMessageFromAjax(xhr, 'error unknown');
      var message = "Login was unsuccessful (".concat(error, ")");
      pubsub.publish(pubsub.ALERT, new ApiFeedback({
        code: 0,
        msg: message,
        type: 'danger',
        fade: true
      }));
      pubsub.publish(pubsub.USER_ANNOUNCEMENT, 'login_fail', message);
    },
    logoutSuccess: function logoutSuccess(response, status, jqXHR) {
      var that = this;
      this.getApiAccess({
        reconnect: true
      }).done(function () {
        // set session state to logged out
        that.getBeeHive().getObject('User').completeLogOut();
      });
    },
    registerSuccess: function registerSuccess(response, status, jqXHR) {
      var pubsub = this.getPubSub(); // authentication widget will show a "success" view in response to this user announcement

      pubsub.publish(pubsub.USER_ANNOUNCEMENT, 'register_success');
    },
    registerFail: function registerFail(xhr, status, errorThrown) {
      var pubsub = this.getPubSub();
      var error = utils.extractErrorMessageFromAjax(xhr, 'error unknown');
      var message = "Registration was unsuccessful (".concat(error, ")");
      pubsub.publish(pubsub.ALERT, new ApiFeedback({
        code: 0,
        msg: message,
        type: 'danger',
        fade: true
      }));
      pubsub.publish(pubsub.USER_ANNOUNCEMENT, 'register_fail', message);
    },
    resetPassword1Success: function resetPassword1Success(response, status, jqXHR) {
      var pubsub = this.getPubSub();
      pubsub.publish(pubsub.USER_ANNOUNCEMENT, 'reset_password_1_success');
    },
    resetPassword1Fail: function resetPassword1Fail(xhr, status, errorThrown) {
      var pubsub = this.getPubSub();
      var error = utils.extractErrorMessageFromAjax(xhr, 'error unknown');
      var message = "password reset step 1 was unsuccessful (".concat(error, ")");
      pubsub.publish(pubsub.ALERT, new ApiFeedback({
        code: 0,
        msg: message,
        type: 'danger',
        fade: true
      }));
      pubsub.publish(pubsub.USER_ANNOUNCEMENT, 'reset_password_1_fail', message);
    },
    resetPassword2Success: function resetPassword2Success(response, status, jqXHR) {
      var promise;
      var pubsub; // reset auth token by contacting Bootstrap
      // this will log the user in

      promise = this.getApiAccess({
        reconnect: true
      }); // notify interested widgets

      pubsub = this.getPubSub();
      promise.done(function () {
        pubsub.publish(pubsub.USER_ANNOUNCEMENT, 'reset_password_2_success');
        var message = 'Your password has been successfully reset!'; // navigate to home page

        pubsub.publish(pubsub.NAVIGATE, 'index-page');
        pubsub.publish(pubsub.ALERT, new ApiFeedback({
          code: 0,
          msg: message,
          type: 'success',
          modal: true
        }));
      });
      promise.fail(function (xhr) {
        var error = utils.extractErrorMessageFromAjax(xhr, 'error unknown');
        var message = "Your password was not successfully reset. Please try to follow the link from the email you received again.\n\n(".concat(error, ")");
        pubsub.publish(pubsub.USER_ANNOUNCEMENT, 'reset_password_2_fail', message);
        pubsub.publish(pubsub.ALERT, new ApiFeedback({
          code: 0,
          msg: message,
          type: 'danger',
          modal: true
        }));
      });
    },
    resetPassword2Fail: function resetPassword2Fail(xhr, status, errorThrown) {
      var pubsub = this.getPubSub();
      var error = utils.extractErrorMessageFromAjax(xhr, 'error unknown');
      var message = "password reset step 2 was unsuccessful (".concat(error, ")");
      pubsub.publish(pubsub.ALERT, new ApiFeedback({
        code: 0,
        msg: message,
        type: 'danger',
        fade: true
      }));
      pubsub.publish(pubsub.USER_ANNOUNCEMENT, 'reset_password_2_fail', message);
    },
    hardenedInterface: {
      login: 'log the user in',
      logout: 'log the user out',
      register: 'registers a new user',
      resetPassword1: 'sends an email to account',
      resetPassword2: 'updates the password',
      setChangeToken: 'the router stores the token to reset password here',
      resendVerificationEmail: 'resends the verification email'
    }
  });

  _.extend(Session.prototype, Dependon.BeeHive, Hardened, ApiAccess);

  return Session;
});
