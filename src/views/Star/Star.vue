<template lang="pug">
  article.page-star(ref="starWrap")
    .starContent(ref="starCtx")
    .btn(@click="speedUp") 点击加速 ({{speed}})
</template>

<script>
import StarField from '~/libs/star'

export default {
  name: 'star',
  data () {
    return {
      speed: 2,
      num: 100
    }
  },
  mounted () {
    const { starWrap, starCtx } = this.$refs
    starWrap.style.height = document.documentElement.clientHeight + 'px'
    this.starField = new StarField(starCtx, {
      maxSize: window.dpr,
      numStars: 100,
      maxStarSpeed: 4,
      bgColor: [{
        stop: 0,
        color: 'rgb(15, 19, 26)'
      }, {
        stop: 0.6,
        color: 'rgb(27, 39, 51)'
      }, {
        stop: 1,
        color: 'rgb(42, 63, 78)'
      }]
    })
    this.starField.render()
  },
  beforeDestroy () {
    this.starField.destroy()
  },
  methods: {
    speedUp () {
      this.speed += 2
      this.num -= 1
      this.starField.render(this.num, this.speed)
    }
  }
}
</script>
