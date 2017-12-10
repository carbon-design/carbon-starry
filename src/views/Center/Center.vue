<template lang="pug">
  article.page-center(ref="snowPage")
    .radio(:class="{ checked: themeDark }" @click="toogleTheme")
    h1.title 用户中心
    .mainstay
      .card
        .back
        img.blur(src="~/#/images/round.svg")
        .info
          .app-avatar.iconfont &#xe645;
          h1 {{ level }}
          h2 {{ userName }}
      .status
        .chart
          h1 积分走势
          .line(ref="line")
        .progress
          h1 升级进度
          .percent
            b {{ percent }}
            span  %
          .bar
            i(:style="{ width: percent + '%' }")
    .trend
      h1 理财收益走势
      .cnt
        .app-avatar.iconfont &#xe633;
        .info
          h1 金融债券
          h2 和讯网络技术股份有限公司
        .chart(ref="bill")
</template>

<script>
import { getCookie } from '~/utils/cookie'
// import echarts from 'echarts/dist/echarts.simple'
import Snow from '~/libs/snow'

export default {
  name: 'center',
  data () {
    return {
      themeDark: false,
      percent: 0,
      userName: '用户',
      level: '普通用户'
    }
  },
  beforeCreate () {
    this.docEl = document.documentElement
    this.bodyClass = this.docEl.classList
  },
  beforeMount () {
    const userInfo = JSON.parse(getCookie('userinfo'))
    if (userInfo) {
      this.userName = userInfo.name
      this.level = userInfo.level
    } else {
      this.$router.replace('/login')
    }
    this.themeDark ? this.setDark() : this.clearDark()
  },
  watch: {
    themeDark (val, oldVal) {
      val ? this.setDark() : this.clearDark()
    }
  },
  mounted () {
    this.renderAllChart()
    this.$counter({
      numFrom: 0,
      numTo: 68,
      duration: 1200,
      callback: num => {
        this.percent = num
      }
    }).start()

    this.snow = new Snow(this.$refs.snowPage, {
      maxSize: 10 * window.dpr,
      minSize: 5 * window.dpr,
      minSpeed: window.dpr / 2,
      maxSpeed: window.dpr * 2,
      thread: 4
    })
  },
  beforeDestroy () {
    this.snow.destroy()
    this.bodyClass.remove('app-theme-dark', 'app-light-linear')
  },
  methods: {
    setDark () {
      this.bodyClass.remove('app-light-linear')
      this.bodyClass.add('app-theme-dark')
    },
    clearDark () {
      this.bodyClass.add('app-light-linear')
      this.bodyClass.remove('app-theme-dark')
    },
    toogleTheme () {
      this.themeDark ? this.themeDark = false : this.themeDark = true
      if (this.themeDark) {
        this.snow.start()
      } else {
        this.snow.destroy()
      }
    },
    renderChart (el, data, lineWidth, lineColor) {
      el.style.cssText = `width: ${el.offsetWidth}px; height: ${el.offsetHeight}`
      const opts = {
        grid: {
          show: true,
          backgroundColor: 'rgba(255, 255, 255, 0)',
          borderWidth: 0,
          left: 2 * window.dpr,
          right: 2 * window.dpr,
          top: 2 * window.dpr,
          bottom: 2 * window.dpr
        },
        xAxis: [{
          axisLine: {
            onZero: false,
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          type: 'category',
          boundaryGap: false,
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        }],
        yAxis: [{
          scale: true,
          type: 'value',
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          }
        }],
        series: [{
          smooth: true,
          name: '贷款',
          type: 'line',
          showSymbol: false,
          lineStyle: {
            normal: {
              width: (lineWidth || 3) * window.dpr,
              color: lineColor || '#6adaff'
            }
          },
          data: data
        }]
      }
      echarts.init(el).setOption(opts)
    },
    renderAllChart () {
      const { $refs: { line, bill } } = this
      this.renderChart(line, [0, 1, 3, 2, 2, 3, 2, 4, 5, 8, 9, 12])
      this.renderChart(bill, [3, 4, 5, 2, -1, -2, -3, -4, -3, 0, 1, 2], 2, '#98b0ed')
    }
  }
}
</script>
