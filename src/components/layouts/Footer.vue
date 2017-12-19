<template lang="pug">
  footer
    .footer
      router-link(to="/main/home" active-class="active")
        i.iconfont &#xe601;
        div 首页
      router-link(to="/main/asset?validate=1" active-class="active")
        i.iconfont &#xe645;
        div 我的资产
      router-link(to="/main/channel" active-class="active")
        i.iconfont &#xe61f;
        div 金融频道
      router-link(to="/main/center?validate=1" active-class="active")
        i.iconfont &#xe600;
        div 用户中心
</template>

<style lang="scss" src="#/styles/layouts/footer.scss"></style>

<script>
import throttle from 'lodash/throttle'

export default {
  name: 'app-footer',
  data () {
    return {
      y: 0
    }
  },
  mounted () {
    window.addEventListener('scroll', throttle(this.scrollPage, 30), false)
  },
  methods: {
    scrollPage () {
      const docEl = document.documentElement
      const clientHeight = docEl.clientHeight
      const offsetHeight = document.body.offsetHeight
      const supportPageOffset = window.pageXOffset !== undefined
      const isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat')
      const y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? docEl.scrollTop : document.body.scrollTop
      const isBottom = y + clientHeight === offsetHeight
      isBottom ? docEl.classList.add('on-bottom') : docEl.classList.remove('on-bottom')
      this.y > y ? docEl.classList.remove('on-up') : docEl.classList.add('on-up')
      this.y = y
    }
  }
}
</script>
