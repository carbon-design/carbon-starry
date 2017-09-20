<template>
  <div class="app-dot-loader" :class="{ fixed: isFixed }">
    <div class="app-dot-loading"></div>
  </div>
</template>

<style lang="scss" src="#/styles/layouts/dot-loader.scss"></style>

<script>

export default {
  name: 'dot-loader',
  props: ['isFixed']
}
</script>
