<template>
  <article class="home">
    <input type="text" value="" v-model="message">
    <button @click="publicMessage">发布消息</button>
  </article>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'home',
  data () {
    return {
      message: ''
    }
  },
  beforeMount () {
    axios({
      method: 'post',
      url: '/WechatBank/fee/queryAreaCode',
      data: {
        actionFlag: '0',
        areaCode: '00'
      }
    }).then(res => {
      console.log(res)
      res.status === 200
        ? this.message = '数据请求成功！'
        : this.message = '数据请求失败！'
    })
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
