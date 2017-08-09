require('./check-versions')()
const ip = require('ip')
const opn = require('opn')
const path = require('path')
const chalk = require('chalk')
const express = require('express')
const webpack = require('webpack')
const settings = require('../settings/customize').dev
const proxyMiddleware = require('http-proxy-middleware')

const isTest = process.env.NODE_ENV === 'testing'

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(settings.env.NODE_ENV)
}

const webpackConfig = isTest ? require('../config/webpack.prod') : require('../config/webpack.dev')

const port = process.env.PORT || settings.port
const autoOpenBrowser = !!settings.autoOpenBrowser

const proxyTable = settings.proxyTable

const app = express()
// console.log(JSON.stringify(webpackConfig))
const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})

compiler.plugin('compilation', compilation => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

Object.keys(proxyTable).forEach(context => {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

app.use(require('connect-history-api-fallback')())

app.use(devMiddleware)

app.use(hotMiddleware)

var staticPath = path.posix.join(settings.assetsPublicPath, settings.assetsSubDir)
app.use(staticPath, express.static('./static'))

const uri = `http://${ip.address()}:${port}`

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log(chalk.cyan(`> Listening at ${uri} \n`))
  if (autoOpenBrowser && !isTest) {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
