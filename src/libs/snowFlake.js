/*
 * @ Author Aford
 * @ Date: 2017/12/04
 */

class SnowFlake {
  constructor (el, options) {
    options = options || {}
    const doc = document.documentElement
    const noop = () => {}
    this.options = {
      maxSize: 20,
      minSize: 10,
      minSpeed: 2,
      maxSpeed: 10,
      wind: 0,
      fluctuation: 0.2,
      isBlur: false,
      maxWidth: options.maxWidth || doc.clientWidth,
      maxHeight: options.maxHeight || doc.clientHeight,
      opacity: Math.min(Math.random() * 1 + 0.1, 1),
      beforeDestroy: noop,
      beforeCreate: noop
    }

    for (let key in options) {
      if (options[key] !== undefined) {
        this.options[key] = options[key]
      }
    }

    this.deviation = 0
    this.progress = 0
    this.gap = this.options.maxHeight / Math.max(~~Math.random() * 4, 2)
    this.fluctuation = this.options.fluctuation * this.options.maxWidth * Math.random()
    this.size = Math.max(this.options.maxSize * Math.random(), this.options.minSize)
    this.speed = Math.max((1 - this.size / this.options.maxSize) * this.options.maxSpeed, this.options.minSpeed)
    this.$root = el || document.body
    this._initFlake()
    this._drawFrame()
  }

  _initFlake () {
    this.options.beforeCreate && this.options.beforeCreate()
    const $snow = this.$snow = document.createElement('div')
    let style = `
      position: fixed;
      left: ${this.options.maxWidth * Math.random() - this.size / 2}px;
      top: -${this.size}px;
      border-radius: 50%;
      background-color: #fff;
      opacity: ${this.options.opacity};
      height: ${this.size}px;
      width: ${this.size}px;
      z-index: 9999;
    `

    if (this.options.isBlur) {
      style += `filter: blur(${this.size / 4}px);`
    }
    $snow.style.cssText = style
    this.$root.appendChild($snow)
  }

  _setPoz (x, y) {
    this.$snow.style.transform = this.$snow.style.webkitTransform = `
      translate3d(${x}px, ${y}px, 0)
    `
  }

  _drawFrame () {
    this.progress += this.speed
    this.deviation += this.options.wind
    const pos = this.progress / this.gap
    const y = this.fluctuation * Math.sin(pos * (Math.PI / 2))
    this._setPoz(y + this.deviation, this.progress)
    if (this.progress < this.options.maxHeight + this.size) {
      window.requestAnimationFrame(this._drawFrame.bind(this))
    } else {
      this.options.beforeDestroy && this.options.beforeDestroy()
      this.$root.removeChild(this.$snow)
    }
  }
}

export default SnowFlake
