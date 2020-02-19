import { createActions, createReducer } from 'reduxsauce'

const INITIAL_STATE = {
  list: {},
  current: {},
}

export const { Types, Creators } = createActions({
  setCampaignsList: ['list'],
})

const HANDLERS = {
  [Types.SET_CAMPAIGNS_LIST]: (state = INITIAL_STATE, { list }) => ({
    ...state,
    list,
  }),
}

export default createReducer(INITIAL_STATE, HANDLERS)
