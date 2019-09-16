define(['react', 'react-bootstrap', 'es6!./RolePill.jsx'], function(
  React,
  {Checkbox},
  RolePill,
) {
  /**
   * @typedef {{
   *    admin: { enabled: boolean, selected: boolean },
   *    write: { enabled: boolean, selected: boolean },
   *    read: { enabled: boolean, selected: boolean },
   *    roles: string[]
   *  }} RoleSelectorState
   */

  /**
   * @typedef {{
   *   onChange: function,
   *   selected: string[]
   * }} RoleSelectorProps
   */

  /**
   * Takes in a list of roles and formats them properly to fit
   * the state structure
   * @param {string[]} roles the set of roles to be formatted
   * @returns {RoleSelectorState}
   */
  const formatRoles = roles => {
    const tmp = {...initialState};
    roles.forEach((role) => {
      tmp[role] = { ...tmp[role], selected: true };
    });
    return tmp;
  };

  /**
   * Takes in a role and returns an array including the original role and
   * any sub-roles which are included.
   * @param {string} role the role to expand
   */
  const expandRole = role => {
    switch (role) {
      case 'admin':
        return ['admin', 'write', 'read'];
      case 'write':
        return ['write', 'read'];
      case 'read':
        return ['read'];
      default:
        return [];
    }
  };

  /**
   * @type RoleSelectorState
   */
  const initialState = {
    admin: {enabled: true, selected: false},
    write: {enabled: true, selected: false},
    read: {enabled: true, selected: false},
    roles: ['admin', 'write', 'read'],
  };

  /**
   * Takes in an array of roles and returns a single role which combines them
   * @param {string[]} roles array containing roles
   */
  const combineRole = _.memoize(roles => {
    const scores = {owner: 4, admin: 3, write: 2, read: 1};
    if (roles.length === 1) {
      return roles[0];
    }
    return roles.sort((a, b) => scores[b] - scores[a])[0];
  });

  class RoleSelector extends React.Component {

    /**
     * @param {RoleSelectorProps} props
     */
    constructor(props) {
      super(props);

      this.state = {
        ...initialState,
      };
    }

    /**
     * @param {RoleSelectorProps} props
     */
    componentWillReceiveProps({ selected }) {
      if (selected && selected.length > 0) {
        this.update(formatRoles(selected), true);
      }
    }

    /**
     * Toggle the selected status on the role
     * @param {string} role the role that changed
     */
    onChange(role) {
      const tempState = this.state;

      // temporary state with the current role selected status flipped
      tempState[role] = {
        ...tempState[role],
        selected: !tempState[role].selected,
      };
      this.update(tempState, false);
    }

    /**
     * Take a state object and update the selected and enabled statuses
     * @param {RoleSelectorState} tempState a state object we will operate on
     * @param {boolean} silent flag for whether to update internal state
     */
    update(tempState, silent) {
      const selected = list => Object.keys(list).filter(r => list[r].selected);

      // get the combined role and then its corresponding expansion
      const expandedRoles = _.compose(expandRole, combineRole, selected)(tempState);

      // loop through the expanded set of roles and update their selected/enabled statuses
      const newRoles = expandedRoles.reduce((acc, r, i) => {
        acc[r] = {
          enabled: i === 0,
          selected: expandedRoles.includes(r),
        };
        return acc;
      }, {});

      // finally update the state with the new set of role updates
      this.setState(prev => ({ ...prev, ...newRoles }),
        () => {
          if (!silent) {
            this.props.onChange(selected(this.state));
          }
        }
      );
    }

    render() {
      return (
        <div>
          {this.state.roles.map(role => (
            <Checkbox
              checked={this.state[role].selected}
              onChange={() => this.onChange(role)}
              disabled={!this.state[role].enabled}
            >
              <RolePill role={role} />
            </Checkbox>
          ))}
        </div>
      );
    }
  }

  return RoleSelector;
});
