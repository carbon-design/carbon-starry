const path = require('path')
const webpack = require('webpack')
const utils = require('./util-tools')
const merge = require('webpack-merge')
const allEnv = require('../settings/env')
const settings = require('../settings/core').build
const baseWebpackConfig = require('./webpack.base')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const developer = require('../developer.json')

const resolve = dir => path.join(__dirname, '..', dir)
const isTest = process.env.NODE_ENV === 'testing'
const env = isTest ? allEnv.test : allEnv.prod

let subProjectName = ''
if (!developer.isAdmin) {
  subProjectName = developer.subProjectName + '-'
}

let webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: settings.productionSourceMap,
      extract: true
    })
  },
  devtool: settings.productionSourceMap ? '#source-map' : false,
  output: {
    path: settings.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].js')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash:8].css')
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new HtmlWebpackPlugin({
      extJS: settings.extJS || [],
      extCSS: settings.extCSS || [],
      title: settings.projectName,
      isMobile: settings.isMobile,
      filename: isTest ? 'index.html' : settings.index,
      favicon: resolve('static/favicon.ico'),
      template: resolve('static/index.ejs'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) => resource && resource.indexOf(path.join(__dirname, '../node_modules')) >= 0
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    new CopyWebpackPlugin([{
      from: resolve('public'),
      to: settings.assetsSubDir,
      ignore: ['.*']
    }])
  ]
})

if (settings.gzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(`\\.(${settings.gzipExtensions.join('|')})$`),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (process.env.npm_config_report) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: resolve(`data/reports/${subProjectName}${Date.now()}.html`)
  }))
}

module.exports = webpackConfig
