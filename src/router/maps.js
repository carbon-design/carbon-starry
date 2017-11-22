import Login from '@/Login'
import Main from '@/Main'
import Redirect from '@/Redirect'

import Home from '@/Home/Async'
import Asset from '@/Asset/Async'
import Channel from '@/Channel/Async'
import Center from '@/Center/Async'

import Gyro from '@/Gyro/Async'
import Maps from '@/Map/Async'
import Scroll from '@/Scroll/Async'
import Sector from '@/Sector/Async'
import Wave from '@/Wave/Async'
import Star from '@/Star/Async'
import Pixel from '@/Pixel/Async'

export default [{
  path: '/login',
  component: Login
}, {
  path: '/main',
  component: Main,
  children: [{
    path: '',
    component: Home
  }, {
    path: 'home',
    component: Home
  }, {
    path: 'asset',
    component: Asset
  }, {
    path: 'channel',
    component: Channel
  }, {
    path: 'center',
    component: Center
  }, {
    path: 'gyro',
    component: Gyro
  }, {
    path: 'map',
    component: Maps
  }, {
    path: 'scroll',
    component: Scroll
  }, {
    path: 'sector',
    component: Sector
  }, {
    path: 'wave',
    component: Wave
  }, {
    path: 'star',
    component: Star
  }, {
    path: 'pixel',
    component: Pixel
  }]
}, {
  path: '/redirect',
  component: Redirect
}, {
  path: '*',
  redirect: '/redirect'
}]
