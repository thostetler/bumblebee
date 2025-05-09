const path = require('node:path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const OUTPUT_DIR = path.resolve(__dirname, 'dist');
const isDev = process.env.NODE_ENV !== 'production';
const ASSETS_PATH = process.env.LOCAL_BUILD ? '/' : 'https://ads-assets.pages.dev/';

module.exports = {
  mode: isDev ? 'development' : 'production',
  devServer: {
    static: {
      directory: OUTPUT_DIR,
      publicPath: '/',
    },
    compress: true,
    port: 8000,
    hot: true,
    historyApiFallback: {
      disableDotRule: true,
      rewrites: [{ from: /^\/.*$/, to: '/index.html' }],
    },
    client: {
      overlay: {
        errors: false,
        warnings: false,
        runtimeErrors: true,
      },
      progress: true,
    },
  },
  resolve: {
    extensions: ['.ts', '.js', '.jsx', '.tsx'],
    fallback: {
      fs: false,
      path: require.resolve('path-browserify'),
      assert: require.resolve('assert/'),
      util: require.resolve('util/'),
      process: require.resolve('process/browser.js'),
    },
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      analytics: path.resolve('src/js/components/analytics'),
      utils: path.resolve(__dirname, 'src/js/utils'),
      reactify: path.resolve(__dirname, 'src/js/plugins/reactify'),
      es6: path.resolve(__dirname, 'src/js/plugins/es6'),
      pubsub_service_impl: path.resolve(__dirname, 'src/js/services/default_pubsub'),
      router: path.resolve(__dirname, 'src/js/apps/discovery/router'),

      // libraries
      backbone: path.resolve(__dirname, 'node_modules/backbone'),

      // Patch all broken nested dependency paths
      'backbone.babysitter/node_modules/backbone': path.resolve(__dirname, 'node_modules/backbone'),
      'backbone.marionette/node_modules/backbone': path.resolve(__dirname, 'node_modules/backbone'),
      'backbone.wreqr/node_modules/backbone': path.resolve(__dirname, 'node_modules/backbone'),

      // Other relevant aliases
      'backbone.marionette': path.resolve(__dirname, 'node_modules/backbone.marionette'),
      'backbone.babysitter': path.resolve(__dirname, 'node_modules/backbone.babysitter'),
      'backbone.wreqr': path.resolve(__dirname, 'node_modules/backbone.wreqr'),
      marionette: 'backbone.marionette',
      cache: path.resolve(__dirname, 'src/libs/cache'),
      yup: path.resolve(__dirname, 'src/libs/yup'),
      polyfill: path.resolve(__dirname, 'src/libs/polyfill'),
      hbs: path.resolve(__dirname, 'src/libs/requirejs-plugins/hbs'),
      async: path.resolve(__dirname, 'src/libs/requirejs-plugins/async'),
      'lodash.compat': path.resolve(__dirname, 'node_modules/lodash/dist/lodash.compat'),
    },
    symlinks: false,
  },
  resolveLoader: {
    alias: {
      backbone: path.resolve(__dirname, 'node_modules/backbone'),
      'backbone.babysitter/node_modules/backbone': path.resolve(__dirname, 'node_modules/backbone'),
      'backbone.marionette/node_modules/backbone': path.resolve(__dirname, 'node_modules/backbone'),
      'backbone.wreqr/node_modules/backbone': path.resolve(__dirname, 'node_modules/backbone'),
    },
    symlinks: false,
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        options: {
          partialDirs: [path.join(__dirname, 'src')],
          helperDirs: [path.join(__dirname, 'src/js/helpers')],
          inlineRequires: '/assets/images/',
        },
      },
      {
        test: /\.(js|jsx|tsx|ts|jsx\.js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            targets: 'defaults',
            presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.s[a|c]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
      },
    ],
  },
  entry: {
    app: path.resolve(__dirname, 'src/config/webpack-entry.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: OUTPUT_DIR,
    publicPath: isDev ? '/' : ASSETS_PATH,
    clean: true,
    assetModuleFilename: 'assets/[name][ext][query]',
    charset: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 400000,
      cacheGroups: {
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-redux)[\\/]/,
          name: 'react-vendor',
          chunks: 'all',
          priority: 20,
          enforce: true,
        },
        backboneVendor: {
          test: /[\\/]node_modules[\\/](backbone|underscore|jquery|backbone\.marionette|backbone\.wreqr|backbone\.babysitter)[\\/]/,
          name: 'backbone-vendor',
          chunks: 'all',
          priority: 19,
          enforce: true,
        },
        uiVendor: {
          test: /[\\/]node_modules[\\/](bootstrap|font-awesome|jquery-ui|hotkeys-js)[\\/]/,
          name: 'ui-vendor',
          chunks: 'all',
          priority: 18,
          enforce: true,
        },
        libraries: {
          test: /[\\/]src[\\/]libs[\\/]/,
          name: 'libs',
          chunks: 'all',
          priority: 10,
          enforce: true,
        },
        shared: {
          minChunks: 2,
          name: 'shared',
          priority: -10,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/backbone$/, path.resolve(__dirname, 'node_modules/backbone')),
    new Dotenv({ safe: false }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false,
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
      favicon: path.resolve(__dirname, 'src/assets/favicon/favicon.ico'),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/404.html'),
      filename: '404.html',
      inject: false,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/500.html'),
      filename: '500.html',
      inject: false,
    }),
    // Add underscore as a global
    new webpack.ProvidePlugin({
      _: 'lodash.compat',
      __: 'lodash',
      Backbone: 'backbone',
      Marionette: 'backbone.marionette',
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
      process: 'process/browser.js',
      Buffer: ['buffer', 'Buffer'],
    }),
    new ForkTsCheckerWebpackPlugin(),
    isDev
      ? null
      : new webpack.SourceMapDevToolPlugin({
          filename: '[file].map[query]',
          exclude: ['vendor.js', 'vendor.css'],
        }),
  ],
  devtool: isDev ? 'eval-source-map' : false,
};
