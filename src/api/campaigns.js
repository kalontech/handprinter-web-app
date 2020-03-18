import qs from 'qs'

import { fetchAPI } from './index' // eslint-disable-line unicorn/import-index

export const fetchCampaignsList = (query = {}) =>
  fetchAPI(`/campaigns?${qs.stringify(query)}`)

export const getCampaign = id => fetchAPI(`/campaigns/${id}`)
