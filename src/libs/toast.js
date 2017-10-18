export default (title, postion, delay) => {
  let node = document.createElement('div')
  node.className = 'app-toast'
  node.innerHTML = title
  if (postion === 'bottom') {
    node.className += ' position-bottom'
  } else {
    node.className += ' position-middle'
  }
  document.body.appendChild(node)
  let timershowToast = setTimeout(() => {
    node.style.opacity = 1
    clearTimeout(timershowToast)
  }, 30)
  let timerClearDOM = setTimeout(() => {
    node.style.opacity = 0
    node.addEventListener('transitionend', () => {
      document.body.removeChild(node)
    })
    clearTimeout(timerClearDOM)
  }, delay || 3000)
}
