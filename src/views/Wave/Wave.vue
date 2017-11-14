<template lang="pug">
  article.page-wave
    .wave-area(ref="multiWave")
    .btn(@click="resetGreen") 重设绿色波浪参数
    .btn(@click="resetBlue") 重设蓝色波浪参数
    .btn(@click="resetRed") 重设红色波浪参数
</template>

<script>
import MultiWave from '~/libs/multiWave'

export default {
  name: 'wave',
  data () {
    return {
    }
  },
  mounted () {
    const el = this.$refs.multiWave
    this.multiWave = new MultiWave(el, [{
      id: 'wave-red',
      waveWidth: '40%',
      offsetX: '0%',
      waveHeight: '10%',
      waveColor: 'rgba(255, 0, 0, 0.33)',
      startFromTop: '20%',
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
      startFromTop: '20%',
      endFromTop: '50%',
      moveYStep: '0.6%',
      moveXStep: '0.8%'
    }, {
      id: 'wave-green',
      waveWidth: '40%',
      offsetX: '80%',
      waveHeight: '10%',
      waveColor: 'rgba(0, 255, 0, 0.33)',
      startFromTop: '20%',
      endFromTop: '30%',
      moveYStep: '0.6%',
      moveXStep: '1.2%'
    }])
  },
  beforeDestroy () {
    this.multiWave.destroy()
  },
  methods: {
    resetGreen () {
      this.multiWave.dynamicSettingParamsById('wave-green', {
        moveXStep: '2.2%',
        endFromTop: '20%',
        moveXDirection: 'right'
      })
    },
    resetBlue () {
      this.multiWave.dynamicSettingParamsById('wave-blue', {
        moveXStep: '3.2%',
        endFromTop: '20%'
      })
    },
    resetRed () {
      this.multiWave.dynamicSettingParamsById('wave-red', {
        moveXStep: '1.2%',
        endFromTop: '20%',
        waveWidth: '60%'
      })
    }
  }
}
</script>
