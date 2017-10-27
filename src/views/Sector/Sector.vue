<template lang="pug">
  .page-sector(ref="group")
    .gallary(v-for="(item, index) in imgData")
      lazy-image(
        :thumb="item.thumb"
        :origin="item.origin"
        placeholder="resource/images/placeholder.gif"
        width="1920"
        height="1080"
        :clickable="true"
        :trigger="item.trigger"
      )
    .box(ref="box")
    .btn(@click="increase") 点击增加进度
    .btn(@click="decrease") 点击减去进度
</template>

<script>
import { getImages } from '~/config/api'
import Sector from '~/libs/sector'
import throttle from 'lodash/throttle'

export default {
  name: 'sector',
  data () {
    return {
      progress: 60,
      imgData: [],
      posArr: []
    }
  },
  async mounted () {
    const resImg = await getImages()
    let imgData = resImg.data.imgData
    imgData = imgData.map(e => {
      e.trigger = false
      return e
    })
    this.imgData = imgData

    const $box = this.$refs.box
    const sector = this.sector = new Sector($box, {
      sectorColor: '#dcdcdc',
      sectorRadius: 80,
      circleColor: '#dcdcdc',
      circleRadius: [100, 90],
      animateType: 'easeInOut'
    })
    sector.animateFromTo(0, this.progress, 3000, true)

    const firstLoaderTimer = setTimeout(() => {
      this.getPosInfo()
      clearTimeout(firstLoaderTimer)
    }, 600)
    window.addEventListener('scroll', throttle(this.getPosInfo, 60), false)
  },
  beforeDestroy () {
    this.sector.destroy()
  },
  methods: {
    getPosInfo () {
      if (this.posArr.length === 0) {
        const allImgs = this.$refs.group.getElementsByClassName('app-lazy-image')
        if (allImgs.length === this.imgData.length) {
          Array.prototype.forEach.call(allImgs, e => {
            this.posArr.push(e.offsetTop)
          })
          this.getPosInfo()
        }
      } else {
        const docEl = document.documentElement
        const clientHeight = docEl.clientHeight
        const scrollTop = document.body.scrollTop || docEl.scrollTop

        this.posArr.forEach((e, i) => {
          if (scrollTop + clientHeight - clientHeight * 0.25 > e) {
            this.imgData[i].trigger = true
          }
        })
      }
    },
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
