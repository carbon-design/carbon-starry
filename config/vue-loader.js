const utils = require('./util-tools')
const settings = require('../settings/core')
const packageConfig = require('../package.json')
const isProd = process.env.NODE_ENV === 'production'

const postcssConfig = [
  require('autoprefixer')({
    browsers: packageConfig.browserslist
  }),
  require('postcss-flexibility')
]

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProd ? settings.build.productionSourceMap : settings.dev.cssSourceMap,
    extract: isProd
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  },
  postcss: postcssConfig
}
