/*
 * @ Author Aford
 * @ Date: 2017/10/22
 */

class Gyroscope {
  constructor (callback) {
    this.degtorad = Math.PI / 180
    this.fn = callback
    this._eventHandler = this._eventHandler.bind(this)
  }

  // 官方求四元数方法
  _getQuaternion (alpha, beta, gamma) {
    const degtorad = this.degtorad
    let _x = beta ? beta * degtorad : 0
    let _y = gamma ? gamma * degtorad : 0
    let _z = alpha ? alpha * degtorad : 0

    let cX = Math.cos(_x / 2)
    let cY = Math.cos(_y / 2)
    let cZ = Math.cos(_z / 2)
    let sX = Math.sin(_x / 2)
    let sY = Math.sin(_y / 2)
    let sZ = Math.sin(_z / 2)

    let w = cX * cY * cZ - sX * sY * sZ
    let x = sX * cY * cZ - cX * sY * sZ
    let y = cX * sY * cZ + sX * cY * sZ
    let z = cX * cY * sZ + sX * sY * cZ

    return [ w, x, y, z ]
  }

  // 我的四元数转旋转轴和旋转角度方法
  _getAcQuaternion (_w, _x, _y, _z) {
    const degtorad = this.degtorad
    let rotate = 2 * Math.acos(_w) / degtorad
    let x = _x / Math.sin(degtorad * rotate / 2) || 0
    let y = _y / Math.sin(degtorad * rotate / 2) || 0
    let z = _z / Math.sin(degtorad * rotate / 2) || 0
    return { x, y, z, rotate }
  }

  _deviceMotionHandler (evt) {
    let qu = this._getQuaternion(evt.alpha, evt.beta, evt.gamma)
    let rotate3d = this._getAcQuaternion(qu[0], qu[1], qu[2], qu[3])
    return rotate3d
  }

  _eventHandler (e) {
    let rotate3d = this._deviceMotionHandler(e)
    this.fn && this.fn(rotate3d)
  }

  bindEvent () {
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', this._eventHandler, false)
    }
  }

  destroy () {
    if (window.DeviceOrientationEvent) {
      window.removeEventListener('deviceorientation', this._eventHandler)
    }
  }
}

export default Gyroscope
