(() => {
  let lastTime = 0
  let vendors = ['ms', 'moz', 'webkit', 'o']
  for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame']
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (callback, element) => {
      let currTime = new Date().getTime()
      let timeToCall = Math.max(0, 16 - (currTime - lastTime))
      lastTime = currTime + timeToCall
      let id = setTimeout(() => {
        callback(lastTime)
      }, timeToCall)
      return id
    }
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = id => {
      clearTimeout(id)
    }
  }
})()
