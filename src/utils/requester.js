import axios from 'axios'

export default {
  install (Vue, options) {
    // Vue.prototype.fetch = axios
    Object.defineProperty(Vue.prototype, 'fetch', { value: axios })
  }
}
