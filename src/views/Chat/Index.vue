<template>
  <article class="message">
    {{message}}
    <button @click="showToast">toast</button>
    <router-link to="/chat/bar" active-class="active">home</router-link>
    <router-link to="/chat/todo" active-class="active">todo</router-link>
    <router-link to="/chat/foo" active-class="active">foo</router-link>
    <router-view></router-view>
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
  beforeMount () {

  },
  methods: {
    showToast () {
      alert('alert')
    }
  }
}
</script>
