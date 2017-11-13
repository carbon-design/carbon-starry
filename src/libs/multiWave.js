class multiWave {
  constructor (el, opts) {
    if (Object.prototype.toString.call(opts) !== '[object Array]') {
      throw new Error('Function Parameter Error!')
    }
    this.opts = opts
    this.wavesParam = []
    this.$el = el
    this._initContainer()
    this._initWavesParam()
    this._drawWaveFrame()
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

  _initWavesParam () {
    const _parseNum = (num, coord) => {
      let size = num
      if (typeof waveHeight !== 'number') {
        let coo = this._width
        if (coord === 'y') {
          coo = this._height
        }
        size = parseFloat(num) / 100 * coo
      }
      return size
    }

    Array.prototype.forEach.call(this.opts, (item, i) => {
      const waveWidth = _parseNum(item.waveWidth)
      const minCount = Math.ceil(this._width / waveWidth) + 2
      let curWave = {
        offsetX: waveWidth * parseFloat(item.offsetX) / -100,
        waveWidth: waveWidth,
        waveHeight: _parseNum(item.waveHeight, 'y'),
        waveCount: minCount,
        waveColor: item.waveColor,
        currentMoveX: 0,
        currentMoveY: 0,
        startFromTop: _parseNum(item.startFromTop, 'y'),
        endFromTop: _parseNum(item.endFromTop, 'y'),
        moveXStep: _parseNum(item.moveXStep),
        moveYStep: _parseNum(item.moveYStep, 'y')
      }
      this.wavesParam[i] = curWave
    })
  }

  _getComputedStyle (el, key) {
    let computedStyle = window.getComputedStyle(el)
    return computedStyle[key] || ''
  }

  _drawWaveFrame () {
    const tick = () => {
      let wavesParam = this.wavesParam
      this.ctx.clearRect(0, 0, this._width, this._height)
      Array.prototype.forEach.call(wavesParam, (item, i) => {
        let { offsetX, currentMoveX, waveWidth, waveHeight, waveCount, waveColor, startFromTop, endFromTop, moveXStep, currentMoveY, moveYStep } = item
        let curX = offsetX + currentMoveX
        let curY = startFromTop + currentMoveY
        this._drawWave(curX, curY, waveCount, waveHeight, waveWidth, waveColor)
        if (Math.abs(waveWidth * 2 + currentMoveX) > moveXStep) {
          this.wavesParam[i].currentMoveX -= moveXStep
        } else {
          this.wavesParam[i].currentMoveX = 0
        }
        if (Math.abs(startFromTop + currentMoveY - endFromTop) <= moveYStep) {
          this.wavesParam[i].currentMoveY = endFromTop - startFromTop
        } else {
          if (startFromTop > endFromTop) {
            this.wavesParam[i].currentMoveY -= moveYStep
          } else {
            this.wavesParam[i].currentMoveY += moveYStep
          }
        }
      })
      this.animateRaf = requestAnimationFrame(tick)
    }
    tick()
  }

  _drawWave (offsetX, offsetTop, waveCount, waveHeight, waveWidth, waveColor) {
    const ctx = this.ctx
    const h = this._height
    const d = waveWidth
    const hd = d / 2
    ctx.beginPath()
    ctx.moveTo(offsetX, offsetTop)
    for (let i = 0; i < waveCount; i++) {
      ctx.quadraticCurveTo(offsetX + i * 2 * d + hd, offsetTop - waveHeight, offsetX + (i * 2 + 1) * d, offsetTop)
      ctx.quadraticCurveTo(offsetX + (i * 2 + 1) * d + hd, offsetTop + waveHeight, offsetX + (i * 2 + 2) * d, offsetTop)
    }
    ctx.lineTo(d * 2 * waveCount + offsetX, h)
    ctx.lineTo(offsetX, h)
    ctx.closePath()
    ctx.fillStyle = waveColor
    ctx.fill()
  }

  destroy () {
    window.cancelAnimationFrame(this.animateRaf)
  }
}

export default multiWave
