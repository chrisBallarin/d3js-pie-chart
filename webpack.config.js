/* eslint-disable no-undef */
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const basePath = __dirname;
module.exports = {
  entry: [
    path.resolve(basePath, 'src') + '/js/index.js',
    path.resolve(basePath, 'src') + '/chart-module/index.js',
    path.resolve(basePath, 'src') + '/chart-component/chart-component.component.js'
  ],
  output: {
    path: path.join(basePath, 'dist'),
    filename: 'bundle.js'
  },

  devServer: {
    contentBase: './dist', // Content base
    inline: true, // Enable watch and live reload
    host: 'localhost',
    port: 8080,
    stats: 'errors-only'
  },
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              // localIdentName: '[name]__[local]___[hash:base64:5]',
              localIdentName: '[local]',
              camelCase: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|json|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }

    ]
  },
  optimization: {
    minimizer: [new UglifyJsPlugin({ sourceMap: true })]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/assets/data.json', to: 'assets/data.json', force: true },
      { from: 'src/chart-component/chart-component.component.html', to: 'assets/chart-template.html', force: true },
      { from: 'src/index.html', to: 'index.html', force: true }
    ])
  ]
};