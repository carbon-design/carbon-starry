<template>
  <div class="app-main">
    <router-view></router-view>
  </div>
</template>

<script>
import '#/styles/reset.css'
import '#/styles/layout.scss'
import '#/styles/pages.scss'
import AppHeader from '^/layouts/Header'

export default {
  components: {
    AppHeader
  }
}
</script>
