<template>
  <div class="app-main">
    <app-header>
      <img src="~#/images/logo.png" width="200" alt="">
      <h1>我是分发的内容</h1>
    </app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import '#/styles/global.css'
import '#/styles/pages.less'
import '#/styles/loading.scss'
import AppHeader from '^/layouts/Header'

export default {
  components: {
    AppHeader
  }
}
</script>
