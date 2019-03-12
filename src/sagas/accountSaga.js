import { call, put } from 'redux-saga/effects'

import { history } from 'appRouter'
import api from 'api'
import decodeError from 'utils/decodeError'
import { Creators } from 'redux/accountStore'
import { getBrandedConfig } from 'config/branded'

import { prepareUserProfile } from './helpers'

function* logIn({ email, password }) {
  try {
    const { token } = yield call(api.logIn, email, password)
    yield put(Creators.logInSuccess(token))
    yield call(prepareUserProfile)
    const brandedConfig = getBrandedConfig()
    yield call(
      history.push,
      brandedConfig ? '/pages/home' : '/account/dashboard',
    )
  } catch (error) {
    yield put(Creators.logInFailure(decodeError(error)))
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
    yield put(Creators.registerSuccess(token))
    yield call(prepareUserProfile)
    yield call(history.push, '/pages/our-vision')
  } catch (error) {
    yield put(Creators.registerFailure(decodeError(error)))
  }
}

function* resetPassword({ email, password }) {
  try {
    yield call(api.resetPasswordRequest, email)
    yield put(Creators.resetPasswordSuccess())
    yield call(history.push, '/account/check-your-email')
  } catch (error) {
    yield put(Creators.resetPasswordFailure(decodeError(error)))
  }
}

function* setNewPassword({ code, password }) {
  try {
    yield call(api.resetPasswordConfirm, code, password)
    yield put(Creators.setNewPasswordSuccess())
    yield call(history.push, '/account/login')
  } catch (error) {
    yield put(Creators.setNewPasswordFailure(decodeError(error)))
  }
}

export default {
  logIn,
  register,
  resetPassword,
  setNewPassword,
}
