<template lang="pug">
  article.page-wave
    .wave-area(ref="multiWave")
    .btn(@click="resetGreen") 设置绿色波浪参数
    .btn(@click="resetBlue") 设置蓝色波浪参数
    .btn(@click="resetRed") 设置红色波浪参数
    .btn(@click="recoveryAll") 恢复所有参数初始设置
</template>

<script>
import MultiWave from '~/libs/multiWave'

export default {
  name: 'wave',
  mounted () {
    const el = this.$refs.multiWave
    this.multiWave = new MultiWave(el, [{
      id: 'wave-red',
      waveWidth: '40%',
      offsetX: '0%',
      waveHeight: '10%',
      waveColor: 'rgba(255, 0, 0, 0.33)',
      startFromTop: '80%',
      endFromTop: '80%',
      moveYStep: '0.6%',
      moveXStep: '1%',
      moveXDirection: 'right'
    }, {
      id: 'wave-blue',
      waveWidth: '40%',
      offsetX: '30%',
      waveHeight: '10%',
      waveColor: 'rgba(0, 0, 255, 0.33)',
      startFromTop: '80%',
      endFromTop: '80%',
      moveYStep: '0.6%',
      moveXStep: '0.8%'
    }, {
      id: 'wave-green',
      waveWidth: '40%',
      offsetX: '80%',
      waveHeight: '10%',
      waveColor: 'rgba(0, 255, 0, 0.33)',
      startFromTop: '80%',
      endFromTop: '80%',
      moveYStep: '0.6%',
      moveXStep: '1%'
    }])
  },
  beforeDestroy () {
    this.multiWave.destroy()
  },
  methods: {
    resetGreen () {
      this.multiWave.dynamicSetParamsById('wave-green', {
        waveWidth: '60%',
        moveXStep: '2.2%',
        endFromTop: '20%'
      })
    },
    resetBlue () {
      this.multiWave.dynamicSetParamsById('wave-blue', {
        waveWidth: '60%',
        moveXStep: '3.2%',
        endFromTop: '20%'
      })
    },
    resetRed () {
      this.multiWave.dynamicSetParamsById('wave-red', {
        moveXStep: '1.2%',
        endFromTop: '20%',
        waveWidth: '60%'
      })
    },
    recoveryAll () {
      this.multiWave.dynamicSetParamsAll([{
        id: 'wave-green',
        waveWidth: '40%',
        moveXStep: '1%',
        endFromTop: '80%'
      }, {
        id: 'wave-blue',
        waveWidth: '40%',
        moveXStep: '0.8%',
        endFromTop: '80%'
      }, {
        id: 'wave-red',
        moveXStep: '1%',
        endFromTop: '80%',
        waveWidth: '40%'
      }])
    }
  }
}
</script>
