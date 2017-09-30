<template lang="pug">
  article.page-map#mapContainer(ref='main')
</template>

<script>
export default {
  name: 'map',
  data () {
    return {
    }
  },
  mounted () {
    let el = this.$refs.main
    let docEl = document.documentElement
    el.style.height = docEl.clientHeight - 0.94 * window.rootFontSize + 'px'

    const $toast = this.$toast
    const AMap = window.AMap
    let map, geolocation
    // 加载地图，调用浏览器定位服务
    map = new AMap.Map('mapContainer', {
      resizeEnable: true,
      rotateEnable: true,
      pitchEnable: true
      // zoom: 17,
      // pitch: 80,
      // 开启3D视图,默认为关闭
      // viewMode: '3D',
      // 楼块出现是否带动画
      // buildingAnimation: true
    })
    map.plugin('AMap.Geolocation', () => {
      geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认:true
        enableHighAccuracy: true,
        // 超过10秒后停止定位，默认：无穷大
        timeout: 10000,
        // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonOffset: new AMap.Pixel(10, 20),
        // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true,
        buttonPosition: 'RB'
      })
      map.addControl(geolocation)
      geolocation.getCurrentPosition()
      // 返回定位信息
      AMap.event.addListener(geolocation, 'complete', onComplete)
      // 返回定位出错信息
      AMap.event.addListener(geolocation, 'error', onError)
    })
    // 解析定位结果
    const onComplete = data => {
      var str = ['定位成功']
      str.push('经度：' + data.position.getLng())
      str.push('纬度：' + data.position.getLat())
      if (data.accuracy) {
        str.push('精度：' + data.accuracy + ' 米')
      }
      // 如为IP精确定位结果则没有精度信息
      str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'))
      $toast(str.join('</br>'), 'bottom', 2000)
    }
    // 解析定位错误信息
    const onError = data => {
      $toast('定位失败', 'bottom', 2000)
    }

    map.plugin(['AMap.ToolBar'], () => {
      map.addControl(new AMap.ToolBar())
    })
    if (location.href.indexOf('&guide=1') !== -1) {
      map.setStatus({
        scrollWheel: false
      })
    }
  }
}
</script>
