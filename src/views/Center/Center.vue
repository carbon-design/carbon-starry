<template>
  <article class="page-center">
    <app-loader :isFixed="true"></app-loader>
  </article>
</template>

<style lang="scss" src="#/styles/layouts/dot-loader.scss"></style>

<script>
import AppLoader from '^/DotLoader'

export default {
  name: 'center',
  data () {
    return {
    }
  },
  components: {
    AppLoader
  },
  beforeCreate () {
  },
  beforeMount () {
  },
  computed: {
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
  }
}
</script>
