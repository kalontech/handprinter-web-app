import { put, select, call } from 'redux-saga/effects'
import has from 'lodash/has'

import env from 'config/env'
import * as apiUsers from 'api/user'
import { Creators as UserStoreCreators } from 'redux/userStore'
import { logOut } from 'redux/accountStore'
import { getBrandedHostnamePrefix } from 'config/branded'

const { REACT_APP_WEB_APP_BASE_HOST: host } = env

export function* prepareUserProfile() {
  const { account } = yield select()

  if (account.token) {
    try {
      const { user } = yield call(apiUsers.getMe)
      if (user) {
        const { pathname, protocol } = window.location
        if (
          has(user, 'belongsToBrand') &&
          user.belongsToBrand !== getBrandedHostnamePrefix()
        ) {
          window.location.replace(
            user.belongsToBrand === null
              ? `${protocol}//${host}${pathname}`
              : `${protocol}//${user.belongsToBrand}.${host}${pathname}`,
          )
        }
        yield put.resolve(UserStoreCreators.setUser(user))
      } else {
        logOut({ hard: true })
      }
    } catch (error) {
      logOut({ hard: true })
    }
  }
}
