<template>
  <header :class="{isHome: isHome}">
    <router-link to="/home" active-class="active">首页</router-link>
    <router-link to="/chat/bar" active-class="active">留言</router-link>
    header {{route}}
    <button @click="logIn">{{state ? '点击退出' : '点击登录'}}</button>
    {{state ? '已登录' : '未登录'}}
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'header',
  data () {
    return {
      isHome: true
    }
  },
  watch: {
    route (val) {
      this.isHome = val === '/home'
    }
  },
  computed: {
    ...mapGetters({
      route: 'routePath',
      state: 'logInOutState'
    })
  },
  mounted () {

  },
  methods: {
    ...mapActions({
      logInOut: 'logInOut'
    }),
    logIn () {
      this.logInOut(!this.state)
    }
  }
}
</script>
