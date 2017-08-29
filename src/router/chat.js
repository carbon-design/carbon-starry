import Chat from '@/views/Chat'
import Bar from '@/views/Chat/Bar'
import Todo from '@/views/Chat/Todo'
import Foo from '@/views/Chat/Foo'

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
