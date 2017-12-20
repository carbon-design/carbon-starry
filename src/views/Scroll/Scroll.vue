<template lang="pug">
  article.page-scroll
    .scroller(ref="scroller")
    .btn(@click="selectRow") 选中其中一项
    .btn(@click="resetScroll") 重设选项列表
    .btn(@click="singleSelect") 单项选择
    .btn(@click="multiSelect") 级联选择
    .btn(@click="timeSelect") 日期时间选择
</template>

<script>
import { getAddress } from '~/config/api'
import Scroller from '~/libs/scroller'
import Poppicker from '~/libs/poppicker'
import DatetimePicker from '~/libs/datetimepicker'

export default {
  name: 'scroll',
  data () {
    return {
    }
  },
  async mounted () {
    const exampleData = [{
      name: '金樽清酒斗十千，玉盘珍羞直万钱',
      value: 0
    }, {
      name: '停杯投箸不能食，拔剑四顾心茫然',
      value: 1
    }, {
      name: '欲渡黄河冰塞川，将登太行雪满山',
      value: 2
    }, {
      name: '闲来垂钓碧溪上，忽复乘舟梦日边',
      value: 3
    }, {
      name: '行路难！行路难！多歧路，今安在',
      value: 4
    }, {
      name: '长风破浪会有时，直挂云帆济沧海',
      value: 5
    }, {
      name: '长风破浪会有时，直挂云帆济沧海',
      value: 6
    }, {
      name: '杨花落尽子规啼，闻道龙标过五溪',
      value: 7
    }, {
      name: '我寄愁心与明月，随风直到夜郎西',
      value: 8
    }, {
      name: '谁家玉笛暗飞声，散入春风满洛城',
      value: 9
    }, {
      name: '此夜曲中闻折柳，何人不起故园情',
      value: 10
    }, {
      name: '懒摇白羽扇，裸袒青林中',
      value: 11
    }, {
      name: '脱巾挂石壁，露顶洒松风',
      value: 12
    }, {
      name: '兰陵美酒郁金香，玉碗盛来琥珀光',
      value: 13
    }, {
      name: '但使主人能醉客，不知何处是他乡',
      value: 14
    }]
    const $container = this.$refs.scroller
    const scroller = this.scroller = new Scroller($container)
    scroller.init({
      data: exampleData,
      defaultValue: 12,
      onSelect: val => {
        this.$toast(`你选择了第${val * 1 + 1}行诗句`, 'bottom', 800)
      }
    })
    const res = await getAddress()
    this.addressPoppicker = new Poppicker({
      data: res.data,
      // defaultValues: ['360000', '360100', '360121'],
      defaultValues: ['620000', '620200'],
      onShow (val) {
        console.log(val)
      },
      onSelect (vals) {
        console.log(vals)
      },
      onConfirm: vals => {
        this.$toast(vals.map(e => e.name).join('-'), 'bottom')
      }
    })

    this.singlePoppicker = new Poppicker({
      data: exampleData,
      defaultValues: 3,
      onShow (val) {
        console.log(val)
      },
      onSelect (vals) {
        console.log(vals)
      },
      onConfirm: vals => {
        this.$toast(vals.name, 'bottom')
      }
    })

    this.timePicker = new DatetimePicker({
      format: 'YYYY-MM-DD HH:II',
      minYear: 2000,
      maxYear: 2020,
      onConfirm: val => {
        this.$toast(val, 'bottom')
      }
    })
  },
  beforeDestroy () {
    this.scroller.destroy()
    this.addressPoppicker.destroy()
    this.timePicker.destroy()
  },
  methods: {
    selectRow () {
      this.scroller.select(5)
    },
    resetScroll () {
      this.scroller.init({
        data: [{
          name: '脱了裤子打老虎——又不要脸又不要命',
          value: 0
        }, {
          name: '女生寝室长水——泡妞',
          value: 1
        }, {
          name: '做砖的坯子、插刀的鞘子——框框套套',
          value: 2
        }, {
          name: '煎饼果子翻车——乱套了',
          value: 3
        }, {
          name: '挑水的看大河——都是钱',
          value: 4
        }, {
          name: '傻小子睡凉炕——全凭火力壮',
          value: 5
        }],
        onSelect: val => {
          this.$toast(`你选择了第${val * 1 + 1}行歇后语`, 'bottom', 800)
        }
      })
    },

    multiSelect () {
      this.addressPoppicker.show()
    },
    singleSelect () {
      this.singlePoppicker.show()
    },
    timeSelect () {
      this.timePicker.show()
    }
  }
}
</script>
