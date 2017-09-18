<template>
  <article class="app-login" ref="loginPage">
    <div class="app-avatar"><img src="~/#/images/avatar.jpg" alt="avatar"></div>
    <div class="form">
      <div class="fm-item">
        <div class="label">用户账号</div>
        <div class="ipt-wrap">
          <input type="text" placeholder="请输入账户名/手机号" v-model="userName" @focus="userFocus" @blur="userBlur">
        </div>
      </div>
      <div class="fm-item">
        <div class="label">密码</div>
        <div class="ipt-wrap">
          <input type="password" placeholder="请输入账户密码" v-model="password" @focus="passwordFocus" @blur="passwordBlur">
        </div>
      </div>
    </div>
    <div class="foot">
      <button class="loginBtn" @click="submit">登  录</button>
      <div class="logo"></div>
    </div>
    <div class="alpaca" :class="{ showAll: idFocus, showLittle: pswdFocus }"></div>
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
      password: '',
      idFocus: false,
      pswdFocus: false
    }
  },
  mounted () {
    const { loginPage } = this.$refs
    const { clientHeight } = document.documentElement
    loginPage.style.cssText = `
      min-height: ${clientHeight}px;
      padding: ${clientHeight * 0.06}px 0 ${clientHeight * 0.42}px 0;`
  },
  methods: {
    ...mapActions({
      login: 'login'
    }),
    userFocus () {
      this.idFocus = true
      this.pswdFocus = false
    },
    userBlur () {
      this.idFocus = false
    },
    passwordFocus () {
      this.idFocus = false
      this.pswdFocus = true
    },
    passwordBlur () {
      this.pswdFocus = false
    },
    async submit () {
      const { indicator, toast, userName, password, $router, login } = this
      if (!userName.trim()) {
        toast('请输入用户名！', 'bottom', 2000)
      } else if (!password.trim()) {
        toast('请输入密码！', 'bottom', 2000)
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
