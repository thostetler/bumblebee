function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

define(['underscore', 'react', 'js/react/MyAdsDashboard/components/TemplatePill.jsx', 'moment', 'js/react/MyAdsDashboard/components/ActionsDropdown.jsx', 'prop-types'], function (_, React, TemplatePill, moment, ActionsDropdown, PropTypes) {
  var getFriendlyDateString = function getFriendlyDateString(dateStr) {
    return moment(dateStr).format('lll');
  };

  var SortableHeader = function SortableHeader(_ref) {
    var children = _ref.children,
        _onClick = _ref.onClick,
        direction = _ref.direction,
        active = _ref.active;

    if (!active) {
      return /*#__PURE__*/React.createElement("th", {
        scope: "col",
        onClick: function onClick() {
          return _onClick('asc');
        }
      }, children);
    }

    var caret = direction === 'desc' ? 'down' : 'up';
    return /*#__PURE__*/React.createElement("th", {
      scope: "col",
      onClick: function onClick() {
        return _onClick(direction === 'desc' ? 'asc' : 'desc');
      }
    }, children, " ", /*#__PURE__*/React.createElement("i", {
      className: "fa fa-caret-".concat(caret),
      "aria-hidden": "true"
    }));
  };

  SortableHeader.defaultProps = {
    active: false,
    children: null,
    direction: '',
    onClick: function onClick() {}
  };
  SortableHeader.propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    direction: PropTypes.string,
    onClick: PropTypes.func
  };
  /**
   * @typedef {import('js/react/MyAdsDashboard/typedefs.js').Notification} Notification
   */

  var MyAdsDashboard = /*#__PURE__*/function (_React$Component) {
    _inherits(MyAdsDashboard, _React$Component);

    function MyAdsDashboard(props) {
      var _this;

      _classCallCheck(this, MyAdsDashboard);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(MyAdsDashboard).call(this, props));
      _this.state = {
        activeItem: null,
        searchValue: '',
        filterText: null,
        sortCol: null,
        sortDir: null,
        loadingQuery: false
      };
      _this.onFilter = _.debounce(_this.onFilter, 100);
      _this.onRunQuery = _this.onRunQuery.bind(_assertThisInitialized(_this));
      _this.onToggleActive = _this.onToggleActive.bind(_assertThisInitialized(_this));
      _this.onDelete = _this.onDelete.bind(_assertThisInitialized(_this));
      _this.onEdit = _this.onEdit.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(MyAdsDashboard, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this$props = this.props,
            notifications = _this$props.notifications,
            getNotifications = _this$props.getNotifications;

        if (Object.keys(notifications).length === 0) {
          getNotifications();
        }
      }
    }, {
      key: "onLeaveItem",
      value: function onLeaveItem() {
        var _this2 = this;

        requestAnimationFrame(function () {
          return _this2.setState({
            activeItem: null
          });
        });
      }
      /**
       * @param {string} id
       */

    }, {
      key: "onEnterItem",
      value: function onEnterItem(id) {
        var _this3 = this;

        requestAnimationFrame(function () {
          return _this3.setState({
            activeItem: id
          });
        });
      }
      /**
       * @param {Notification} item
       */

    }, {
      key: "onEdit",
      value: function onEdit(item) {
        var editNotification = this.props.editNotification;
        editNotification(item.id);
      }
      /**
       * @param {Notification} item
       */

    }, {
      key: "onDelete",
      value: function onDelete(item) {
        var removeNotification = this.props.removeNotification; // eslint-disable-next-line no-alert

        if (window.confirm('Are you sure?')) {
          removeNotification(item.id);
        }
      }
    }, {
      key: "onCreateNewNotification",
      value: function onCreateNewNotification() {
        var createNewNotification = this.props.createNewNotification;
        createNewNotification();
      }
    }, {
      key: "onImportNotifications",
      value: function onImportNotifications() {
        var importNotifications = this.props.importNotifications;
        importNotifications();
      }
      /**
       *
       * @param {Notification} item
       */

    }, {
      key: "onToggleActive",
      value: function onToggleActive(item) {
        var toggleActive = this.props.toggleActive;
        toggleActive(item.id);
      }
    }, {
      key: "onFilter",
      value: function onFilter(filterText) {
        var _this4 = this;

        requestAnimationFrame(function () {
          return _this4.setState({
            filterText: filterText
          });
        });
      }
    }, {
      key: "onSearch",

      /**
       *
       * @param {string} value
       */
      value: function onSearch(value) {
        this.setState({
          searchValue: value
        });
        this.onFilter(value);
      }
    }, {
      key: "onSort",
      value: function onSort(sortCol) {
        var _this5 = this;

        return function (sortDir) {
          _this5.setState({
            sortCol: sortCol,
            sortDir: sortDir
          });
        };
      }
    }, {
      key: "onRunQuery",
      value: function onRunQuery(_ref2, queryKey) {
        var id = _ref2.id;
        var runQuery = this.props.runQuery;
        runQuery(id, queryKey);
        this.setState({
          loadingQuery: true
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this6 = this;

        var _this$props2 = this.props,
            notifications = _this$props2.notifications,
            getRequest = _this$props2.getNotificationsRequest,
            updateRequest = _this$props2.updateNotificationRequest,
            removeRequest = _this$props2.removeNotificationRequest;
        var _this$state = this.state,
            filterText = _this$state.filterText,
            sortCol = _this$state.sortCol,
            sortDir = _this$state.sortDir,
            searchValue = _this$state.searchValue,
            activeItem = _this$state.activeItem,
            loadingQuery = _this$state.loadingQuery;
        var ids = Object.keys(notifications);

        if (filterText && filterText.length > 0) {
          var regx = new RegExp('.*' + filterText + '.*', 'ig');
          ids = Object.keys(notifications).filter(function (k) {
            if (!filterText) {
              return true;
            }

            return _.values(notifications[k]).join(' ').match(regx);
          });
        }

        if (sortCol && sortDir) {
          ids = ids.sort(function (a, b) {
            var left = notifications[a],
                right = notifications[b];
            var prop = sortCol === '#' ? 'id' : sortCol;
            var dir = sortDir;
            var leftVal = left[prop];
            var rightVal = right[prop];

            if (prop === 'updated') {
              return moment(dir === 'asc' ? leftVal : rightVal).diff(dir === 'asc' ? rightVal : leftVal);
            }

            if (leftVal < rightVal) {
              return dir === 'asc' ? -1 : 1;
            }

            if (leftVal > rightVal) {
              return dir === 'asc' ? 1 : -1;
            }

            return 0;
          });
        }

        var disable = removeRequest.status === 'pending' || updateRequest.status === 'pending' || getRequest.status === 'pending';

        if (ids.length === 0 && getRequest.status === 'pending' || loadingQuery) {
          return getRequest.status === 'pending' || loadingQuery ? /*#__PURE__*/React.createElement("div", {
            className: "row text-center"
          }, /*#__PURE__*/React.createElement("h3", {
            className: "h4"
          }, /*#__PURE__*/React.createElement("i", {
            className: "fa fa-spinner fa-spin",
            "aria-hidden": "true"
          }), ' ', "Loading...")) : /*#__PURE__*/React.createElement("div", {
            className: "row text-center"
          }, /*#__PURE__*/React.createElement("h3", {
            className: "h4 text-danger"
          }, "Error: ", getRequest.error));
        }

        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
          className: "row",
          style: {
            marginBottom: '2rem'
          }
        }, /*#__PURE__*/React.createElement("div", {
          className: "col-sm-4"
        }, /*#__PURE__*/React.createElement("h3", {
          className: "h3",
          style: {
            marginBottom: '10px',
            marginTop: '10px',
            lineHeight: '20px'
          }
        }, "Email Notifications")), /*#__PURE__*/React.createElement("div", {
          className: "col-sm-4"
        }, /*#__PURE__*/React.createElement("input", {
          type: "text",
          name: "search",
          id: "search",
          className: "form-control",
          placeholder: "Search...",
          value: searchValue,
          onChange: function onChange(e) {
            return _this6.onSearch(e.target.value);
          }
        })), /*#__PURE__*/React.createElement("div", {
          className: "col-sm-2 col-sm-offset-2 col-md-3 col-md-offset-1"
        }, /*#__PURE__*/React.createElement("span", {
          className: "pull-right hidden-xs"
        }, /*#__PURE__*/React.createElement("div", {
          className: "btn-group",
          role: "group",
          "aria-label": "group of action buttons"
        }, /*#__PURE__*/React.createElement("button", {
          type: "button",
          className: "btn btn-default",
          onClick: function onClick() {
            return _this6.onCreateNewNotification();
          },
          title: "create new notification",
          disabled: disable
        }, /*#__PURE__*/React.createElement("i", {
          className: "fa fa-plus",
          "aria-hidden": "true"
        }), " Create"), /*#__PURE__*/React.createElement("button", {
          type: "button",
          className: "btn btn-default",
          onClick: function onClick() {
            return _this6.onImportNotifications();
          },
          title: "import notification",
          disabled: disable
        }, /*#__PURE__*/React.createElement("i", {
          className: "fa fa-upload",
          "aria-hidden": "true"
        }), " Import"))), /*#__PURE__*/React.createElement("span", {
          className: "hidden-sm hidden-md hidden-lg hidden-xl"
        }, /*#__PURE__*/React.createElement("div", {
          className: "btn-group btn-group-justified",
          role: "group",
          "aria-label": "group of action buttons",
          style: {
            marginTop: 10
          }
        }, /*#__PURE__*/React.createElement("div", {
          className: "btn-group"
        }, /*#__PURE__*/React.createElement("button", {
          type: "button",
          className: "btn btn-default",
          onClick: function onClick() {
            return _this6.onCreateNewNotification();
          },
          title: "create new notification",
          disabled: disable
        }, /*#__PURE__*/React.createElement("i", {
          className: "fa fa-plus",
          "aria-hidden": "true"
        }), " Create")), /*#__PURE__*/React.createElement("div", {
          className: "btn-group"
        }, /*#__PURE__*/React.createElement("button", {
          type: "button",
          className: "btn btn-default",
          onClick: function onClick() {
            return _this6.onImportNotifications();
          },
          title: "import notification",
          disabled: disable
        }, /*#__PURE__*/React.createElement("i", {
          className: "fa fa-upload",
          "aria-hidden": "true"
        }), " Import")))))), /*#__PURE__*/React.createElement("table", {
          className: "table"
        }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement(SortableHeader, {
          onClick: this.onSort('#'),
          active: sortCol === '#',
          direction: sortDir
        }, "#"), /*#__PURE__*/React.createElement(SortableHeader, {
          onClick: this.onSort('name'),
          active: sortCol === 'name',
          direction: sortDir
        }, "Name"), /*#__PURE__*/React.createElement(SortableHeader, {
          onClick: this.onSort('template'),
          active: sortCol === 'template',
          direction: sortDir
        }, "Type"), /*#__PURE__*/React.createElement(SortableHeader, {
          onClick: this.onSort('frequency'),
          active: sortCol === 'frequency',
          direction: sortDir
        }, "Frequency"), /*#__PURE__*/React.createElement(SortableHeader, {
          onClick: this.onSort('updated'),
          active: sortCol === 'updated',
          direction: sortDir
        }, "Updated"), /*#__PURE__*/React.createElement("th", {
          scope: "col"
        }, "Actions"))), /*#__PURE__*/React.createElement("tbody", null, ids.map(function (id, i) {
          /** @type {Notification} */
          var item = notifications[id];
          return /*#__PURE__*/React.createElement("tr", {
            key: id,
            className: (activeItem === id ? 'info ' : '') + (item.active ? '' : 'inactive'),
            style: {
              backgroundColor: item.active ? 'inherit' : 'rgba(0,0,0,0.09)'
            }
          }, /*#__PURE__*/React.createElement("th", {
            scope: "row",
            className: item.active ? '' : 'text-faded'
          }, i + 1), /*#__PURE__*/React.createElement("td", {
            className: item.active ? '' : 'text-faded'
          }, /*#__PURE__*/React.createElement("h4", {
            className: "h5",
            style: {
              margin: 0,
              marginTop: 3
            }
          }, item.name)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(TemplatePill, {
            name: item.template,
            disabled: !item.active
          })), /*#__PURE__*/React.createElement("td", {
            className: item.active ? '' : 'text-faded'
          }, item.frequency), /*#__PURE__*/React.createElement("td", {
            className: item.active ? '' : 'text-faded'
          }, getFriendlyDateString(item.updated)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(ActionsDropdown, {
            disable: disable,
            item: item,
            onDelete: _this6.onDelete,
            onEdit: _this6.onEdit,
            onRunQuery: _this6.onRunQuery,
            onToggleActive: _this6.onToggleActive,
            dropup: i > 2
          })));
        }))), ids.length === 0 && searchValue && /*#__PURE__*/React.createElement("div", null, "Your search is not matching any notifications."), ids.length === 0 && !searchValue && /*#__PURE__*/React.createElement("div", null, "You don't have any notifications yet!"));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(props, state) {
        if (props.getRequest.status !== 'pending' && state.loadingQuery) {
          return {
            loadingQuery: false
          };
        }

        return null;
      }
    }]);

    return MyAdsDashboard;
  }(React.Component);

  MyAdsDashboard.defaultProps = {
    createNewNotification: function createNewNotification() {},
    editNotification: function editNotification() {},
    getNotifications: function getNotifications() {},
    getRequest: function getRequest() {},
    importNotifications: function importNotifications() {},
    notifications: [],
    removeNotification: function removeNotification() {},
    removeRequest: function removeRequest() {},
    runQuery: function runQuery() {},
    toggleActive: function toggleActive() {},
    updateRequest: function updateRequest() {},
    getNotificationsRequest: function getNotificationsRequest() {},
    updateNotificationRequest: function updateNotificationRequest() {},
    removeNotificationRequest: function removeNotificationRequest() {}
  };
  MyAdsDashboard.propTypes = {
    createNewNotification: PropTypes.func,
    editNotification: PropTypes.func,
    getNotifications: PropTypes.func,
    getRequest: PropTypes.func,
    importNotifications: PropTypes.func,
    notifications: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      frequency: PropTypes.string,
      updated: PropTypes.string,
      active: PropTypes.bool,
      template: PropTypes.string
    })),
    removeNotification: PropTypes.func,
    removeRequest: PropTypes.func,
    runQuery: PropTypes.func,
    toggleActive: PropTypes.func,
    updateRequest: PropTypes.func,
    getNotificationsRequest: PropTypes.func,
    updateNotificationRequest: PropTypes.func,
    removeNotificationRequest: PropTypes.func
  };
  return MyAdsDashboard;
});
