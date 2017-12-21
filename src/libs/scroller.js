import Animate from './animate'

class Scroller {
  constructor (container) {
    this.destroy = this.destroy.bind(this)
    this.getValue = this.getValue.bind(this)

    this.$template = `
      <div class="scroller-component" data-role="component">
        <div class="scroller-mask" data-role="mask"></div>
        <div class="scroller-indicator" data-role="indicator"></div>
        <div class="scroller-content" data-role="content"></div>
      </div>`

    let params = {
      value: null,
      _prevValue: null,
      _isSingleTouch: false,
      _isTracking: false,
      _didDecelerationComplete: false,
      _isGesturing: false,
      _isDragging: false,
      _isDecelerating: false,
      _isAnimating: false,
      _clientTop: 0,
      _clientHeight: 0,
      _contentHeight: 0,
      _itemHeight: 0,
      _scrollTop: 0,
      _minScrollTop: 0,
      _maxScrollTop: 0,
      _scheduledTop: 0,
      _lastTouchTop: null,
      _lastTouchMove: null,
      _positions: null,
      _minDecelerationScrollTop: null,
      _maxDecelerationScrollTop: null,
      _decelerationVelocityY: null
    }

    for (let key in params) {
      this[key] = params[key]
    }

    this._container = this._getElement(container)
  }

  init (options) {
    options = options || {}

    this.options = {
      itemClass: 'scroller-item',
      onSelect () {},
      defaultValue: 0,
      data: []
    }

    for (let key in options) {
      if (options[key] !== undefined) {
        this.options[key] = options[key]
      }
    }

    let tempContainer = document.createElement('div')
    tempContainer.innerHTML = options.template || this.$template

    if (this._component) {
      this.destroy()
    }

    let component = this._component = tempContainer.querySelector('[data-role=component]')
    let content = this._content = component.querySelector('[data-role=content]')
    let indicator = component.querySelector('[data-role=indicator]')

    let data = this.options.data
    let html = ''
    if (data.length && data[0].constructor === Object) {
      data.forEach(row => {
        html += `<div class="${this.options.itemClass}" data-value="${row.value}">${row.name}</div>`
      })
    } else {
      data.forEach(val => {
        html += `<div class="${this.options.itemClass}" data-value="${val}">${val}</div>`
      })
    }
    content.innerHTML = html

    this._container.appendChild(component)

    this._itemHeight = parseInt(this._getComputedStyle(indicator, 'height'), 10)
    const setTransform = top => {
      content.style.webkitTransform = `translate3d(0, ${-top}px, 0)`
    }
    this._callback = options.callback || setTransform

    let rect = component.getBoundingClientRect()

    this._clientTop = (rect.top + component.clientTop) || 0

    this._setDimensions(component.clientHeight, content.offsetHeight)

    if (component.clientHeight === 0) {
      this._setDimensions(238, 204)
    }

    this.select(this.options.defaultValue, false)

    component.addEventListener('touchstart', e => {
      if (e.target.tagName.match(/input|textarea|select/i)) {
        return
      }
      e.preventDefault()
      this._doTouchStart(e.touches, e.timeStamp)
    }, false)

    component.addEventListener('touchmove', e => {
      this._doTouchMove(e.touches, e.timeStamp)
    }, false)

    component.addEventListener('touchend', e => {
      this._doTouchEnd(e.timeStamp)
    }, false)
  }

  _getElement (expr) {
    return (typeof expr === 'string') ? document.querySelector(expr) : expr
  }

  _getComputedStyle (el, key) {
    var computedStyle = window.getComputedStyle(el)
    return computedStyle[key] || ''
  }

  _easeOutCubic (pos) {
    return (Math.pow((pos - 1), 3) + 1)
  }

  _easeInOutCubic (pos) {
    if ((pos /= 0.5) < 1) {
      return 0.5 * Math.pow(pos, 3)
    }
    return 0.5 * (Math.pow((pos - 2), 3) + 2)
  }

  _setDimensions (ch, cnh) {
    this._clientHeight = ch
    this._contentHeight = cnh

    let totalItemCount = this.options.data.length
    let clientItemCount = Math.round(this._clientHeight / this._itemHeight)

    this._minScrollTop = -this._itemHeight * (clientItemCount / 2)
    this._maxScrollTop = this._minScrollTop + totalItemCount * this._itemHeight - 0.1
  }

