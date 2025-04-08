function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define([], function () {
  var reactify = {
    load: function load(name, req, onload) {
      var parts = name.split('?');
      var module = parts[0];
      var component = parts[1];
      req([module, "js/react/".concat(component, "/index")], function (loadedModule, Component) {
        // inject the react component as the view
        onload(loadedModule.extend({
          initialize: function initialize(args) {
            this.view = new Component();
            loadedModule.prototype.initialize.call(this, _objectSpread({
              componentId: component
            }, args));
          }
        }));
      });
    }
  };
  return reactify;
});
