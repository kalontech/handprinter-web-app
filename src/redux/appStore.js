import { createActions, createReducer } from 'reduxsauce'

export const INITIAL_STATE = {
  countries: [],
  ready: false,
}

export const { Types, Creators } = createActions({
  launchApp: null,
  setCountries: ['countries'],
})

export const launchApp = (state = INITIAL_STATE, action) => ({
  ...state,
  ready: true,
})

export const setCountries = (state = INITIAL_STATE, action) => ({
  ...state,
  countries: action.countries,
})

export const HANDLERS = {
  [Types.LAUNCH_APP]: launchApp,
  [Types.SET_COUNTRIES]: setCountries,
}

export default createReducer(INITIAL_STATE, HANDLERS)
