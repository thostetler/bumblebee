const reactify = {
  load: function(name, req, onload) {
    const parts = name.split('?');
    const module = parts[0];
    const component = parts[1];

    // Dynamically import the module and component
    import(`js/react/${component}/index`)
      .then((Component) => {
        // Dynamically load the module and component, then inject the component as the view
        import(module).then((loadedModule) => {
          onload(
            loadedModule.extend({
              initialize: function(args) {
                this.view = new Component.default(); // assuming Component is default exported
                loadedModule.prototype.initialize.call(this, {
                  componentId: component,
                  ...args,
                });
              },
            })
          );
        });
      })
      .catch((error) => {
        console.error('Error loading module or component: ', error);
      });
  },
};

export default reactify;
