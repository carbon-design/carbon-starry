import Login from '@/Login'
import Main from '@/Main'

import Home from '@/Home/Async'
import Asset from '@/Asset/Async'
import Scan from '@/Scan/Async'

import Chat from '@/Chat'
import Bar from '@/Chat/Bar'
import Todo from '@/Chat/Todo'
import Foo from '@/Chat/Foo'

export default [{
  path: '/login',
  component: Login
}, {
  path: '/main',
  component: Main,
  children: [{
    path: '',
    component: Home
  }, {
    path: 'home',
    component: Home
  }, {
    path: 'asset',
    component: Asset
  }]
}, {
  path: '/scan',
  component: Scan
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
  redirect: '/main/home'
}]
