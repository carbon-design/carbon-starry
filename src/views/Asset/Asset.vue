<template lang="pug">
  article.page-asset
    .main-panel
      .user-avatar
        .name {{ userName }}
        .app-avatar
          img(src="~/#/images/avatar.jpg" alt="avatar")
      .wait-swiper-wrapper
        local-loader(:isFixed="true" v-if="waitData")
        swiper(:options="swiperOption" v-if="!waitData")
          swiper-slide
            .card
              div(ref="deposit")
              .circle(ref="depositCircle" data-num="0%")
              .title
                h1 定期存款
                p 截止至今日
          swiper-slide
            .card
              div(ref="bonds")
              .circle(ref="bondsCircle" data-num="0%")
              .title
                h1 基金理财
                p 截止至今日
          swiper-slide
            .card
              div(ref="fund")
              .circle(ref="fundCircle" data-num="0%")
              .title
                h1 股票债券
                p 截止至今日
      .app-grid-menu
        .cell
          i.iconfont &#xe67d;
          span 收支明细
        .cell
          i.iconfont &#xe622;
          span 资产优化
    .review
      .view-chart-wrap
        local-loader(:isFixed="true" v-if="waitData")
        .view-chart(ref="viewChart")
      .list-wrap
        .fund-list
          .litem(v-for="(item, index) in chartData.fundList" :key="index")
            .time
              h2 {{ item.buyTime | mm }}月
              h1 {{ item.buyTime | dd }}
            .title
              h1 {{ item.name }}
              p {{ item.provide }}
            .profit
              h1(:class="{ up: item.rally > 0, down: item.rally < 0 }") {{ item.rally > 0 ? '+' : '' }}{{ item.rally }}%
              p {{ item.rateTime | yyyymmdd }} {{ item.rateTime | hhmm }}
        button.readAll 查看全部
</template>

<script>
import { getAssets } from '~/config/api'
// import echarts from 'echarts/dist/echarts.simple'

export default {
  name: 'asset',
  data () {
    return {
      userName: '用户',
      currentCard: 0,
      waitData: true,
      chartData: {
        circles: [0, 0, 0],
        lines: [],
        fund: [],
        fundList: []
      },
      swiperOption: {
        slidesPerView: 'auto',
        paginationClickable: true,
        onInit: swiper => {
          const { $refs, runChart, initChart, chartData: { circles, lines } } = this
          const { deposit, bonds, fund, depositCircle, bondsCircle, fundCircle } = $refs
          const width = swiper.size * 0.7
          const height = swiper.height
          this.triggerChart(swiper)
          this.initCircle([depositCircle, bondsCircle, fundCircle], height * 0.46, circles)
          runChart(initChart(width, height, deposit), lines[0])
          runChart(initChart(width, height, bonds), lines[1])
          runChart(initChart(width, height, fund), lines[2])
        },
        onTransitionEnd: this.triggerChart
      }
    }
  },
  async mounted () {
    const { $refs: { viewChart }, initChart, runChart } = this
    const resAssets = await getAssets()
    this.chartData = resAssets.data
    this.waitData = false
    runChart(initChart(viewChart.offsetWidth, viewChart.offsetHeight, viewChart), resAssets.data.fund, '20%')
  },
  methods: {
    triggerChart (swiper) {
      const size = swiper.slides.length
      const progress = swiper.progress
      const index = ~~(progress * (size - 1))
      swiper.slides[index].classList.add('card-active')
      this.activeCard(swiper.slides, index)
    },
    activeCard (cards, index) {
      cards[this.currentCard].classList.remove('card-active')
      cards[index].classList.add('card-active')
      this.currentCard = index
    },
    initChart (width, height, el) {
      el.style.height = `${height}px`
      el.style.width = `${width}px`
      return echarts.init(el)
    },
    initCircle (els, size, datas) {
      Array.prototype.forEach.call(els, (el, i) => {
        const data = datas[i] / 100
        el.style.height = el.style.lineHeight = el.style.width = `${size}px`
        this.$circleProgress({
          el: el,
          value: data,
          size: size,
          thickness: size * 0.1,
          lineCap: 'round',
          fill: '#fff',
          animation: {
            duration: 600 * (i + 1),
            type: 'linear'
          },
          emptyFill: 'rgba(255, 255, 255, .3)',
          callback (num) {
            el.setAttribute('data-num', `${~~(num * 100)}%`)
          }
        }).init()
      })
    },
    runChart (tar, data, top) {
      tar.setOption({
        grid: {
          show: true,
          backgroundColor: 'rgba(255, 255, 255, 0)',
          borderWidth: 0,
          left: 0,
          right: 0,
          top: top || '50%',
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
          scale: true,
          boundaryGap: false,
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        }],
        yAxis: [{
          scale: true,
          min (value) {
            return value.min - 2
          },
          type: 'value',
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
          }
        }],
        series: [{
          smooth: true,
          name: '贷款',
          type: 'line',
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 2 * window.dpr,
              color: 'rgba(255, 255, 255, .7)'
            }
          },
          areaStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(255, 255, 255, 0.7)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255, 0.2)'
                }],
                globalCoord: false
              }
            }
          },
          data: data
        }]
      })
    }
  }
}
</script>
