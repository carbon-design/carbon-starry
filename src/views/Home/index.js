import asyncLoadConfig from '~/config/asyncLoad'

export default {
  name: 'async-home',
  template: '<async-module></async-module>',
  components: {
    AsyncModule: () => ({
      component: import('./Home' /* webpackChunkName: 'home' */),
      ...asyncLoadConfig
    })
  }
}
