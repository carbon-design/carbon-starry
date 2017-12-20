import Scroller from './scroller'
import formater from './format'

class DatetimePicker {
  constructor (options) {
    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
    this.destroy = this.destroy.bind(this)
    this.confirm = this.confirm.bind(this)
    this.getValue = this.getValue.bind(this)

    options = options || {}

    const $template = `
      <div class="dp-container">
        <div class="dp-header">
          <div class="dp-item dp-left" data-role="cancel">cancel</div>
          <div class="dp-item dp-center"></div>
          <div class="dp-item dp-right" data-role="confirm">ok</div>
        </div>
        <div class="dp-content">
          <div class="dp-item" data-role="year"></div>
          <div class="dp-item" data-role="month"></div>
          <div class="dp-item" data-role="day"></div>
          <div class="dp-item" data-role="hour"></div>
          <div class="dp-item" data-role="minute"></div>
        </div>
      </div>`

    const $maskTemplate = '<div class="dp-mask"></div>'

    const nowtime = new Date()
    this.options = {
      template: $template,
      maskTemplate: $maskTemplate,
      output: null,
      currentYear: nowtime.getFullYear(),
      currentMonth: nowtime.getMonth() + 1,
      minYear: 2000,
      maxYear: 2030,
      yearRow: '{value}年',
      monthRow: '{value}月',
      dayRow: '{value}日',
      hourRow: '{value}点',
      minuteRow: '{value}分',
      format: 'YYYY-MM-DD',
      value: nowtime.getFullYear() + '-' + (nowtime.getMonth() + 1) + '-' + nowtime.getDate(),
      onSelect () {},
      onConfirm () {},
      onShow () {},
      onHide () {},
      confirmText: '确定',
      cancelText: '取消'
    }

    for (let key in options) {
      if (options[key] !== undefined) {
        this.options[key] = options[key]
      }
    }

    this.value = this.options.value || ''

    this._SHOW_ANIMATION_TIME = 100
    this.TYPE_MAP = {
      year: ['YYYY'],
      month: ['MM', 'M'],
      day: ['DD', 'D'],
      hour: ['HH', 'H'],
      minute: ['II', 'I']
    }

    this._initMask()
  }

  _later (fn, delay) {
    this._timer = setTimeout(() => {
      fn()
      clearTimeout(this._timer)
    }, delay)
  }

  _toElement (html) {
    let tempContainer = document.createElement('div')
    tempContainer.innerHTML = html
    return tempContainer.firstElementChild
  }

  _getComputedStyle (el, key) {
    let computedStyle = window.getComputedStyle(el)
    return computedStyle[key] || ''
  }

  _trimZero (val) {
    val = String(val)
    val = val ? parseFloat(val.replace(/^0+/g, '')) : ''
    val = val || 0
    val = val + ''
    return val
  }

  _addZero (val) {
    val = String(val)
    return val.length < 2 ? '0' + val : val
  }

  _isLeapYear (year) {
    return (year % 100 !== 0 && year % 4 === 0) || year % 400 === 0
  }

  _getMaxDay (year, month) {
    year = parseFloat(year)
    month = parseFloat(month)
    if (month === 2) {
      return this._isLeapYear(year) ? 29 : 28
    }
    return [4, 6, 9, 11].indexOf(month) >= 0 ? 30 : 31
  }

  _parseRow (tmpl, value) {
    return tmpl.replace(/\{value\}/g, value)
  }

  _parseDate (format, value) {
    let formatParts = format.split(/[^A-Z]+/)
    let valueParts = value.split(/\D+/)
    if (formatParts.length !== valueParts.length) {
      let date = formater(new Date(), format.toLowerCase())
      valueParts = date.split(/\D+/)
    }

    let result = {}

    for (let i = 0; i < formatParts.length; i++) {
      if (formatParts[i]) {
        result[formatParts[i]] = valueParts[i]
      }
    }
    return result
  }

