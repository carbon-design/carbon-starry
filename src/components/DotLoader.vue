<template lang="pug">
  .app-dot-loader(:class="{ fixed: isFixed }")
    .app-dot-loading
</template>

<style lang="scss" src="#/styles/layouts/dot-loader.scss"></style>

<script>

export default {
  name: 'dot-loader',
  props: ['isFixed']
}
</script>
