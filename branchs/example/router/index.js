import Vue from 'vue'
import Router from 'vue-router'
import { getCookie } from '~/utils/cookie'
import routeMap from './maps'

Vue.use(Router)

const vueRouter = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: routeMap
})

vueRouter.beforeEach((to, from, next) => {
  if (to.query.validate === '1') {
    const userInfo = getCookie('userinfo')
    if (userInfo) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

vueRouter.afterEach((to, from) => {
  window.scrollTo(0, 0)
})

export default vueRouter
