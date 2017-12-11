const appTitle = document.title

document.addEventListener('visibilitychange', () => {
  const isHidden = document.hidden
  if (isHidden) {
    document.title = `😴 ${appTitle}`
  } else {
    document.title = appTitle
  }
})
