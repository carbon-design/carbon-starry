/*
 * @ Author Aford
 * @ Date: 2017/11/02
 */

class multiWave {
  constructor (el, opts) {
    this._parseNum = this._parseNum.bind(this)
    this._mergeParam = this._mergeParam.bind(this)
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

  _parseNum (num, coord, relSize) {
    let size = num
    if (typeof num !== 'number') {
      let dis = this._width
      if (coord === 'y') {
        dis = this._height
      }
      if (relSize) {
        dis = relSize
      }
      size = parseFloat(num) / 100 * dis
    }
    return size
  }

  _mergeParam (oldParams, newParams) {
    oldParams = oldParams || {}
    const _parseNum = this._parseNum
    let waveWidth = _parseNum(newParams.waveWidth || oldParams.waveWidth)
    let finalParams = {
      waveCount: Math.ceil(this._width / waveWidth) + 2
    }
    Object.keys(newParams).forEach(key => {
      if (key === 'waveHeight' || key === 'startFromTop' || key === 'endFromTop' || key === 'moveYStep') {
        finalParams[key] = _parseNum(newParams[key], 'y')
      } else if (key === 'moveXStep') {
        finalParams[key] = _parseNum(newParams[key])
      } else if (key === 'offsetX') {
        finalParams[key] = _parseNum(newParams[key], null, waveWidth) * -1
      } else if (key === 'moveXDirection') {
        finalParams['dir'] = newParams[key] === 'right' ? -1 : 1
      } else if (key === 'waveWidth') {
        finalParams[key] = waveWidth
      } else {
        finalParams[key] = newParams[key]
      }
    })
    return {
      ...oldParams,
      ...finalParams
    }
  }

  _initWavesParam () {
    Array.prototype.forEach.call(this.opts, (item, i) => {
      this.wavesParam[i] = this._mergeParam({
        id: item.id || i,
        dir: 1,
        currentMoveX: 0,
        currentMoveY: 0
      }, item)
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
        let { offsetX, currentMoveX, waveWidth, waveHeight, waveCount, waveColor, startFromTop, endFromTop, moveXStep, currentMoveY, moveYStep, dir } = item
        let curX = offsetX + currentMoveX + (dir - 1) * 2 * waveWidth
        let curY = startFromTop + currentMoveY
        this._drawWave(curX, curY, waveCount, waveHeight, waveWidth, waveColor)
        if (Math.abs(currentMoveX) < waveWidth * 2) {
          this.wavesParam[i].currentMoveX -= (moveXStep * dir)
        } else {
          this.wavesParam[i].currentMoveX = 0
        }
        if (Math.abs(startFromTop + currentMoveY - endFromTop) <= moveYStep) {
          this.wavesParam[i].currentMoveY = endFromTop - startFromTop
        } else {
          if (startFromTop > endFromTop || curY > endFromTop) {
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

  dynamicSetParamsById (id, newParams) {
    this.wavesParam.forEach((item, i) => {
      if (item.id === id) {
        this.wavesParam[i] = this._mergeParam(item, newParams)
      }
    })
  }

  dynamicSetParamsAll (newParamsArray) {
    newParamsArray.forEach(newItem => {
      this.dynamicSetParamsById(newItem.id, newItem)
    })
  }

  destroy () {
    window.cancelAnimationFrame(this.animateRaf)
  }
}

export default multiWave
