/* global CircleProgress:false */

const circleProgress = opts => new CircleProgress(opts)

export default {
  install (Vue, options) {
    Object.defineProperty(Vue.prototype, '$circleProgress', { value: circleProgress })
  }
}
