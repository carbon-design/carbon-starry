<template lang="pug">
  async-module
</template>

<style lang="scss" src="#/styles/pages/center.scss"></style>

<script>
import config from '~/config/asyncLoad'

export default {
  name: 'async-center',
  components: {
    AsyncModule: () => ({
      component: import('./Center' /* webpackChunkName: 'center' */),
      ...config
    })
  }
}
</script>
