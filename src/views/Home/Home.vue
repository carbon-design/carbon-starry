<template lang="pug">
  article.page-home
    .chassis
      .card
        .card-content
          .action(@click="goPage('wave')")
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
        .cell(@click="goPage('gyro')")
          i.iconfont &#xe68e;
          span 扫码付款
        .cell(@click="goPage('map')")
          i.iconfont &#xe6f9;
          span 理财指导
        .cell(@click="goPage('scroll')")
          i.iconfont &#xe624;
          span 贷款申请
        .cell(@click="goPage('sector')")
          i.iconfont &#xe623;
          span 信用提升
    .chassis
      .card.type2
        .card-content
          .action(@click="goPage('star')")
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
          .action(@click="goPage('pixel')")
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
    .face(ref="face")
</template>

<script>
import { getHome } from '~/config/api'
import { mapGetters } from 'vuex'
import dynamics from 'dynamics.js'

export default {
  name: 'home',
  data () {
    return {
      emoji: '',
      closed: false,
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
    // const resCode = await getCode()
    // console.log(resCode.data)

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
    this.jump()
  },

  beforeDestroy () {
    this.vmCircleProgress.destroy()
    this.closed = true
  },

  methods: {
    goPage (path) {
      this.$router.push(`/main/${path}`)
    },
    waiter: time => {
      return new Promise((resolve, reject) => {
        const tempTimer = setTimeout(() => {
          clearTimeout(tempTimer)
          resolve()
        }, time)
      })
    },
    async jump () {
      if (this.closed) {
        return
      }
      const { waiter } = this
      const rs = window.rootFontSize
      const $face = this.$refs.face
      const emoType = Math.random()
      const ry = () => Math.random() * 6.7 * rs
      const getEmoji = () => {
        let emoji = ''
        if (emoType > 0 && emoType < 0.33) {
          emoji = 'a'
        } else if (emoType >= 0.33 && emoType < 0.66) {
          emoji = 'b'
        } else {
          emoji = 'c'
        }
        if (this.emoji === emoji) {
          getEmoji()
          return
        }
        return emoji
      }
      $face.classList.add(getEmoji())
      const jumpPoz = [{
        x: ry(),
        y: 0.3 * rs
      }, {
        x: ry(),
        y: 2.9 * rs
      }, {
        x: ry(),
        y: 7.9 * rs
      }, {
        x: ry(),
        y: 10.5 * rs
      }, {
        x: ry(),
        y: 20 * rs
      }]
      const jumpStep = index => {
        $face.style.left = jumpPoz[index].x + 'px'
        dynamics.animate($face, {
          translateY: jumpPoz[index].y
        }, {
          type: dynamics.gravity,
          duration: 1000,
          bounciness: 610,
          elasticity: 400
        })
      }
      await waiter(2000)
      jumpStep(0)
      await waiter(2000)
      jumpStep(1)
      await waiter(2000)
      jumpStep(2)
      await waiter(2000)
      jumpStep(3)
      await waiter(2000)
      jumpStep(4)
      await waiter(2000)
      $face.setAttribute('style', '')
      $face.className = 'face'
      this.jump()
    }
  }
}
</script>
