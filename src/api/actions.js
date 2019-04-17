import qs from 'qs'

import { getTemporaryToken } from 'utils/temporaryToken'

import { fetchAPI } from './index' // eslint-disable-line unicorn/import-index

export const fetchAction = ({ id, slug, ...params }) =>
  fetchAPI(`/actions/find_one/${slug || id}`, params)

export const getActions = (query = {}) =>
  fetchAPI(`/actions?${qs.stringify(query)}`)

export const getSuggestedActions = (query = {}) =>
  fetchAPI(`/actions/suggested?${qs.stringify(query)}`)

export const getActionsHistory = (query = {}) =>
  fetchAPI(`/actions/taken?${qs.stringify(query)}`)

export const getActionsMyIdeas = (query = {}) =>
  fetchAPI(`/actions/get_ideas?${qs.stringify(query)}`)

export const getTimeValues = () => fetchAPI(`/actions/time_values`)

export const takeAction = (actionId, notCausedByHandprint, causedByEmail) =>
  fetchAPI(`/actions/take`, {
    body: {
      actionId,
      notCausedByHandprint,
      causedByEmail,
      temporaryToken: getTemporaryToken(),
    },
    method: 'POST',
  })

export const getNews = ({ page, range, groupId } = {}) =>
  fetchAPI(`/actions/news?${qs.stringify({ page, range, groupId })}`)

export const sendLastTimeReadNewsAt = at =>
  fetchAPI(`/actions/news/read_all`, {
    body: { at },
    method: 'POST',
  })

export const engageAction = (action, emails, executorId) =>
  fetchAPI(`/actions/engage`, {
    body: {
      action,
      emails,
      executorId,
    },
    method: 'POST',
  })

export const fetchProposedAction = ({ body, ...params }) =>
  fetchAPI(`/actions/add_idea`, {
    body,
    method: 'POST',
    ...params,
  })
