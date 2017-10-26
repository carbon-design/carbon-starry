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
    .imgcontainer {
      overflow: hidden;
      position: relative;
      background-color: #ddd;
      height: 4.22rem;

      .origin {
        width: 100%;
        display: block;
      }

      .thumb, &:after, .progress {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 1;
        transition: opacity .3s;
      }

      img.thumb {
        opacity: 1;
        left: 200%;
      }

      &:after {
        content: "";
        background-color: rgba(0, 0, 0, .4);
      }

      .progress {
        height: .8rem;
        width: .8rem;
        left: 50%;
        top: 50%;
        margin: -0.4rem 0 0 -0.4rem;
        z-index: 9;
      }

      &.done {
        canvas.thumb, &:after, .progress {
          opacity: 0;
        }
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
