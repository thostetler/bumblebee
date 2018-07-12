/* eslint no-console: off */

/**
 * WARNING: this is a DEVELOPMENT server; DO NOT USE it in production!
 *
 * If you need to make SOLR available, you can use:
 *  http://github.com/adsabs/adsws
 *  http://github.com/adsabs/solr-service
 *
 * @type {exports}
 */


const express = require('express');
const path = require('path');
const compression = require('compression');
const proxy = require('http-proxy-middleware');

const { process, __dirname } = this;
const app = express();
const targets = {
  dev: 'https://devapi.adsabs.harvard.edu',
  prod: 'https://api.adsabs.harvard.edu',
  qa: 'https://api.adsabs.harvard.edu'
};

// default configuration
let config = {

  // root path for web (usually src/ or dist/)
  root: '/src',

  // api route, this will be proxied
  apiPath: '/v1',

  // proxy settings
  proxy: {
    target: targets[process.env.TARGET || 'dev'],
    changeOrigin: true
  },

  // api latency
  apiLatency: [0, 0]
};

if (process.env.SERVER_ENV === 'release') {
  config = Object.assign(config, { root: '/dist' });
}

// const delayer = function (min, max) {
//   return function (req, res, next) {
//     const time = Math.floor(Math.random() * (max - min + 1)) + min;
//     console.log('Delaying request ', req.originalUrl, ' for ', time, ' ms');
//     setTimeout(next, time);
//     const end = res.end;
//     res.end = function () {
//       const args = arguments;
//       setTimeout(function () {
//         console.log('ending request');
//         console.log(res.body);
//         end.apply(res, args);
//       }, time);
//     };
//   };
// };

// serve the static assets
app.use(compression());
app.use('/', express.static(path.join(__dirname, config.root)));
app.use('/test', express.static(path.join(__dirname, '/test')));
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));
app.use('/bower_components', express.static(path.join(__dirname, '/bower_components')));

// proxy api calls to the api endpoint
app.use(config.apiPath, /* delayer.apply(null, config.apiLatency), */proxy(config.proxy));

// start the server
app.listen(8000, () => {
  console.log('config: ', JSON.stringify(config));
  console.log('Listening on port 8000');
});
