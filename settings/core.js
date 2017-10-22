const path = require('path')
const env = require('./env')
const chalk = require('chalk')
const defaultCfg = require('../default.json')
const developer = require('../developer.json')

const resolve = dir => path.join(__dirname, '..', dir)

const vendor = defaultCfg.vendor
const externals = defaultCfg.external.mapping

const extJS = defaultCfg.external.JSlinks
const extCSS = defaultCfg.external.CSSlinks

let devExtJS = extJS
let buildExtJS = extJS

let devExtCSS = extCSS
let buildExtCSS = extCSS

let entry = defaultCfg.project.entry

const assetsRootName = defaultCfg.project.assets.rootName
let assetsRoot = `dist/${assetsRootName}`
let assetsIndex = `dist/${assetsRootName}/index.html`

const projectName = defaultCfg.project.projectName
let projectRoot = 'src'

let devServerPort = defaultCfg.project.devServerPort
let distServerPort = defaultCfg.project.distServerPort

let buildCjsVendor = false
let devCjsVendor = false

if (!developer.isAdmin) {
  entry = developer.projectEntry
  assetsRoot = developer.assetsRoot
  assetsIndex = developer.assetsIndex
  projectRoot = developer.projectRoot
  devServerPort = developer.devServerPort
  distServerPort = developer.distServerPort
  buildCjsVendor = devCjsVendor = true
  buildExtCSS = devExtCSS = extCSS.concat(defaultCfg.external.compressed.vendorCSS)
  buildExtJS = devExtJS = extJS.concat(defaultCfg.external.compressed.vendorJS)
  console.log(chalk.cyan('\n ====== DEVELOPER MODE ====== \n'))
} else {
  console.log(chalk.cyan('\n ====== ADMINISTRATOR MODE ====== \n'))
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
    assetsPublicPath: `/${defaultCfg.project.publicPathName}/`,
    projectName: projectName,
    productionSourceMap: false,
    lint: false,
    gzip: false,
    distServerPort: distServerPort,
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
    port: devServerPort,
    lint: true,
    autoOpenBrowser: true,
    projectName: projectName,
    assetsSubDir: '',
    assetsPublicPath: '/',
    proxyTable: defaultCfg.project.proxy,
    isMobile: true,
    cssSourceMap: true
  }
}
