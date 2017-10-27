<template lang="pug">
  .app-lazy-image(:class="{ loaded: loaded }" ref="container" @click="startLoad")
    img.thumb(:src="thumb" ref="thumb")
    img.origin(:data-src="origin" ref="origin")
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
      loaded: false,
      loading: false
    }
  },
  props: ['width', 'height', 'thumb', 'origin', 'placeholder', 'clickable', 'trigger'],
  watch: {
    trigger (val) {
      if (val) {
        if (!this.loading) {
          this.start()
          this.loading = true
        }
      }
    }
  },
  mounted () {
    this.initContainer()
    this.trigger && this.start()
  },
  beforeDestroy () {
    this.imgProgress.destroy()
  },
  methods: {
    initContainer () {
      const { container, thumb, progress } = this.$refs
      const conHeight = parseFloat(window.getComputedStyle(container).width) * this.height / this.width
      container.style.height = conHeight + 'px'

      this.blurImg = new ImageBlur(thumb, {
        classname: 'thumb'
      })
      this.imgProgress = new Sector(progress, {
        ratio: this.width / this.height
      })
    },
    start () {
      const { container, origin, progress } = this.$refs

      origin.src = origin.dataset.src
      this.imgProgress.animateFromTo(0, 95, 6000, true)

      origin.onload = () => {
        this.imgProgress.done(300, () => {
          this.loaded = true
        })
        progress.addEventListener('transitionend', () => {
          const thumbCanvas = container.getElementsByClassName('thumb')[0]
          container.removeChild(thumbCanvas)
          container.removeChild(progress)
        })
      }

      const placeholder = this.placeholder
      origin.onerror = () => {
        if (placeholder) {
          origin.src = placeholder
        } else {
          container.removeChild(origin)
        }
        this.imgProgress.done(0)
        this.loaded = true
        origin.onerror = null
      }
    },

    startLoad () {
      if (!this.loading && this.clickable) {
        this.start()
        this.loading = true
      }
    }
  }
}
</script>
