<template lang="pug">
  article.page-wave
    .wave-area(ref="wave")
</template>

<script>
import Wave from '~/libs/wave'

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
  },
  beforeDestroy () {
    this.wave.destroy()
  },
  methods: {
  }
}
</script>
