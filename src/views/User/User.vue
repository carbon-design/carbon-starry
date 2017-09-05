<template>
  <article class="page-user">
    <div class="chassis">
      <div class="card">
        <div class="card-content">
          <div class="action">
            <i class="iconfont">&#xe68e;</i>
            <p>扫一扫</p>
          </div>
          <div class="result">
            <h1>643</h1>
            <p>本周扫码次数</p>
          </div>
        </div>
        <div class="sun"></div>
        <div class="light">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>
    </div>
    <div class="chassis detail">
      <div class="card">
        <div class="card-content">
          <div class="percent-title">
            <h1>白条总额度 90,000</h1>
            <p>截止2017年9月28日</p>
          </div>
          <div class="circle">
            <div class="inner" data-surplus="0" ref="perCircle"></div>
          </div>
        </div>
      </div>
      <div class="menu">
        <div class="cell">
          <i class="iconfont">&#xe68e;</i>
          <span>扫一扫</span>
        </div>
        <div class="cell">
          <i class="iconfont">&#xe6f9;</i>
          <span>理财指导</span>
        </div>
        <div class="cell">
          <i class="iconfont">&#xe624;</i>
          <span>贷款申请</span>
        </div>
        <div class="cell">
          <i class="iconfont">&#xe623;</i>
          <span>信用提升</span>
        </div>
      </div>
    </div>
    <div class="chassis">
      <div class="card type2">
        <div class="card-content">
          <div class="action">
            <i class="iconfont">&#xe6f9;</i>
            <p>理财投资指导</p>
          </div>
          <div class="result">
            <h1>12,400</h1>
            <p>本周理财投资收益</p>
          </div>
        </div>
        <div class="sun"></div>
        <div class="light">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>
    </div>
    <div class="chassis">
      <div class="card type3">
        <div class="card-content">
          <div class="action">
            <i class="iconfont">&#xe623;</i>
            <p>信用贷款审批</p>
          </div>
          <div class="result">
            <h1>1,031,400</h1>
            <p>当前拥有审批额度</p>
          </div>
        </div>
        <div class="sun"></div>
        <div class="light">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'

export default {
  name: 'user',
  data () {
    return {

    }
  },
  beforeMount () {

  },
  computed: {

  },
  mounted () {
    const use = 1200
    const all = 9000
    const surplus = all - use
    const circleEl = this.$refs.perCircle
    circleEl.style.lineHeight = circleEl.style.height = circleEl.style.width = 2 * window.rootFontSize + 'px'
    circleEl.setAttribute('data-surplus', `￥${surplus}可用`)
    echarts.init(circleEl).setOption({
      series: [{
        type: 'pie',
        color: ['rgba(255, 255, 255, .3)', 'rgba(255, 255, 255, 1)'],
        hoverAnimation: false,
        radius: ['64%', '86%'],
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
          value: use,
          name: '已用额度'
        }, {
          value: surplus,
          name: '剩余额度'
        }]
      }]
    })
  },
  beforeDestroy () {

  },
  methods: {

  }
}
</script>
