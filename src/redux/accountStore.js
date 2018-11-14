import { createActions, createReducer } from 'reduxsauce'

export const INITIAL_STATE = {
  isLoggingIn: false,
  isRegistering: false,
  logInError: null,
  registerError: null,
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

export const HANDLERS = {
  [Types.LOG_IN_REQUEST]: logInRequest,
  [Types.LOG_IN_SUCCESS]: logInSuccess,
  [Types.LOG_IN_FAILURE]: logInFailure,
  [Types.REGISTER_REQUEST]: registerRequest,
  [Types.REGISTER_SUCCESS]: registerSuccess,
  [Types.REGISTER_FAILURE]: registerFailure,
}

export default createReducer(INITIAL_STATE, HANDLERS)
