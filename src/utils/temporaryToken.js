const createTemporaryToken = () => {
  window.localStorage.setItem('temporaryToken', Math.random().toString(36))
}

export const getTemporaryToken = () => {
  let temporaryToken = window.localStorage.getItem('temporaryToken')
  if (!temporaryToken) {
    createTemporaryToken()
    return getTemporaryToken()
  }
  return temporaryToken
}
