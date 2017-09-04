import { Axios } from '~/utils/requester'

const rq = name => `/WechatBank/fee/${name}`

export const API = {
  queryCode: rq('queryAreaCode'),
  login: '/mock/login.json'
}

export const getCode = () => Axios({
  method: 'post',
  url: API.queryCode,
  data: {
    actionFlag: '0',
    areaCode: '00'
  }
})

export const getLogin = () => Axios({
  method: 'get',
  url: API.login
})
