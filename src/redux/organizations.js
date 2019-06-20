import { createActions, createReducer } from 'reduxsauce'

const INITIAL_STATE = {
  list: {},
}

export const { Types, Creators } = createActions({
  setOrganizationList: ['list'],
})

const HANDLERS = {
  [Types.SET_ORGANIZATION_LIST]: (state = INITIAL_STATE, { list }) => ({
    ...state,
    list,
  }),
}

export default createReducer(INITIAL_STATE, HANDLERS)
