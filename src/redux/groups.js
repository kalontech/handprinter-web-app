import { createActions, createReducer } from 'reduxsauce'

const INITIAL_STATE = {
  list: {},
  current: {},
}

export const { Types, Creators } = createActions({
  setGroupsList: ['list'],
  removeListItem: ['id'],
  updateListItem: ['updated', 'id'],
  toggleFeatured: ['id'],
})

const HANDLERS = {
  [Types.SET_GROUPS_LIST]: (state = INITIAL_STATE, { list }) => ({
    ...state,
    list,
  }),
  [Types.REMOVE_LIST_ITEM]: (state = INITIAL_STATE, { id }) => ({
    ...state,
    list: {
      ...state.list,
      docs: state.list.docs.filter(item => item._id !== id),
    },
  }),
  [Types.UPDATE_LIST_ITEM]: (state = INITIAL_STATE, { updated, id }) => ({
    ...state,
    list: {
      ...state.list,
      docs: state.list.docs.map(item => {
        if (item._id === id) return updated
        else return item
      }),
    },
  }),
  [Types.TOGGLE_FEATURED]: (state = INITIAL_STATE, { id }) => ({
    ...state,
    list: {
      ...state.list,
      docs: state.list.docs.map(item => ({
        ...item,
        info: {
          ...item.info,
          isFeatured:
            item._id === id ? !item.info.isFeatured : item.info.isFeatured,
        },
      })),
    },
  }),
}

export default createReducer(INITIAL_STATE, HANDLERS)
