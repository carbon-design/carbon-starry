<template lang="pug">
  async-module
</template>

<style lang="scss" src="#/styles/pages/channel.scss"></style>

<script>
import asyncLoadConfig from '~/config/asyncLoad'

export default {
  name: 'async-channel',
  template: '<async-module></async-module>',
  components: {
    AsyncModule: () => ({
      component: import('./Channel' /* webpackChunkName: 'channel' */),
      ...asyncLoadConfig
    })
  }
}
</script>
