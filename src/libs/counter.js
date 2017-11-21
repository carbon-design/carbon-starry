/*
 * @ Author Aford
 * @ Date: 2017/09/30
 */

class Counter {
  constructor (options) {
    let opts = {
      numFrom: 0,
      numTo: 0,
      duration: 600,
      callback: num => {}
    }
    for (let key in options) {
      opts[key] = options[key]
    }
    this.opts = opts
    this.eachTime = this.eachTime.bind(this)
  }

  start () {
    const { numFrom } = this.opts
    this.current = numFrom
    this.startTime = Date.now()
    this.eachTime()
  }

  eachTime () {
    const { numFrom, numTo, duration, callback } = this.opts
    const gapTime = Date.now() - this.startTime
    const isAdd = numFrom < numTo
    const dist = Math.abs(numFrom - numTo)
    const frame = duration / 1000 * 60
    const gap = ~~(dist / frame) || 1
    if (isAdd) {
      if (numTo - this.current < 2 * gap) {
        this.current = numTo
      } else {
        this.current += gap
      }
    } else {
      if (this.current - numTo < 2 * gap) {
        this.current = numTo
      } else {
        this.current -= gap
      }
    }
    callback(this.current)
    if (this.current !== numTo && gapTime !== duration) {
      this.countRaf = window.requestAnimationFrame(this.eachTime)
    }
  }

  pause () {
    window.cancelAnimationFrame(this.countRaf)
  }

  continue () {
    this.eachTime()
  }

  destroy () {
    this.current = 0
    window.cancelAnimationFrame(this.countRaf)
  }
}

export default Counter
