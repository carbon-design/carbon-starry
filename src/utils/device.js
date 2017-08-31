export default (win => {
  let device = {}
  const ua = navigator.userAgent
  const android = ua.match(/(Android);?[\s/]+([\d.]+)?/)
  const ipad = ua.match(/(iPad).*OS\s([\d_]+)/)
  const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/)
  const iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/)
  const docEl = win.document.documentElement

  if (ipad || ipod || iphone) {
    device.os = 'ios'
  } else if (android) {
    device.os = 'android'
  } else {
    device.os = 'web'
  }

  device.weixin = (ua.toLowerCase()).match(/MicroMessenger/i) === 'micromessenger'

  docEl.className = device.os
  if (device.weixin) {
    docEl.classList.add('weixin')
  }

  win.device = device
  return device
})(window)
