<template>
  <async-module></async-module>
</template>

<style lang="scss" src="#/styles/pages/home.scss"></style>

<script>
import asyncLoadConfig from '~/config/asyncLoad'

export default {
  name: 'async-home',
  template: '<async-module></async-module>',
  components: {
    AsyncModule: () => ({
      component: import('./Home' /* webpackChunkName: 'home' */),
      ...asyncLoadConfig
    })
  }
}
</script>
