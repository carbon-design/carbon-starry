require('./check-versions')()
const settings = require('../settings/core').dev
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(settings.env.NODE_ENV)
}

const ip = require('ip')
const opn = require('opn')
const path = require('path')
const chalk = require('chalk')
const express = require('express')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')

const isTest = process.env.NODE_ENV === 'testing'


const webpackConfig = isTest ? require('../config/webpack.prod') : require('../config/webpack.dev')

const port = process.env.PORT || settings.port
const autoOpenBrowser = !!settings.autoOpenBrowser

const proxyTable = settings.proxyTable

const app = express()

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
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

app.use(require('connect-history-api-fallback')())

app.use(devMiddleware)

app.use(hotMiddleware)

const staticPath = path.posix.join(settings.assetsPublicPath, settings.assetsSubDir)
const mockPath = path.posix.join(settings.assetsPublicPath, 'mock')

app.use(staticPath, express.static('./static'))
app.use(mockPath, express.static('./mock'))

const uri = `http://${ip.address()}:${port}`

let _resolve
const readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log(chalk.blue('> Starting dev server...'))
devMiddleware.waitUntilValid(() => {
  console.log(chalk.cyan(`> Listening at ${uri} \n`))
  if (autoOpenBrowser && !isTest && !process.env.npm_config_silence) {
    opn(uri)
  }
  _resolve()
})

const server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
