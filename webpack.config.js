'use strict'

/* eslint-disable no-unused-vars */
const path = require('path')
const webpack = require('webpack')

module.exports = (function makeWebpackConfig () {
  const config = {}

  config.entry = {
    app: './app.js'
  }

  config.output = {
    path: path.join(__dirname, '/dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js'
  }

  config.devtool = 'inline-source-map'

  config.module = {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      }
    ]
  }

  config.devServer = {
    contentBase: './',
    publicPath: '/dist/',
    stats: 'minimal'
  }

  return config
}())
