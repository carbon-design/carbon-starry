/* global Indicator:false */

export const indicator = new Indicator()

export default {
  install (Vue, options) {
    Object.defineProperty(Vue.prototype, '$indicator', { value: indicator })
  }
}
