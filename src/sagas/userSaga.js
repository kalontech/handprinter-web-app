import { call, put, select } from 'redux-saga/effects'

import api from './../api'
import decodeError from './../utils/decodeError'
import { Types as UserStoreTypes } from '../redux/userStore'

function* getMe({ token }) {
  try {
    const { user } = yield call(api.getMe, token)
    yield put.resolve({ type: UserStoreTypes.GET_ME_SUCCESS, user })
  } catch (error) {
    yield put.resolve({
      type: UserStoreTypes.GET_ME_FAILURE,
      error: decodeError(error),
    })
  }
}

function* updateMeInfo({ data }) {
  try {
    const {
      account: { token },
    } = yield select()
    const { user } = yield call(api.updateMe, data, token)
    yield put.resolve({ type: UserStoreTypes.UPDATE_ME_INFO_SUCCESS, user })
  } catch (error) {
    yield put.resolve({
      type: UserStoreTypes.UPDATE_ME_INFO_FAILURE,
      error: decodeError(error),
    })
  }
}

function* updateMePhoto({ data }) {
  try {
    const {
      account: { token },
    } = yield select()
    const { user } = yield call(api.updateMePhoto, data, token)
    yield put.resolve({ type: UserStoreTypes.UPDATE_ME_PHOTO_SUCCESS, user })
  } catch (error) {
    yield put.resolve({
      type: UserStoreTypes.UPDATE_ME_PHOTO_FAILURE,
      error: decodeError(error),
    })
  }
}

function* updateMePassword({ data }) {
  try {
    const {
      account: { token },
    } = yield select()
    const { user } = yield call(api.updateMe, data, token)
    yield put.resolve({ type: UserStoreTypes.UPDATE_ME_PASSWORD_SUCCESS, user })
  } catch (error) {
    yield put.resolve({
      type: UserStoreTypes.UPDATE_ME_PASSWORD_FAILURE,
      error: decodeError(error),
    })
  }
}

export default {
  getMe,
  updateMeInfo,
  updateMePassword,
  updateMePhoto,
}
