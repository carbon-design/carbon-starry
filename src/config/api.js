import { Axios } from '~/plugins/requester'

// 测试代理服务接口
// const rq = name => `/WechatBank/fee/${name}`

export const API = {
  // queryCode: rq('queryAreaCode'),
  login: '/mock/login.json',
  channel: '/mock/channel.json',
  assets: '/mock/assets.json',
  home: '/mock/home.json',
  address: '/mock/address.json',
  images: '/mock/images.json'
}

export const getCode = () => Axios({
  method: 'post',
  url: API.queryCode,
  data: {
    actionFlag: '0',
    areaCode: '00'
  }
})

export const getLogin = data => {
  return Axios({
    method: 'get',
    url: API.login
  })
}

export const getHome = data => {
  return Axios({
    method: 'get',
    url: API.home
  })
}

export const getLessons = data => {
  return Axios({
    method: 'get',
    url: API.channel
  })
}

export const getAssets = data => {
  return Axios({
    method: 'get',
    url: API.assets
  })
}

export const getAddress = data => {
  return Axios({
    method: 'get',
    url: API.address
  })
}

export const getImages = data => {
  return Axios({
    method: 'get',
    url: API.images
  })
}
