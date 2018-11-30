import { createActions, createReducer } from 'reduxsauce'

export const INITIAL_STATE = {
  isLoggingIn: false,
  isRegistering: false,
  logInError: null,
  registerError: null,
  resetPasswordError: null,
  resettingPassword: false,
  setNewPasswordError: null,
  settingNewPassword: false,
  token: null,
}

export const { Types, Creators } = createActions({
  logInRequest: ['email', 'password'],
  logInSuccess: ['token'],
  logInFailure: ['error'],
  registerRequest: [
    'email',
    'password',
    'fullName',
    'country',
    'invitationCode',
  ],
  registerSuccess: ['token'],
  registerFailure: ['error'],
  resetPasswordRequest: ['email'],
  resetPasswordSuccess: null,
  resetPasswordFailure: ['error'],
  setNewPasswordRequest: ['code', 'password'],
  setNewPasswordSuccess: null,
  setNewPasswordFailure: ['error'],
  logOut: null,
})

export const logInRequest = (state = INITIAL_STATE, action) => ({
  ...state,
  isLoggingIn: true,
  logInError: null,
  token: null,
})

export const logInSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  isLoggingIn: false,
  logInError: null,
  token: action.token,
})

export const logInFailure = (state = INITIAL_STATE, action) => ({
  ...state,
  isLoggingIn: false,
  logInError: action.error,
  token: null,
})

export const registerRequest = (state = INITIAL_STATE, action) => ({
  ...state,
  isRegistering: true,
  registerError: null,
  token: null,
})

export const registerSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  isRegistering: false,
  registerError: null,
  token: action.token,
})

export const registerFailure = (state = INITIAL_STATE, action) => ({
  ...state,
  isRegistering: false,
  registerError: action.error,
  token: null,
})

export const resetPasswordRequest = (state = INITIAL_STATE, action) => ({
  ...state,
  resetPasswordError: null,
  resettingPassword: true,
})

export const resetPasswordSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  resetPasswordError: null,
  resettingPassword: false,
})

export const resetPasswordFailure = (state = INITIAL_STATE, action) => ({
  ...state,
  resetPasswordError: action.error,
  resettingPassword: false,
})

export const setNewPasswordRequest = (state = INITIAL_STATE, action) => ({
  ...state,
  setNewPasswordError: null,
  settingNewPassword: true,
})

export const setNewPasswordSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  setNewPasswordError: null,
  settingNewPassword: false,
})

export const setNewPasswordFailure = (state = INITIAL_STATE, action) => ({
  ...state,
  setNewPasswordError: action.error,
  settingNewPassword: false,
})

export const logOut = (state = INITIAL_STATE) => ({
  ...state,
  token: null,
})

export const HANDLERS = {
  [Types.LOG_IN_REQUEST]: logInRequest,
  [Types.LOG_IN_SUCCESS]: logInSuccess,
  [Types.LOG_IN_FAILURE]: logInFailure,
  [Types.REGISTER_REQUEST]: registerRequest,
  [Types.REGISTER_SUCCESS]: registerSuccess,
  [Types.REGISTER_FAILURE]: registerFailure,
  [Types.RESET_PASSWORD_REQUEST]: resetPasswordRequest,
  [Types.RESET_PASSWORD_SUCCESS]: resetPasswordSuccess,
  [Types.RESET_PASSWORD_FAILURE]: resetPasswordFailure,
  [Types.SET_NEW_PASSWORD_REQUEST]: setNewPasswordRequest,
  [Types.SET_NEW_PASSWORD_SUCCESS]: setNewPasswordSuccess,
  [Types.SET_NEW_PASSWORD_FAILURE]: setNewPasswordFailure,
  [Types.LOG_OUT]: logOut,
}

export default createReducer(INITIAL_STATE, HANDLERS)
