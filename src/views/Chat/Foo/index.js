import AppLoading from '@/components/Loading'
import AppError from '@/components/Error'

export default {
  template: '<async-module></async-module>',
  components: {
    AsyncModule: () => ({
      component: import('./Foo' /* webpackChunkName: 'foo' */),
      loading: AppLoading,
      error: AppError,
      delay: 200,
      timeout: 30000
    })
  }
}
