import { Axios } from './requester'

const getPath = name => `/WechatBank/fee/${name}`

export const API = {
  queryCode: getPath('queryAreaCode')
}

export const getCode = () => Axios({
  method: 'post',
  url: API.queryCode,
  data: {
    actionFlag: '0',
    areaCode: '00'
  }
})
