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
            <div ref="deposit"></div>
            <div class="circle" ref="depositCircle" data-num="0%"></div>
            <div class="title">
              <h1>定期存款</h1>
              <p>截止至今日</p>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="card">
            <div ref="bonds"></div>
            <div class="circle" ref="bondsCircle" data-num="0%"></div>
            <div class="title">
              <h1>基金理财</h1>
              <p>截止至今日</p>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="card">
            <div ref="fund"></div>
            <div class="circle" ref="fundCircle" data-num="0%"></div>
            <div class="title">
              <h1>股票债券</h1>
              <p>截止至今日</p>
            </div>
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
    <div class="review">
      <div class="view-chart-wrap">
        <div class="view-chart" ref="viewChart"></div>
      </div>
      <div class="list-wrap">
        <div class="fund-list">
          <div class="litem">
            <div class="time">
              <h2>7月</h2>
              <h1>20</h1>
            </div>
            <div class="title">
              <h1>博时基金</h1>
              <p>由天宏基金有限公司提供</p>
            </div>
            <div class="profit">
              <h1 class="up">+9.27%</h1>
              <p>2017/09/08 12:00</p>
            </div>
          </div>
          <div class="litem">
            <div class="time">
              <h2>7月</h2>
              <h1>21</h1>
            </div>
            <div class="title">
              <h1>兴全货币基金</h1>
              <p>由天宏基金有限公司提供</p>
            </div>
            <div class="profit">
              <h1 class="down">-4.27%</h1>
              <p>2017/09/08 12:00</p>
            </div>
          </div>
        </div>
        <button class="readAll">查看全部</button>
      </div>
    </div>
  </article>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'

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
          const { deposit, bonds, fund, depositCircle, bondsCircle, fundCircle } = $refs
          const width = swiper.size * 0.7
          const height = swiper.height
          this.triggerChart(swiper)
          this.initCircle([depositCircle, bondsCircle, fundCircle], height * 0.5, [42, 23, 35])
          runChart(initChart(width, height, deposit), [-6, -4, -8, 0, 3, 4, 6, 4, -1, -2, -3, -3])
          runChart(initChart(width, height, bonds), [0, -1, -3, -2, -1, -2, -3, -4, -3, 0, 1, 2])
          runChart(initChart(width, height, fund), [0, 1, 3, 2, 2, 3, 2, 4, 5, 8, 9, 12])
        },
        onTransitionEnd: this.triggerChart
      }
    }
  },
  mounted () {
    const { $refs: { viewChart }, initChart, runChart } = this
    runChart(initChart(viewChart.offsetWidth, viewChart.offsetHeight, viewChart), [6, 11, 2, 0, 3, 4, 6, 4, -1, -2, -3, -3], '20%')
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
        const data = datas[i]
        el.style.height = el.style.lineHeight = el.style.width = `${size}px`
        el.setAttribute('data-num', `${data}%`)
        echarts.init(el).setOption({
          series: [{
            type: 'pie',
            color: ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, .3)'],
            hoverAnimation: false,
            radius: ['64%', '78%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [{
              value: data,
              name: '已用'
            }, {
              value: 100 - data,
              name: '剩余'
            }]
          }]
        })
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
