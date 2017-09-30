import Counter from '~/libs/counter'

const counter = opts => new Counter(opts)

export default {
  install (Vue, options) {
    Object.defineProperty(Vue.prototype, '$counter', { value: counter })
  }
}
