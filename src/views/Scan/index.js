import asyncLoadConfig from '~/config/asyncLoad'

export default {
  name: 'async-scan',
  template: '<async-module></async-module>',
  components: {
    AsyncModule: () => ({
      component: import('./Scan' /* webpackChunkName: 'scan' */),
      ...asyncLoadConfig
    })
  }
}
