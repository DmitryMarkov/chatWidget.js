'use strict'

/* eslint-disable no-unused-vars */
let webpack = require('webpack')

module.exports = (function makeWebpackConfig () {
  let config = {}

  config.entry = {
    app: './app.js'
  }

  /* eslint-disable no-path-concat */
  config.output = {
    path: __dirname + '/dist',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js'
  }

  config.devtool = 'inline-source-map'

  config.module = {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  }

  config.devServer = {
    contentBase: './',
    stats: 'minimal'
  }

  return config
}())
