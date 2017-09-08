<template>
  <article class="app-main">
    <router-view></router-view>
    <app-footer></app-footer>
  </article>
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
