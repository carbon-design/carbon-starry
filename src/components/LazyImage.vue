<template lang="pug">
  .app-lazy-image(:class="{ loaded: loaded }" ref="container")
    img.thumb(:src="thumb" ref="thumb")
    img.origin(:src="origin" ref="origin")
    .progress(ref="progress")
</template>

<style lang="scss" src="#/styles/layouts/lazy-image.scss"></style>

<script>
import Sector from '~/libs/sector'
import ImageBlur from '~/libs/imageBlur'

export default {
  name: 'lazy-image',
  data () {
    return {
      loaded: false
    }
  },
  props: ['width', 'height', 'thumb', 'origin'],
  mounted () {
    const { container, thumb, origin, progress } = this.$refs
    const conHeight = parseFloat(window.getComputedStyle(container).width) * this.height / this.width

    container.style.height = conHeight + 'px'
    this.blurImg = new ImageBlur(thumb, {
      classname: 'thumb'
    })
    const imgProgress = this.imgProgress = new Sector(progress, {
      ratio: this.width / this.height
    })

    imgProgress.animateFromTo(0, 95, 6000, true)

    origin.onload = () => {
      imgProgress.done(300, () => {
        this.loaded = true
      })
    }
  },
  beforeDestroy () {
    this.imgProgress.destroy()
  }
}
</script>
