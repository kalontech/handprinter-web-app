import amplitude from 'amplitude-js'
import env from 'config/env'

const { REACT_APP_APLITUDE_API_KEY } = env

export const EVENT_TYPES = {
  USER_LOGIN: 'User login',
  USER_REGISTRATION: 'User registration',
}

const init = () => {
  amplitude.getInstance().init(REACT_APP_APLITUDE_API_KEY)
}

export const logEvent = (type, data) => {
  if (type) {
    amplitude.getInstance().logEvent(type, data)
  }
}

export const setUserId = email => {
  if (email) {
    amplitude.getInstance().setUserId(email)
  }
}

export default init
