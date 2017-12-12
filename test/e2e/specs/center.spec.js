const { host, expect, browser } = require('../browser')

describe('Center Page', function () {
  this.timeout('30s')
  let html
  beforeEach(async function () {
    html = await browser()
      .goto(`${host}#/login`)
      .type('.fm-item:first-child input', '柯银明')
      .type('.fm-item:last-child input', '123456')
      .click('button.loginBtn')
      .wait('article.page-home')
      .goto(`${host}#/main/center`)
      .wait('article.page-center')
      .evaluate(() => document.body.innerHTML)
      .end()
  })

  it('should get center page level information', () => {
    expect(html).contain('钻石VIP高级用户')
  })
})
