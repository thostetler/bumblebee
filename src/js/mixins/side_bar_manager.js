/**
 * manages the state of the side bars
 */
define(['backbone', 'js/components/api_feedback'], function(
  Backbone,
  ApiFeedback
) {
  var state = new (Backbone.Model.extend({
    defaults: {
      recent: true,
      show: true,
    },
  }))();

  var SideBarManager = {
    /**
     * Try to get the current sidebar state from user data
     * This will be the value coming from user settings
     */
    _getUpdateFromUserData: function() {
      try {
        var ud = this.getBeeHive()
          .getObject('User')
          .getUserData();
        if (!ud) return false;
        return /show/i.test(ud.defaultHideSidebars);
      } catch (e) {
        return false;
      }
    },

    /**
     * Initialize the manager
     * this will start subscriptions and do an initial check on user data
     */
    init: function() {
      this.setSidebarState(this._getUpdateFromUserData());
      _.bindAll(this, [
        '_onFeedback',
        '_onUserAnnouncement',
        '_updateSidebarState',
      ]);
      var ps = this.getPubSub();
      if (!ps) return;
      ps.subscribe(ps.FEEDBACK, this._onFeedback);
      ps.subscribe(ps.USER_ANNOUNCEMENT, this._onUserAnnouncement);
      state.on('change:show', this._updateSidebarState);
    },

    /**
     * Update the sidebar state, this will trigger/broadcast the change
     * and update the view to actually spread the middle panel to full screen
     */
    _updateSidebarState: _.throttle(function() {
      var val = this.getSidebarState();
      var view = this.view;
      if (view && view.showCols) {
        view.showCols({ left: val, right: val });
      }
      this.broadcast('page-manager-message', 'side-bars-update', val);
      this.trigger('page-manager-message', 'side-bars-update', val);
    }, 100),

    /**
     * On user announcement (user data change) update the sidebar state
     */
    _onUserAnnouncement: function(ev, changed) {
      // only update if the changed key was defaultHideSidebars
      if (_.contains('defaultHideSidebars', _.keys(changed))) {
        this.setSidebarState(this._getUpdateFromUserData());
      }
    },

    /**
     * Feedback handler
     * this will update the state when either of the *_SPACE events are called
     * @param {ApiFeedback} feedback
     */
    _onFeedback: function(feedback) {
      switch (feedback.code) {
        case ApiFeedback.CODES.MAKE_SPACE:
          return this.onMakeSpace();
        case ApiFeedback.CODES.UNMAKE_SPACE:
          return this.onUnMakeSpace();
        default:
          return null;
      }
    },

    /**
     * Save the current state and
     * set the sidebar state to `false`
     */
    onMakeSpace: function() {
      if (!state.has('recent')) {
        state.set('recent', this.getSidebarState());
      }
      this.setSidebarState(false);
    },

    /**
     * if the saved state is set, then update the side bar to that value
     * and unset the saved state.
     *
     * only "unmake space" if "make space" was called previously
     */
    onUnMakeSpace: function() {
      if (state.has('recent')) {
        this.setSidebarState(state.get('recent'));
        state.unset('recent');
      }
    },

    /**
     * Toggle the current state
     */
    toggleSidebarState: function() {
      this.setSidebarState(!this.getSidebarState());
    },

    /**
     * Set the sidebar state to a new value
     * this will trigger an update even if the value doesn't change
     * @param {Boolean} value - the new state value
     */
    setSidebarState: function(value) {
      state.set('show', value);
      state.trigger('change:show');
    },

    /**
     * get the current sidebar state
     * @returns {Boolean} - the current state
     */
    getSidebarState: function() {
      return state.get('show');
    },
  };

  return SideBarManager;
});
