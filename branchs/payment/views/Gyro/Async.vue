<template lang="pug">
  async-module
</template>

<style lang="scss" src="#/styles/pages/gyro.scss"></style>

<script>
import config from '~/config/asyncLoad'

export default {
  name: 'async-gyro',
  components: {
    AsyncModule: () => ({
      component: import('./Gyro' /* webpackChunkName: 'gyro' */),
      ...config
    })
  }
}
</script>
