import Chat from '@/Chat'
import Bar from '@/Chat/Bar'
import Todo from '@/Chat/Todo'
import Foo from '@/Chat/Foo'

export default {
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
}
