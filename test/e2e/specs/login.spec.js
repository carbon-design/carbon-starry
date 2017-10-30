/* global describe:false beforeEach:false it:false */
const expect = require('chai').expect
const Nightmare = require('nightmare')

describe('Login', function () {
  this.timeout('30s')
  let page
  beforeEach(() => {
    page = Nightmare()
    page.goto('http://localhost:3001/carbon/#/login')
  })

  it('should login success', async () => {
    const text = await page
      .click('button.loginBtn')
      .wait('article.page-home')
      .evaluate(() => document.body.innerHTML)
      .end()
    expect(text).contain('<h1>白条总额度 90,000</h1>')
  })
})

// https://segment.com/blog/ui-testing-with-nightmare/
