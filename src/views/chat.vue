<template>
  <article class="message">
    {{message}}
    <button @click="showToast">toast</button>
  </article>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'chat',
  data () {
    return {
      loginName: ''
    }
  },
  components: {

  },
  computed: {
    ...mapGetters({
      message: 'chatMessage'
    })
  },
  watch: {

  },
  methods: {
    showToast () {
      alert('提示')
    }
  }
}
</script>
