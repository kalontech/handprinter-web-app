import { takeLatest, fork } from 'redux-saga/effects'

import accountSaga from './accountSaga'
import startupSaga from './startupSaga'

function* rootSaga() {
  yield fork(startupSaga.startup)
  yield takeLatest('LOG_IN_REQUEST', accountSaga.logIn)
  yield takeLatest('REGISTER_REQUEST', accountSaga.register)
  yield takeLatest('RESET_PASSWORD_REQUEST', accountSaga.resetPassword)
  yield takeLatest('SET_NEW_PASSWORD_REQUEST', accountSaga.setNewPassword)
}

export default rootSaga
