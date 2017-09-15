import Login from '@/Login'
import Main from '@/Main'
import Redirect from '@/Redirect'

import Home from '@/Home/Async'
import Asset from '@/Asset/Async'
import Channel from '@/Channel/Async'

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
  }, {
    path: 'channel',
    component: Channel
  }]
}, {
  path: '/redirect',
  component: Redirect
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
  redirect: '/redirect'
}]
