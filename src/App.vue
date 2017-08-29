<template>
  <div id="app">
    <app-header>
      <img src="~@/assets/images/logo.png" alt="">
      <h1>我是分发小王子</h1>
    </app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import '#/styles/global.css'
import '#/styles/pages.less'
import '#/styles/loading.scss'
import AppHeader from './components/Header'

export default {
  components: {
    AppHeader
  }
}
</script>
