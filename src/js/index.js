import 'babel-polyfill';
import 'bootstrap-sass/assets/javascripts/bootstrap';
import Application from 'js/components/application';
import DiscoveryBootstrap from 'js/mixins/discovery_bootstrap';
import Router from 'js/apps/discovery/router';
import appModules from './core';

window.$ = $;
window.jQuery = $;

const init = async function() {
  Application.prototype.shim();
  const app = new (Application.extend(DiscoveryBootstrap))({
    debug: true,
    timeout: 30000,
  });

  const modules = appModules.core;
  Object.keys(modules).forEach((section) => {
    app._registerLoadedModules(section, modules[section]);
  });

  app.activate();
  const ps = app.getService('PubSub');
  const publish = (...args) => {
    ps.publish(ps.getCurrentPubSubKey(), ...args);
  };
  publish(ps.APP_LOADED);
  app.configure();
  try {
    const data = await app.bootstrap();
    app.onBootstrap(data);
    publish(ps.APP_BOOTSTRAPPED);
    publish(ps.APP_STARTING);
    await app.start(Router);
    publish(ps.APP_STARTED);
  } catch (e) {
    console.error(e);
    app.redirect('500.html');
  }
  window.bbb = app;
};

init();
