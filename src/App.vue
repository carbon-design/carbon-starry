<template>
  <div class="app-main">
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<style src="#/styles/reset.css"></style>
<style lang="scss" src="#/styles/layouts/index.scss"></style>
<style lang="scss" src="#/styles/pages/index.scss"></style>

<script>
import AppFooter from '^/layouts/Footer'

export default {
  components: {
    AppFooter
  }
}
</script>
