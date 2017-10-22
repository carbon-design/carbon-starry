<template lang="pug">
  async-module
</template>

<style lang="scss" src="#/styles/pages/channel.scss"></style>

<script>
import config from '~/config/asyncLoad'

export default {
  name: 'async-channel',
  components: {
    AsyncModule: () => ({
      component: import('./Channel' /* webpackChunkName: 'channel' */),
      ...config
    })
  }
}
</script>
