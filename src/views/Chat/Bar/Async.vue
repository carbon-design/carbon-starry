<template>
  <async-module></async-module>
</template>

<script>
import AppLoading from '@/components/Loading'
import AppError from '@/components/Error'

export default {
  components: {
    AsyncModule: () => ({
      component: import('./Index' /* webpackChunkName: 'bar' */),
      loading: AppLoading,
      error: AppError,
      delay: 200,
      timeout: 30000
    })
  }
}
</script>
