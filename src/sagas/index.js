import { takeEvery } from 'redux-saga/effects'

import accountSaga from './accountSaga'

function* rootSaga() {
  yield takeEvery('LOG_IN_REQUEST', accountSaga.logIn)
}

export default rootSaga
