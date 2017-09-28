<template lang="pug">
  article.page-home
    .chassis
      .card
        .card-content
          .action(@click="toGyro")
            i.iconfont &#xe68e;
            p 扫码付款
          .result
            h1 {{ countScan }}
            p 本周扫码次数
          .sun
          .light
            .dot
            .dot
            .dot
    .chassis.detail
      .card
        .card-content
          .percent-title
            h1 白条总额度 {{ homeData.quota | intMoney }}
            p 截止{{ homeData.endTime | yyyymmddZh }}
          .circle
            .inner(data-surplus="0" ref="perCircle")
      .app-grid-menu
        .cell(@click="toGyro")
          i.iconfont &#xe68e;
          span 扫码付款
        .cell(@click="toMap")
          i.iconfont &#xe6f9;
          span 理财指导
        .cell
          i.iconfont &#xe624;
          span 贷款申请
        .cell
          i.iconfont &#xe623;
          span 信用提升
    .chassis
      .card.type2
        .card-content
          .action
            i.iconfont &#xe6f9;
            p 理财投资指导
          .result
            h1 {{ countProfit | intMoney }}
            p 本周理财投资收益
        .sun
          .light
            .dot
            .dot
            .dot
    .chassis
      .card.type3
        .card-content
          .action
            i.iconfont &#xe623;
            p 信用贷款审批
          .result
            h1 {{ countCreditQuota | intMoney }}
            p 当前拥有审批额度
        .sun
          .light
            .dot
            .dot
            .dot
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
    },
    toMap () {
      this.$router.push('/main/map')
    }
  }
}
</script>
