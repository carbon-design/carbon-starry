const path = require('path')
const settings = require('../settings/core')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const env = isProd ? 'build' : 'dev'

exports.assetsPath = dir => path.posix.join(settings[env].assetsSubDir, dir)

exports.cssLoaders = options => {
  options = options || {}

  let cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: isProd,
      sourceMap: options.sourceMap
    }
  }

  const generateLoaders = (loader, loaderOptions) => {
    let loaders = [cssLoader]
    
    if (loader) {
      loaders.push({
        loader: `${loader}-loader`,
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

exports.styleLoaders = options => {
  let output = []
  let loaders = exports.cssLoaders(options)
  for (let extension in loaders) {
    let loader = loaders[extension]
    output.push({
      test: new RegExp(`\\.${extension}$`),
      use: loader
    })
  }
  return output
}
