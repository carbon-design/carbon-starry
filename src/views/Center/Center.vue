<template>
  <article class="page-center">
    <div class="radio" :class="{ checked: themeDark }" @click="toogleTheme"></div>
    <h1 class="title">用户中心</h1>
    <div class="mainstay">
      <div class="card">
        <div class="back"></div>
        <img src="~/#/images/round.svg" alt="" class="blur">
        <div class="info">
          <div class="app-avatar iconfont">&#xe645;</div>
          <h1>{{ level }}</h1>
          <h2>{{ userName }}</h2>
        </div>
      </div>
      <div class="status">
        <div class="chart">
          <h1>积分走势</h1>
          <div class="line" ref="line"></div>
        </div>
        <div class="progress">
          <h1>升级进度</h1>
          <div class="percent"><b>{{ percent }}</b> %</div>
          <div class="bar"><i :style="{ width: percent + '%' }"></i></div>
        </div>
      </div>
    </div>
    <div class="trend">
      <h1>理财收益走势</h1>
      <div class="cnt">
        <div class="app-avatar iconfont">&#xe633;</div>
        <div class="info">
          <h1>金融债券</h1>
          <h2>和讯网络技术股份有限公司</h2>
        </div>
        <div class="chart" ref="bill"></div>
      </div>
    </div>
  </article>
</template>

<script>
import { getCookie } from '~/utils/cookie'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import Counter from '~/utils/counter'

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
    this.userName = userInfo.name
    this.level = userInfo.level
    this.themeDark ? this.setDark() : this.clearDark()
  },
  watch: {
    themeDark (val, oldVal) {
      val ? this.setDark() : this.clearDark()
    }
  },
  mounted () {
    this.renderAllChart()
    const counter = new Counter({
      numFrom: 0,
      numTo: 68,
      gap: 5,
      duration: 40,
      callback: num => {
        this.percent = num
      }
    })
    counter.start()
  },
  beforeDestroy () {
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
