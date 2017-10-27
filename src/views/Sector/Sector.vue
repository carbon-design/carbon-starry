<template lang="pug">
  .page-sector
    .gallary(v-for="(item, index) in imgData")
      lazy-image(
        :thumb="item.thumb"
        :origin="item.origin"
        placeholder="resource/images/placeholder.gif"
        width="1920"
        height="1080"
        :clickable="!item.auto"
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
      progress: 60,
      imgData: [{
        origin: 'resource/images/origin1.jpg',
        thumb: 'resource/images/thumb1.jpg',
        auto: true
      }, {
        origin: 'resource/images/origin2.jpg',
        thumb: 'resource/images/thumb2.jpg',
        auto: false
      }, {
        origin: 'resource/images/origin3.jpg',
        thumb: 'resource/images/thumb3.jpg',
        auto: false
      }, {
        origin: 'resource/images/origin4.jpg',
        thumb: 'resource/images/thumb4.jpg',
        auto: false
      }, {
        origin: 'resource/images/origin5.jpg',
        thumb: 'resource/images/thumb5.jpg',
        auto: false
      }, {
        origin: 'resource/images/origin6.jpg',
        thumb: 'resource/images/thumb6.jpg',
        auto: false
      }]
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
