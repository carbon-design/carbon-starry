import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const vueRouter = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: [{
    path: '/home',
    component: resolve => {
      require(['@/views/Home'], resolve)
    }
  }, {
    path: '/chat',
    component: resolve => {
      require(['@/views/Chat/Index'], resolve)
    },
    children: [{
      path: 'bar',
      component: require('@/views/Chat/Bar')
    }, {
      path: 'todo',
      component: resolve => {
        require(['@/views/Chat/Todo'], resolve)
      }
    }, {
      path: 'foo',
      component: resolve => {
        require(['@/views/Chat/Foo'], resolve)
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
