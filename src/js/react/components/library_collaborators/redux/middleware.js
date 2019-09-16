define(['underscore', './actions'], function(_, actions) {
  const {
    // types
    FETCH_PERMISSIONS,
    POST_ROLES,

    // actions
    setError,
    setUsers,
    getPermissions,
    setEditingUser,
    updateUserRoles,
  } = actions;

  /**
   * @typedef {Object<string, string[]>} LibraryPermission
   *
   * @typedef User
   * @property {string} userName
   * @property {string[]} roles
   * @property {boolean} isOwner
   * @property {boolean} isAdmin
   * @property {string} rootRole
   * @property {boolean} isCurrentUser
   */

  /**
   * Takes in an array of roles and returns a single role which combines them
   * @param {string[]} roles array containing roles
   * @returns {string} the combined role
   */
  const getCombinedRole = _.memoize(roles => {
    const scores = {owner: 4, admin: 3, write: 2, read: 1};
    if (roles.length === 1) {
      return roles[0];
    }
    return roles.sort((a, b) => scores[b] - scores[a])[0];
  });

  /**
   * Format the raw library permission data into users
   * @param {LibraryPermission[]} rawData
   * @returns {User[]}
   */
  const formatPermissionData = rawData => {
    const users = rawData.map(
      /** @returns {User} */ d => {
        /** @type {User} */
        const init = {
          userName: '',
          roles: [],
          isOwner: false,
          isAdmin: false,
          rootRole: '',
          isCurrentUser: false,
        };
        return Object.keys(d).reduce((acc, key) => {
          acc = {
            userName: key,
            roles: d[key],
            isOwner: d[key].includes('owner'),
            isAdmin: d[key].includes('admin'),
            rootRole: getCombinedRole(d[key]),
            isCurrentUser: false,
          };
          return acc;
        }, init);
      },
    );
    return users.sort((a, b) => (a.userName < b.userName ? 1 : -1));
  };

  /**
   * Fetch permissions from the server and dispatch to update store
   * @param {{ trigger: function }} ctx
   * @param {{ dispatch: function }} store
   */
  const permissions = ({trigger}, {dispatch}) => next => action => {
    next(action);
    if (action.type === FETCH_PERMISSIONS) {
      // get the current set of permissions for this library
      trigger('library-permissions', 'getPermissions', {
        done: data => {
          const users = formatPermissionData(data);
          dispatch(setUsers(users));

          // get the current user and update our set of users
          trigger('library-permissions', 'getCurrentUser', {
            done: user => {
              if (user) {
                const userUpdate = users.map((/** @type {User} */ u) => {
                  return u.userName.split('@')[0] === user
                    ? {...u, isCurrentUser: true}
                    : u;
                });
                dispatch(setUsers(userUpdate));
              }
            },
          });
        },
        fail: ({responseJSON = {}}) =>
          dispatch(setError(responseJSON.error || responseJSON.message)),
      });
    }
  };

  /**
   * After the modify modal is submitted, this will take the list and attempt to
   * diff the new list and the old list to minimize the amount of requests made.
   *
   * This will also queue tasks and run them in sequence to ensure they all finish
   * @param {{ trigger: function }} ctx
   * @param {{ dispatch: function, getState: function }} store
   */
  const postRoles = ({trigger}, {dispatch, getState}) => next => action => {
    next(action);
    if (action.type === POST_ROLES) {
      const newRoles = action.payload;
      const {editingUser: user} = getState();

      // reset editing user
      dispatch(setEditingUser(null));

      // post the updated roles
      const postRoles = permission => {
        return new Promise((resolve, reject) => {
          trigger('library-permissions', 'updatePermission', {
            data: {email: user.userName, permission},
            done: () => resolve(),
            fail: ({responseJSON: res = {}}) =>
              reject(res.error || res.message),
          });
        });
      };

      // go through the roles and skip unnecessary requests
      const roles = ['admin', 'write', 'read'];
      let updates = [];
      roles.forEach(role => {
        const inOldList = user.roles ? user.roles.includes(role) : false;
        const newVal = newRoles[role];

        if ((inOldList && newVal) || (!inOldList && !newVal)) {
          // skip
        } else if (inOldList && !newVal) {
          updates.push(_.partial(postRoles, {[role]: false}));
        } else {
          updates.push(_.partial(postRoles, {[role]: true}));
        }
      });

      // delay subsequent requests so they don't overwelm the service
      (async () => {
        for (let i = 0; i < updates.length; i++) {
          try {
            await updates[i]();
            await (() => new Promise(resolve => setTimeout(resolve, 100)));
          } catch (error) {
            dispatch(setError(error));
            setTimeout(() => dispatch(setError(null)), 5000);
          }
        }
        dispatch(getPermissions());
      })();
    }
  };

  /**
   * Convenience method which sets the editing user and passes the workload onto
   * the update user roles task
   * @param {{ trigger: function }} ctx
   * @param {{ dispatch: function }} store
   */
  const addNewUser = ({trigger}, {dispatch}) => next => action => {
    next(action);
    if (action.type === 'ADD_NEW_USER') {
      const {email, roles} = action.payload;
      dispatch(setEditingUser({userName: email}));
      dispatch(updateUserRoles(roles));
    }
  };

  /**
   * Wrap the middleware with a function that, when called,
   * binds it's first argument to the first argument of the middleware function
   * returns the wrapped middleware function
   */
  const withContext = (...fns) => context =>
    fns.map(fn => _.partial(fn, context));

  return withContext(permissions, postRoles, addNewUser);
});
