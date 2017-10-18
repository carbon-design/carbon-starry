const path = require('path')
const env = require('./env')
const developer = require('../developer.json')

const resolve = dir => path.join(__dirname, '..', dir)

const vendor = [
  'axios',
  'vue',
  'vuex',
  'vue-router',
  'lodash/throttle',
  'vuex-router-sync',
  'vue-awesome-swiper',
  'vuex-persistedstate',
  'echarts/dist/echarts.simple'
]

const externals = {
  'axios': 'window.axios',
  'vue': 'window.vue',
  'vuex': 'window.vuex',
  'vue-router': 'window.vueRouter',
  'vuex-router-sync': 'window.vuexRouterSync',
  'vuex-persistedstate': 'window.vuexPersistedstate',
  'echarts/dist/echarts.simple': 'window.echarts',
  'lodash/throttle': 'window.throttle',
  '~/libs/CircleProgress': 'window.CircleProgress',
  '~/libs/Counter': 'window.Counter',
  '~/libs/Scroller': 'window.Scroller',
  '~/libs/DatetimePicker': 'window.DatetimePicker',
  '~/libs/Poppicker': 'window.Poppicker'
}

let extJS = ['//webapi.amap.com/maps?v=1.4.0&key=f582aead07ca97967fea0637d51e98ac']
let devExtJS = []
let buildExtJS = []
let devExtCSS = []
let buildExtCSS = []

let entry = 'src/main.js'
let assetsRoot = 'dist/example'
let assetsIndex = 'dist/example/index.html'
let projectRoot = 'src'
let devPort = 3000
let distPort = 3001

let buildCjsVendor = false
let devCjsVendor = false

if (!developer.isAdmin) {
  entry = developer.projectEntry
  assetsRoot = developer.assetsRoot
  assetsIndex = developer.assetsIndex
  projectRoot = developer.projectRoot
  devPort = developer.devPort
  distPort = developer.distPort
  buildCjsVendor = devCjsVendor = true
  buildExtCSS = devExtCSS = ['resource/css/core.min.css']
}

if (buildCjsVendor) {
  buildExtJS = extJS.concat([
    'resource/js/core.min.js'
  ])
}

if (devCjsVendor) {
  devExtJS = extJS.concat([
    'resource/js/core.min.js'
  ])
}

module.exports = {
  build: {
    env: env.prod,
    cjsVendor: buildCjsVendor,
    root: projectRoot,
    entry: resolve(entry),
    vendor: vendor,
    externals: externals,
    extJS: buildExtJS,
    extCSS: buildExtCSS,
    index: resolve(assetsIndex),
    assetsRoot: resolve(assetsRoot),
    assetsSubDir: '',
    assetsPublicPath: '/carbon/',
    projectName: 'Carbon Megatron',
    productionSourceMap: false,
    lint: false,
    gzip: false,
    distServerPort: distPort,
    distServerPath: assetsRoot,
    gzipExtensions: ['js', 'css'],
    isMobile: true
  },
  dev: {
    env: env.dev,
    cjsVendor: devCjsVendor,
    root: projectRoot,
    entry: resolve(entry),
    vendor: vendor,
    externals: externals,
    extJS: devExtJS,
    extCSS: devExtCSS,
    port: devPort,
    lint: true,
    autoOpenBrowser: true,
    projectName: 'Carbon Megatron',
    assetsSubDir: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/WechatBank': {
        target: '//test.hccb.cc',
        changeOrigin: true
      }
    },
    isMobile: true,
    cssSourceMap: true
  }
}
