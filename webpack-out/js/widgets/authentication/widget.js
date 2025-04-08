define(['marionette', 'js/widgets/base/base_widget', 'js/components/api_feedback', 'js/mixins/form_view_functions', 'js/widgets/success/view', 'js/components/api_targets', 'js/widgets/authentication/templates/log-in.html', 'js/widgets/authentication/templates/register.html', 'js/widgets/authentication/templates/container.html', 'js/widgets/authentication/templates/reset-password-1.html', 'js/widgets/authentication/templates/reset-password-2.html', 'js/widgets/authentication/templates/resend-verification-email.html', 'js/components/user', 'analytics', 'backbone-validation', 'backbone.stickit'], function (Marionette, BaseWidget, ApiFeedback, FormFunctions, SuccessView, ApiTargets, LogInTemplate, RegisterTemplate, ContainerTemplate, ResetPassword1Template, ResetPassword2Template, ResendVerificationEmail, User, analytics) {
  // Creating module level variable since I can't figure out best way to pass this value into a subview from the model
  // This value should be always available, and unchanging, so should be safe to set like this here
  // TODO: figure out how to make this value available to the subview without having to set it like this
  var siteKey = '';
  /*
   *
   * any submit action forces the widget to rerender when it
   * gets a success or fail message from pubsub
   *
   * */

  var passwordRegex = /(?=.*\d)(?=.*[a-zA-Z]).{5,}/;
  var FormView;
  var FormModel;
  var ERROR_TIMEOUT = 5000;
  FormView = Marionette.ItemView.extend({
    activateValidation: FormFunctions.activateValidation,
    checkValidationState: FormFunctions.checkValidationState,

    /**
     * Shows an error message to the user
     * and then hides it after a timeout
     *
     * @todo figure out why we have to force a re-render
     * @param msg
     */
    showError: function showError(msg) {
      var _this = this;

      this.model({
        hasError: true,
        errorMsg: msg
      });
      this.render();
      setTimeout(function () {
        _this.model({
          hasError: false,
          errorMsg: undefined
        });

        _this.render();
      }, ERROR_TIMEOUT);
    },
    triggerSubmit: function triggerSubmit(ev) {
      var _arguments = arguments,
          _this2 = this;

      ev.preventDefault();
      var formName = ev.currentTarget.dataset.formName;

      if (!window.grecaptcha) {
        this.showError('Sorry reCAPTCHA did not load properly. Please try refreshing the page.');
        return;
      }

      if (typeof formName === 'string') {
        window.grecaptcha.ready(function () {
          return window.grecaptcha.execute(siteKey, {
            action: "auth/".concat(formName)
          }).then(function (token) {
            _this2.model.set('g-recaptcha-response', token);

            FormFunctions.triggerSubmit.apply(_this2, _arguments);
          });
        });
      } else {
        FormFunctions.triggerSubmit.apply(this, arguments);
      }
    },
    dismissError: function dismissError() {
      this.model.set(this.model.defaults());
      this.render();
    },
    modelEvents: {
      change: 'checkValidationState'
    },
    events: {
      'click button[type=submit]': 'triggerSubmit',
      'click a#dismiss-error': 'dismissError'
    }
  });
  FormModel = Backbone.Model.extend({
    isValidSafe: FormFunctions.isValidSafe,
    reset: FormFunctions.reset,
    defaults: function defaults() {
      return {
        hasError: false,
        errorMsg: ''
      };
    }
  });
  var RegisterModel;
  var RegisterView;
  RegisterModel = FormModel.extend({
    validation: {
      given_name: {},
      family_name: {},
      email: {
        required: true,
        pattern: 'email',
        msg: '(A valid email is required)'
      },
      password1: {
        required: true,
        pattern: passwordRegex,
        msg: "(Password isn't valid)"
      },
      password2: {
        required: true,
        equalTo: 'password1',
        msg: '(The passwords do not match)'
      },
      'g-recaptcha-response': {
        required: true
      }
    },
    target: 'REGISTER'
    /* note: defaults are missing here because
     * they cause the validation to call an error for vals
     * that the user hasnt entered yet
     * */

  });
  RegisterView = FormView.extend({
    template: RegisterTemplate,
    className: 'register s-register',
    bindings: {
      'input[name=given_name]': {
        observe: 'given_name'
      },
      'input[name=family_name]': {
        observe: 'family_name'
      },
      'input[name=email]': {
        observe: 'email',
        setOptions: {
          validate: true
        }
      },
      'input[name=password1]': {
        observe: 'password1',
        setOptions: {
          validate: true
        }
      },
      'input[name=password2]': {
        observe: 'password2',
        setOptions: {
          validate: true
        }
      },
      'g-recaptcha-response': {
        required: true
      }
    },
    onRender: function onRender() {
      this.activateValidation();
    }
  });
  var LogInView;
  var LogInModel;
  LogInModel = FormModel.extend({
    skipReset: ['email'],
    validation: {
      email: {
        required: true,
        pattern: 'email',
        msg: '(A valid email is required)'
      },
      password: {
        required: true,
        pattern: passwordRegex,
        msg: '(A valid password is required)'
      }
    },
    target: 'USER'
  });
  LogInView = FormView.extend({
    template: LogInTemplate,
    className: 'log-in s-log-in',
    bindings: {
      'input[name=email]': {
        observe: 'email',
        setOptions: {
          validate: true
        }
      },
      'input[name=password]': {
        observe: 'password',
        setOptions: {
          validate: true
        }
      }
    },
    onRender: function onRender() {
      this.activateValidation();
    }
  });
  var ResetPassword1View;
  var ResetPassword1Model;
  ResetPassword1Model = FormModel.extend({
    skipReset: ['email'],
    validation: {
      email: {
        required: true,
        pattern: 'email',
        msg: '(A valid email is required)'
      },
      'g-recaptcha-response': {
        required: true
      }
    },
    target: 'RESET_PASSWORD',
    method: 'POST'
  });
  ResetPassword1View = FormView.extend({
    template: ResetPassword1Template,
    className: 'reset-password-1 s-reset-password-1',
    bindings: {
      'input[name=email]': {
        observe: 'email',
        setOptions: {
          validate: true
        }
      }
    },
    onRender: function onRender() {
      this.activateValidation();
    }
  }); // this view is only accessible after user has clicked on a link in a verification
  // email after they enter the "forgot password form".

  var ResetPassword2View;
  var ResetPassword2Model;
  ResetPassword2Model = FormModel.extend({
    validation: {
      password1: {
        required: true,
        pattern: passwordRegex,
        msg: "(Password isn't valid)"
      },
      password2: {
        required: true,
        equalTo: 'password1',
        pattern: passwordRegex,
        msg: '(The passwords do not match)'
      }
    },
    target: 'RESET_PASSWORD',
    method: 'PUT'
  });
  ResetPassword2View = FormView.extend({
    template: ResetPassword2Template,
    className: 'reset-password-2 s-reset-password-2',
    bindings: {
      'input[name=password1]': {
        observe: 'password1',
        setOptions: {
          validate: true
        }
      },
      'input[name=password2]': {
        observe: 'password2',
        setOptions: {
          validate: true
        }
      }
    },
    onRender: function onRender() {
      this.activateValidation();
    }
  });
  var ResendVerificationModel = FormModel.extend({
    skipReset: ['email'],
    validation: {
      email: {
        required: true,
        pattern: 'email',
        msg: '(A valid email is required)'
      }
    },
    target: 'RESEND_VERIFY',
    method: 'PUT'
  });
  var ResendVerificationView = FormView.extend({
    template: ResendVerificationEmail,
    className: 'resend-verification',
    bindings: {
      'input[name=email]': {
        observe: 'email',
        setOptions: {
          validate: true
        }
      }
    },
    onRender: function onRender() {
      this.activateValidation();
    }
  });
  var StateModel = Backbone.Model.extend({
    defaults: function defaults() {
      return {
        subView: undefined
      };
    }
  });
  var AuthenticationContainer = Marionette.LayoutView.extend({
    template: ContainerTemplate,
    initialize: function initialize() {
      this.logInModel = new LogInModel();
      this.registerModel = new RegisterModel();
      this.resetPassword1Model = new ResetPassword1Model();
      this.resetPassword2Model = new ResetPassword2Model();
      this.resendVerificationModel = new ResendVerificationModel();
    },
    modelEvents: {
      'change:subView': 'renderSubView'
    },
    className: 's-authentication-container row s-form-widget',
    regions: {
      container: '.form-container'
    },
    triggers: {
      'click .show-login': 'navigateToLoginForm',
      'click .show-register': 'navigateToRegisterForm',
      'click .show-reset-password-1': 'navigateToResetPassword1Form',
      'click .show-resend-verification-email': 'navigateToResendVerificationForm'
    },
    onRender: function onRender() {
      this.renderSubView();
    },
    renderSubView: function renderSubView() {
      // figure out which view to show
      var subView = this.model.get('subView');

      if (subView === 'login') {
        this.showLoginForm();
      } else if (subView === 'register') {
        this.showRegisterForm();
      } else if (subView === 'reset-password-1') {
        this.showResetPasswordForm1();
      } else if (subView === 'reset-password-2') {
        this.showResetPasswordForm2();
      } else if (subView === 'resend-verification-email') {
        this.showResendVerificationForm();
      }
    },
    showLoginForm: function showLoginForm(error) {
      var view = new LogInView({
        model: this.logInModel
      }); // show error message

      if (error) {
        view.model.set({
          hasError: true,
          errorMsg: error
        });
      }

      view.on('submit-form', this.forwardSubmit, this);
      this.container.show(view);
    },
    showRegisterForm: function showRegisterForm(error) {
      var view = new RegisterView({
        model: this.registerModel
      }); // show error message

      if (error) {
        view.model.set({
          hasError: true,
          errorMsg: error
        });
      }

      view.on('submit-form', this.forwardSubmit, this);
      this.container.show(view);
    },
    showResetPasswordForm1: function showResetPasswordForm1(error) {
      var view = new ResetPassword1View({
        model: this.resetPassword1Model
      }); // show error message

      if (error) {
        view.model.set({
          hasError: true,
          errorMsg: error
        });
      }

      view.on('submit-form', this.forwardSubmit, this);
      this.container.show(view);
    },
    showResetPasswordForm2: function showResetPasswordForm2(error) {
      var view = new ResetPassword2View({
        model: this.resetPassword2Model
      }); // show error message

      if (error) {
        view.model.set({
          hasError: true,
          errorMsg: error
        });
      }

      view.on('submit-form', this.forwardSubmit, this);
      this.container.show(view);
    },
    showResendVerificationForm: function showResendVerificationForm(error) {
      var view = new ResendVerificationView({
        model: this.resendVerificationModel
      }); // show error message

      if (error) {
        view.model.set({
          hasError: true,
          errorMsg: error
        });
      }

      view.on('submit-form', this.forwardSubmit, this);
      this.container.show(view);
    },
    showRegisterSuccessView: function showRegisterSuccessView() {
      var view = new SuccessView({
        title: 'Registration Successful'
      });
      this.container.show(view);
    },
    showResendVerificationSuccessView: function showResendVerificationSuccessView() {
      var view = new SuccessView({
        title: 'Verification Email Sent Successfully'
      });
      this.container.show(view);
    },
    showResetPasswordSuccessView: function showResetPasswordSuccessView() {
      var view = new SuccessView({
        title: 'Password Reset Successful'
      });
      this.container.show(view);
    },
    forwardSubmit: function forwardSubmit(viewModel) {
      this.trigger('submit-form', viewModel);
    }
  });
  var AuthenticationWidget = BaseWidget.extend({
    initialize: function initialize(options) {
      options = options || {};
      this.stateModel = new StateModel();
      this.view = new AuthenticationContainer({
        controller: this,
        model: this.stateModel
      });
      this.listenTo(this.view, 'submit-form', this.triggerCorrectSubmit);
      this.listenTo(this.view, 'navigateToLoginForm', this.navigateToLoginForm);
      this.listenTo(this.view, 'navigateToRegisterForm', this.navigateToRegisterForm);
      this.listenTo(this.view, 'navigateToResetPassword1Form', this.navigateToResetPassword1Form);
      this.listenTo(this.view, 'navigateToResendVerificationForm', this.navigateToResendVerificationForm);
      this.nextNav = null;
    },
    activate: function activate(beehive) {
      this.setBeeHive(beehive);
      var pubsub = beehive.getService('PubSub');

      _.bindAll(this, ['handleUserAnnouncement']);

      pubsub.subscribe(pubsub.USER_ANNOUNCEMENT, this.handleUserAnnouncement);
      siteKey = beehive.getObject('AppStorage').getConfigCopy().recaptchaKey;
    },
    navigateToLoginForm: function navigateToLoginForm() {
      this._navigate({
        subView: 'login'
      });
    },
    navigateToRegisterForm: function navigateToRegisterForm() {
      this._navigate({
        subView: 'register'
      });
    },
    navigateToResetPassword1Form: function navigateToResetPassword1Form() {
      this._navigate({
        subView: 'reset-password-1'
      });
    },
    navigateToResendVerificationForm: function navigateToResendVerificationForm() {
      this._navigate({
        subView: 'resend-verification-email'
      });
    },
    _navigate: function _navigate(opts) {
      var pubsub = this.getPubSub();
      pubsub.publish(pubsub.NAVIGATE, 'authentication-page', opts);
    },
    setSubView: function setSubView(subView) {
      this.stateModel.set('subView', subView);
    },
    fireAnalytics: _.partial(analytics, 'send', 'event', 'authentication'),
    handleUserAnnouncement: function handleUserAnnouncement(name, msg) {
      // reset all views and view models
      this.resetAll();

      switch (name) {
        case User.prototype.USER_SIGNED_IN:
          // will immediately redirect
          this.fireAnalytics('login', {
            auth_result: 'login_success'
          });
          break;

        case 'login_fail':
          // will also see a relevant alert over the widget
          this.view.showLoginForm(msg);
          this.fireAnalytics('login', {
            auth_result: 'login_failed',
            auth_error: msg
          });
          break;

        case 'register_success':
          this.view.showRegisterSuccessView();
          this.fireAnalytics('login', 'status', {
            auth_result: 'register_success'
          });
          break;

        case 'register_fail':
          // will also see a relevant alert over the widget
          this.view.showRegisterForm(msg);
          this.fireAnalytics('register', {
            auth_result: 'register_failed',
            auth_error: msg
          });
          break;

        case 'reset_password_1_success':
          this.view.showResetPasswordSuccessView(msg);
          this.fireAnalytics('reset-password', {
            auth_result: 'reset_password_1_success'
          });
          break;

        case 'reset_password_1_fail':
          this.view.showResetPasswordForm1(msg);
          this.fireAnalytics('reset-password', {
            auth_result: 'reset_password_1_failed',
            auth_error: msg
          });
          break;

        case 'reset_password_2_fail':
          this.view.showResetPasswordForm2(msg);
          this.fireAnalytics('reset-password', {
            auth_result: 'reset_password_2_failed',
            auth_error: msg
          });
          break;

        case 'resend_verification_email_success':
          this.view.showResendVerificationSuccessView();
          this.fireAnalytics('resend-verification', {
            auth_result: 'resend_verification_email_success'
          });
          break;

        case 'resend_verification_email_fail':
          this.view.showResendVerificationForm(msg);
          this.fireAnalytics('resend-verification', {
            auth_result: 'resend_verification_email_fail'
          });
          break;
      }
    },
    resetAll: function resetAll() {
      this.view.logInModel.reset();
      this.view.registerModel.reset();
      this.view.resetPassword1Model.reset();
    },
    triggerCorrectSubmit: function triggerCorrectSubmit(model) {
      var _this3 = this;

      var session = this.getBeeHive().getObject('Session');

      switch (model.target) {
        case 'REGISTER':
          session.register(model.toJSON());
          break;

        case 'USER':
          session.login(model.toJSON()).done(function () {
            if (_this3.nextNav) {
              var ps = _this3.getPubSub();

              ps.publish(ps.NAVIGATE, _this3.nextNav);
              _this3.nextNav = null;
            }
          });
          break;

        case 'RESET_PASSWORD':
          model.method === 'POST' ? session.resetPassword1(model.toJSON()) : session.resetPassword2(model.toJSON());
          break;

        case 'RESEND_VERIFY':
          session.resendVerificationEmail(model.get('email'));
          break;
      }
    },
    setNextNavigation: function setNextNavigation(nav) {
      this.nextNav = nav;
    },
    onShow: function onShow() {
      // force a clearing of the view every time the widget is shown again
      this.view.render();
    }
  });
  return AuthenticationWidget;
});
