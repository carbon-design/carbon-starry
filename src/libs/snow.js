/*
 * @ Author Aford
 * @ Date: 2017/12/04
 */

import SnowFlake from './snowFlake'

class Snow {
  constructor (el, options) {
    this.destroy = this.destroy.bind(this)
    this.start = this.start.bind(this)

    options = options || {}

    this.options = {
      maxCount: 50,
      maxWaitTime: 1000,
      thread: 2
    }

    for (let key in options) {
      if (options[key] !== undefined) {
        this.options[key] = options[key]
      }
    }

    this.$wrap = el || document.body
    const doc = document.documentElement
    this.maxWidth = doc.clientWidth
    this.maxHeight = doc.clientHeight
  }

  _initState () {
    this.count = 0
    this.flakes = []
    this.destroyed = false
  }

  _createFlake () {
    if (this.count > this.options.maxCount) {
      return
    }
    const time = this.options.maxWaitTime * Math.random()
    const tempTimer = setTimeout(() => {
      const flake = new SnowFlake(this.$root, {
        ...this.options,
        maxWidth: this.maxWidth,
        maxHeight: this.maxHeight,
        beforeCreate: () => {
          this.count++
          this._createFlake()
        }
      })
      this.flakes.push(flake)
      clearTimeout(tempTimer)
    }, time)
  }

  _initDOM () {
    const $root = this.$root = document.createElement('div')
    $root.className = 'snow-frame-container'
    this.$wrap.appendChild($root)
  }

  destroy () {
    if (this.destroyed) {
      return
    }
    this.$root && this.$wrap && this.$wrap.removeChild(this.$root)
    this.destroyed = true
  }

  start () {
    this._initDOM()
    this._initState()
    for (let i = 0; i < this.options.thread; i++) {
      this._createFlake()
    }
  }
}

export default Snow
