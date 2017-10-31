import axios from 'axios/dist/axios'
import vue from 'vue/dist/vue'
import vuex from 'vuex/dist/vuex'
import vueRouter from 'vue-router/dist/vue-router'
import vuexRouterSync from 'vuex-router-sync'
import vuexPersistedstate from 'vuex-persistedstate'
import echarts from 'echarts/dist/echarts.simple'
import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'
import CircleProgress from '../src/libs/circleProgress'
import Counter from '../src/libs/counter'
import Scroller from '../src/libs/scroller'
import DatetimePicker from '../src/libs/datetimepicker'
import Poppicker from '../src/libs/poppicker'
import Indicator from '../src/libs/indicator'
import toast from '../src/libs/toast'

window.axios = axios
window.vue = vue
window.vuex = vuex
window.vueRouter = vueRouter
window.vuexRouterSync = vuexRouterSync
window.vuexPersistedstate = vuexPersistedstate
window.echarts = echarts
window.throttle = throttle
window.debounce = debounce
window.CircleProgress = CircleProgress
window.Counter = Counter
window.Scroller = Scroller
window.DatetimePicker = DatetimePicker
window.Poppicker = Poppicker
window.Indicator = Indicator
window.toast = toast
