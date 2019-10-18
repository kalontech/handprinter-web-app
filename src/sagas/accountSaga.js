import { call, put } from 'redux-saga/effects'

import { history } from 'appRouter'
import decodeError from 'utils/decodeError'
import { Creators } from 'redux/accountStore'
import { getBrandedConfig } from 'config/branded'
import * as apiAuth from 'api/auth'

import { prepareUserProfile } from './helpers'

function* logIn({ email, password, createOrganizationFlow }) {
  try {
    const { token } = yield call(apiAuth.logIn, email, password)
    yield put(Creators.logInSuccess(token))
    yield call(prepareUserProfile)
    const brandedConfig = getBrandedConfig()
    if (createOrganizationFlow) {
      yield call(history.push, '/account/create-organization')
    } else {
      yield call(
        history.push,
        brandedConfig ? '/pages/home' : '/account/dashboard',
      )
    }
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
  siloSecureCode,
  createOrganizationFlow,
}) {
  try {
    const { token } = yield call(
      apiAuth.register,
      email,
      password,
      fullName,
      country,
      invitationCode,
      belongsToBrand,
      siloSecureCode,
    )
    yield put(Creators.registerSuccess(token))
    yield call(prepareUserProfile)
    if (createOrganizationFlow) {
      yield call(history.push, '/account/create-organization')
    } else {
      yield call(history.push, '/pages/our-vision')
    }
  } catch (error) {
    yield put(Creators.registerFailure(decodeError(error)))
  }
}

function* resetPassword({ email, password }) {
  try {
    yield call(apiAuth.resetPasswordRequest, email)
    yield put(Creators.resetPasswordSuccess())
    yield call(history.push, '/account/check-your-email')
  } catch (error) {
    yield put(Creators.resetPasswordFailure(decodeError(error)))
  }
}

function* setNewPassword({ code, password }) {
  try {
    yield call(apiAuth.resetPasswordConfirm, code, password)
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
