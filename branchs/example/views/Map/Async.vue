<template lang="pug">
  async-module
</template>

<script>
import config from '~/config/asyncLoad'

export default {
  name: 'async-map',
  components: {
    AsyncModule: () => ({
      component: import('./Map' /* webpackChunkName: 'map' */),
      ...config
    })
  }
}
</script>
