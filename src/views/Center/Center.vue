<template>
  <article class="page-center" ref='main'>
    <h1 class="title">用户中心</h1>
    <div class="mainstay">
      <div class="card">
        <div class="back"></div>
        <img src="~/#/images/round.svg" alt="" class="blur">
        <div class="info">
          <div class="app-avatar iconfont">&#xe645;</div>
          <h1>钻石VIP高级用户</h1>
          <h2>Annie Joe</h2>
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
    <app-loader :isFixed="false"></app-loader>
  </article>
</template>

<script>
import AppLoader from '^/DotLoader'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import Counter from '~/utils/counter'

export default {
  name: 'center',
  data () {
    return {
      percent: 0
    }
  },
  components: {
    AppLoader
  },
  beforeCreate () {
    this.docEl = document.documentElement
    this.bodyClass = this.docEl.classList
    this.bodyClass.add('app-theme-dark')
  },
  beforeMount () {

  },
  computed: {
  },
  mounted () {
    const { $refs: { main, line }, docEl } = this
    main.style.minHeight = docEl.clientHeight - 0.94 * window.rootFontSize + 'px'
    line.style.cssText = `width: ${line.offsetWidth}px; height: ${line.offsetHeight}`
    echarts.init(line).setOption({
      grid: {
        show: true,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        borderWidth: 0,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
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
            width: 3 * window.dpr,
            color: '#6adaff'
          }
        },
        data: [0, 1, 3, 2, 2, 3, 2, 4, 5, 8, 9, 12]
      }]
    })
    const counter = new Counter({
      numFrom: 0,
      numTo: 68,
      duration: 30,
      callback: num => {
        this.percent = num
      }
    })
    counter.start()
  },
  beforeDestroy () {
    this.bodyClass.remove('app-theme-dark')
  },
  methods: {
  }
}
</script>
