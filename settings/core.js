const ip = require('ip')
const path = require('path')
const env = require('./env')
const chalk = require('chalk')
const defaultCfg = require('../.ini/default.json')
const developer = require('../.ini/developer.json')

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

const subDistRootName = defaultCfg.project.subDistRootName
let assetsRoot = `dist/${subDistRootName}`
let assetsIndex = `dist/${subDistRootName}/index.html`

const projectName = defaultCfg.project.projectName
let assetsPublicPath = defaultCfg.project.publicPathName
let projectRoot = 'src'

let devServerPort = defaultCfg.project.devServerPort
let distServerPort = defaultCfg.project.distServerPort

let buildCjsVendor = false
let devCjsVendor = false

if (!developer.isAdmin) {
  projectRoot = `branchs/${developer.subBranchName}`
  entry = `${projectRoot}/${developer.subBranchEntry}`
  assetsRoot = `dist/${developer.subDistRootName}`
  assetsIndex = `${assetsRoot}/${developer.subDistIndex}`
  devServerPort = developer.devServerPort
  distServerPort = developer.distServerPort
  assetsPublicPath = developer.publicPathName
  buildCjsVendor = devCjsVendor = true
  buildExtCSS = devExtCSS = extCSS.concat(defaultCfg.external.compressed.vendorCSS)
  buildExtJS = devExtJS = extJS.concat(defaultCfg.external.compressed.vendorJS)
  console.log(chalk.cyan('\n ========== DEVELOPER MODE ========== \n'))
} else {
  console.log(chalk.cyan('\n ======== ADMINISTRATOR MODE ======== \n'))
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
    assetsPublicPath: `/${assetsPublicPath}/`,
    projectName: projectName,
    productionSourceMap: false,
    lint: false,
    gzip: false,
    adjustMode: 'mix', // mix, base, false
    distServerPort: distServerPort,
    distServerPath: assetsRoot,
    distServerHost: `http://${ip.address()}:${distServerPort}/${assetsPublicPath}/`,
    gzipExtensions: ['js', 'css']
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
    adjustMode: 'mix', // mix, base, false
    autoOpenBrowser: true,
    projectName: projectName,
    assetsSubDir: '',
    assetsPublicPath: '/',
    proxyTable: defaultCfg.project.proxy,
    cssSourceMap: true
  }
}
