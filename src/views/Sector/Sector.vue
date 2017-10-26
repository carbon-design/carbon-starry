<template lang="pug">
  .page-sector
    .imgcontainer
      img.thumb(src="~/#/images/thumb.jpg" ref="thumb")
      img.origin(src="~/#/images/origin.jpg" ref="origin")
      .progress(ref="progress")
    .box(ref="box")
    .btn(@click="increase") 点击增加进度
    .btn(@click="decrease") 点击减去进度
</template>

<script>
import Sector from '~/libs/sector'
import ImageBlur from '~/libs/imageBlur'

export default {
  name: 'sector',
  data () {
    return {
      progress: 5
    }
  },
  mounted () {
    const $box = this.$refs.box
    const sector = this.sector = new Sector($box, {
      sectorColor: '#dcdcdc',
      sectorRadius: 80,
      circleColor: '#dcdcdc',
      circleRadius: [100, 90]
    })
    sector.setProgress(this.progress)

    const $thumb = this.$refs.thumb
    const $origin = this.$refs.origin
    const $progress = this.$refs.progress

    this.blurImg = new ImageBlur($thumb, {
      classname: 'thumb'
    })

    let timer
    let status = 0
    const imgProgress = this.imgProgress = new Sector($progress)

    const infinite = () => {
      timer && clearTimeout(timer)
      timer = setTimeout(() => {
        imgProgress.setProgress(status)
        status += 5
        infinite()
      }, 300)
    }

    infinite()

    $origin.onload = () => {
      imgProgress.setProgress(100)
      $origin.parentNode.classList.add('done')
    }
  },
  beforeDestroy () {
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
