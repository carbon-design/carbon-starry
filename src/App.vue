<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<style src="./assets/styles/global.css"></style>
<style lang="less" src="./assets/styles/pages.less"></style>
<style lang="scss" src="./assets/styles/loading.scss"></style>
<script>
import AppHeader from './components/Header'

export default {
  components: {
    AppHeader
  }
}
</script>
