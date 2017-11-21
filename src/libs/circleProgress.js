/*
 * @ Author Aford
 * @ Date: 2017/09/29
 */

class CircleProgress {
  constructor (options) {
    this.destroy = this.destroy.bind(this)
    let opts = {
      value: 0.0,
      size: 100.0,
      startAngle: -Math.PI,
      thickness: 'auto',
      fill: {
        gradient: ['#3aeabb', '#fdd250']
      },
      emptyFill: 'rgba(0, 0, 0, .1)',
      animation: {
        duration: 1200,
        type: 'ease'
      },
      animationStartValue: 0.0,
      reverse: false,
      lineCap: 'butt',
      el: null,
      canvas: null,
      ctx: null,
      radius: 0.0,
      arcFill: null,
      lastFrameValue: 0.0,
      callback (num) {}
    }
    for (let key in opts) {
      this[key] = options[key] || opts[key]
    }
  }

  init () {
    this.radius = this.size / 2
    this.initWidget()
    this.initFill()
    this.draw()
  }

  initWidget () {
    if (!this.canvas) {
      let canvas = document.createElement('canvas')
      this.el.insertBefore(canvas, this.el.childNodes[0])
      this.canvas = canvas
    }
    let canvas = this.canvas
    canvas.width = this.size
    canvas.height = this.size
    this.ctx = canvas.getContext('2d')
    if (window.devicePixelRatio > 1) {
      const scaleBy = window.devicePixelRatio
      canvas.style.width = canvas.style.height = this.size + 'px'
      canvas.width = canvas.height = this.size * scaleBy
      this.ctx.scale(scaleBy, scaleBy)
    }
  }

  initFill () {
    let self = this
    let fill = this.fill
    let ctx = this.ctx
    let size = this.size

    if (!fill) {
      throw Error('The fill is not specified!')
    }

    if (typeof fill === 'string') {
      fill = {
        color: fill
      }
    }

    if (fill.color) {
      this.arcFill = fill.color
    }

    if (fill.gradient) {
      let gr = fill.gradient

      if (gr.length === 1) {
        this.arcFill = gr[0]
      } else if (gr.length > 1) {
        let ga = fill.gradientAngle || 0
        let gd = fill.gradientDirection || [
          size / 2 * (1 - Math.cos(ga)),
          size / 2 * (1 + Math.sin(ga)),
          size / 2 * (1 + Math.cos(ga)),
          size / 2 * (1 - Math.sin(ga))
        ]

        let lg = ctx.createLinearGradient.apply(ctx, gd)

        for (let i = 0; i < gr.length; i++) {
          let color = gr[i]
          let pos = i / (gr.length - 1)

          if (Array.isArray(color)) {
            pos = color[1]
            color = color[0]
          }

          lg.addColorStop(pos, color)
        }

        this.arcFill = lg
      }
    }

    const setImageFill = img => {
      let bg = document.createElement('canvas')
      bg.width = self.size
      bg.height = self.size
      bg.getContext('2d').drawImage(img, 0, 0, size, size)
      self.arcFill = self.ctx.createPattern(bg, 'no-repeat')
      self.drawFrame(self.lastFrameValue)
    }

    if (fill.image) {
      let img

      if (fill.image instanceof Image) {
        img = fill.image
      } else {
        img = new Image()
        img.src = fill.image
      }

      if (img.complete) {
        setImageFill(img)
      } else {
        img.onload = () => {
          setImageFill(img)
        }
      }
    }
  }

  draw () {
    if (this.animation) {
      this.drawAnimated(this.value)
    } else {
      this.drawFrame(this.value)
    }
  }

  drawFrame (v) {
    this.lastFrameValue = v
    this.ctx.clearRect(0, 0, this.size, this.size)
    this.drawEmptyArc(v)
    this.drawArc(v)
  }

  drawArc (v) {
    if (v === 0) {
      return
    }

    let ctx = this.ctx
    let r = this.radius
    let t = this.getThickness()
    let a = this.startAngle

    ctx.save()
    ctx.beginPath()

    if (!this.reverse) {
      ctx.arc(r, r, r - t / 2, a, a + Math.PI * 2 * v)
    } else {
      ctx.arc(r, r, r - t / 2, a - Math.PI * 2 * v, a)
    }

    ctx.lineWidth = t
    ctx.lineCap = this.lineCap
    ctx.strokeStyle = this.arcFill
    ctx.stroke()
    ctx.restore()
  }

  drawEmptyArc (v) {
    let ctx = this.ctx
    let r = this.radius
    let t = this.getThickness()
    let a = this.startAngle

    if (v < 1) {
      ctx.save()
      ctx.beginPath()

      if (v <= 0) {
        ctx.arc(r, r, r - t / 2, 0, Math.PI * 2)
      } else {
        if (!this.reverse) {
          ctx.arc(r, r, r - t / 2, a + Math.PI * 2 * v, a)
        } else {
          ctx.arc(r, r, r - t / 2, a, a - Math.PI * 2 * v)
        }
      }

      ctx.lineWidth = t
      ctx.strokeStyle = this.emptyFill
      ctx.stroke()
      ctx.restore()
    }
  }

  circleProgressEasing (x) {
    if (x < 0.5) {
      x = 2 * x
      return 0.5 * x * x * x
    } else {
      x = 2 - 2 * x
      return 1 - 0.5 * x * x * x
    }
  }

  drawAnimated (v) {
    let duration = this.animation.duration
    let start = Date.now()

    const setStep = p => {
      if (p >= 1) {
        p = 1
      }
      let stepValue = this.animationStartValue * (1 - p) + v * p
      this.drawFrame(stepValue)
      this.callback(stepValue)
    }

    const run = () => {
      let gapTime = Date.now() - start
      let progress = gapTime / duration
      if (this.animation.type === 'ease') {
        progress = this.circleProgressEasing(progress)
      }
      setStep(progress)
      if (duration > gapTime && progress < 1) {
        this.circleRaf = window.requestAnimationFrame(run)
      } else {
        setStep(1)
      }
    }
    run()
  }

  isNumeric (obj) {
    return !isNaN(parseFloat(obj)) && isFinite(obj)
  }

  getThickness () {
    return this.isNumeric(this.thickness) ? this.thickness : this.size / 14
  }

  getValue () {
    return this.value
  }

  setValue (newValue) {
    if (this.animation) {
      this.animationStartValue = this.lastFrameValue
    }
    this.value = newValue
    this.draw()
  }

  destroy () {
    window.cancelAnimationFrame(this.circleRaf)
  }
}

export default CircleProgress
