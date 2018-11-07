import { createActions, createReducer } from 'reduxsauce'

export const INITIAL_STATE = {
  isLoggingIn: false,
  logInError: null,
  token: null,
}

export const { Types, Creators } = createActions({
  logInRequest: ['email', 'password'],
  logInSuccess: ['token'],
  logInFailure: ['error'],
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

export const HANDLERS = {
  [Types.LOG_IN_REQUEST]: logInRequest,
  [Types.LOG_IN_SUCCESS]: logInSuccess,
  [Types.LOG_IN_FAILURE]: logInFailure,
}

export default createReducer(INITIAL_STATE, HANDLERS)
