<template>
  <article class="foo">
    {{ loginName | uppercase }}
    <hello></hello>
  </article>
</template>

<script>
import Hello from '@/components/Hello'

export default {
  name: 'foo',
  data () {
    return {
      loginName: 'admin'
    }
  },
  components: {
    Hello
  },
  computed: {

  },
  watch: {

  },
  beforeMount () {
    console.log('beforeMount', Date.now())
  },
  methods: {

  }
}
</script>
