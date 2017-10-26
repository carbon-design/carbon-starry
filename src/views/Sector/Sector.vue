<template lang="pug">
  .page-sector
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
      progress: 5
    }
  },
  mounted () {
    const $box = this.$refs.box
    const sector = this.sector = new Sector($box)
    sector.setProgress(this.progress)
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
