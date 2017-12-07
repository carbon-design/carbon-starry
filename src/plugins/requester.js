// import axios from 'axios'
import { indicator } from './indicator'
import toast from '~/libs/toast'

export const Axios = axios.create({
  baseURL: '/',
  timeout: 10000,
  responseType: 'json',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})

Axios.interceptors.response.use(res => {
  const { status } = res

  switch (status) {
    case 403:
      toast('错误403', 'bottom')
      return null

    case 404:
      toast('错误404', 'bottom')
      return null

    case 500:
      toast('错误500', 'bottom')
      return null

    case 502:
      toast('错误502', 'bottom')
      return null

    default:
      return res
  }
}, err => {
  indicator.close()
  toast('数据请求发生错误，请检查网络！', 'bottom', 5000)
  return Promise.reject(err)
})

export default {
  install (Vue, options) {
    Object.defineProperty(Vue.prototype, '$axios', { value: Axios })
  }
}
