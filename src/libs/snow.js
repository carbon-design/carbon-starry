/*
 * @ Author Aford
 * @ Date: 2017/12/04
 */

import SnowFlake from './snowFlake'

class Snow {
  constructor (el, options) {
    this.destroy = this.destroy.bind(this)
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    options = options || {}
    this.options = {
      maxCount: 30,
      maxWaitTime: 1000
    }

    for (let key in options) {
      if (options[key] !== undefined) {
        this.options[key] = options[key]
      }
    }

    const doc = document.documentElement
    this.$wrap = el || document.body
    this.index = 0
    this.count = 0
    this.flake = []
    this.stopFlag = false
    this.maxWidth = doc.clientWidth
    this.maxHeight = doc.clientHeight
    this._initDOM()
  }

  _createFlake () {
    if (this.count > this.options.maxCount || this.stopFlag) {
      return
    }
    const time = this.options.maxWaitTime * Math.random()
    const tempTimer = setTimeout(() => {
      let flake = new SnowFlake(this.$root, {
        ...this.options,
        maxWidth: this.maxWidth,
        maxHeight: this.maxHeight,
        beforeDestroy: () => {
          this.flake = this.flake.splice(this.index)
          this.count--
          this._createFlake()
        },
        beforeCreate: () => {
          this.count++
          this.index++
          this._createFlake()
        }
      })
      this.flake.push(flake)
      clearTimeout(tempTimer)
    }, time)
  }

  _initDOM () {
    const $root = this.$root = document.createElement('div')
    $root.className = 'snow-frame-container'
    this.$wrap.appendChild($root)
  }

  destroy () {
    this.$wrap.removeChild(this.$root)
  }

  start () {
    this.stopFlag = false
    this._createFlake()
  }

  stop () {
    this.stopFlag = true
  }
}

export default Snow
