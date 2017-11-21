/*
 * @ Author Aford
 * @ Date: 2017/10/26
 */

class Sector {
  constructor (el, options) {
    options = options || {}

    this.options = {
      sectorColor: 'rgba(255, 255, 255, .6)',
      sectorRadius: 76,
      circleColor: 'rgba(255, 255, 255, .6)',
      circleRadius: [100, 90]
    }

    for (let key in options) {
      if (options[key] !== undefined) {
        this.options[key] = options[key]
      }
    }

    this.$el = el
    this._initContainer()
  }

  _initContainer () {
    const el = this.$el
    const canvas = this.$canvans = document.createElement('canvas')
    el.appendChild(canvas)

    const width = parseFloat(this._getComputedStyle(el, 'width'))
    const height = parseFloat(this._getComputedStyle(el, 'height'))
    this._width = width
    this._height = height

    canvas.width = width
    canvas.height = height
    this.ctx = canvas.getContext('2d')
  }

  _clear () {
    this.ctx.clearRect(0, 0, this._width, this._height)
    this.ctx.save()
  }

  _getComputedStyle (el, key) {
    let computedStyle = window.getComputedStyle(el)
    return computedStyle[key] || ''
  }

  _drawCircle () {
    const ctx = this.ctx
    const circleRadius = this.options.circleRadius
    const radius = this.radius = (this._width > this._height ? this._height : this._width) / 2
    const lineWidth = (circleRadius[0] - circleRadius[1]) * radius / 100

    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = this.options.circleColor
    ctx.arc(radius, radius, radius * circleRadius[0] / 100 - lineWidth / 2, 0, 2 * Math.PI)
    ctx.stroke()
  }

  _drawSec (x, y, radius, sAngle, eAngle, counterclockwise) {
    const ctx = this.ctx
    ctx.beginPath()
    ctx.translate(x, y)
    ctx.moveTo(0, 0)
    ctx.arc(0, 0, radius, sAngle, eAngle, counterclockwise)
    ctx.closePath()
    ctx.fillStyle = this.options.sectorColor
    return ctx
  }

  animateFromTo (start, end, duration, isEase, callback) {
    const dist = end - start
    const frame = duration / 1000 * 60
    const gap = dist / frame

    const easing = x => {
      if (x < 0.5) {
        x = 2 * x
        return 0.5 * x * x * x
      } else {
        x = 2 - 2 * x
        return 1 - 0.5 * x * x * x
      }
    }

    const atom = () => {
      this.setProgress(isEase ? easing(start / end) * start : start)
      start += gap
      if (Math.abs(end - start) > Math.abs(gap)) {
        this.animateRaf = window.requestAnimationFrame(atom)
      } else {
        this.setProgress(end)
        window.cancelAnimationFrame(this.animateRaf)
        callback && callback()
      }
    }
    atom()
  }

  done (endTime, callback) {
    window.cancelAnimationFrame(this.animateRaf)
    this.animateFromTo(this.progressStatus, 100, endTime || 600, false, callback)
  }

  setProgress (progress) {
    this.progressStatus = progress
    this.ctx.restore()
    this._clear()
    this._drawCircle()
    progress = Number(progress)
    progress = progress < 0 ? 0 : progress
    progress = progress > 100 ? 100 : progress
    const pie = Math.PI / 180
    const r = this.radius * this.options.sectorRadius / 100
    const sa = pie * -90
    const ea = pie * (360 * progress / 100) + sa
    this._drawSec(this.radius, this.radius, r, sa, ea, false).fill()
  }

  destroy () {
    this.progressStatus = 0
    window.cancelAnimationFrame(this.animateRaf)
  }
}

export default Sector
