import Scroller from './scroller'

class PopPicker {
  constructor (options) {
    options = options || {}
    
    this.options = {
      data: [],
      defaultValues: [],
      onInit () {},
      onConfirm () {},
      onCancel () {}
    }

    for (let key in options) {
      if (options[key] !== undefined) {
        this.options[key] = options[key]
      }
    }

    if (this.options.defaultValues.length === 0) {
      let defaultValues = []
      const data = this.options.data
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
      this._values = this.options.defaultValues
    }
    this._scrollSize = this.options.data.length
    this._root = document.body
  }

  _getChildsByParent (parent, tar) {
    return tar.filter(e => e.parent === parent)
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
      this._mask = this._createEl('dp-mask')
    }

    this._scrollerColums = []
    let scrollerRow = this._createEl('dp-row')
    for (let i = 0; i < this._scrollSize; i++){
      const colums = this._scrollerColums[i] = this._createEl('dp-cell')
      scrollerRow.appendChild(colums)
    }
    this._container.appendChild(scrollerRow)
    this._root.appendChild(this._container)
    this._root.appendChild(this._mask)
  }
  
  init () {
    this._createDOM()
    this.options.onInit(this._values)
  }
}


export default PopPicker