<template lang="pug">
  article.page-channel
    .page-header
      i.iconfont.left(v-if="editState" @click="cancelModify") &#xe629;
      span 金融课程
      i.iconfont(v-if="!editState" @click="doModify") &#xe6eb;
      i.iconfont(v-if="editState" @click="saveModify") &#xe64b;
    .app-noresult.fixed(v-if="emptyState")
    .list-group(v-for="(item, index) in tempData" :key="item.id" v-if="item.lesson.some(e => e.join === '1') || editState")
      .list-title
        .app-checkbox(:class="{ checked: item.lesson.every(e => e.join === '1') }" v-if="editState" @click="checkGroup(index)")
        .title
          h1 {{ item.article }}
          p 主讲人：{{ item.master }}
        .time {{ item.time }}
      .lesson-list
        .lesson-item(v-for="(subItem, subIndex) in item.lesson" :key="subItem.id" v-if="subItem.join === '1' || editState")
          .app-checkbox(:class="{ checked: subItem.join === '1' }" v-if="editState" @click="checkItem(index, subIndex)")
          .info
            h1 {{ subItem.title }}
            p 时长：{{ subItem.length }}分钟
          .mode 难度：{{ subItem.level | levelFilter }}
</template>

<script>
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
  beforeMount () {
    this.getList()
  },
  computed: {
    ...mapGetters({
      dataList: 'lessonList'
    }),
    emptyState () {
      let count = 0
      this.dataList.forEach(el => {
        el.lesson.forEach(sub => {
          if (sub.join === '1') {
            count++
          }
        })
      })
      return count === 0
    }
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
      setList: 'setLessonList',
      getList: 'getLessonList'
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
