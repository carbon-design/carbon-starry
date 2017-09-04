<template>
  <article class="home">
    <input type="text" value="" v-model="message">
    <button @click="publicMessage">发布消息</button>
  </article>
</template>

<script>
import { getCode } from '~/config/api'
import { mapActions } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      message: ''
    }
  },
  beforeMount: async function () {
    const res = await getCode()
    console.log(res)
    res.status === 200
      ? this.message = '数据请求成功！'
      : this.message = '数据请求失败！'
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
