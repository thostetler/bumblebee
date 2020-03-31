const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      _: 'lodash',
      Marionette: 'marionette',
      Backbone: 'backbone',
      MathJax: 'mathjax',
      d3: 'd3',
    }),
  ],
  resolve: {
    extensions: ['.js', '.json', '.html'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      cache: 'dsjslib/lib/Cache.js',
      analytics: 'js/components/analytics',
      utils: 'js/utils',
      'config/discovery.vars$': 'config/discovery.vars.js',
      underscore: 'lodash',
      marionette: 'backbone.marionette',
      '@imgs': 'styles/img',
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'handlebars-loader',
            options: {
              extensions: ['.html'],
              partialDirs: path.resolve(__dirname, 'src'),
              helperDirs: path.resolve(__dirname, 'src/js/handlebars/'),
              inlineRequires: '@imgs',
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'url-loader',
        options: {
          esModule: false,
          quality: 85,
          limit: 819200, // 800KB
          outputPath: 'static/assets/',
          publicPath: 'static/assets/',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(jsx\.)?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/react',
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: ['last 2 versions', 'ie >= 11'],
                  },
                  modules: false,
                },
              ],
            ],
          },
        },
      },
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: '8000',
  },
  node: {
    fs: 'empty',
  },
};