  _selectItem (selectedItem) {
    let selectedItemClass = this.options.itemClass + '-selected'
    let lastSelectedElem = this._content.querySelector('.' + selectedItemClass)
    if (lastSelectedElem) {
      lastSelectedElem.classList.remove(selectedItemClass)
    }
    selectedItem.classList.add(selectedItemClass)

    if (this.value !== null) {
      this._prevValue = this.value
    }

    this.value = selectedItem.dataset.value
  }

  _publish (top, animationDuration) {
    let wasAnimating = this._isAnimating
    if (wasAnimating) {
      Animate.stop(wasAnimating)
      this._isAnimating = false
    }

    if (animationDuration) {
      this._scheduledTop = top

      let oldTop = this._scrollTop
      let diffTop = top - oldTop

      const step = (percent, now, render) => {
        this._scrollTop = oldTop + (diffTop * percent)
        if (this._callback) {
          this._callback(this._scrollTop)
        }
      }

      const verify = id => this._isAnimating === id

      const completed = (renderedFramesPerSecond, animationId, wasFinished) => {
        if (animationId === this._isAnimating) {
          this._isAnimating = false
        }
        if (this._didDecelerationComplete || wasFinished) {
          this._scrollingComplete()
        }
      }

      this._isAnimating = Animate.start(step, verify, completed, animationDuration, wasAnimating ? this._easeOutCubic : this._easeInOutCubic)
    } else {
      this._scheduledTop = this._scrollTop = top

      if (this._callback) {
        this._callback(top)
      }
    }
  }

  _scrollingComplete () {
    let index = Math.round((this._scrollTop - this._minScrollTop - this._itemHeight / 2) / this._itemHeight)

    this._selectItem(this._content.children[index])

    if (this._prevValue !== null && this._prevValue !== this.value) {
      this.options.onSelect(this.value)
    }
  }

  scrollTo (top, animate) {
    animate = (animate === undefined) ? true : animate

    if (this._isDecelerating) {
      Animate.stop(this._isDecelerating)
      this._isDecelerating = false
    }

    top = Math.round(top / this._itemHeight) * this._itemHeight
    top = Math.max(Math.min(this._maxScrollTop, top), this._minScrollTop)

    if (top === this._scrollTop || !animate) {
      this._publish(top)
      this._scrollingComplete()
      return
    }
    this._publish(top, 250)
  }

  selectByIndex (index, animate) {
    if (index < 0 || index > this._content.childElementCount - 1) {
      return
    }
    this._scrollTop = this._minScrollTop + index * this._itemHeight
    this.scrollTo(this._scrollTop, animate)
    this._selectItem(this._content.children[index])
  }

  select (value, animate) {
    let children = this._content.children
    for (let i = 0, len = children.length; i < len; i++) {
      if (children[i].dataset.value === String(value)) {
        this.selectByIndex(i, animate)
        return
      }
    }
    this.selectByIndex(0, animate)
  }

  _startDeceleration (timeStamp) {
    this._minDecelerationScrollTop = this._minScrollTop
    this._maxDecelerationScrollTop = this._maxScrollTop

    const step = (percent, now, render) => {
      this._stepThroughDeceleration(render)
    }

    let minVelocityToKeepDecelerating = 0.5

    const verify = () => {
      let shouldContinue = Math.abs(this._decelerationVelocityY) >= minVelocityToKeepDecelerating
      if (!shouldContinue) {
        this._didDecelerationComplete = true
      }
      return shouldContinue
    }

    const completed = (renderedFramesPerSecond, animationId, wasFinished) => {
      this._isDecelerating = false
      if (this._scrollTop <= this._minScrollTop || this._scrollTop >= this._maxScrollTop) {
        this.scrollTo(this._scrollTop)
        return
      }
      if (this._didDecelerationComplete) {
        this._scrollingComplete()
      }
    }

    this._isDecelerating = Animate.start(step, verify, completed)
  }

  _stepThroughDeceleration (render) {
    let scrollTop = this._scrollTop + this._decelerationVelocityY

    let scrollTopFixed = Math.max(Math.min(this._maxDecelerationScrollTop, scrollTop), this._minDecelerationScrollTop)
    if (scrollTopFixed !== scrollTop) {
      scrollTop = scrollTopFixed
      this._decelerationVelocityY = 0
    }

    if (Math.abs(this._decelerationVelocityY) <= 1) {
      if (Math.abs(scrollTop % this._itemHeight) < 1) {
        this._decelerationVelocityY = 0
      }
    } else {
      this._decelerationVelocityY *= 0.95
    }

    this._publish(scrollTop)
  }

