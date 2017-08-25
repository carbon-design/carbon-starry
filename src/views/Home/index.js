import AppLoading from '@/components/Loading'
import AppError from '@/components/Error'

export default {
  template: '<async-module></async-module>',
  components: {
    AsyncModule: () => ({
      component: import('./Home' /* webpackChunkName: 'home' */),
      loading: AppLoading,
      error: AppError,
      delay: 200,
      timeout: 30000
    })
  }
}
