const ip = require('ip')
const opn = require('opn')
const path = require('path')
const chalk = require('chalk')
const tools = require('./tools')
const express = require('express')
const settings = require('../settings/core')
const devices = require('../settings/devices')
const proxyMiddleware = require('http-proxy-middleware')
const proxyTable = settings.dev.proxyTable

const app = express()
const port = settings.build.distServerPort
const publicPath = settings.build.assetsPublicPath
const distServerPath = settings.build.distServerPath
const uri = `http://${ip.address()}:${port}${publicPath}`

app.use(publicPath, express.static(path.join(__dirname, '..', distServerPath)))

app.listen(port, error => {
  if (error) {
    throw error
  }
  console.log(chalk.green(`Server is running at ${uri}`))  
  process.env.npm_config_opn && opn(uri)
  process.env.npm_config_shot && tools.screenshot(uri, devices)
})

Object.keys(proxyTable).forEach(context => {
  const options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

app.use(require('connect-livereload')())