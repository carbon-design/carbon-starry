<template lang="pug">
  .app-error(@click="refresh")
    .fail-icon
    .title 页面错误，点击页面刷新！
</template>

<style lang="scss" src="#/styles/layouts/error.scss"></style>

<script>
export default {
  name: 'error',
  methods: {
    refresh () {
      window.location.reload()
    }
  }
}
</script>
