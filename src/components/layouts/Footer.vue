<template>
  <footer>
    <div class="footer">
      <router-link to="/home" active-class="active">
        <i class="iconfont">&#xe601;</i>
        <div>首页</div>
      </router-link>
      <router-link to="/chat/bar" active-class="active">
        <i class="iconfont">&#xe645;</i>
        <div>我的资产</div>
      </router-link>
      <router-link to="/chat/todo" active-class="active">
        <i class="iconfont">&#xe61f;</i>
        <div>我的投资</div>
      </router-link>
      <router-link to="/chat/foo" active-class="active">
        <i class="iconfont">&#xe600;</i>
        <div>用户中心</div>
      </router-link>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'footer',
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
  }
}
</script>
