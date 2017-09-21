<template>
  <article class="page-center" ref='main'>
    <h1 class="title">用户中心</h1>
    <div class="mainstay">
      <div class="card">
        <div class="back"></div>
        <img src="~/#/images/round.svg" alt="" class="blur">
        <div class="info">
          <div class="app-avatar iconfont">&#xe645;</div>
          <h1>钻石VIP高级用户</h1>
          <h2>Annie Joe</h2>
        </div>
      </div>
      <div class="status"></div>
    </div>
    <app-loader :isFixed="false"></app-loader>
  </article>
</template>

<script>
import AppLoader from '^/DotLoader'

export default {
  name: 'center',
  data () {
    return {
    }
  },
  components: {
    AppLoader
  },
  beforeCreate () {
    this.docEl = document.documentElement
    this.bodyClass = this.docEl.classList
    this.bodyClass.add('app-theme-dark')
  },
  beforeMount () {
  },
  computed: {
  },
  mounted () {
    this.$refs.main.style.minHeight = this.docEl.clientHeight - 0.94 * window.rootFontSize + 'px'
  },
  beforeDestroy () {
    this.bodyClass.remove('app-theme-dark')
  },
  methods: {
  }
}
</script>
