<template lang="pug">
  article.page-home
    .chassis
      .card
        .card-content
          .action(@click="toWave")
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
            .inner(data-surplus="￥0.00可用" ref="perCircle")
      .app-grid-menu
        .cell(@click="toGyro")
          i.iconfont &#xe68e;
          span 扫码付款
        .cell(@click="toMap")
          i.iconfont &#xe6f9;
          span 理财指导
        .cell(@click="toScroll")
          i.iconfont &#xe624;
          span 贷款申请
        .cell(@click="toSector")
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
import { getHome, getCode } from '~/config/api'
import { mapGetters } from 'vuex'

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
    // 代理转发接口测试
    const resCode = await getCode()
    console.log(resCode.data)

    const resHome = await getHome()
    const resData = resHome.data
    this.$counter({
      numFrom: 0,
      numTo: resData.scan,
      duration: 1200,
      callback: num => {
        this.countScan = num
      }
    }).start()

    this.$counter({
      numFrom: 0,
      numTo: resData.creditQuota,
      duration: 1200,
      callback: num => {
        this.countCreditQuota = num
      }
    }).start()

    this.$counter({
      numFrom: 0,
      numTo: resData.profit,
      duration: 1200,
      callback: num => {
        this.countProfit = num
      }
    }).start()

    this.homeData = resData
    const use = resData.useQuota
    const all = resData.quota
    const surplus = all - use
    const circleEl = this.$refs.perCircle
    const size = 1.8 * window.rootFontSize
    circleEl.style.lineHeight = circleEl.style.height = circleEl.style.width = size + 'px'
    const vmCircleProgress = this.$circleProgress({
      el: circleEl,
      value: surplus / all,
      size: size,
      thickness: size * 0.12,
      // lineCap: 'round',
      // fill: {
      //   gradient: ['#2a98ed', '#72ddf8']
      // },
      fill: '#fff',
      emptyFill: 'rgba(255, 255, 255, .3)',
      callback (num) {
        circleEl.setAttribute('data-surplus', `￥${~~(num * all)}可用`)
      }
    })
    this.vmCircleProgress = vmCircleProgress
    vmCircleProgress.init()
  },

  beforeDestroy () {
    this.vmCircleProgress.destroy()
  },

  methods: {
    toWave () {
      this.$router.push('/main/wave')
    },
    toGyro () {
      this.$router.push('/main/gyro')
    },
    toMap () {
      this.$router.push('/main/map')
    },
    toScroll () {
      this.$router.push('/main/scroll')
    },
    toSector () {
      this.$router.push('/main/sector')
    }
  }
}
</script>
