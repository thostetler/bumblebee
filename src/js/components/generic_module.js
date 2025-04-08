/*
 * A generic class to be used for building modules (the Marionette.Module)
 * just complicates things. For simple things, just use this class.
 */

import Backbone from "backbone";
import _ from "underscore";
// A list of options to be attached directly to the module, if provided.
var moduleOptions = ['className', 'activate'];

var Module = function(options) {
  var defaults;
  options = options || {};
  this.mid = _.uniqueId('module');
  _.extend(this, _.pick(options, moduleOptions));
  this.initialize.call(this, options);
};

// every module has the Events mixin
_.extend(Module.prototype, Backbone.Events, {
  className: 'GenericModule',
  initialize: function() {},
  destroy: function() {},
  activate: function(options) {
    _.extend(this, _.pick(options, moduleOptions));
  },
});

// give the module subclassing functionality
Module.extend = Backbone.Model.extend;
export default Module;
