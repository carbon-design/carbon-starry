import axios from 'axios'

export const Axios = axios.create({
  baseURL: '/',
  timeout: 10000,
  responseType: 'json',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})

export default {
  install (Vue, options) {
    Object.defineProperty(Vue.prototype, 'fetch', { value: Axios })
  }
}
