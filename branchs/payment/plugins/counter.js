const Counter = window.Counter

const counter = opts => new Counter(opts)

export default {
  install (Vue, options) {
    Object.defineProperty(Vue.prototype, '$counter', { value: counter })
  }
}
