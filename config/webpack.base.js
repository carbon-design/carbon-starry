const path = require('path')
const webpack = require('webpack')
const utils = require('./util-tools')
const vueLoaderConfig = require('./vue-loader')
const settings = require('../settings/core')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const env = isProd ? 'build' : 'dev'
const assetsPublicPath = settings[env].assetsPublicPath
const assetsSubDir = settings[env].assetsSubDir
const assetJsPath = assetsSubDir ? `${assetsSubDir}/js` : 'js'

const resolve = dir => path.join(__dirname, '..', dir)

const assetConfig = (filename, hash) => ({
  filepath: require.resolve(filename),
  outputPath: assetJsPath,
  publicPath: assetsPublicPath + assetJsPath,
  includeSourcemap: false,
  hash: hash || false
})

let rules = [{
  test: /\.vue$/,
  loader: 'vue-loader',
  options: vueLoaderConfig
}, {
  test: /\.pug$/,
  loader: 'pug'
}, {
  test: /\.js$/,
  loader: 'babel-loader',
  include: [resolve('src'), resolve('test')]
}, {
  test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  loader: 'url-loader',
  options: {
    limit: 10000,
    name: utils.assetsPath('img/[name].[hash:7].[ext]')
  }
}, {
  test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
  loader: 'url-loader',
  options: {
    limit: 10000,
    name: utils.assetsPath('media/[name].[hash:7].[ext]')
  }
}, {
  test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
  loader: 'url-loader',
  options: {
    limit: 10000,
    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
  }
}]

if (settings[env].lint && !isProd) {
  rules = [{
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src'), resolve('test')],
    options: {
      formatter: require('eslint-friendly-formatter')
    }
  }].concat(rules)
}

let plugins = [
  new webpack.optimize.ModuleConcatenationPlugin()
]

if (settings[env].esShim) {
  plugins.push(new AddAssetHtmlPlugin([
    assetConfig('../shim/es5-shim.min.js'),
    assetConfig('../shim/es6-shim.min.js')
  ]))
}

module.exports = {
  entry: {
    app: './src/main.js',
    vendor: [
      'axios',
      'vue',
      'vuex',
      'vue-router',
      'vuex-router-sync',
      'vuex-persistedstate',
      'echarts/lib/echarts',
      // 'echarts/lib/chart/pie',
      'echarts/lib/chart/line'
    ]
  },
  output: {
    path: settings.build.assetsRoot,
    filename: '[name].js',
    publicPath: settings[env].assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '~': resolve('src'),
      '@': resolve('src/views'),
      '#': resolve('src/assets'),
      '^': resolve('src/components')
    }
  },
  module: {
    rules: rules
  },
  plugins: plugins
}
