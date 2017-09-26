<template>
  <async-module></async-module>
</template>

<script>
import asyncLoadConfig from '~/config/asyncLoad'

export default {
  name: 'async-center',
  template: '<async-module></async-module>',
  components: {
    AsyncModule: () => ({
      component: import('./Map' /* webpackChunkName: 'map' */),
      ...asyncLoadConfig
    })
  }
}
</script>
