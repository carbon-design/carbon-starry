<template>
  <article class="page-channel">
    <div class="page-header">
      <i class="iconfont left" v-if="editState" @click="cancelModify">&#xe629;</i>
      <span>金融课程</span>
      <i class="iconfont" v-if="!editState" @click="doModify">&#xe6eb;</i>
      <i class="iconfont" v-if="editState" @click="saveModify">&#xe64b;</i>
    </div>
    <div
      class="list-group"
      v-for="(item, index) in tempData"
      :key="item.id"
      v-if="item.lesson.some(e => e.join === '1') || editState"
    >
      <div class="list-title">
        <div
          class="app-checkbox"
          :class="{ checked: item.lesson.every(e => e.join === '1') }"
          v-if="editState"
          @click="checkGroup(index)"
        >
        </div>
        <div class="title">
          <h1>{{ item.article }}</h1>
          <p>主讲人：{{ item.master }}</p>
        </div>
        <div class="time">{{ item.time }}</div>
      </div>
      <div class="lesson-list">
        <div
          class="lesson-item"
          v-for="(subItem, subIndex) in item.lesson"
          :key="subItem.id"
          v-if="subItem.join === '1' || editState"
        >
          <div
            class="app-checkbox"
            :class="{ checked: subItem.join === '1' }"
            v-if="editState"
            @click="checkItem(index, subIndex)"
          >
          </div>
          <div class="info">
            <h1>{{ subItem.title }}</h1>
            <p>时长：{{ subItem.length }}分钟</p>
          </div>
          <div class="mode">难度：{{ subItem.level | levelFilter }}</div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>

export default {
  name: 'channel',
  data () {
    return {
      editState: false,
      listData: [],
      tempData: []
    }
  },
  components: {
  },
  beforeCreate () {
    this.bodyClass = document.documentElement.classList
    this.bodyClass.add('bg-light-white')
  },
  beforeMount () {
    const originData = [{
      id: '001',
      article: '金融理财基本小常识',
      master: '柯银明',
      time: '09/16 12:00',
      lesson: [{
        id: '001001',
        title: '如何正确理解投资收益和回报',
        length: '50',
        level: '0',
        join: '1'
      }, {
        id: '001002',
        title: '如何准确判断投资风险',
        length: '20',
        level: '0',
        join: '1'
      }]
    }, {
      id: '002',
      article: '金融理财中级进阶知识',
      master: '谢发初',
      time: '09/18 12:00',
      lesson: [{
        id: '002001',
        title: '深入剖析资本流动与市场经济的关系',
        length: '20',
        level: '1',
        join: '1'
      }, {
        id: '002002',
        title: '浅析中国金融理财及货币基金的投资原理',
        length: '30',
        level: '1',
        join: '0'
      }, {
        id: '002003',
        title: '为实现稳定的投资收益模式打造投资模型',
        length: '30',
        level: '2',
        join: '1'
      }, {
        id: '002004',
        title: '如何面对投资风险及风险控制手段分析',
        length: '40',
        level: '2',
        join: '1'
      }]
    }]
    this.tempData = this.clone(originData)
    this.listData = this.clone(originData)
  },
  computed: {
  },
  mounted () {
  },
  beforeDestroy () {
    this.bodyClass.remove('bg-light-white')
  },
  methods: {
    clone (obj) {
      return JSON.parse(JSON.stringify(obj))
    },
    doModify () {
      this.editState = true
    },
    cancelModify () {
      this.tempData = this.clone(this.listData)
      this.editState = false
    },
    saveModify () {
      this.listData = this.clone(this.tempData)
      this.editState = false
    },
    checkGroup (index) {
      let tar = this.tempData[index].lesson
      let isAllSelected = tar.every(e => e.join === '1')
      tar.forEach(e => {
        e.join = isAllSelected ? '0' : '1'
      })
    },
    checkItem (index, subIndex) {
      let tar = this.tempData[index].lesson[subIndex]
      tar.join === '0' ? tar.join = '1' : tar.join = '0'
    }
  }
}
</script>
