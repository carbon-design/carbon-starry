<template lang="pug">
  article.page-star(ref="starWrap")
    .starContent(ref="starCtx")
</template>

<script>
import StarField from '~/libs/star'

export default {
  name: 'star',
  data () {
    return {
    }
  },
  mounted () {
    const { starWrap, starCtx } = this.$refs
    starWrap.style.height = document.documentElement.clientHeight + 'px'
    this.starField = new StarField(starCtx, {
      starSize: window.dpr,
      numStars: 100,
      maxStarSpeed: 4,
      bgColor: [{
        stop: 0,
        color: 'rgb(0, 0, 10)'
      }, {
        stop: 0.4,
        color: 'rgb(0, 0, 40)'
      }, {
        stop: 0.8,
        color: 'rgb(20, 0, 80)'
      }]
    })
    this.starField.render()
  },
  beforeDestroy () {
    this.starField.destroy()
  },
  methods: {
  }
}
</script>
