import { createActions, createReducer } from 'reduxsauce'

export const INITIAL_STATE = {
  ready: false,
}

export const { Types, Creators } = createActions({
  launchApp: null,
})

export const launchApp = (state = INITIAL_STATE, action) => ({
  ...state,
  ready: true,
})

export const HANDLERS = {
  [Types.LAUNCH_APP]: launchApp,
}

export default createReducer(INITIAL_STATE, HANDLERS)
