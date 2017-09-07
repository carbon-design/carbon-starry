<template>
  <div class="app-main">
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<style src="#/styles/reset.css"></style>
<style src="swiper/dist/css/swiper.css"></style>
<style lang="scss" src="#/styles/core.scss"></style>

<script>
import AppFooter from '^/layouts/Footer'

export default {
  components: {
    AppFooter
  }
}
</script>
