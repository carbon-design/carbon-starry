/*
 * @ Author Aford
 * @ Date: 2017/11/22
 */

export default {
  initImage (img) {
    return new Promise((resolve, reject) => {
      img.onload = () => {
        resolve()
      }
      img.onerror = error => {
        reject(error)
      }
    })
  },
  drawImage (img, width, height, isRemove) {
    if (typeof img !== 'object') {
      img = document.querySelector(img)
    }
    const parentEl = img.parentNode
    const canvas = document.createElement('canvas')
    canvas.width = width || img.naturalWidth
    canvas.height = height || img.naturalHeight
    parentEl.insertBefore(canvas, img.nextSibling)
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)
    isRemove
      ? parentEl.removeChild(img)
      : img.style.display = 'none'
    return canvas
  },
  invert (canvas) {
    const ctx = canvas.getContext('2d')
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 225 - data[i]
      data[i + 1] = 225 - data[i + 1]
      data[i + 2] = 225 - data[i + 2]
    }
    ctx.putImageData(imageData, 0, 0)
  },
  grayscale (canvas) {
    const ctx = canvas.getContext('2d')
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
      let avg = (data[i] + data[i + 1] + data[i + 2]) / 3
      data[i] = avg
      data[i + 1] = avg
      data[i + 2] = avg
    }
    ctx.putImageData(imageData, 0, 0)
  },
  colorFilter (canvas, color) {
    const ctx = canvas.getContext('2d')
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
      data[i] = color === 'red' ? data[i] : 0
      data[i + 1] = color === 'green' ? data[i + 1] : 0
      data[i + 2] = color === 'blue' ? data[i + 2] : 0
    }
    ctx.putImageData(imageData, 0, 0)
  }
}
