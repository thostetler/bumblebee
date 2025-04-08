// Backbone.Wreqr (Backbone.Marionette)
// ----------------------------------
// v1.4.0
//
// Copyright (c)2016 Derick Bailey, Muted Solutions, LLC.
// Distributed under MIT license
//
// http://github.com/marionettejs/backbone.wreqr
!function (a, b) {
  if ("function" == typeof define && define.amd) define(["backbone", "underscore"], function (a, c) {
    return b(a, c);
  });else if ("undefined" != typeof exports) {
    var c = require("backbone"),
        d = require("underscore");

    module.exports = b(c, d);
  } else b(a.Backbone, a._);
}(this, function (a, b) {
  "use strict";

  var c = a.Wreqr,
      d = a.Wreqr = {};
  return a.Wreqr.VERSION = "1.4.0", a.Wreqr.noConflict = function () {
    return a.Wreqr = c, this;
  }, d.Handlers = function (a, b) {
    var c = function c(a) {
      this.options = a, this._wreqrHandlers = {}, b.isFunction(this.initialize) && this.initialize(a);
    };

    return c.extend = a.Model.extend, b.extend(c.prototype, a.Events, {
      setHandlers: function setHandlers(a) {
        b.each(a, b.bind(function (a, c) {
          var d = null;
          b.isObject(a) && !b.isFunction(a) && (d = a.context, a = a.callback), this.setHandler(c, a, d);
        }, this));
      },
      setHandler: function setHandler(a, b, c) {
        var d = {
          callback: b,
          context: c
        };
        this._wreqrHandlers[a] = d, this.trigger("handler:add", a, b, c);
      },
      hasHandler: function hasHandler(a) {
        return !!this._wreqrHandlers[a];
      },
      getHandler: function getHandler(a) {
        var b = this._wreqrHandlers[a];
        if (b) return function () {
          return b.callback.apply(b.context, arguments);
        };
      },
      removeHandler: function removeHandler(a) {
        delete this._wreqrHandlers[a];
      },
      removeAllHandlers: function removeAllHandlers() {
        this._wreqrHandlers = {};
      }
    }), c;
  }(a, b), d.CommandStorage = function () {
    var c = function c(a) {
      this.options = a, this._commands = {}, b.isFunction(this.initialize) && this.initialize(a);
    };

    return b.extend(c.prototype, a.Events, {
      getCommands: function getCommands(a) {
        var b = this._commands[a];
        return b || (b = {
          command: a,
          instances: []
        }, this._commands[a] = b), b;
      },
      addCommand: function addCommand(a, b) {
        var c = this.getCommands(a);
        c.instances.push(b);
      },
      clearCommands: function clearCommands(a) {
        var b = this.getCommands(a);
        b.instances = [];
      }
    }), c;
  }(), d.Commands = function (a, b) {
    return a.Handlers.extend({
      storageType: a.CommandStorage,
      constructor: function constructor(b) {
        this.options = b || {}, this._initializeStorage(this.options), this.on("handler:add", this._executeCommands, this), a.Handlers.prototype.constructor.apply(this, arguments);
      },
      execute: function execute(a) {
        a = arguments[0];
        var c = b.rest(arguments);
        this.hasHandler(a) ? this.getHandler(a).apply(this, c) : this.storage.addCommand(a, c);
      },
      _executeCommands: function _executeCommands(a, c, d) {
        var e = this.storage.getCommands(a);
        b.each(e.instances, function (a) {
          c.apply(d, a);
        }), this.storage.clearCommands(a);
      },
      _initializeStorage: function _initializeStorage(a) {
        var c,
            d = a.storageType || this.storageType;
        c = b.isFunction(d) ? new d() : d, this.storage = c;
      }
    });
  }(d, b), d.RequestResponse = function (a, b) {
    return a.Handlers.extend({
      request: function request(a) {
        return this.hasHandler(a) ? this.getHandler(a).apply(this, b.rest(arguments)) : void 0;
      }
    });
  }(d, b), d.EventAggregator = function (a, b) {
    var c = function c() {};

    return c.extend = a.Model.extend, b.extend(c.prototype, a.Events), c;
  }(a, b), d.Channel = function (c) {
    var d = function d(b) {
      this.vent = new a.Wreqr.EventAggregator(), this.reqres = new a.Wreqr.RequestResponse(), this.commands = new a.Wreqr.Commands(), this.channelName = b;
    };

    return b.extend(d.prototype, {
      reset: function reset() {
        return this.vent.off(), this.vent.stopListening(), this.reqres.removeAllHandlers(), this.commands.removeAllHandlers(), this;
      },
      connectEvents: function connectEvents(a, b) {
        return this._connect("vent", a, b), this;
      },
      connectCommands: function connectCommands(a, b) {
        return this._connect("commands", a, b), this;
      },
      connectRequests: function connectRequests(a, b) {
        return this._connect("reqres", a, b), this;
      },
      _connect: function _connect(a, c, d) {
        if (c) {
          d = d || this;
          var e = "vent" === a ? "on" : "setHandler";
          b.each(c, b.bind(function (c, f) {
            this[a][e](f, b.bind(c, d));
          }, this));
        }
      }
    }), d;
  }(d), d.radio = function (a, b) {
    var c = function c() {
      this._channels = {}, this.vent = {}, this.commands = {}, this.reqres = {}, this._proxyMethods();
    };

    b.extend(c.prototype, {
      channel: function channel(a) {
        if (!a) throw new Error("Channel must receive a name");
        return this._getChannel(a);
      },
      _getChannel: function _getChannel(b) {
        var c = this._channels[b];
        return c || (c = new a.Channel(b), this._channels[b] = c), c;
      },
      _proxyMethods: function _proxyMethods() {
        b.each(["vent", "commands", "reqres"], b.bind(function (a) {
          b.each(d[a], b.bind(function (b) {
            this[a][b] = e(this, a, b);
          }, this));
        }, this));
      }
    });

    var d = {
      vent: ["on", "off", "trigger", "once", "stopListening", "listenTo", "listenToOnce"],
      commands: ["execute", "setHandler", "setHandlers", "removeHandler", "removeAllHandlers"],
      reqres: ["request", "setHandler", "setHandlers", "removeHandler", "removeAllHandlers"]
    },
        e = function e(a, c, d) {
      return function (e) {
        var f = a._getChannel(e)[c];

        return f[d].apply(f, b.rest(arguments));
      };
    };

    return new c();
  }(d, b), a.Wreqr;
});
