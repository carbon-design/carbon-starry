<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<style src="./assets/styles/global.css"></style>
<script>
import AppHeader from './components/header.vue'

export default {
  components: {
    AppHeader
  }
}
</script>
