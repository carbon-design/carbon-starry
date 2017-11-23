<template lang="pug">
  async-module
</template>

<style lang="scss">
  .page-pixel {
    width: 100%;

    img, canvas {
      width: 100%;
    }

    .btnGrp {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 0.1rem;
    }

    .btn {
      padding: 0.2rem;
      color: #fff;
      text-align: center;
      display: block;
      cursor: pointer;
      margin: 0.1rem;
      background-image: -webkit-linear-gradient(135deg, #191919, #585858);
      border-radius: 0.08rem;
    }
  }
</style>

<script>
import config from '~/config/asyncLoad'

export default {
  name: 'async-pixel',
  components: {
    AsyncModule: () => ({
      component: import('./Pixel' /* webpackChunkName: 'pixel' */),
      ...config
    })
  }
}
</script>
