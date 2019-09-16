define([
  'react'
], function (React) {

  class PermissionsList extends React.Component {

    componentDidMount() {
      this.props.trigger('library-permissions', 'getPermissions', (data) => {
        console.log('setting permissions');
        this.props.setPermissions(data);
      });
    }

    render() {
      console.log('sldkfjds', this.props);
      return (<div>testing{ this.props.permissions }</div>)
    }
  }

  return PermissionsList;
});
