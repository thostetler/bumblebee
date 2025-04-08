/**
 * Created by rchyla on 3/16/14.
 *
 * Beehive is where all the communication happens ('Application' object
 * is where setup happens; application will load beehive)
 */
define(['backbone', 'underscore', 'js/components/generic_module', 'js/mixins/dependon', 'js/mixins/hardened', 'js/components/services_container'], function (Backbone, _, GenericModule, Dependon, Hardened, ServicesContainer) {
  var hiveOptions = [];
  var BeeHive = GenericModule.extend({
    initialize: function initialize(options) {
      _.extend(this, _.pick(options, hiveOptions));

      this.Services = new ServicesContainer();
      this.Objects = new ServicesContainer();
      this.debug = false;
      this.active = true;
    },
    activate: function activate() {
      this.Services.activate.apply(this.Services, arguments);
      this.Objects.activate(this);
      this.active = true;
    },
    destroy: function destroy() {
      this.Services.destroy(arguments);
      this.Objects.destroy(arguments);
      this.active = false;
    },
    getService: function getService(name) {
      return this.Services.get(name);
    },
    hasService: function hasService(name) {
      return this.Services.has(name);
    },
    addService: function addService(name, service) {
      return this.Services.add(name, service);
    },
    removeService: function removeService(name) {
      return this.Services.remove(name);
    },
    getObject: function getObject(name) {
      return this.Objects.get(name);
    },
    hasObject: function hasObject(name) {
      return this.Objects.has(name);
    },
    addObject: function addObject(name, service) {
      return this.Objects.add(name, service);
    },
    removeObject: function removeObject(name) {
      return this.Objects.remove(name);
    },
    getDebug: function getDebug() {
      return this.debug;
    },
    getAllServices: function getAllServices() {
      return this.Services.getAll();
    },
    getAllObjects: function getAllObjects() {
      return this.Objects.getAll();
    },

    /*
     * Wraps itself into a Facade that can be shared with other modules
     * (it is read-only); absolutely non-modifiable and provides the
     * following callbacks and properties:
     *  - Services
     */
    hardenedInterface: {
      Services: 'services container',
      Objects: 'objects container',
      debug: 'state of the app',
      active: 'active or not',
      getHardenedInstance: 'allow to create clone of the already hardened instance'
    }
  });

  _.extend(BeeHive.prototype, Hardened, {
    getHardenedInstance: function getHardenedInstance(iface) {
      iface = _.clone(iface || this.hardenedInterface); // because 'facade' functions are normally bound to the
      // original object, we have to do this to access 'facade'

      iface.getService = function (name) {
        // 'get service X (but only the hardened ones)',
        return hardened.Services.get(name);
      };

      iface.hasService = function (name) {
        return hardened.Services.has(name);
      };

      iface.getObject = function (name) {
        // 'get object X (but only the hardened ones)',
        return hardened.Objects.get(name);
      };

      iface.hasObject = function (name) {
        return hardened.Objects.has(name);
      };

      var hardened = this._getHardenedInstance(iface, this);

      return hardened;
    }
  });

  return BeeHive;
});
