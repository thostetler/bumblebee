define([
  'js/widgets/navbar/widget',
  'js/bugutils/minimal_pubsub',
  'js/components/user',
  'js/components/session',
  'js/modules/orcid/orcid_api',
  'js/services/api',
], function(NavBarWidget, MinSub, User, Session, OrcidApi, Api) {
  describe('navigation bar widget', function() {
    afterEach(function() {
      $('#feedback-modal').remove();
      $('#test').empty();
    });

    // orcid accounts

    it('should query initial logged in / logged out orcid states in order to render the correct values', function() {
      var minsub = new (MinSub.extend({
        request: function(apiRequest) {},
      }))({ verbose: false });

      var u = new User();
      u.activate(minsub.beehive);
      minsub.beehive.addObject('User', u);

      minsub.beehive.addService('OrcidApi', {
        hasAccess: function() {
          return true;
        },
        getHardenedInstance: function() {
          return this;
        },
        getUserBio: function() {
          var d = $.Deferred();
          d.resolve({
            getFirstName: _.constant('Testy'),
            getLastName: _.constant('Tester'),
            getOrcid: _.constant(''),
          });
          return d;
        },
        getOrcidVal: new OrcidApi().getOrcidVal,
      });

      minsub.beehive.addObject('AppStorage', {
        getConfigCopy: function() {
          return { hourly: false };
        },
        getHardenedInstance: function() {
          return this;
        },
      });

      var n = new NavBarWidget();
      n.activate(minsub.beehive.getHardenedInstance());
      $('#test').append(n.render().el);
      expect($('.s-orcid-button-container').hasClass('s-active')).to.be.false;
      $('#test').empty();

      var n = new NavBarWidget();
      n.activate(minsub.beehive.getHardenedInstance());
      minsub.publish(minsub.USER_ANNOUNCEMENT, u.USER_INFO_CHANGE, {
        isOrcidModeOn: true,
      });

      $('#test').append(n.render().el);

      // orcid signed in, orcid mode on automatically

      expect($('.orcid-dropdown h4').text()).to.eql(
        ' Signed in to ORCID as  Testy Tester'
      );
      expect($('input.orcid-mode').is(':checked')).to.eql(true);

      // orcid signed in, orcid mode off

      n.view.model.set('orcidModeOn', false);

      expect($('input.orcid-mode').is(':checked')).to.eql(false);
    });

    it('should notify the user object when orcid mode is toggled', function(done) {
      var minsub = new (MinSub.extend({
        request: function(apiRequest) {},
      }))({ verbose: false });
      var u = new User();

      var a = new OrcidApi();

      var signInStub = sinon.stub(a, 'signIn');

      var setOrcidModeStub = sinon.stub(u, 'setOrcidMode');
      minsub.beehive.addObject('User', u);
      minsub.beehive.addService('OrcidApi', a);

      $('#test').empty();
      var n = new NavBarWidget();
      n.activate(minsub.beehive.getHardenedInstance());

      $('#test').append(n.view.render().el);
      var $w = n.view.$el;
      $w.find('.orcid-sign-in').click();

      expect(signInStub.callCount).to.eql(1);

      // orcid mode should not be toggled if not already signed-in
      expect(setOrcidModeStub.callCount).to.eql(0);
      done();
    });

    it("should trigger navigate event when 'my orcid papers' is clicked", function() {
      var minsub = new (MinSub.extend({
        request: function(apiRequest) {},
      }))({ verbose: false });

      var u = new User();
      u.activate(minsub.beehive);
      minsub.beehive.addObject('User', u);

      minsub.beehive.addService('OrcidApi', {
        hasAccess: function() {
          return true;
        },
        getHardenedInstance: function() {
          return this;
        },
      });

      u.setOrcidMode(true);
      var n = new NavBarWidget();
      n.activate(minsub.beehive.getHardenedInstance());
      n.getPubSub().publish = sinon.spy();
      $('#test').append(n.render().el);

      // show active view
      $('#test')
        .find('.orcid-sign-in')
        .click();

      $('#test')
        .find('.orcid-link')
        .click();
      expect(n.getPubSub().publish.args[0]).to.eql([
        '[Router]-Navigate-With-Trigger',
        'orcid-page',
        undefined,
      ]);
    });

    // ADS user accounts

    it('should query initial user logged in/logged out state and show the correct options', function() {
      /*
       navigation bar queries logged in/logged out state solely on the basis
       * of whether user.getUserName() returns a name.
       * */

      var minsub = new (MinSub.extend({
        request: function(apiRequest) {},
      }))({ verbose: false });

      sinon.stub(User.prototype, 'redirectIfNecessary');
      var u = new User();

      minsub.beehive.addObject('User', u);

      minsub.beehive.addService('OrcidApi', {
        hasAccess: function() {
          return true;
        },
        getHardenedInstance: function() {
          return this;
        },
        getUserProfile: function() {
          var d = $.Deferred();
          d.resolve({
            getFirstName: _.constant(''),
            getLastName: _.constant(''),
            getOrcid: _.constant(''),
          });
          return d;
        },
      });

      var n = new NavBarWidget();
      n.activate(minsub.beehive.getHardenedInstance());
      u.activate(minsub.beehive);

      $('#test').append(n.view.render().el);

      u.setUser('bumblebee');

      expect(n.view.$('li.login').length).to.eql(0);
      expect(n.view.$('li.register').length).to.eql(0);

      expect(n.view.$('.btn.btn-link.dropdown-toggle').length).to.eql(4);
      expect(
        n.view
          .$('.btn.btn-link.dropdown-toggle')
          .text()
          .trim()
          .replace(/\W+/g, ' ')
      ).to.eql('Feedback ORCID About Account');
      expect(
        n.view
          .$('.dropdown-menu:last li:first')
          .text()
          .trim()
          .replace(/\W+/g, ' ')
      ).to.eql('You are signed in as bumblebee');

      // lack of email indicates user is logged out
      u.setUser(undefined);

      minsub.publish(
        minsub.pubsub.USER_ANNOUNCEMENT,
        u.USER_INFO_CHANGE,
        'USER'
      );
      expect(n.view.$('.btn.btn-link.dropdown-toggle').length).to.eql(3);
      expect(n.view.$('li.login').length).to.eql(1);
      expect(n.view.$('li.register').length).to.eql(1);
    });

    it('should emit the proper events when user links are clicked', function() {
      var minsub = new (MinSub.extend({
        request: function(apiRequest) {},
      }))({ verbose: false });

      var u = new User();
      u.completeLogIn = function() {};

      var spy = sinon.spy();

      u.activate(minsub.beehive.getHardenedInstance());
      u.getPubSub = function() {
        return { publish: spy };
      };

      minsub.beehive.addObject('User', u);

      var s = new Session();
      sinon.stub(s, 'logout');

      minsub.beehive.addObject('Session', s);

      var orcidSignOutSpy = sinon.spy();

      minsub.beehive.addService('OrcidApi', {
        hasAccess: function() {
          return true;
        },
        getHardenedInstance: function() {
          return this;
        },
        signOut: orcidSignOutSpy,
        getUserProfile: function() {
          var d = $.Deferred();
          d.resolve({});
          return d;
        },
      });

      var n = new NavBarWidget();
      n.activate(minsub.beehive.getHardenedInstance());
      var publishSpy = sinon.stub(n.getPubSub(), 'publish');

      $('#test').append(n.view.render().el);

      $('#test')
        .find('.login')
        .click();

      expect(publishSpy.callCount).to.eql(1);
      expect(publishSpy.args[0][0]).to.eql(minsub.pubsub.NAVIGATE);
      expect(publishSpy.args[0][1]).to.eql('authentication-page');
      expect(publishSpy.args[0][2].subView).to.eql('login');

      $('#test')
        .find('.register')
        .click();
      expect(publishSpy.callCount).to.eql(2);
      expect(publishSpy.args[1][0]).to.eql(minsub.pubsub.NAVIGATE);
      expect(publishSpy.args[1][1]).to.eql('authentication-page');
      expect(publishSpy.args[1][2].subView).to.eql('register');

      // now show navbar in logged in state
      u.setUser('foo');
      minsub.publish(
        minsub.pubsub.USER_ANNOUNCEMENT,
        u.USER_SIGNED_IN,
        'fakeUserName'
      );

      n._latestPage = 'orcid-page';
      $('#test')
        .find('.logout')
        .click();
      expect(publishSpy.callCount).to.eql(3);
      expect(publishSpy.args[2]).to.eql([
        '[Router]-Navigate-With-Trigger',
        'index-page',
      ]);

      // calls session logout method explicitly
      expect(s.logout.callCount).to.eql(1);
      expect(orcidSignOutSpy.callCount).to.eql(1);
    });

    it('should have a feedback form modal appended to body only 1x, and triggered from navbar', function() {
      // not sure why i have to call this when we have afterEach
      $('#feedback-modal').remove();

      var n = new NavBarWidget();
      n.view.render();

      expect($('form.feedback-form').length).to.eql(1);
      $('#test').append(n.view.render().el);
      expect($('form.feedback-form').length).to.eql(1);

      // there are two buttons
      expect($('#test a[data-target="#feedback-modal"]').length).to.eql(2);

      expect(
        $('#test a[data-target="#feedback-modal"]:first').data('feedbackView')
      ).to.eql('list');
      expect(
        $('#test a[data-target="#feedback-modal"]:last').data('feedbackView')
      ).to.eql('general');
    });

    //TODO: fix this test
    it.skip('feedback form should make an ajax request upon submit, display status, and clear itself on close', function() {
      $('#feedback-modal').remove();
      var n = new NavBarWidget();
      const container = $('#test');
      container.append(n.view.render().el);

      var minsub = new (MinSub.extend({
        request: function() {},
      }))({ verbose: false });
      n.setInitialVals = function() {};
      var api = new Api();
      var requestStub = sinon.stub(Api.prototype, 'request', function(
        apiRequest
      ) {
        apiRequest.toJSON().options.done();
      });
      minsub.beehive.removeService('Api');
      minsub.beehive.addService('Api', api);

      var hardened = minsub.beehive.getHardenedInstance();
      sinon.stub(hardened, 'getObject', function(object) {
        if (object == 'DynamicConfig') {
          return {
            getRecaptchaKey: function() {
              return 'foo';
            },
          };
        }
      });
      n.activate(hardened);

      window.grecaptcha = {
        ready: () => {},
        execute: () => ({
          then: (cb) => cb('foo')
        }),
      };
      container.find('button.feedback-button').click();
      container.find('a[data-target="#feedback-modal"]').click();
      const form = container.find('#feedback-modal form');
      form.find('input[name=name]').val('foo');
      form.find('input[name=email]').val('foo@foo.com');
      form.find('input[name=comments]').val('test comment');
      form.submit();

      // force handlers to be added in case modal doesn't actually fire
      // $('#feedback-modal').trigger('shown.bs.modal');
      // $('form.feedback-form')
      //   .find('textarea')
      //   .val('test comment');
      // $('form.feedback-form').submit();
      // console.log(requestStub);
      // expect(requestStub.args[0][0].toJSON().target).to.eql(
      //   'feedback'
      // );
      // expect(requestStub.args[0][0].toJSON().options.dataType).to.eql('json');
      //
      // expect(requestStub.args[0][0].toJSON().options.method).to.eql('POST');
      // expect(
      //   requestStub.args[0][0]
      //     .toJSON()
      //     .options.data.match(/comments=test\+comment/)
      // ).to.exist;
      // $('#feedback-modal').trigger('hidden.bs.modal');
      //
      // // form should be emptied
      // expect($('form.feedback-form textarea').val()).to.eql('');
      // // modal should be closed
      // expect($('#feedback-modal').is(':visible')).to.be.false;

      // requestStub.restore();
      // minsub.destroy();
      // sinon.restore();
      // window.grecaptcha = undefined;
      // done();
    });
  });
});
