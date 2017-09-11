<template>
  <article class="app-login" ref="loginPage">
    <div class="app-avatar"><img src="~/#/images/avatar.jpg" alt="avatar"></div>
    <div class="form">
      <div class="fm-item">
        <div class="label">用户账号</div>
        <div class="ipt-wrap">
          <input type="text" placeholder="请输入账户名/手机号" v-model="userName">
        </div>
      </div>
      <div class="fm-item">
        <div class="label">密码</div>
        <div class="ipt-wrap">
          <input type="password" placeholder="请输入账户密码" v-model="password">
        </div>
      </div>
    </div>
    <div class="foot">
      <button class="loginBtn" @click="submit">登  录</button>
      <div class="logo"></div>
    </div>
  </article>
</template>

<style lang="scss" src="#/styles/pages/login.scss"></style>

<script>
import { getLogin } from '~/config/api'
import { setCookie } from '~/utils/cookie'
import { mapActions } from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      userName: '',
      password: ''
    }
  },
  mounted () {
    const { loginPage } = this.$refs
    const { clientWidth, clientHeight } = document.documentElement
    loginPage.style.cssText = `width: ${clientWidth}px; min-height: ${clientHeight}px; padding-botttom: ${clientHeight * 0.42}px; padding-top: ${clientHeight * 0.06}px`
  },
  methods: {
    ...mapActions({
      login: 'login'
    }),
    async submit () {
      const { indicator, userName, password, $router, login } = this
      if (!userName.trim()) {
        alert('请输入用户名！')
      } else if (!password.trim()) {
        alert('请输入密码！')
      } else {
        indicator.open('正在登录...')
        const resLogin = await getLogin({
          userName,
          password
        })
        indicator.close()
        if (resLogin.data) {
          $router.push('/redirect?path=/main/home')
          setCookie('token', resLogin.data.token, 3 * 60 * 60 * 1000)
          login(resLogin.data)
        }
      }
    }
  }
}
</script>
