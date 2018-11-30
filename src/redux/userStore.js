import { createActions, createReducer } from 'reduxsauce'

export const INITIAL_STATE = {
  isGettingMe: false,
  isUpdatingMeInfo: false,
  isUpdatingMePassword: false,
  isUpdatingMePhoto: false,
  updateMePasswordError: null,
  updateMePhotoError: null,
  updateMeInfoError: null,
  getMeError: null,
  data: null,
}

export const { Types, Creators } = createActions({
  getMeRequest: ['token'],
  getMeSuccess: ['user'],
  getMeFailure: ['error'],
  updateMeInfoRequest: ['data', 'token'],
  updateMeInfoSuccess: ['user'],
  updateMeInfoFailure: ['error'],
  updateMePasswordRequest: ['data', 'token'],
  updateMePasswordSuccess: ['user'],
  updateMePasswordFailure: ['error'],
  updateMePhotoRequest: ['data', 'token'],
  updateMePhotoSuccess: ['user'],
  updateMePhotoFailure: ['error'],
  setUser: ['user'],
})

export const getMeRequest = (state = INITIAL_STATE, action) => ({
  ...state,
  getMeError: null,
  isGettingMe: true,
})

export const getMeSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  isGettingMe: false,
  getMeError: null,
  data: action.user,
})

export const getMeFailure = (state = INITIAL_STATE, action) => ({
  ...state,
  getMeError: action.error,
  token: null,
})

export const updateMeInfoRequest = (state = INITIAL_STATE, action) => ({
  ...state,
  updateMeInfoError: null,
  isUpdatingMeInfo: true,
})

export const updateMeInfoSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  isUpdatingMeInfo: false,
  updateMeInfoError: null,
  data: action.user,
})

export const updateMeInfoFailure = (state = INITIAL_STATE, action) => ({
  ...state,
  isUpdatingMeInfo: false,
  updateMeInfoError: action.error,
})

export const updateMePhotoRequest = (state = INITIAL_STATE, action) => ({
  ...state,
  isUpdatingMePhoto: true,
  updateMePhotoError: null,
})

export const updateMePhotoSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  isUpdatingMePhoto: false,
  updateMePhotoError: null,
  data: action.user,
})

export const updateMePhotoFailure = (state = INITIAL_STATE, action) => ({
  ...state,
  isUpdatingMePhoto: false,
  updateMePhotoError: action.error,
})

export const updateMePasswordRequest = (state = INITIAL_STATE, action) => ({
  ...state,
  isUpdatingMePassword: true,
  updateMePasswordError: null,
})

export const updateMePasswordSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  isUpdatingMePassword: false,
  updateMePasswordError: null,
  data: action.user,
})

export const updateMePasswordFailure = (state = INITIAL_STATE, action) => ({
  ...state,
  isUpdatingMePassword: false,
  updateMePasswordError: action.error,
})

export const setUser = (state = INITIAL_STATE, action) => ({
  ...state,
  data: action.user,
})

export const HANDLERS = {
  [Types.GET_ME_REQUEST]: getMeRequest,
  [Types.GET_ME_SUCCESS]: getMeSuccess,
  [Types.GET_ME_FAILURE]: getMeFailure,
  [Types.UPDATE_ME_INFO_REQUEST]: updateMeInfoRequest,
  [Types.UPDATE_ME_INFO_SUCCESS]: updateMeInfoSuccess,
  [Types.UPDATE_ME_INFO_FAILURE]: updateMeInfoFailure,
  [Types.UPDATE_ME_PASSWORD_REQUEST]: updateMePasswordRequest,
  [Types.UPDATE_ME_PASSWORD_SUCCESS]: updateMePasswordSuccess,
  [Types.UPDATE_ME_PASSWORD_FAILURE]: updateMePasswordFailure,
  [Types.UPDATE_ME_PHOTO_REQUEST]: updateMePhotoRequest,
  [Types.UPDATE_ME_PHOTO_SUCCESS]: updateMePhotoSuccess,
  [Types.UPDATE_ME_PHOTO_FAILURE]: updateMePhotoFailure,
  [Types.SET_USER]: setUser,
}

export default createReducer(INITIAL_STATE, HANDLERS)
