/*
 * @ param numFrom [number]
 * @ param numTo [number]
 * @ param gap [number]
 * @ param duration [number]
 * @ param callback [function]
 */

class Counter {
  constructor (options) {
    let opts = {
      numFrom: 0,
      numTo: 0,
      gap: 1,
      duration: 30,
      callback: num => {}
    }
    for (let key in options) {
      opts[key] = options[key]
    }
    this.opts = opts
  }

  start () {
    const { numFrom } = this.opts
    this.current = numFrom
    this.eachTime()
  }

  eachTime () {
    let { opts, countTimer } = this
    let { numFrom, numTo, gap, duration, callback } = opts
    const isAdd = numFrom < numTo
    countTimer && clearTimeout(countTimer)
    let dist = numTo - this.current
    if (!isAdd) {
      dist = numFrom - this.current
    }
    if (dist < gap) {
      this.opts.gap = dist
      this.opts.duration = duration * 1.02
      this.eachTime()
    } else {
      countTimer = setTimeout(() => {
        if (numFrom === numTo) {
          clearTimeout(countTimer)
          return
        }
        isAdd ? (this.current += gap) : (this.current -= gap)
        callback(this.current)
        if (this.current !== numTo) {
          this.eachTime()
        }
        clearTimeout(countTimer)
      }, duration)
    }
  }

  pause () {
    clearTimeout(this.countTimer)
  }

  continue () {
    this.eachTime()
  }
}

export default Counter
