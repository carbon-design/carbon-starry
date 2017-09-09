<template>
  <article class="app-login" ref="loginPage">
    <div class="app-avatar"><img src="~/#/images/avatar.jpg" alt="avatar"></div>
    <div class="form">
      <div class="fm-item">
        <div class="label">用户账号</div>
        <div class="ipt-wrap">
          <input type="text" placeholder="请输入账户名/手机号">
        </div>
      </div>
      <div class="fm-item">
        <div class="label">密码</div>
        <div class="ipt-wrap">
          <input type="password" placeholder="请输入账户密码">
        </div>
      </div>
    </div>
    <div class="foot">
      <button class="loginBtn">登  录</button>
      <div class="logo"></div>
    </div>
  </article>
</template>

<style lang="scss" src="#/styles/pages/login.scss"></style>

<script>
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
    loginPage.style.width = `${clientWidth}px`
    loginPage.style.minHeight = `${clientHeight}px`
    loginPage.style.paddingBottom = `${clientHeight * 0.42}px`
    loginPage.style.paddingTop = `${clientHeight * 0.06}px`
  }
}
</script>
