<template lang="pug">
  async-module
</template>

<style lang="scss">
  .page-wave {
    .wave-area {
      width: 100%;
      height: 4.2rem;
      background-color: #eee;
    }
  }
</style>

<script>
import config from '~/config/asyncLoad'

export default {
  name: 'async-sector',
  components: {
    AsyncModule: () => ({
      component: import('./Wave' /* webpackChunkName: 'wave' */),
      ...config
    })
  }
}
</script>
