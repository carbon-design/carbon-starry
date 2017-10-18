import Vue from 'vue'
import Router from 'vue-router'
import routeMap from './maps'

Vue.use(Router)

const vueRouter = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: routeMap
})

vueRouter.afterEach((to, from) => {
  window.scrollTo(0, 0)
})

export default vueRouter
