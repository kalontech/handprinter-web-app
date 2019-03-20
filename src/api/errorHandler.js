import { logOut } from 'redux/accountStore'

const LOGOUT_CODES = {
  ERR_TOKEN_EXPIRED: 4,
  ERR_INVALID_AUTH_ALGORITHM: 5,
  ERR_INVALID_AUTH_HEADER: 6,
  ERR_USER_DEACTIVATED: 11,
}

export default function(error) {
  if (Object.values(LOGOUT_CODES).includes(error.code)) {
    logOut({ redirectUrl: '/account/login' })
  }

  throw error
}
