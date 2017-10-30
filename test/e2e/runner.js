const execa = require('execa')
const chalk = require('chalk')
const { kill } = require('cross-port-killer')
const settings = require('../../settings/core')

const env = Object.create(process.env)
env.BROWSER = 'none'
const startServer = execa.shell('npm run dist-server', {
  env
})

startServer.on('exit', () => {
  kill(settings.build.distServerPort || process.env.PORT)
})

startServer.stdout.on('data', data => {
  console.log(data.toString())
  if (data.toString().indexOf('Server is running at') >= 0) {
    console.log(chalk.cyan('Server is started, ready to run tests.\n'))
    const testCmd = execa.shell('npm run e2e', {
      stdio: 'inherit'
    })
    testCmd.on('exit', () => {
      startServer.kill()
    })
  }
})
