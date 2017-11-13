const { host, expect, browser } = require('../browser')

describe('Asset Page', function () {
  this.timeout('30s')
  let html
  beforeEach(async function () {
    html = await browser()
      .goto(`${host}#/login`)
      .type('.fm-item:first-child input', '柯银明')
      .type('.fm-item:last-child input', '123456')
      .click('button.loginBtn')
      .wait('article.page-home')
      .goto(`${host}#/main/asset`)
      .wait('article.page-asset')
      .evaluate(() => document.body.innerHTML)
      .end()
  })

  it('should get fund list', () => {
    expect(html).contain('<div class="title"><h1>博时基金</h1><p>由天宏基金有限公司提供</p></div>')
  })
})
