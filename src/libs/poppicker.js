import Scroller from './scroller'

class PopPicker {
  constructor (options) {
    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
    this.destroy = this.destroy.bind(this)

    options = options || {}

    this.options = {
      data: [],
      defaultValues: null,
      onSelect () {},
      onshow () {},
      onConfirm () {},
      onCancel () {}
    }

    for (let key in options) {
      if (options[key] !== undefined) {
        this.options[key] = options[key]
      }
    }

    if (Object.prototype.toString.call(this.options.data[0]) === '[object Object]') {
      this.multiMode = false
    } else {
      this.multiMode = true
    }

    this.options.data = this._object2array(this.options.data)

    const data = this.options.data

    if (!this.options.defaultValues) {
      let defaultValues = []
      data.forEach((e, i) => {
        if (i === 0) {
          defaultValues.push(e[0])
        } else {
          let group = this._getChildsByParent(defaultValues[i - 1].value, e)
          defaultValues.push(group[0])
        }
      })
      this._values = defaultValues
    } else {
      let defaultValues = this._object2array(this.options.defaultValues)
      this._values = []
      for (let i = 0; i < data.length; i++) {
        let defVal = defaultValues[i]
        if (defVal) {
          this._values[i] = this._getChildsByValue(defVal, data[i])[0]
        } else {
          this._values[i] = this._getChildsByParent(this._values[i - 1].value, data[i])[0]
        }
      }
    }
    this._scrollSize = data.length
    this._root = document.body
    this._init()
  }

  _object2array (obj) {
    return this.multiMode ? obj : [obj]
  }

  _getChildsByParent (parent, tar) {
    let result = tar.filter(e => String(e.parent) === String(parent))
    let empty = [{
      name: '',
      value: null
    }]
    return result.length !== 0 ? result : empty
  }

  _getChildsByValue (value, tar) {
    let result = tar.filter(e => String(e.value) === String(value))
    let empty = [{
      name: '',
      value: null
    }]
    return result.length !== 0 ? result : empty
  }

  _createEl (classname, html) {
    var el = document.createElement('div')
    if (classname) {
      el.className = classname
    }
    if (html) {
      el.innerHTML = html
    }
    return el
  }

  _removeEl (el) {
    el && el.parentNode.removeChild(el)
  }

  _createDOM () {
    this._container = this._createEl('dp-container')
    this._okBtn = this._createEl('dp-item dp-right', '确定')
    this._cancelBtn = this._createEl('dp-item dp-left', '取消')
    let header = this._createEl('dp-header')
    let center = this._createEl('dp-item dp-center')

    header.appendChild(this._cancelBtn)
    header.appendChild(center)
    header.appendChild(this._okBtn)
    this._container.appendChild(header)

    if (!this._mask) {
      let hasMask = document.getElementsByClassName('dp-mask')[0]
      this._mask = hasMask || this._createEl('dp-mask')
    }

    this._scrollerColums = []
    let scrollerRow = this._createEl('dp-row')
    for (let i = 0; i < this._scrollSize; i++) {
      const colums = this._scrollerColums[i] = this._createEl('dp-cell')
      scrollerRow.appendChild(colums)
    }
    this._container.appendChild(scrollerRow)
    this._root.appendChild(this._container)
    this._root.appendChild(this._mask)
  }

  _getSelectGroup () {
    const data = this.options.data
    const values = this._values
    this._selectGroup = []
    if (this.multiMode) {
      values.forEach((e, i) => {
        if (i === 0) {
          this._selectGroup.push(data[i])
        } else {
          let parent = values[i - 1].value
          let currentGroup = this._getChildsByParent(parent, data[i])
          this._selectGroup.push(currentGroup)
        }
      })
    } else {
      this._selectGroup.push(data[0])
    }
    this._initScroller(0)
  }

  _initScroller (startIndex) {
    const _selectGroup = this._selectGroup
    _selectGroup.forEach((e, i) => {
      if (i >= startIndex) {
        this._scrollers[i].init({
          data: e,
          defaultValue: this._values[i].value,
          onSelect: val => {
            let vals = this._getChildsByValue(val, e)[0]
            if (this.multiMode) {
              this._getFullValues(vals, i)
              this._initScroller(i + 1)
              this.options.onSelect(this._arrayFilter(this._values))
            } else {
              this.options.onSelect(vals)
              this._values[i] = vals
            }
          }
        })
      }
    })
  }

  _getFullValues (vals, colIndex) {
    const data = this.options.data
    let nextIndex = colIndex + 1
    this._values[colIndex] = vals
    if (nextIndex < this._scrollSize) {
      let nextGroup = this._selectGroup[nextIndex] = this._getChildsByParent(vals.value, data[nextIndex])
      let nextVal = nextGroup[0]
      this._getFullValues(nextVal, nextIndex)
    }
  }

  _installScroller () {
    this._scrollers = []
    this._scrollerColums.forEach((item, i) => {
      const scroller = new Scroller(item)
      this._scrollers.push(scroller)
    })
    this._getSelectGroup()
  }

  _bindEventHandle () {
    this._cancelBtn.addEventListener('click', () => {
      this.options.onCancel()
      this.hide()
    }, false)

    this._mask.addEventListener('click', () => {
      this.options.onCancel()
      this.hide()
    }, false)

    this._okBtn.addEventListener('click', () => {
      if (this.multiMode) {
        this.options.onConfirm(this._arrayFilter(this._values))
      } else {
        this.options.onConfirm(this._values[0])
      }
      this.hide()
    }, false)
  }

  _later (fn, delay) {
    this._timer = setTimeout(() => {
      fn()
      clearTimeout(this._timer)
    }, delay)
  }

  _arrayFilter (arr) {
    return arr.filter(e => e)
  }

  _init () {
    this._createDOM()
    this._installScroller()
    this._bindEventHandle()
  }

  show () {
    this._container.classList.add('show')
    this._mask.classList.add('show')
    if (this.multiMode) {
      this.options.onShow(this._arrayFilter(this._values))
    } else {
      this.options.onShow(this._values[0])
    }
  }

  hide () {
    let $con = this._container.classList
    let $mask = this._mask.classList
    $con.remove('show')
    $mask.remove('show')
    $con.add('leave')
    $mask.add('leave')
    this._later(() => {
      $con.remove('leave')
      $mask.remove('leave')
    }, 300)
  }

  destroy () {
    this._container && this._root.removeChild(this._container)
    this._mask && this._root.removeChild(this._mask)
  }
}

export default PopPicker
