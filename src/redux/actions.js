import { createActions, createReducer } from 'reduxsauce'

const INITIAL_STATE = {
  current: {},
}

export const { Types, Creators } = createActions({
  setCurrentAction: ['action'],
})

const HANDLERS = {
  [Types.SET_CURRENT_ACTION]: (state = INITIAL_STATE, { action }) => ({
    ...state,
    current: action,
  }),
}

export default createReducer(INITIAL_STATE, HANDLERS)
