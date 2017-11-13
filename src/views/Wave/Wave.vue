<template lang="pug">
  article.page-wave
    .wave-area(ref="wave")
    .wave-area(ref="multiWave")
</template>

<script>
import Wave from '~/libs/wave'
import MultiWave from '~/libs/multiWave'

export default {
  name: 'wave',
  data () {
    return {
    }
  },
  mounted () {
    const el = this.$refs.wave
    this.wave = new Wave(el, {
      waveCount: 4,
      waveHeight: '5%',
      waveColor: '#2abaff',
      startY: '0%',
      endY: '90%',
      offsetXStep: '2%'
    })
    this.wave.run()
    const mel = this.$refs.multiWave
    this.multiWave = new MultiWave(mel, [{
      waveWidth: '40%',
      offsetX: '0%',
      waveHeight: '10%',
      waveColor: 'rgba(0, 14, 185, 0.3)',
      startFromTop: '20%',
      endFromTop: '80%',
      moveYStep: '0.06%',
      moveXStep: '1%'
    }, {
      waveWidth: '40%',
      offsetX: '30%',
      waveHeight: '10%',
      waveColor: 'rgba(185, 0, 0, 0.3)',
      startFromTop: '20%',
      endFromTop: '80%',
      moveYStep: '0.06%',
      moveXStep: '0.8%'
    }, {
      waveWidth: '40%',
      offsetX: '80%',
      waveHeight: '10%',
      waveColor: 'rgba(0, 214, 135, 0.3)',
      startFromTop: '20%',
      endFromTop: '80%',
      moveYStep: '0.06%',
      moveXStep: '1.2%'
    }])
  },
  beforeDestroy () {
    this.wave.destroy()
    this.multiWave.destroy()
  },
  methods: {
  }
}
</script>
