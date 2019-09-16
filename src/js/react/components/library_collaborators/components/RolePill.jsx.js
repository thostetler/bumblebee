define([
  'react'
], function (React) {

  const labelStyle = {
    marginRight: '8px'
  };

  /**
  * Creates a label from a role string
  * @param {object} props
  * @param {string} props.role
  */
  const RolePill = ({ role }) => {
    switch (role) {
      case 'owner':
        return <span className="label label-primary" style={labelStyle} role="label" title={role}>{ role }</span>
      case 'write':
        return <span className="label label-warning" style={labelStyle} role="label" title={role}>{ role }</span>
      case 'admin':
        return <span className="label label-default" style={labelStyle} role="label" title={role}>{ role }</span>
      case 'read':
        return <span className="label label-info" style={labelStyle} role="label" title={role}>{ role }</span>
      default:
        return null;
    }
  }

  return RolePill;
})
