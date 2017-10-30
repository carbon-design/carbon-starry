/* global describe:false it:false */
const expect = require('chai').expect
const Nightmare = require('nightmare')

describe('center', function () {
  this.timeout('30s')

  it('should get center page information', async () => {
    const text = await Nightmare()
      .goto('http://localhost:3001/carbon/#/login')
      .click('button.loginBtn')
      .wait('article.page-home')
      .goto('http://localhost:3001/carbon/#/center')
      .evaluate(() => document.body.innerHTML)
      .end()

    expect(text).contain('用户中心')
  })
})
