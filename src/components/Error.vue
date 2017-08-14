<template>
  <span class="error">页面发生错误！</span>
</template>

<script>
export default {
  name: 'error',
  data () {
    return {
      msg: ''
    }
  },
  beforeMount () {
    console.warn('页面发生错误！')
  }
}
</script>
