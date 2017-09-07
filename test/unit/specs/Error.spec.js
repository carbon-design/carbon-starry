import Vue from 'vue'
import Error from '^/Error'

describe('Error.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Error)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.app-error .title').textContent)
      .to.equal('页面获取发生错误！')
  })
})
