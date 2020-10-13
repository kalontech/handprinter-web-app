import { takeLatest, fork } from 'redux-saga/effects'

import { Types as AccountStoreTypes } from 'redux/accountStore'
import { Types as UserStoreTypes } from 'redux/userStore'

import accountSaga from './accountSaga'
import userSaga from './userSaga'
import startupSaga from './startupSaga'

function* rootSaga() {
  yield fork(startupSaga.startup)
  yield takeLatest(AccountStoreTypes.LOG_IN_REQUEST, accountSaga.logIn)
  yield takeLatest(
    AccountStoreTypes.LOG_IN_EMAIL_REQUEST,
    accountSaga.logInEmail,
  )
  yield takeLatest(
    AccountStoreTypes.LOG_IN_WITH_CODE_REQUEST,
    accountSaga.logInCode,
  )
  yield takeLatest(AccountStoreTypes.REGISTER_REQUEST, accountSaga.register)
  yield takeLatest(UserStoreTypes.GET_ME_REQUEST, userSaga.getMe)
  yield takeLatest(UserStoreTypes.UPDATE_ME_INFO_REQUEST, userSaga.updateMeInfo)
  yield takeLatest(
    UserStoreTypes.UPDATE_ME_PHOTO_REQUEST,
    userSaga.updateMePhoto,
  )
  yield takeLatest(
    UserStoreTypes.UPDATE_ME_PASSWORD_REQUEST,
    userSaga.updateMePassword,
  )
  yield takeLatest(
    AccountStoreTypes.RESET_PASSWORD_REQUEST,
    accountSaga.resetPassword,
  )
  yield takeLatest(
    AccountStoreTypes.SET_NEW_PASSWORD_REQUEST,
    accountSaga.setNewPassword,
  )
}

export default rootSaga
