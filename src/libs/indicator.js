class Indicator {
  constructor () {
    this.init()
  }

  create () {
    const template = `
      <div class="app-indicator-wrapper">
        <span class="app-indicator-spin">
          <div class="app-spinner-snake"></div>
        </span>
        <div class="app-indicator-text"></div>
      </div>
      <div class="app-indicator-mask"></div>
    `
    let node = document.createElement('div')
    node.className = 'app-indicator'
    node.style.display = 'none'
    node.innerHTML = template
    document.body.appendChild(node)
    return node
  }

  init () {
    this.container = document.body.getElementsByClassName('app-indicator')[0]
    if (!this.container) {
      this.container = this.create()
    }
    this.text = this.container.getElementsByClassName('app-indicator-text')[0]
  }
  /*
   * @param [string] : text
   * @param [number] : timeout
   */
  open (params) {
    const isObject = Object.prototype.toString.call(params) === '[object Object]'
    let text = null
    let timeout = 30000
    if (isObject) {
      text = params.text || text
      timeout = params.timeout || timeout
    } else if (params) {
      text = params
    }
    if (text) {
      this.text.style.display = 'block'
      this.text.innerText = text
    } else {
      this.text.style.display = 'none'
    }
    this.container.style.display = 'block'
    this.hideTimer = setTimeout(() => {
      this.container.style.display = 'none'
      clearTimeout(this.hideTimer)
    }, timeout)
  }

  close () {
    this.hideTimer && clearTimeout(this.hideTimer)
    this.container.style.display = 'none'
  }
}

export default Indicator
