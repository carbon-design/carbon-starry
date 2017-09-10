<template>
  <article class="app-redirect">
    {{ message }}
  </article>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'redirect',
  data () {
    return {
      message: ''
    }
  },
  computed: {
    ...mapGetters({
      state: 'loginState'
    })
  },
  beforeMount () {
    const { $router, $route } = this
    if (!this.state) {
      this.message = '登录已失效，请先登录！'
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
