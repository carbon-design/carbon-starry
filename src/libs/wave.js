class Wave {
  constructor (el, options) {
    options = options || {}

    this.options = {
      waveCount: 3,
      waveHeight: '5%',
      waveColor: '#000',
      startY: '0%',
      endY: '50%',
      offsetXStep: '1%'
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

  _getComputedStyle (el, key) {
    let computedStyle = window.getComputedStyle(el)
    return computedStyle[key] || ''
  }

  run () {
    const w = this._width
    const h = this._height
    const { waveCount, waveHeight, waveColor } = this.options
    const ctx = this.ctx
    const waveH = typeof waveHeight === 'number'
      ? waveHeight
      : parseFloat(waveHeight) / 100 * h

    const waveWidth = w / waveCount * (waveCount + 2)
    const startY = h * (100 - parseFloat(this.options.startY)) / 100 - waveH
    const endY = h * parseFloat(this.options.endY) / 100 - waveH
    let offsetXStep = w * parseFloat(this.options.offsetXStep) / 100
    let offset = 0
    let progress = 0
    let progressStep = 1
    let d2 = w / waveCount
    let startX = -d2
    let d = d2 / 2
    let hd = d / 2

    const tick = () => {
      offset -= offsetXStep
      if (progress <= endY) {
        if (Math.abs(endY - progress) < progressStep) {
          progress = endY
        } else {
          progress += progressStep
        }
      }
      if (Math.abs(offset + d2) < offsetXStep) {
        offset = 0
      }
      ctx.clearRect(0, 0, w, h)
      ctx.beginPath()
      let offsetY = startY - progress
      ctx.moveTo(startX - offset, offsetY)

      for (let i = 0; i < waveCount + 2; i++) {
        let dx = i * d2
        let offsetX = dx + startX - offset
        ctx.quadraticCurveTo(offsetX + hd, offsetY + waveH, offsetX + d, offsetY)
        ctx.quadraticCurveTo(offsetX + hd + d, offsetY - waveH, offsetX + d2, offsetY)
      }
      ctx.lineTo(startX + waveWidth, h)
      ctx.lineTo(startX, h)
      ctx.fillStyle = waveColor
      ctx.fill()
      ctx.closePath()

      this.animateRaf = requestAnimationFrame(tick)
    }

    tick()
  }

  destroy () {
    window.cancelAnimationFrame(this.animateRaf)
  }
}

export default Wave
