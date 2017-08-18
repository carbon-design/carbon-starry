const utils = require('./util-tools')
const settings = require('../settings/core')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProd ? settings.build.sourceMap : settings.dev.cssSourceMap,
    extract: isProd
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  },
  postcss: [
    require('autoprefixer')({
      browsers: [
        'ie >= 9',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4.4',
        'bb >= 10'
      ]
    }),
    require('postcss-flexibility'),
    require('cssnano')({
      preset: 'default'
    })
  ]
}
