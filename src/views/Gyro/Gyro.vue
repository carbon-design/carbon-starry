<template>
  <article class="page-gyro">
    <h1>陀螺仪检测</h1>
    <div class="watcher">
      <p>X轴旋转：{{ poz.x }}</p>
      <p>Y轴旋转：{{ poz.y }}</p>
      <p>Z轴旋转：{{ poz.z }}</p>
      <p>Angle: {{ poz.rotate }}</p>
    </div>
    <ul class="cube" ref="box">
      <li class="front"></li>
      <li class="back"></li>
      <li class="right"></li>
      <li class="left"></li>
      <li class="top"></li>
      <li class="bottom"></li>
    </ul>
  </article>
</template>

<script>
import Gyroscope from '~/utils/gyroscope'

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
    new Gyroscope(data => {
      this.poz = data
      this.deviceController(data)
    }).bindEvent()
  },
  methods: {
    deviceController (data) {
      let el = this.$refs.box
      el.style.webkitTransform = el.style.transform = `rotate3d(${-parseFloat(data.x)}, ${+parseFloat(data.y)}, ${-parseFloat(data.z)}, ${-parseFloat(data.rotate)}deg)`
    }
  }
}
</script>
