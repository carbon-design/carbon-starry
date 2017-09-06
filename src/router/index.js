import Vue from 'vue'
import Router from 'vue-router'
import routeMap from './map'

Vue.use(Router)

const redirect = {
  path: '*',
  redirect: '/home'
}

const vueRouter = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    ...routeMap,
    redirect
  ]
})

vueRouter.afterEach((to, from) => {
  window.scrollTo(0, 0)
})

export default vueRouter
