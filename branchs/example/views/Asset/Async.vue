<template lang="pug">
  async-module
</template>

<style lang="scss" src="#/styles/pages/asset.scss"></style>

<script>
import config from '~/config/asyncLoad'

export default {
  name: 'async-asset',
  components: {
    AsyncModule: () => ({
      component: import('./Asset' /* webpackChunkName: 'asset' */),
      ...config
    })
  }
}
</script>
