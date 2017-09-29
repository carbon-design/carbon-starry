<template lang="pug">
  async-module
</template>

<script>
import config from '~/config/asyncLoad'

export default {
  name: 'async-center',
  components: {
    AsyncModule: () => ({
      component: import('./Map' /* webpackChunkName: 'map' */),
      ...config
    })
  }
}
</script>
