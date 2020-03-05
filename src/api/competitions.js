import qs from 'qs'

import { fetchAPI } from './index' // eslint-disable-line unicorn/import-index

export const fetchCompetitionsList = (query = {}) =>
  fetchAPI(`/competitions?${qs.stringify(query)}`)

export const getCompetition = id => fetchAPI(`/competitions/${id}`)
