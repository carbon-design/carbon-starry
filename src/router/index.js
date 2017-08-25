import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Chat from '@/views/Chat'
import Bar from '@/views/Chat/Bar'
import Todo from '@/views/Chat/Todo'
import Foo from '@/views/Chat/Foo'

Vue.use(Router)

const vueRouter = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: [{
    path: '/home',
    component: Home
  }, {
    path: '/chat',
    component: Chat,
    children: [{
      path: 'bar',
      component: Bar
    }, {
      path: 'todo',
      component: Todo
    }, {
      path: 'foo',
      component: Foo
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
