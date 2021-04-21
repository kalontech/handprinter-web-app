import { call, put } from 'redux-saga/effects'

import { history } from 'appRouter'
import decodeError from 'utils/decodeError'
import { Creators } from 'redux/accountStore'
import * as apiAuth from 'api/auth'

import { prepareUserProfile } from './helpers'
import { EVENT_TYPES, logEvent, setUserData } from '../amplitude'

function* logIn({ email, password, createOrganizationFlow }) {
  try {
    const res = yield call(apiAuth.logIn, email, password)
    const { token } = res
    yield put(Creators.logInSuccess(token))
    yield call(prepareUserProfile)
    if (createOrganizationFlow) {
      yield call(history.push, '/account/create-organization')
    } else {
      let to = '/account/dashboard'
      yield call(history.push, to)
    }
  } catch (error) {
    yield put(Creators.logInFailure(decodeError(error)))
  }
}

function* logInEmail({ email }) {
  try {
    yield call(apiAuth.logInEmail, email)
    yield put(Creators.logInEmailSuccess())
    yield call(history.push, '/account/check-your-email')
  } catch (error) {
    yield put(Creators.logInEmailFailure(decodeError(error)))
  }
}

function* logInCode({ code, createOrganizationFlow }) {
  try {
    const res = yield call(apiAuth.logInCode, code)
    const { token, user } = res
    setUserData(user.email, user.belongsToBrand)
    logEvent(EVENT_TYPES.USER_LOGIN)
    yield put(Creators.logInWithCodeSuccess(token))
    yield call(prepareUserProfile)
    if (createOrganizationFlow) {
      yield call(history.push, '/account/create-organization')
    } else {
      let to = '/account/dashboard'
      yield call(history.push, to)
    }
  } catch (error) {
    yield put(Creators.logInWithCodeFailure(decodeError(error)))
  }
}

function* register({
  email,
  password,
  fullName,
  country,
  invitationCode,
  belongsToBrand,
  organizationInviteCode,
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
      organizationInviteCode,
    )
    setUserData(email, belongsToBrand)
    logEvent(EVENT_TYPES.USER_REGISTRATION, { invitationCode })
    yield put(Creators.registerSuccess(token))
    yield call(prepareUserProfile)
    if (createOrganizationFlow) {
      yield call(history.push, '/account/create-organization')
    } else {
      yield call(history.push, '/account/dashboard')
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
  logInEmail,
  logInCode,
  register,
  resetPassword,
  setNewPassword,
}
