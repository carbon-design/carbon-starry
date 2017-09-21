<template>
  <footer>
    <div class="footer">
      <router-link to="/main/home" active-class="active">
        <i class="iconfont">&#xe601;</i>
        <div>首页</div>
      </router-link>
      <router-link to="/main/asset" active-class="active">
        <i class="iconfont">&#xe645;</i>
        <div>我的资产</div>
      </router-link>
      <router-link to="/main/channel" active-class="active">
        <i class="iconfont">&#xe61f;</i>
        <div>金融频道</div>
      </router-link>
      <router-link to="/main/center" active-class="active">
        <i class="iconfont">&#xe600;</i>
        <div>用户中心</div>
      </router-link>
    </div>
  </footer>
</template>

<style lang="scss" src="#/styles/layouts/footer.scss"></style>

<script>
import throttle from 'lodash/throttle'

export default {
  name: 'footer',
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
