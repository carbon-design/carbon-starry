/* global toast:false */

export default {
  install (Vue, options) {
    Object.defineProperty(Vue.prototype, '$toast', { value: toast })
  }
}
