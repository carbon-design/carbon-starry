<template>
  <div class="app-dot-loader" :class="{ fixed: isFixed }">
    <div class="app-dot-loading"></div>
  </div>
</template>

<script>

export default {
  name: 'dot-loader',
  props: ['isFixed']
}
</script>
