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

    .btn {
      padding: 0.2rem 0.4rem;
      background-color: rgba(255, 255, 255, .16);
      position: absolute;
      right: 0.2rem;
      bottom: 1.14rem;
      color: #fff;
      border-radius: 0.1rem;
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
