const path = require('path')
const env = require('./env')

const resolve = dir => path.join(__dirname, '..', dir)

module.exports = {
  build: {
    env: env.prod,
    cjsVendor: true,
    vendor: [
      'axios',
      'vue',
      'vuex',
      'vue-router',
      'lodash/throttle',
      'vuex-router-sync',
      'vuex-persistedstate',
      'vue-awesome-swiper',
      'echarts/dist/echarts.simple'
    ],
    externals: {
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
    },
    extJS: ['//webapi.amap.com/maps?v=1.4.0&key=f582aead07ca97967fea0637d51e98ac'],
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
    isMobile: true
  },
  dev: {
    env: env.dev,
    cjsVendor: false,
    vendor: [
      'axios',
      'vue',
      'vuex',
      'vue-router',
      'lodash/throttle',
      'vuex-router-sync',
      'vuex-persistedstate',
      'vue-awesome-swiper',
      'echarts/dist/echarts.simple'
    ],
    extJS: ['//webapi.amap.com/maps?v=1.4.0&key=f582aead07ca97967fea0637d51e98ac'],
    port: 3000,
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
    esShim: false,
    isMobile: true,
    cssSourceMap: true
  }
}
