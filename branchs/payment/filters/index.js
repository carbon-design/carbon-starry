export const uppercase = str => str.toUpperCase()

export const trim = str => str.replace(/(^\s*)|(\s*$)/g, '')

export const levelFilter = str => {
  switch (str) {
    case '0':
      return '容易'

    case '1':
      return '中等'

    case '2':
      return '较难'

    default:
      return '未定义'
  }
}

const formatDate = t => {
  const time = new Date(t * 1)
  const year = time.getFullYear()
  const prefix = num => (num * 1 <= 9) ? (num = '0' + num) : num
  let month = prefix(time.getMonth() + 1)
  let day = prefix(time.getDate())
  let hour = prefix(time.getHours())
  let minute = prefix(time.getMinutes())
  let second = prefix(~~(t / 1000 % 60))
  return {
    hour,
    minute,
    second,
    year,
    month,
    day
  }
}

export const yyyymmdd = time => {
  const t = formatDate(time)
  return `${t.year}/${t.month}/${t.day}`
}

export const yyyymmddZh = time => {
  const t = formatDate(time)
  return `${t.year}年${t.month}月${t.day}日`
}

export const mmdd = time => {
  const t = formatDate(time)
  return `${t.month}/${t.day}`
}

export const mmddZh = time => {
  const t = formatDate(time)
  return `${t.month}月${t.day}日`
}

export const mm = time => {
  const t = formatDate(time)
  return t.month
}

export const dd = time => {
  const t = formatDate(time)
  return t.day
}

export const hhmm = time => {
  const t = formatDate(time)
  return `${t.hour}:${t.minute}`
}

export const hhmmZh = time => {
  const t = formatDate(time)
  return `${t.hour}时${t.minute}分`
}

export const hhmmss = time => {
  const t = formatDate(time)
  return `${hhmm(time)} ${t.second}'`
}

export const hhmmssZh = time => {
  const t = formatDate(time)
  return `${hhmmZh(time)} ${t.second}秒`
}

const formatMoney = (s, n, float) => {
  n = n > 0 && n <= 20 ? n : 2
  s = parseFloat((s + '').replace(/[^\d.-]/g, '')).toFixed(n) + ''
  let l = s.split('.')[0].split('').reverse()
  let r = float ? '.' + s.split('.')[1] : ''
  let t = ''
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
  }
  return t.split('').reverse().join('') + r
}

export const intMoney = str => formatMoney(str, null, false)
