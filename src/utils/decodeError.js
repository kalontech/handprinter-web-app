import get from 'lodash/get'
import isNumber from 'lodash/isNumber'

const decodeError = error => {
  const code = get(error, 'code')
  return isNumber(code) ? `app.errors.${code}` : 'app.errors.unknown'
}

export default decodeError
