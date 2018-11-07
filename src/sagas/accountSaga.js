import { delay } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

function* logIn(action) {
  try {
    yield call(delay, 500)
    yield put({ type: 'LOG_IN_SUCCESS', token: 'qwerty123' })
  } catch (error) {
    yield put({ type: 'LOG_IN_FAILURE', error })
  }
}

export default {
  logIn,
}
