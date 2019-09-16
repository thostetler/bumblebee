define([
  'underscore',
  'react',
  'react-bootstrap',
  'es6!./RoleSelector.jsx',
], function(_, React, {Modal, Form}, RoleSelector) {
  /**
   * @typedef {{
   *    admin: boolean,
   *    write: boolean,
   *    read: boolean
   *  }} UpdatePermissionsModalState
   */

  /**
   * Takes in a list of roles and formats them properly to fit
   * the state structure
   * @param {string[]} roles the set of roles to be formatted
   * @returns {UpdatePermissionsModalState}
   */
  const formatRoles = roles => {
    const tmp = {...initialState};
    roles.forEach(role => (tmp[role] = true));
    return tmp;
  };

  /**
   * @type UpdatePermissionsModalState
   */
  const initialState = {
    admin: false,
    write: false,
    read: false,
  };
  class UpdatePermissionsModal extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        ...initialState,
      };
    }

    componentWillReceiveProps({user}) {
      if (user) {
        this.setState(formatRoles(user.roles));
      }
    }

    onSubmit(e) {
      e.preventDefault();
      this.props.updateUserRoles(this.state);
      this.props.onHide();
    }

    render() {
      if (!this.props.user) {
        return null;
      }

      const selected = Object.keys(this.state).filter(r => this.state[r]);
      const showWarningMessage = selected.length === 0;
      return (
        <Modal onHide={this.props.onHide} show={this.props.show}>
          <div className="panel panel-default" style={{marginBottom: '0'}}>
            <div className="panel-heading">
              <h1 className="h4">Modify User Permissions</h1>
            </div>
            <Form horizontal onSubmit={e => this.onSubmit(e)}>
              <div className="panel-body">
                <div className="row">
                  <div className="col-xs-12">
                    Modifying user: <strong>{this.props.user.userName}</strong>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12">Current Roles: </div>
                  <div className="col-xs-2 col-xs-offset-1">
                    <RoleSelector
                      selected={selected}
                      onChange={roles => this.setState(formatRoles(roles))}
                    />
                  </div>
                  <div className="col-xs-8">
                    {showWarningMessage && (
                      <div className="alert alert-danger">
                        Removing all roles will remove this collaborator.
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="panel-footer">
                <div className="row">
                  <div className="col-xs-10 col-xs-offset-1">
                    <div className="button-toolbar pull-right">
                      <button
                        type="reset"
                        className="btn btn-link"
                        onClick={this.props.onHide}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={e => this.onSubmit(e)}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </Modal>
      );
    }
  }

  return UpdatePermissionsModal;
});