  _doTouchStart (touches, timeStamp) {
    if (touches.length == null) {
      throw new Error('Invalid touch list: ' + touches)
    }
    if (timeStamp instanceof Date) {
      timeStamp = timeStamp.valueOf()
    }
    if (typeof timeStamp !== 'number') {
      throw new Error('Invalid timestamp value: ' + timeStamp)
    }

    this._interruptedAnimation = true

    if (this._isDecelerating) {
      Animate.stop(this._isDecelerating)
      this._isDecelerating = false
      this._interruptedAnimation = true
    }

    if (this._isAnimating) {
      Animate.stop(this._isAnimating)
      this._isAnimating = false
      this._interruptedAnimation = true
    }

    let currentTouchTop
    let isSingleTouch = touches.length === 1
    if (isSingleTouch) {
      currentTouchTop = touches[0].pageY
    } else {
      currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2
    }

    this._initialTouchTop = currentTouchTop
    this._lastTouchTop = currentTouchTop
    this._lastTouchMove = timeStamp
    this._lastScale = 1
    this._enableScrollY = !isSingleTouch
    this._isTracking = true
    this._didDecelerationComplete = false
    this._isDragging = !isSingleTouch
    this._isSingleTouch = isSingleTouch
    this._positions = []
  }

  _doTouchMove (touches, timeStamp, scale) {
    if (touches.length == null) {
      throw new Error('Invalid touch list: ' + touches)
    }

    if (timeStamp instanceof Date) {
      timeStamp = timeStamp.valueOf()
    }

    if (typeof timeStamp !== 'number') {
      throw new Error('Invalid timestamp value: ' + timeStamp)
    }

    if (!this._isTracking) {
      return
    }

    let currentTouchTop

    if (touches.length === 2) {
      currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2
    } else {
      currentTouchTop = touches[0].pageY
    }

    let positions = this._positions

    if (this._isDragging) {
      let moveY = currentTouchTop - this._lastTouchTop
      let scrollTop = this._scrollTop

      if (this._enableScrollY) {
        scrollTop -= moveY

        let minScrollTop = this._minScrollTop
        let maxScrollTop = this._maxScrollTop

        if (scrollTop > maxScrollTop || scrollTop < minScrollTop) {
          if (scrollTop > maxScrollTop) {
            scrollTop = maxScrollTop
          } else {
            scrollTop = minScrollTop
          }
        }
      }

      if (positions.length > 40) {
        positions.splice(0, 20)
      }

      positions.push(scrollTop, timeStamp)

      this._publish(scrollTop)
    } else {
      let minimumTrackingForScroll = 0
      let minimumTrackingForDrag = 5

      let distanceY = Math.abs(currentTouchTop - this._initialTouchTop)

      this._enableScrollY = distanceY >= minimumTrackingForScroll

      positions.push(this._scrollTop, timeStamp)

      this._isDragging = this._enableScrollY && (distanceY >= minimumTrackingForDrag)

      if (this._isDragging) {
        this._interruptedAnimation = false
      }
    }

    this._lastTouchTop = currentTouchTop
    this._lastTouchMove = timeStamp
    this._lastScale = scale
  }

  _doTouchEnd (timeStamp) {
    if (timeStamp instanceof Date) {
      timeStamp = timeStamp.valueOf()
    }
    if (typeof timeStamp !== 'number') {
      throw new Error('Invalid timestamp value: ' + timeStamp)
    }

    if (!this._isTracking) {
      return
    }

    this._isTracking = false

    if (this._isDragging) {
      this._isDragging = false

      if (this._isSingleTouch && (timeStamp - this._lastTouchMove) <= 100) {
        let positions = this._positions
        let endPos = positions.length - 1
        let startPos = endPos

        for (let i = endPos; i > 0 && positions[i] > (this._lastTouchMove - 100); i -= 2) {
          startPos = i
        }

        if (startPos !== endPos) {
          let timeOffset = positions[endPos] - positions[startPos]
          let movedTop = this._scrollTop - positions[startPos - 1]

          this._decelerationVelocityY = movedTop / timeOffset * (1000 / 60)

          let minVelocityToStartDeceleration = 4

          if (Math.abs(this._decelerationVelocityY) > minVelocityToStartDeceleration) {
            this._startDeceleration(timeStamp)
          }
        }
      }
    }

    if (!this._isDecelerating) {
      this.scrollTo(this._scrollTop)
    }

    this._positions.length = 0
  }

  getValue () {
    return this.value
  }

  destroy () {
    this._component.parentNode.removeChild(this._component)
  }
}

export default Scroller
