import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const vueRouter = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: [{
    path: '/home',
    component: resolve => {
      require(['@/views/home.vue'], resolve)
    }
  }, {
    path: '/chat',
    component: resolve => {
      require(['@/views/chat/index.vue'], resolve)
    },
    children: [{
      path: 'bar',
      component: require('@/views/chat/bar.vue')
    }, {
      path: 'todo',
      component: resolve => {
        require(['@/views/chat/todo.vue'], resolve)
      }
    }, {
      path: 'foo',
      component: resolve => {
        require(['@/views/chat/foo.vue'], resolve)
      }
    }]
  }, {
    path: '*',
    redirect: '/home'
  }]
})

vueRouter.afterEach((to, from) => {
  window.scrollTo(0, 0)
})

export default vueRouter
