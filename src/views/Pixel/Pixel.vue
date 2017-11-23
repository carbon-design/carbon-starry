<template lang="pug">
  article.page-pixel
    img(src="~/#/images/human.jpg" ref="pic")
    .btnGrp
      .btn(@click="reset") 重置
      .btn(@click="invert") 反相
      .btn(@click="grayscale") 黑白化
      .btn(@click="colorFilter('red')") 红色通道
      .btn(@click="colorFilter('green')") 绿色通道
      .btn(@click="colorFilter('blue')") 蓝色通道
</template>

<script>
import pixel from '~/libs/pixel'

export default {
  name: 'pixel',
  data () {
    return {
    }
  },
  async mounted () {
    const img = this.$refs.pic
    await pixel.initImage(img)
    this.canvas = pixel.drawImage(img)
  },
  methods: {
    reset () {
      this.canvas.getContext('2d').drawImage(this.$refs.pic, 0, 0)
    },
    invert () {
      this.reset()
      pixel.invert(this.canvas)
    },
    grayscale () {
      this.reset()
      pixel.grayscale(this.canvas)
    },
    colorFilter (color) {
      this.reset()
      pixel.colorFilter(this.canvas, color)
    }
  }
}
</script>
