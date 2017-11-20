<template lang="pug">
  async-module
</template>

<style lang="scss">
  .page-star {
    width: 100%;

    .starContent {
      width: 100%;
      height: 100%;
    }
  }
</style>

<script>
import config from '~/config/asyncLoad'

export default {
  name: 'async-star',
  components: {
    AsyncModule: () => ({
      component: import('./Star' /* webpackChunkName: 'star' */),
      ...config
    })
  }
}
</script>
