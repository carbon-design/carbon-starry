<template>
  <article class="home">
    <app-header>
      <img src="~/#/images/logo.png" width="200" alt="">
      <h1>我是分发的内容</h1>
    </app-header>
    <input type="text" value="" v-model="message">
    <button @click="publicMessage">发布消息</button>
    {{ userName }}
  </article>
</template>

<script>
import AppHeader from '^/layouts/Header'
import { getCode, getLogin } from '~/config/api'
import { mapActions } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      message: '',
      userName: ''
    }
  },
  components: {
    AppHeader
  },
  beforeMount: async function () {
    const res = await getCode()
    res.status === 200
      ? this.message = '数据请求成功！'
      : this.message = '数据请求失败！'

    // login
    const resLogin = await getLogin()
    this.userName = resLogin.data.name
  },
  computed: {

  },
  mounted () {

  },
  beforeDestroy () {

  },
  methods: {
    ...mapActions({
      setMessage: 'setMessage'
    }),
    publicMessage () {
      this.setMessage(this.message)
    }
  }
}
</script>
