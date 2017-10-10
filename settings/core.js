const path = require('path')
const env = require('./env')

const resolve = dir => path.join(__dirname, '..', dir)

module.exports = {
  build: {
    env: env.prod,
    index: resolve('dist/index.html'),
    assetsRoot: resolve('dist'),
    assetsSubDir: '',
    assetsPublicPath: '/carbon/',
    projectName: 'Carbon Megatron',
    productionSourceMap: false,
    lint: false,
    gzip: false,
    distServerPort: 3001,
    distServerPath: 'dist',
    gzipExtensions: ['js', 'css'],
    esShim: false,
    isMobile: true,
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: env.dev,
    port: 3000,
    lint: true,
    autoOpenBrowser: true,
    projectName: 'Carbon Megatron',
    assetsSubDir: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/WechatBank': {
        target: 'http://test.hccb.cc',
        changeOrigin: true
      }
    },
    esShim: false,
    isMobile: true,
    cssSourceMap: true
  }
}
