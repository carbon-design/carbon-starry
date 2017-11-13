const execa = require('execa')
const chalk = require('chalk')
const { kill } = require('cross-port-killer')
const settings = require('../../settings/core')

const env = Object.create(process.env)
env.BROWSER = 'none'
const startServer = execa.shell('npm run dist-server -s', {
  env
})

startServer.on('exit', () => {
  kill(process.env.PORT || settings.build.distServerPort)
})

// url.match(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/)
startServer.stdout.on('data', data => {
  if (data.toString().indexOf('Server is running at') >= 0) {
    console.log(chalk.cyan('Server is started, ready to run tests.\n'))
    const testCmd = execa.shell('mocha test/e2e/**/*.spec.js', {
      stdio: 'inherit'
    })
    testCmd.on('exit', () => {
      startServer.kill()
    })
  }
})
