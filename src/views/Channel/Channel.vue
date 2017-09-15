<template>
  <article class="page-channel">
    <div class="page-header">
      <i class="iconfont left" v-if="editState" @click="cancelModify">&#xe629;</i>
      <span>金融课程</span>
      <i class="iconfont" v-if="!editState" @click="doModify">&#xe6eb;</i>
      <i class="iconfont" v-if="editState">&#xe64b;</i>
    </div>
    <div class="list-group">
      <div class="list-title">
        <div class="app-checkbox checked"></div>
        <div class="title">
          <h1>金融理财基本小常识</h1>
          <p>主讲人：柯银明</p>
        </div>
        <div class="time">09/16 12:00</div>
      </div>
      <div class="lesson-list">
        <div class="lesson-item">
          <div class="app-checkbox checked"></div>
          <div class="info">
            <h1>如何正确理解投资收益和回报</h1>
            <p>时长：50分钟</p>
          </div>
          <div class="mode">难度：中等</div>
        </div>
      </div>
    </div>
    <div class="list-group">
      <div class="list-title">
        <div class="app-checkbox checked"></div>
        <div class="title">
          <h1>金融理财中级进阶知识</h1>
          <p>主讲人：柯银明</p>
        </div>
        <div class="time">09/30 12:00</div>
      </div>
      <div class="lesson-list">
        <div class="lesson-item">
          <div class="app-checkbox checked"></div>
          <div class="info">
            <h1>深入剖析资本流动与市场经济的关系</h1>
            <p>时长：30分钟</p>
          </div>
          <div class="mode">难度：较难</div>
        </div>
        <div class="lesson-item">
          <div class="app-checkbox checked"></div>
          <div class="info">
            <h1>浅析中国金融理财及货币基金的投资原理</h1>
            <p>时长：20分钟</p>
          </div>
          <div class="mode">难度：较难</div>
        </div>
        <div class="lesson-item">
          <div class="app-checkbox checked"></div>
          <div class="info">
            <h1>为实现稳定的投资收益模式打造投资模型</h1>
            <p>时长：20分钟</p>
          </div>
          <div class="mode">难度：较难</div>
        </div>
        <div class="lesson-item">
          <div class="app-checkbox checked"></div>
          <div class="info">
            <h1>如何面对投资风险及风险控制手段分析</h1>
            <p>时长：20分钟</p>
          </div>
          <div class="mode">难度：较难</div>
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
      editState: false
    }
  },
  components: {
  },
  beforeCreate () {
    this.bodyClass = document.documentElement.classList
    this.bodyClass.add('bg-light-white')
  },
  beforeMount () {
  },
  computed: {
  },
  mounted () {
  },
  beforeDestroy () {
    this.bodyClass.remove('bg-light-white')
  },
  methods: {
    doModify () {
      this.editState = true
    },
    cancelModify () {
      this.editState = false
    }
  }
}
</script>
