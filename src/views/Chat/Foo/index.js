import asyncLoadConfig from '@/utils/asyncLoadConfig'

export default {
  template: '<async-module></async-module>',
  components: {
    AsyncModule: () => ({
      component: import('./Foo' /* webpackChunkName: 'foo' */),
      ...asyncLoadConfig
    })
  }
}
