import StackBlur from 'stackblur-canvas'

class ImageBlur {
  constructor ($image, options) {
    const $parent = this.$parent = $image.parentNode

    options = options || {}
    this.options = {
      width: this._getComputedStyle($parent, 'width'),
      height: this._getComputedStyle($parent, 'height'),
      classname: 'thumb'
    }

    for (let key in options) {
      if (options[key] !== undefined) {
        this.options[key] = options[key]
      }
    }

    this.$image = $image
    this._createCanvas()
    this._drawImg()
  }

  _getComputedStyle (el, key) {
    const computedStyle = window.getComputedStyle(el)
    return parseFloat(computedStyle[key] || 0)
  }

  _createCanvas () {
    const canvas = this.$canvas = document.createElement('canvas')
    canvas.className = this.options.classname
    canvas.width = this.options.width
    canvas.height = this.options.height
    this.$parent.appendChild(canvas)
  }

  _drawImg () {
    const img = this.$image
    const canvas = this.$canvas
    const { width, height } = this.options

    img.onload = () => {
      StackBlur.image(img, canvas, 20)
      canvas.style.cssText = `width: ${width}px; height: ${height}px`
      this.$parent.removeChild(img)
    }
  }
}

export default ImageBlur
