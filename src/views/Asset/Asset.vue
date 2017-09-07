<template>
  <article class="page-asset">
    <div class="main-panel">
      <div class="user-avatar">
        <div class="name">Annie</div>
        <div class="app-avatar"><img src="~/#/images/avatar.jpg" alt="avatar"></div>
      </div>
      <swiper :options="swiperOption">
        <swiper-slide>
          <div class="card">
            <div ref="deposit">card1</div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="card">
            <div ref="bonds">card2</div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="card">
            <div ref="fund">card3</div>
          </div>
        </swiper-slide>
      </swiper>
      <div class="app-grid-menu">
        <div class="cell">
          <i class="iconfont">&#xe67d;</i>
          <span>收支明细</span>
        </div>
        <div class="cell">
          <i class="iconfont">&#xe622;</i>
          <span>资产优化</span>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'

export default {
  name: 'asset',
  data () {
    return {
      currentCard: 0,
      swiperOption: {
        slidesPerView: 'auto',
        paginationClickable: true,
        onInit: swiper => {
          const { $refs, runChart, initChart } = this
          const { deposit, bonds, fund } = $refs
          const width = swiper.size * 0.7
          const height = swiper.height
          this.triggerChart(swiper)
          runChart(initChart(width, height, deposit), [-6, -4, -8, 0, 3, 4, 6, 4, -1, -2, -3, -3])
          runChart(initChart(width, height, bonds), [0, -1, -3, -2, -1, -2, -3, -4, -3, 0, 1, 2])
          runChart(initChart(width, height, fund), [0, 1, 3, 5, 4, 3, 2, 1, 5, 8, 9, 12])
        },
        onTransitionEnd: this.triggerChart
      }
    }
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
    runChart (tar, data) {
      tar.setOption({
        grid: {
          show: true,
          backgroundColor: 'rgba(255, 255, 255, 0)',
          borderWidth: 0,
          left: 0,
          right: 0,
          top: '50%',
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
              width: 2 * window.dpr,
              color: 'rgba(255, 255, 255, .9)'
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
