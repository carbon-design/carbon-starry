<template>
  <async-module></async-module>
</template>

<style lang="scss" src="#/styles/pages/gyro.scss"></style>

<script>
import asyncLoadConfig from '~/config/asyncLoad'

export default {
  name: 'async-center',
  template: '<async-module></async-module>',
  components: {
    AsyncModule: () => ({
      component: import('./Gyro' /* webpackChunkName: 'gyro' */),
      ...asyncLoadConfig
    })
  }
}
</script>
