const { host, expect, browser } = require('../browser')

describe('Login Page', function () {
  this.timeout('30s')
  let page
  beforeEach(() => {
    page = browser()
    page.goto(`${host}#/login`)
  })

  it('should login success', async () => {
    const html = await page
      .type('.fm-item:first-child input', '柯银明')
      .type('.fm-item:last-child input', '123456')
      .click('button.loginBtn')
      .wait('article.page-home')
      .wait(1000)
      .evaluate(() => document.body.innerHTML)
      .end()
    expect(html).contain('<h1>白条总额度 90,000</h1>')
  })
})

// https://segment.com/blog/ui-testing-with-nightmare/
