/* global describe:false beforeEach:false it:false */
const expect = require('chai').expect
const Nightmare = require('nightmare')

describe('Login Page', function () {
  this.timeout('30s')
  let page
  beforeEach(() => {
    page = Nightmare({
      waitTimeout: 3000,
      gotoTimeout: 3000,
      loadTimeout: 30000
    })
    page.goto('http://localhost:3001/carbon/#/login')
  })

  it('should login success', async () => {
    const text = await page
      .type('.fm-item:first-child input', '柯银明')
      .type('.fm-item:last-child input', '123456')
      .click('button.loginBtn')
      .wait('article.page-home')
      .wait(1000)
      .evaluate(() => document.body.innerHTML)
      .end()
    expect(text).contain('<h1>白条总额度 90,000</h1>')
  })
})

// https://segment.com/blog/ui-testing-with-nightmare/
