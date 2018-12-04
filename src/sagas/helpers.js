import { put, select, call } from 'redux-saga/effects'

import api from './../api'
import { Creators as UserStoreCreators } from './../redux/userStore'
import { Creators as AccountStoreCreators } from './../redux/accountStore'
import { history } from './../appRouter'

export function* prepareUserProfile() {
  const {
    account: { token },
  } = yield select()
  if (token) {
    try {
      const { user } = yield call(api.getMe, token)
      if (user) {
        yield put.resolve(UserStoreCreators.setUser(user))
      } else {
        yield put.resolve(AccountStoreCreators.logOut())
      }
    } catch (error) {
      yield put.resolve(AccountStoreCreators.logOut())
      yield call(history.push, '/account/login')
    }
  }
}
