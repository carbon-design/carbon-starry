const Nightmare = require('nightmare')
const expect = require('chai').expect
const host = require('../../settings/core').build.distServerHost

const browser = () => Nightmare({
  waitTimeout: 3000,
  gotoTimeout: 3000,
  loadTimeout: 30000
})

exports.expect = expect
exports.host = host
exports.browser = browser
