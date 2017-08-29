import { Axios } from './requester'

export const getCode = () => Axios({
  method: 'post',
  url: '/WechatBank/fee/queryAreaCode',
  data: {
    actionFlag: '0',
    areaCode: '00'
  }
})
