<template lang="pug">
  .app-local-loader(:class="{ fixed: isFixed }")
    .app-local-loading
</template>

<style lang="scss" src="#/styles/layouts/local-loader.scss"></style>

<script>

export default {
  name: 'local-loader',
  props: ['isFixed']
}
</script>
