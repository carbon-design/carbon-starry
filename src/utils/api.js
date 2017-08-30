import { Axios } from './requester'

const rq = name => `/WechatBank/fee/${name}`

export const API = {
  queryCode: rq('queryAreaCode')
}

export const getCode = () => Axios({
  method: 'post',
  url: API.queryCode,
  data: {
    actionFlag: '0',
    areaCode: '00'
  }
})
