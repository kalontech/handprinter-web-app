export default error => {
  const { code, payload = {} } = error

  if (typeof code === 'number') {
    // error code 100 - validation errors
    if (code === 100) {
      // Show to user huamable invitationCode error message
      if (error.problems.invitationCode) return 'app.errors.7'
      return Object.values(error.problems)[0]
    }

    return `app.errors.${code}${payload.isMultiple ? '.multiple' : ''}`
  }

  return 'app.errors.unknown'
}
