/* global describe:false beforeEach:false it:false */
const expect = require('chai').expect
const Nightmare = require('nightmare')

describe('Center Page', function () {
  this.timeout('30s')
  let text
  beforeEach(async function () {
    text = await Nightmare({
      waitTimeout: 3000,
      gotoTimeout: 3000,
      loadTimeout: 30000
    })
      .goto('http://localhost:3001/carbon/#/login')
      .type('.fm-item:first-child input', '柯银明')
      .type('.fm-item:last-child input', '123456')
      .click('button.loginBtn')
      .wait('article.page-home')
      .goto('http://localhost:3001/carbon/#/main/center')
      .wait('article.page-center')
      .evaluate(() => document.body.innerHTML)
      .end()
  })

  it('should get center page level information', () => {
    expect(text).contain('钻石VIP高级用户')
  })

  it('should get center page username information', () => {
    expect(text).contain('柯银明')
  })
})
