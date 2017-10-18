let running = {}
let counter = 1
let desiredFrames = 60
let millisecondsPerSecond = 1000

export default {
  requestAnimationFrame: (() => {
    let requestFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
    return (callback, root) => {
      requestFrame(callback, root)
    }
  })(),

  stop (id) {
    let cleared = running[id] != null
    if (cleared) {
      running[id] = null
    }
    return cleared
  },

  isRunning (id) {
    return running[id] != null
  },

  start (stepCallback, verifyCallback, completedCallback, duration, easingMethod, root) {
    let start = Date.now()
    let lastFrame = start
    let percent = 0
    let dropCounter = 0
    let id = counter++

    if (!root) {
      root = document.body
    }

    if (id % 20 === 0) {
      let newRunning = {}
      for (let usedId in running) {
        newRunning[usedId] = true
      }
      running = newRunning
    }

    const step = virtual => {
      let render = virtual !== true
      let now = Date.now()

      if (!running[id] || (verifyCallback && !verifyCallback(id))) {
        running[id] = null
        completedCallback && completedCallback(desiredFrames - (dropCounter / ((now - start) / millisecondsPerSecond)), id, false)
        return
      }

      if (render) {
        let droppedFrames = Math.round((now - lastFrame) / (millisecondsPerSecond / desiredFrames)) - 1
        for (let j = 0; j < Math.min(droppedFrames, 4); j++) {
          step(true)
          dropCounter++
        }
      }

      if (duration) {
        percent = (now - start) / duration
        if (percent > 1) {
          percent = 1
        }
      }

      let value = easingMethod ? easingMethod(percent) : percent
      if ((stepCallback(value, now, render) === false || percent === 1) && render) {
        running[id] = null
        completedCallback && completedCallback(desiredFrames - (dropCounter / ((now - start) / millisecondsPerSecond)), id, percent === 1 || duration == null)
      } else if (render) {
        lastFrame = now
        this.requestAnimationFrame(step, root)
      }
    }

    running[id] = true
    this.requestAnimationFrame(step, root)
    return id
  }
}
