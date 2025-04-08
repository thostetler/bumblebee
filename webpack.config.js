const path = require('node:path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',

  resolve: {
    fallback: {
      fs: false,
      path: require.resolve('path-browserify'),
      assert: require.resolve('assert/'),
    },
    modules: [path.resolve(__dirname, 'src/libs'), path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      analytics: path.resolve('src/js/components/analytics'),
      utils: path.resolve(__dirname, 'src/js/utils'),
      reactify: path.resolve(__dirname, 'src/js/plugins/reactify'),
      es6: path.resolve(__dirname, 'src/js/plugins/es6'),
      pubsub_service_impl: path.resolve(__dirname, 'src/js/services/default_pubsub'),
      router: path.resolve(__dirname, 'src/js/apps/discovery/router'),

      // libraries
      bootstrap: path.resolve(__dirname, 'src/libs/bootstrap/bootstrap'),
      marionette: path.resolve(__dirname, 'src/libs/backbone.marionette'),
      filesaver: path.resolve(__dirname, 'src/libs/file-saver'),
      cache: path.resolve('./src/libs/cache'),
      polyfill: path.resolve('libs/polyfill'),
      yup: path.resolve('libs/yup'),
      hbs: path.resolve(__dirname, 'src/libs/requirejs-plugins/hbs'),
      async: path.resolve(__dirname, 'src/libs/requirejs-plugins/async'),

      // suit
      suit: path.resolve(__dirname, 'shared/dist/index.umd.development'),
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'handlebars-loader',
        options: {
          partialResolver: function (partial, cb) {
            cb(null, path.join(__dirname, 'src', `${partial}.html`));
          },
          knownHelpers: ['compare']
        }
      },
      {
        test: /\.(js|jsx|tsx|ts|jsx\.js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  entry: {
    app: path.resolve(__dirname, 'src/config/webpack-entry.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'webpack-out'),
    clean: false,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]|[\\/]src[\\/]libs[\\/]/,
          name: 'vendor',
          chunks: 'all',
          enforce: true,
        },
        common: {
          name: 'common',
          minChunks: 2, // only pull code shared in 2+ entry points
          chunks: 'all',
          priority: -5,
          enforce: true,
          test: (module) => {
            // Exclude vendor modules
            const isVendor =
              /[\\/]node_modules[\\/]/.test(module.identifier()) || /[\\/]src[\\/]libs[\\/]/.test(module.identifier());
            return !isVendor;
          },
        },
      },
    },
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/reactify/, path.resolve(__dirname, 'src/js/plugins/reactify.js')),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    {
      apply(compiler) {
        compiler.hooks.normalModuleFactory.tap('RewriteHbsPlugin', (nmf) => {
          nmf.hooks.beforeResolve.tap('RewriteHbsPlugin', (result) => {
            if (!result) return;

            if (result.request.startsWith('hbs!')) {
              const base = result.request.slice(4);
              // Update the request directly (mutate the object)
              if (!base.endsWith('.html') && !base.endsWith('.hbs')) {
                result.request = `${base}.html`;
              } else {
                result.request = base;
              }
            }
            // return nothing (undefined)
          });
        });
      },
    },
  ],
};
