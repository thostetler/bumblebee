function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

define(['js/page_managers/controller'], function (PageManagerController) {
  var PageManager = PageManagerController.extend({
    assemble: function () {
      var _assemble = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function assemble() {
        return _assemble.apply(this, arguments);
      }

      return assemble;
    }(),

    /**
     * This method will create the view, really this is a container for the react
     * widget to render into, the list of widgets should be passed by the page manager
     */
    createView: function createView(_ref) {
      var _ref$widgets = _ref.widgets,
          widgets = _ref$widgets === void 0 ? {} : _ref$widgets;
      var keys = Object.keys(widgets);
      var widget = keys.length > 0 ? keys[0] : null;

      if (widget) {
        var inner = document.createElement('div');
        inner.setAttribute('data-widget', widget);
        var el = document.createElement('div');
        el.appendChild(inner);
        return new Backbone.View({
          el: el
        });
      }

      return new Backbone.View();
    }
  });
  return PageManager;
});
