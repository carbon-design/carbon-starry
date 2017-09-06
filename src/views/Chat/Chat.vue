<template>
  <article class="message">
    {{message}}
    {{info}}
    <button @click="showToast">toast</button>
    <router-link to="/scan" active-class="active">scan</router-link>
    <router-link to="/chat/todo" active-class="active">todo</router-link>
    <router-link to="/chat/foo" active-class="active">foo</router-link>
    <router-view></router-view>
  </article>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'chat',
  data () {
    return {
      info: ''
    }
  },
  components: {
  },
  computed: {
    ...mapGetters({
      message: 'chatMessage'
    })
  },
  watch: {

  },
  beforeMount: async function () {
    console.log(this.$store.getters.chatMessage)
    const res = await this.fetch({
      method: 'post',
      url: '/WechatBank/fee/queryAreaCode',
      data: {
        actionFlag: '0',
        areaCode: '00'
      }
    })
    this.$store.dispatch('setMessage', 'dispatch 直接分发参数')
    res.status === 200
      ? this.info = '数据请求成功！'
      : this.info = '数据请求失败！'
  },
  methods: {
    showToast () {
      alert('alert')
    }
  }
}
</script>
