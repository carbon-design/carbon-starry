<template>
  <async-module></async-module>
</template>

<style lang="scss" src="#/styles/pages/center.scss"></style>

<script>
import asyncLoadConfig from '~/config/asyncLoad'

export default {
  name: 'async-center',
  template: '<async-module></async-module>',
  components: {
    AsyncModule: () => ({
      component: import('./Center' /* webpackChunkName: 'center' */),
      ...asyncLoadConfig
    })
  }
}
</script>
