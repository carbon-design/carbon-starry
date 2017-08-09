<template>
  <article class="foo">{{ loginName | uppercase }}</article>
</template>

<script>
export default {
  name: 'foo',
  data () {
    return {
      loginName: 'admin'
    }
  },
  components: {

  },
  computed: {

  },
  watch: {

  },
  beforeMount () {

  },
  methods: {

  }
}
</script>
