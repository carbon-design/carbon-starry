<template>
  <article class="page-home">
    <div class="chassis">
      <div class="card">
        <div class="card-content">
          <div class="action" @click="toGyro">
            <i class="iconfont">&#xe68e;</i>
            <p>扫码付款</p>
          </div>
          <div class="result">
            <h1>{{ countScan }}</h1>
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
            <h1>白条总额度 {{ homeData.quota | intMoney }}</h1>
            <p>截止{{ homeData.endTime | yyyymmddZh }}</p>
          </div>
          <div class="circle">
            <div class="inner" data-surplus="0" ref="perCircle"></div>
          </div>
        </div>
      </div>
      <div class="app-grid-menu">
        <div class="cell" @click="toGyro">
          <i class="iconfont">&#xe68e;</i>
          <span>扫码付款</span>
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
            <h1>{{ countProfit | intMoney }}</h1>
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
            <h1>{{ countCreditQuota | intMoney }}</h1>
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
import { getHome } from '~/config/api'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import { mapGetters } from 'vuex'
import Counter from '~/utils/counter'

export default {
  name: 'home',
  data () {
    return {
      countScan: 0,
      countProfit: 0,
      countCreditQuota: 0,
      homeData: {
        scan: 0,
        quota: 0,
        useQuota: 0,
        endTime: Date.now(),
        profit: 0,
        creditQuota: 0
      }
    }
  },
  computed: {
    ...mapGetters({
      route: 'routePath'
    })
  },
  async mounted () {
    const resHome = await getHome()
    const resData = resHome.data
    new Counter({
      numFrom: 0,
      gap: ~~(resData.scan / 30),
      numTo: resData.scan,
      duration: 30,
      callback: num => {
        this.countScan = num
      }
    }).start()

    new Counter({
      numFrom: 0,
      gap: ~~(resData.creditQuota / 40),
      numTo: resData.creditQuota,
      duration: 30,
      callback: num => {
        this.countCreditQuota = num
      }
    }).start()

    new Counter({
      numFrom: 0,
      gap: ~~(resData.profit / 50),
      numTo: resData.profit,
      duration: 30,
      callback: num => {
        this.countProfit = num
      }
    }).start()

    this.homeData = resData
    const use = resData.useQuota
    const all = resData.quota
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

  methods: {
    toGyro () {
      this.$router.push('/main/gyro')
    }
  }
}
</script>
