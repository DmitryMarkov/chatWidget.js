'use strict'

/* eslint-disable no-unused-vars */
let path = require('path')
let webpack = require('webpack')
// let appRoot = path.resolve(__dirname, '/dist')

module.exports = (function makeWebpackConfig () {
  let config = {}

  config.entry = {
    app: './app.js'
  }

  config.output = {
    path: 'dist/',
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
