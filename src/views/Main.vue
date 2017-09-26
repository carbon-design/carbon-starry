<template>
  <div class="app-main-view" ref="main">
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppFooter from '^/layouts/Footer'

export default {
  name: 'main',
  components: {
    AppFooter
  },
  beforeCreate () {
    this.docEl = document.documentElement
  },
  mounted () {
    const { docEl, $refs: { main } } = this
    main.style.minHeight = docEl.clientHeight + 40 + 'px'
  }
}
</script>
