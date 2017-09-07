import Vue from 'vue'
import router from './router'
import { sync } from 'vuex-router-sync'
import swiper from 'vue-awesome-swiper'
import device from './plugins/device'
import requester from './plugins/requester'
import App from './App.vue'
import store from './vuex/store'
import * as filters from './filters'

sync(store, router)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(device)
Vue.use(requester)
Vue.use(swiper)

const app = new Vue({
  router,
  store,
  ...App
})

app.$mount('#MOUNT_NODE')
