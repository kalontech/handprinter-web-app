import { call, put } from 'redux-saga/effects'

import { history } from './../appRouter'
import api from './../api'
import decodeError from './../utils/decodeError'

function* logIn({ email, password }) {
  try {
    const { token } = yield call(api.logIn, email, password)
    yield put({ type: 'LOG_IN_SUCCESS', token })
    yield call(history.push, '/account/dashboard')
  } catch (error) {
    yield put({ type: 'LOG_IN_FAILURE', error: decodeError(error) })
  }
}

function* register({ email, password, fullName, country, invitationCode }) {
  try {
    const { token } = yield call(
      api.register,
      email,
      password,
      fullName,
      country,
      invitationCode,
    )
    yield put({ type: 'REGISTER_SUCCESS', token })
    yield call(history.push, '/account/dashboard')
  } catch (error) {
    yield put({ type: 'REGISTER_FAILURE', error: decodeError(error) })
  }
}

export default {
  logIn,
  register,
}
