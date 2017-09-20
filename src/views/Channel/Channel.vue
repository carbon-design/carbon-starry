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
import { getLessons } from '~/config/api'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'channel',
  data () {
    return {
      editState: false,
      tempData: []
    }
  },
  beforeCreate () {
    this.bodyClass = document.documentElement.classList
    this.bodyClass.add('bg-light-white')
  },
  async beforeMount () {
    let vm = this
    vm.indicator.open('正在加载...')
    const resLesson = await getLessons()
    vm.indicator.close()
    vm.setList(resLesson.data.lessonData)
  },
  computed: {
    ...mapGetters({
      dataList: 'lessonList'
    })
  },
  watch: {
    dataList (val, oldVal) {
      this.tempData = this.clone(val)
    }
  },
  beforeDestroy () {
    this.bodyClass.remove('bg-light-white')
  },
  methods: {
    ...mapActions({
      setList: 'setLessonList'
    }),
    clone (obj) {
      return JSON.parse(JSON.stringify(obj))
    },
    doModify () {
      this.editState = true
    },
    cancelModify () {
      this.tempData = this.clone(this.dataList)
      this.editState = false
    },
    saveModify () {
      this.setList(this.tempData)
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
