define([
  'react',
  '../containers/UpdateModalContainer',
  '../containers/AddModalContainer',
  'es6!./RolePill.jsx',
], function(React, UpdatePermissionsModal, AddCollaboratorModal, RolePill) {
  /**
   * Creates the action buttons
   * @param {Object} props
   */
  const makeActionButtons = ({onUpdate}) => {
    return (
      <div className="btn-toolbar" role="toolbar">
        <button
          className="btn btn-default btn-sm"
          aria-describedby="update_permission"
          role="button"
          title="Update Permissions"
          onClick={onUpdate}
        >
          <i className="fa fa-cog" aria-hidden="true"></i>
          <span className="sr-only" id="update_permission" role="button">
            Update Permissions
          </span>
        </button>
      </div>
    );
  };

  const initialState = {
    showUpdateModal: false,
    showAddCollaboratorModal: false,
  };
  class PermissionsList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {...initialState};
    }

    /**
     * Entry point
     * Here we make our initial requests and setup the state
     */
    componentDidMount() {
      this.props.getPermissions();
    }

    /**
     * Updating roles of a user
     * This will open a modal to select/remove roles
     * @param {string} user the user to be updated
     */
    onUpdate(user) {
      this.props.setEditingUser(user);
      this.setState({showUpdateModal: true});
    }

    render() {
      // show a loading indicator if we don't have any initial data
      if (this.props.users.length === 0) {
        return (
          <div className="row" role="section">
            <div className="col-sm-12 text-center">
              <i className="fa fa-spin fa-spinner" aria-hidden="true" />{' '}
              Loading...
            </div>
          </div>
        );
      }

      return (
        <div>
          <div className="row" role="section">
            <h2 className="h4">Library Collaborators</h2>
            <div className="table-responsive" role="table">
              <table className="table">
                <thead>
                  <th scope="col">#</th>
                  <th scope="col">User</th>
                  <th scope="col">Roles</th>
                  <th scope="col">Actions</th>
                </thead>
                <tbody>
                  {this.props.users.map((user, i) => (
                    <tr
                      key={user.userName}
                      className={user.isCurrentUser ? 'active' : ''}
                    >
                      <th scope="row">{i + 1}</th>
                      <td>{user.userName}</td>
                      <td>
                        <RolePill role={user.rootRole} />
                      </td>
                      <td>
                        {!user.isCurrentUser &&
                          makeActionButtons({
                            onUpdate: () => this.onUpdate(user),
                          })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add collaborator button */}
          <div className="row text-center" role="section">
            <button
              className="btn btn-default btn-lg"
              onClick={() => this.setState({showAddCollaboratorModal: true})}
            >
              Add Collaborator
            </button>
          </div>

          {/* Modal for users to update a current collaborator's roles */}
          <UpdatePermissionsModal
            show={this.state.showUpdateModal}
            onHide={() => this.setState({showUpdateModal: false})}
          />

          {/* Modal for adding a new collaborator and setting initial roles */}
          <AddCollaboratorModal
            show={this.state.showAddCollaboratorModal}
            onHide={() => this.setState({showAddCollaboratorModal: false})}
          />

          {/* Error message */}
          {this.props.error && (
            <div className="row text-center" style={{marginTop: '1rem'}}>
              <div className="col-sm-8 col-sm-offset-2">
                <div className="alert alert-danger">
                  <i
                    className="fa fa-exclamation-triangle"
                    aria-hidden="true"
                  />{' '}
                  <span className="h4 text-danger">{this.props.error}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
  }

  PermissionsList.defaultProps = {
    showUpdateModal: false,
    showAddCollaboratorModal: false,
  };

  return PermissionsList;
});
