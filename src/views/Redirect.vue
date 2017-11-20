<template lang="pug">
  .app-redirect {{ message }}
</template>

<script>
import { getCookie } from '~/utils/cookie'

export default {
  name: 'redirect',
  data () {
    return {
      message: ''
    }
  },
  beforeMount () {
    const { $router, $route } = this
    const userInfo = getCookie('userinfo')
    if (!userInfo) {
      this.message = '未登录或登录失效，请先登录！'
      this.backTimer = setTimeout(() => {
        $router.replace('/login')
      }, 3000)
    } else {
      if ('path' in $route.query) {
        $router.replace($route.query.path)
      } else {
        $router.replace('/main/home')
      }
    }
  },
  beforeDestroy () {
    clearTimeout(this.backTimer)
  }
}
</script>
