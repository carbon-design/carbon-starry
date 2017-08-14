<template>
  <span class="loading">loading...</span>
</template>

<script>
export default {
  name: 'loading',
  beforeMount () {
    console.log('页面正在加载！')
  }
}
</script>
