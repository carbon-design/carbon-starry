<template>
  <article class="home">
    <input type="text" value="" v-model="message">
    <button @click="publicMessage">发布消息</button>
    {{ userName }}
  </article>
</template>

<script>
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
