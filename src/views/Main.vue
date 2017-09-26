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
  }
}
</script>
