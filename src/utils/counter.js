/*
 * @ param numFrom [number]
 * @ param numTo [number]
 * @ param duration [number]
 * @ param callback [function]
 */

class Counter {
  constructor (options) {
    let opts = {
      numFrom: 0,
      numTo: 0,
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
    const { numFrom, numTo, duration, callback } = opts
    const isAdd = numFrom < numTo
    countTimer && clearTimeout(countTimer)
    countTimer = setTimeout(() => {
      if (numFrom === numTo) {
        clearTimeout(countTimer)
        return
      }
      isAdd ? this.current++ : this.current--
      callback(this.current)
      if (this.current !== numTo) {
        this.eachTime()
      }
      clearTimeout(countTimer)
    }, duration)
  }

  pause () {
    clearTimeout(this.countTimer)
  }

  continue () {
    this.eachTime()
  }
}

export default Counter
