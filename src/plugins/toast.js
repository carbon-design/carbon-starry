import toast from '~/libs/toast'

export default {
  install (Vue, options) {
    Object.defineProperty(Vue.prototype, '$toast', { value: toast })
  }
}
