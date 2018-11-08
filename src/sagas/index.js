import { takeLatest, fork } from 'redux-saga/effects'

import accountSaga from './accountSaga'
import startupSaga from './startupSaga'

function* rootSaga() {
  yield fork(startupSaga.startup)
  yield takeLatest('LOG_IN_REQUEST', accountSaga.logIn)
}

export default rootSaga
