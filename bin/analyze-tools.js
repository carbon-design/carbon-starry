const path = require('path')
const chalk = require('chalk')
const mkdirp = require('mkdirp')
const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors')

const rootPath = path.resolve()
const getFullPath = relPath => path.join(rootPath, relPath)

const createDir = (path, islog) => {
  mkdirp(path, err => err && console.log(chalk.red(err)))
}

exports.screenshot = async (url, deviceList, filename, delay) => {
  const sleep = time => new Promise((resolve, reject) => setTimeout(() => resolve(), time || 0))
  const browser = await puppeteer.launch()
  for (let device of deviceList) {
    const params = typeof device === 'object' ? device : devices[device]
    const page = await browser.newPage()
    await page.emulate(params)
    await page.goto(url)
    await sleep(delay)
    console.log(chalk.blue(`> [${params.name}] Starting generate screenshot '${filename}'...`))
    createDir(`screenshot/${filename}`)
    await page.screenshot({ path: getFullPath(`screenshot/${filename}/${params.name.replace(/\s+/g, '_')}.png`) })
    console.log(chalk.green(`- [${params.name}] screenshot '${filename}' have been generated!`))

  }
  browser.close()
}
