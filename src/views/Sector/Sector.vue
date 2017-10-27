<template lang="pug">
  .page-sector
    lazy-image(
      thumb="resource/images/thumb.jpg"
      origin="resource/images/origin.jpg"
      width="1920"
      height="1080"
    )
    .box(ref="box")
    .btn(@click="increase") 点击增加进度
    .btn(@click="decrease") 点击减去进度
</template>

<script>
import Sector from '~/libs/sector'

export default {
  name: 'sector',
  data () {
    return {
      progress: 60
    }
  },
  mounted () {
    const $box = this.$refs.box
    const sector = this.sector = new Sector($box, {
      sectorColor: '#dcdcdc',
      sectorRadius: 80,
      circleColor: '#dcdcdc',
      circleRadius: [100, 90],
      animateType: 'easeInOut'
    })
    sector.animateFromTo(0, this.progress, 3000, true)
  },
  beforeDestroy () {
    this.sector.destroy()
  },
  methods: {
    increase () {
      this.progress += 5
      this.sector.setProgress(this.progress)
    },
    decrease () {
      this.progress -= 5
      this.sector.setProgress(this.progress)
    }
  }
}
</script>
