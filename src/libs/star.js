/*
 * @ Author Aford
 * @ Date: 2017/11/20
 */

class Star {
  constructor (x, y, maxSpeed, maxSize) {
    this.x = x
    this.y = y
    this.slope = y / x
    this.opacity = 0
    this.size = Math.round(maxSize * Math.random())
    this.speed = Math.max(Math.random() * maxSpeed, 1)
  }

  distanceTo (originX, originY) {
    return Math.sqrt(Math.pow(originX - this.x, 2) + Math.pow(originY - this.y, 2))
  }

  resetPosition (x, y, maxSpeed, maxSize) {
    Star.apply(this, arguments)
    return this
  }
}

const BigBang = {
  getRandomStar (minX, minY, maxX, maxY, maxSpeed, maxSize) {
    let coords = BigBang.getRandomPosition(minX, minY, maxX, maxY)
    return new Star(coords.x, coords.y, maxSpeed, maxSize)
  },
  getRandomPosition (minX, minY, maxX, maxY) {
    return {
      x: Math.floor((Math.random() * maxX) + minX),
      y: Math.floor((Math.random() * maxY) + minY)
    }
  }
}

class StarField {
  constructor (el, options) {
    options = options || {}

    this.options = {
      maxSize: 2,
      numStars: 100,
      maxStarSpeed: 3,
      bgColor: 'rgba(0, 0, 0, .5)'
    }

    for (let key in options) {
      if (options[key] !== undefined) {
        this.options[key] = options[key]
      }
    }
    this.$el = el
    this.starField = []
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

  _updateStarField () {
    let i
    let star
    let randomLoc
    let increment

    for (i = 0; i < this.numStars; i++) {
      star = this.starField[i]

      increment = Math.min(star.speed, Math.abs(star.speed / star.slope))
      star.x += (star.x > 0) ? increment : -increment
      star.y = star.slope * star.x

      star.opacity += star.speed / 100

      if ((Math.abs(star.x) > this._width / 2) || (Math.abs(star.y) > this._height / 2)) {
        randomLoc = BigBang.getRandomPosition(
          -this._width / 10, -this._height / 10,
          this._width / 5, this._height / 5
        )
        star.resetPosition(randomLoc.x, randomLoc.y, this.maxStarSpeed, this.maxSize)
      }
    }
  }

  _renderStarField () {
    let i
    let star
    let bgColor = this.options.bgColor
    const ctx = this.ctx
    if (typeof bgColor !== 'string') {
      let linearGradient = ctx.createLinearGradient(0, 0, 0, this._height)
      bgColor.forEach((item, i) => {
        linearGradient.addColorStop(item.stop, item.color)
      })
      bgColor = linearGradient
    }
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, this._width, this._height)

    for (i = 0; i < this.numStars; i++) {
      star = this.starField[i]
      let size = star.size
      let x = star.x + this._width / 2
      let y = star.y + this._height / 2
      this._fillRound(x, y, size, `rgba(255, 255, 255, ${star.opacity})`)
    }
  }

  _fillRound (x, y, r, color) {
    const ctx = this.ctx
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI, true)
    ctx.fillStyle = color
    ctx.fill()
  }

  _renderFrame (elapsedTime) {
    let timeSinceLastFrame = elapsedTime - (this.prevFrameTime || 0)

    this.animateRaf = window.requestAnimationFrame(this._renderFrame.bind(this))

    if (timeSinceLastFrame >= 30 || !this.prevFrameTime) {
      this.prevFrameTime = elapsedTime
      this._updateStarField()
      this._renderStarField()
    }
  }

  _initScene (numStars) {
    let i
    for (i = 0; i < this.numStars; i++) {
      this.starField.push(
        BigBang.getRandomStar(-this._width / 2, -this._height / 2, this._width, this._height, this.maxStarSpeed, this.maxSize)
      )
    }
    this.animateRaf = window.requestAnimationFrame(this._renderFrame.bind(this))
  }

  destroy () {
    window.cancelAnimationFrame(this.animateRaf)
  }

  render (numStars, maxStarSpeed, maxSize) {
    this.numStars = numStars || this.options.numStars
    this.maxStarSpeed = maxStarSpeed || this.options.maxStarSpeed
    this.maxSize = maxSize || this.options.maxSize

    this._initScene(this.numStars)
  }
}

export default StarField
