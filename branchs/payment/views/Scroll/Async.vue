<template lang="pug">
  async-module
</template>

<style lang="scss" src="#/styles/pages/scroll.scss"></style>

<script>
import config from '~/config/asyncLoad'

export default {
  name: 'async-scroll',
  components: {
    AsyncModule: () => ({
      component: import('./Scroll' /* webpackChunkName: 'scroll' */),
      ...config
    })
  }
}
</script>
