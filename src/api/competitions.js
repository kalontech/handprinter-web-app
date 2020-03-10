import qs from 'qs'

import { fetchAPI } from './index' // eslint-disable-line unicorn/import-index

export const fetchCompetitionsList = (query = {}) =>
  fetchAPI(`/competitions?${qs.stringify(query)}`)

export const getCompetition = id => fetchAPI(`/competitions/${id}`)

export const sendInvitations = (body, id) =>
  fetchAPI(`/competitions/${id}/invite`, { body, method: 'POST' })

export const getInvitations = id =>
  fetchAPI(`/competitions/${id}/invite`, { method: 'GET' })

export const acceptInvitation = id =>
  fetchAPI(`/competitions/${id}/invite/accept`, { method: 'GET' })

export const denyInvitation = id =>
  fetchAPI(`/competitions/${id}/invite/deny`, { method: 'GET' })