  _each (obj, fn) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (fn.call(obj[key], key, obj[key]) === false) {
          break
        }
      }
    }
  }

  _getElement (expr) {
    return (typeof expr === 'string') ? document.querySelector(expr) : expr
  }

  _removeElement (el) {
    el && el.parentNode.removeChild(el)
  }

  _renderScroller (el, data, value, fn) {
    const scroller = new Scroller(el)
    scroller.init({
      data: data,
      defaultValue: value,
      onSelect: fn
    })
    return scroller
  }

  _initMask () {
    if (!this._mask) {
      this._mask = this._toElement(this.options.maskTemplate)
    }
    this._root = document.body
    this._root.appendChild(this._mask)
  }

  _find (selector) {
    return this._container.querySelector(selector)
  }

  _select (type, value) {
    this[type + 'Scroller'].select(value, false)
  }

  _makeData (type, year, month) {
    let opts = this.options
    let valueMap = this.valueMap
    let list = this.TYPE_MAP[type]
    let data = []
    let min
    let max
    if (type === 'year') {
      min = opts.minYear
      max = opts.maxYear
    } else if (type === 'month') {
      min = 1
      max = 12
    } else if (type === 'day') {
      min = 1
      max = this._getMaxDay(year, month)
    } else if (type === 'hour') {
      min = 0
      max = 23
    } else if (type === 'minute') {
      min = 0
      max = 59
    }

    for (let i = min; i <= max; i++) {
      let name
      if (type === 'year') {
        name = this._parseRow(opts.yearRow, i)
      } else {
        let val = valueMap[list[0]] ? this._addZero(i) : i
        name = this._parseRow(opts[type + 'Row'], val)
      }
      data.push({
        name: name,
        value: i
      })
    }
    return data
  }

  _setDayScroller (year, month, day) {
    let maxDay = this._getMaxDay(year, month)
    if (day > maxDay) {
      day = maxDay
    }
    this.dayScroller.destroy()
    let div = this._find('[data-role=day]')
    this.dayScroller = this._renderScroller(div, this._makeData('day', year, month), day, currentValue => {
      this.options.onSelect.call(this, 'day', currentValue)
    })
  }

  _bindEventHandle () {
    this._cancelBtn.addEventListener('click', e => {
      e.preventDefault()
      this.hide()
    }, false)

    this._mask.addEventListener('click', e => {
      e.preventDefault()
      this.hide()
    }, false)

    this._confirmBtn.addEventListener('click', e => {
      e.preventDefault()
      this.confirm()
    }, false)
  }

  show (value) {
    value = value || this.value
    const opts = this.options
    let valueMap = this.valueMap = this._parseDate(opts.format, value || opts.value)
    let newValueMap = {}

    this._each(this.TYPE_MAP, (type, list) => {
      newValueMap[type] = list.length === 1 ? valueMap[list[0]] : (valueMap[list[0]] || valueMap[list[1]])
    })

    if (this._container) {
      this._container.classList.add('show')

      this._each(this.TYPE_MAP, type => {
        this[type + 'Scroller'] && this[type + 'Scroller'].select(this._trimZero(newValueMap[type]), false)
      })
    } else {
      let $container = this._container = this._toElement(opts.template)
      this._root.appendChild($container)
      $container.classList.add('show')

      this._each(this.TYPE_MAP, type => {
        let div = this._find(`[data-role=${type}]`)
        if (newValueMap[type] === undefined) {
          this._removeElement(div)
          return
        }

        let data
        if (type === 'day') {
          data = this._makeData(type, this._trimZero(newValueMap.year), this._trimZero(newValueMap.month))
        } else {
          data = this._makeData(type)
        }

        this[type + 'Scroller'] = this._renderScroller(div, data, this._trimZero(newValueMap[type]), currentValue => {
          opts.onSelect.call(this, type, currentValue)
          if (!this.dayScroller) {
            return
          }
          if (type === 'year') {
            let currentMonth = this.monthScroller
              ? this.monthScroller.value
              : opts.currentMonth

            if (currentMonth === 2) {
              let currentDay = this.dayScroller.value
              this._setDayScroller(currentValue, currentMonth, currentDay)
            }
          } else if (type === 'month') {
            let currentYear = this.yearScroller ? this.yearScroller.value : opts.currentYear
            let currentDay = this.dayScroller.value
            this._setDayScroller(currentYear, currentValue, currentDay)
          }
        })
      })

      if (!this._renderText) {
        const confirmText = this.options.confirmText
        const cancelText = this.options.cancelText
        if (confirmText) {
          this._confirmBtn = this._find('[data-role=confirm]')
          this._confirmBtn.innerHTML = confirmText
        }
        if (cancelText) {
          this._cancelBtn = this._find('[data-role=cancel]')
          this._cancelBtn.innerHTML = cancelText
        }
        this._renderText = true
      }

      this.show(value)

      this._bindEventHandle()
    }

    this._mask.classList.add('show')
    this.options.onShow()
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
    this.options.onHide()
  }

  getValue () {
    const options = this.options
    let value = options.format

    const formatValue = (scroller, expr1, expr2) => {
      if (scroller) {
        let val = scroller.value
        if (expr1) {
          value = value.replace(new RegExp(expr1, 'g'), this._addZero(val))
        }
        if (expr2) {
          value = value.replace(new RegExp(expr2, 'g'), this._trimZero(val))
        }
      }
    }

    this._each(this.TYPE_MAP, (key, list) => {
      formatValue(this[key + 'Scroller'], list[0], list[1])
    })

    return value
  }

  confirm () {
    let value = this.getValue()

    this.value = value

    this.options.onConfirm(value)

    this.hide()
  }

  destroy () {
    this._container && this._root.removeChild(this._container)
    this._mask && this._root.removeChild(this._mask)
  }
}

export default DatetimePicker
