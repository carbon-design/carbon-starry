<template lang="pug">
  .page-gyro
    h1 陀螺仪检测
    .watcher
      p X轴旋转：{{ poz.x }}
      p Y轴旋转：{{ poz.y }}
      p Z轴旋转：{{ poz.z }}
      p Angle: {{ poz.rotate }}
    ul.cube(ref="box")
      li.front
      li.back
      li.right
      li.left
      li.top
      li.bottom
</template>

<script>
import Gyroscope from '~/libs/gyroscope'

export default {
  name: 'gyro',
  data () {
    return {
      poz: {
        x: 0,
        y: 0,
        z: 0,
        rotate: 0
      }
    }
  },
  mounted () {
    const vm = this
    vm.gyro = new Gyroscope(data => {
      vm.poz = data
      vm.deviceController(data)
    })
    vm.gyro.bindEvent()
  },
  beforeDestroy () {
    this.gyro.destroy()
  },
  methods: {
    deviceController (data) {
      let el = this.$refs.box
      el.style.webkitTransform = el.style.transform = `rotate3d(${-parseFloat(data.x)}, ${+parseFloat(data.y)}, ${-parseFloat(data.z)}, ${-parseFloat(data.rotate)}deg)`
    }
  }
}
</script>
