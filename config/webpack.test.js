const webpack = require('webpack')
const utils = require('./util-tools')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')

const webpackConfig = merge(baseConfig, {
  module: {
    rules: utils.styleLoaders()
  },
  devtool: '#inline-source-map',
  resolveLoader: {
    alias: {
      'scss-loader': 'sass-loader'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../settings/env').test
    })
  ]
})

delete webpackConfig.entry

module.exports = webpackConfig
