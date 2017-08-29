import Vue from 'vue'
import Router from 'vue-router'
import home from './home'
import chat from './chat'

Vue.use(Router)

const vueRouter = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    home,
    chat,
    { path: '*', redirect: '/home' }
  ]
})

vueRouter.afterEach((to, from) => {
  window.scrollTo(0, 0)
})

export default vueRouter
