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
