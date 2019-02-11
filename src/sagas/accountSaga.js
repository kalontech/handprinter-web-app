import { call, put } from 'redux-saga/effects'

import { history } from 'appRouter'
import api from 'api'
import decodeError from 'utils/decodeError'
import { Types as AccountStoreTypes } from 'redux/accountStore'
import { getBrandedConfig } from 'config/branded'

import { prepareUserProfile } from './helpers'

function* logIn({ email, password }) {
  try {
    const { token } = yield call(api.logIn, email, password)
    yield put({ type: AccountStoreTypes.LOG_IN_SUCCESS, token })
    yield call(prepareUserProfile)
    const brandedConfig = getBrandedConfig()
    yield call(
      history.push,
      brandedConfig ? '/pages/home' : '/account/dashboard',
    )
  } catch (error) {
    yield put({
      type: AccountStoreTypes.LOG_IN_FAILURE,
      error: decodeError(error),
    })
  }
}

function* register({
  email,
  password,
  fullName,
  country,
  invitationCode,
  belongsToBrand,
}) {
  try {
    const { token } = yield call(
      api.register,
      email,
      password,
      fullName,
      country,
      invitationCode,
      belongsToBrand,
    )
    yield put({ type: AccountStoreTypes.REGISTER_SUCCESS, token })
    yield call(prepareUserProfile)
    yield call(history.push, '/pages/our-vision')
  } catch (error) {
    yield put({
      type: AccountStoreTypes.REGISTER_FAILURE,
      error: decodeError(error),
    })
  }
}

function* resetPassword({ email, password }) {
  try {
    yield call(api.resetPasswordRequest, email)
    yield put({ type: AccountStoreTypes.RESET_PASSWORD_SUCCESS })
    yield call(history.push, '/account/check-your-email')
  } catch (error) {
    yield put({
      type: AccountStoreTypes.RESET_PASSWORD_FAILURE,
      error: decodeError(error),
    })
  }
}

function* setNewPassword({ code, password }) {
  try {
    yield call(api.resetPasswordConfirm, code, password)
    yield put({ type: AccountStoreTypes.SET_NEW_PASSWORD_SUCCESS })
    yield call(history.push, '/account/login')
  } catch (error) {
    yield put({
      type: AccountStoreTypes.SET_NEW_PASSWORD_FAILURE,
      error: decodeError(error),
    })
  }
}

export default {
  logIn,
  register,
  resetPassword,
  setNewPassword,
}
