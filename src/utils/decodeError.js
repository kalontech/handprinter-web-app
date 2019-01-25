import get from 'lodash/get'
import isNumber from 'lodash/isNumber'

export default error => {
  const code = get(error, 'code')
  const isMultiple = get(error, 'payload.isMultiple')

  if (isNumber(code)) {
    /*
     *  error code 100 - validation errors
     */
    if (code === 100) {
      // Show to user huamable invitationCode error message
      if (error.problems.invitationCode) return 'app.errors.7'
      return Object.values(error.problems)[0]
    }

    return `app.errors.${code}${isMultiple ? '.multiple' : ''}`
  }

  return 'app.errors.unknown'
}
