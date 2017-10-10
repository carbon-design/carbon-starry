const path = require('path')
const webpack = require('webpack')
const utils = require('./util-tools')
const merge = require('webpack-merge')
const settings = require('../settings/core').dev
const baseWebpackConfig = require('./webpack.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const resolve = dir => path.join(__dirname, '..', dir)

Object.keys(baseWebpackConfig.entry).forEach(name => {
  baseWebpackConfig.entry[name] = ['./config/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: settings.cssSourceMap })
  },
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': settings.env
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: settings.projectName,
      isMobile: settings.isMobile,
      filename: 'index.html',
      favicon: resolve('static/favicon.ico'),
      template: resolve('static/index.ejs'),
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
