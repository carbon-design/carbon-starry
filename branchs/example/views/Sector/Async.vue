<template lang="pug">
  async-module
</template>

<style lang="scss">
  .page-sector {
    .box {
      width: 2rem;
      height: 2rem;
      margin: 1rem auto;
      border-radius: 50%;
    }

    .gallary {
      margin: 0.2rem;

      .app-lazy-image {
        margin-bottom: 0.2rem;
      }
    }
    
    .btn {
      padding: 0.3rem;
      color: #fff;
      text-align: center;
      margin: 0.6rem 0.3rem;
      display: block;
      font-size: 0.32rem;
      cursor: pointer;
      background-image: -webkit-linear-gradient(135deg, #1389ff, #00c2ff);
      border-radius: 0.08rem;
    }
  }
</style>

<script>
import config from '~/config/asyncLoad'

export default {
  name: 'async-sector',
  components: {
    AsyncModule: () => ({
      component: import('./Sector' /* webpackChunkName: 'sector' */),
      ...config
    })
  }
}
</script>
