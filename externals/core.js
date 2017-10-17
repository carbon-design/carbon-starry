import axios from 'axios/dist/axios'
import vue from 'vue/dist/vue'
import vuex from 'vuex/dist/vuex'
import vueRouter from 'vue-router/dist/vue-router'
import vuexRouterSync from 'vuex-router-sync'
import vuexPersistedstate from 'vuex-persistedstate'
import echarts from 'echarts/dist/echarts.simple'
import throttle from 'lodash/throttle'

window.axios = axios
window.vue = vue
window.vuex = vuex
window.vueRouter = vueRouter
window.vuexRouterSync = vuexRouterSync
window.vuexPersistedstate = vuexPersistedstate
window.echarts = echarts
window.throttle = throttle
