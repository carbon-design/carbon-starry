<template lang="pug">
  async-module
</template>

<style lang="scss" src="#/styles/pages/home.scss"></style>

<script>
import config from '~/config/asyncLoad'

export default {
  name: 'async-home',
  components: {
    AsyncModule: () => ({
      component: import('./Home' /* webpackChunkName: 'home' */),
      ...config
    })
  }
}
</script>
