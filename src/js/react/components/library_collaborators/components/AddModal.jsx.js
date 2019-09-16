define([
  'react',
  'react-bootstrap',
  'es6!./RoleSelector.jsx',
], function(
  React,
  {Modal, Form, FormGroup, FormControl, ControlLabel, HelpBlock},
  RoleSelector,
) {
  /**
   * @typedef AddCollaboratorModalState
   * @property {object} roles
   * @property {boolean} roles.admin
   * @property {boolean} roles.write
   * @property {boolean} roles.read
   * @property {string} email
   */

  /**
   * Takes in a list of roles and formats them properly to fit
   * the state structure
   * @param {string[]} roles the set of roles to be formatted
   * @returns {AddCollaboratorModalState["roles"]}
   */
  const formatRoles = (roles) => {
    const tmp = { ...initialState.roles };
    roles.forEach((role) => tmp[role] = true);
    return tmp;
  }

  /**
   * @type AddCollaboratorModalState
   */
  const initialState = {
    roles: { admin: false, write: false, read: false },
    email: ''
  };

  class AddCollaboratorModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        ...initialState
      };
    }

    onSubmit(e) {
      e.preventDefault();
      this.props.addNewUser(this.state);
      this.props.onHide();
    }

    render() {
      const {roles, email} = this.state;
      const selected = Object.keys(roles).filter(r => roles[r]);
      const disableSubmit = selected.length === 0 || email.length === 0;

      return (
        <Modal onHide={this.props.onHide} show={this.props.show}>
          <div className="panel panel-default" style={{marginBottom: '0'}}>
            <div className="panel-heading">
              <h1 className="h4">Add Collaborator</h1>
            </div>
            <Form horizontal onSubmit={e => !disableSubmit && this.onSubmit(e)}>
              <div className="panel-body">
                <div className="row">
                  <div className="col-sm-10 col-sm-offset-1">
                    <FormGroup>
                      <ControlLabel>Email</ControlLabel>
                      <FormControl
                        type="text"
                        placeholder="user@mymail.com"
                        onChange={e => this.setState({email: e.target.value})}
                      />
                      <HelpBlock>Enter the email of the collaborator</HelpBlock>
                    </FormGroup>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12">Roles: </div>
                  <div className="col-xs-10 col-xs-offset-1">
                    <RoleSelector
                      onChange={(roles) => this.setState({ roles: formatRoles(roles) })}
                    />
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
                        disabled={disableSubmit}
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

  return AddCollaboratorModal;
});
