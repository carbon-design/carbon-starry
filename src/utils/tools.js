export const waiter = time => {
  return new Promise((resolve, reject) => {
    const tempTimer = setTimeout(() => {
      clearTimeout(tempTimer)
      resolve()
    }, time)
  })
}
