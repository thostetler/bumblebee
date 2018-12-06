const path = require('path');

module.exports = {
  entry: './src/js/apps/discovery/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'src/dist')
  },
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    compress: false,
    port: 8000
  },
  resolve: {
    modules: ['node_modules'],
    alias: {
      'analytics': path.resolve(__dirname, 'src/js/components/analytics'),
      'async': path.resolve(__dirname, 'src/libs/requirejs-plugins/async'),
      'babel': path.resolve(__dirname, 'src/libs/requirejs-babel-plugin/babel-5.8.34.min'),
      'backbone-validation': path.resolve(__dirname, 'src/libs/backbone-validation/backbone-validation'),
      'backbone.stickit': path.resolve(__dirname, 'src/libs/backbone.stickit/backbone.stickit'),
      'backbone.wreqr': path.resolve(__dirname, 'src/libs/backbone.wreqr/lib/backbone.wreqr'),
      'backbone': path.resolve(__dirname, 'src/libs/backbone/backbone'),
      'bootstrap': path.resolve(__dirname, 'src/libs/bootstrap/bootstrap'),
      'cache': path.resolve(__dirname, 'src/libs/dsjslib/lib/Cache'),
      'chai': path.resolve(__dirname, '../bower_components/chai/chai'),
      'classnames': path.resolve(__dirname, '../bower_components/classnames/index'),
      'clipboard': path.resolve(__dirname, 'src/libs/clipboard/clipboard'),
      'config': path.resolve(__dirname, 'src/discovery.config'),
      'create-react-class': path.resolve(__dirname, 'src/libs/create-react-class/index'),
      'd3-cloud': path.resolve(__dirname, 'src/libs/d3-cloud/d3.layout.cloud'),
      'd3': path.resolve(__dirname, 'src/libs/d3/d3.min'),
      'enzyme': path.resolve(__dirname, 'src/libs/enzyme/enzyme'),
      'es5-shim': path.resolve(__dirname, 'src/libs/es5-shim/es5-shim'),
      'es6': path.resolve(__dirname, 'src/libs/requirejs-babel-plugin/es6'),
      'filesaver': path.resolve(__dirname, 'src/libs/file-saver/index'),
      'hbs': path.resolve(__dirname, 'src/libs/require-handlebars-plugin/hbs'),
      'immutable': path.resolve(__dirname, 'src/libs/immutable/index'),
      'jquery-querybuilder': path.resolve(__dirname, 'src/libs/jQuery-QueryBuilder/query-builder'),
      'jquery-ui': path.resolve(__dirname, 'src/libs/jqueryui/jquery-ui'),
      'jquery': path.resolve(__dirname, 'src/libs/jquery/jquery'),
      'jsonpath': path.resolve(__dirname, 'src/libs/jsonpath/jsonpath'),
      'main': path.resolve(__dirname, 'src/js/apps/discovery/main'),
      'marionette': path.resolve(__dirname, 'src/libs/marionette/backbone.marionette'),
      'mathjax': path.resolve(__dirname, 'src/libs/mathjax/index'),
      'mocha': path.resolve(__dirname, 'src/libs/mocha/mocha'),
      'moment': path.resolve(__dirname, 'src/libs/momentjs/moment'),
      'persist-js': path.resolve(__dirname, 'src/libs/persist-js/src/persist'),
      'pubsub_service_impl': path.resolve(__dirname, 'src/js/services/default_pubsub'),
      'react-bootstrap': path.resolve(__dirname, 'src/libs/react-bootstrap/index'),
      'react-dom': path.resolve(__dirname, 'src/libs/react-dom/index'),
      'react-prop-types': path.resolve(__dirname, 'src/libs/react-prop-types/index'),
      'react-redux': path.resolve(__dirname, 'src/libs/react-redux/index'),
      'react': path.resolve(__dirname, 'src/libs/react/index'),
      'redux-immutable': path.resolve(__dirname, 'src/libs/redux-immutable/index'),
      'redux-thunk': path.resolve(__dirname, 'src/libs/redux-thunk/index'),
      'redux': path.resolve(__dirname, 'src/libs/redux/index'),
      'reselect': path.resolve(__dirname, 'src/libs/reselect'),
      'router': path.resolve(__dirname, 'src/js/apps/discovery/router'),
      'select2': path.resolve(__dirname, 'src/libs/select2/'),
      'sinon': path.resolve(__dirname, '../bower_components/sinon/index'),
      'sprintf': path.resolve(__dirname, 'src/libs/sprintf/sprintf'),
      'underscore': path.resolve(__dirname, 'src/libs/lodash/lodash.compat'),
      'utils': path.resolve(__dirname, 'src/js/utils/'),
      'js/wraps': path.resolve(__dirname, 'src/js/wraps/'),
      'js/apps': path.resolve(__dirname, 'src/js/apps/'),
      'js/mixins': path.resolve(__dirname, 'src/js/mixins/'),
      'js/components': path.resolve(__dirname, 'src/js/components/'),
      'js/widgets': path.resolve(__dirname, 'src/js/widgets/'),
      'js/page_managers': path.resolve(__dirname, 'src/js/page_managers/'),
      'js/bugutils': path.resolve(__dirname, 'src/js/bugutils/'),
      'js/modules': path.resolve(__dirname, 'src/js/modules/'),
      'js/services': path.resolve(__dirname, 'src/js/services/'),
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
      {
        test: /\.html$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'handlebars-loader',
          options: {
            ignorePartials: true,
            ignoreHelpers: true
          }
        }
      }
    ]
  }
}
