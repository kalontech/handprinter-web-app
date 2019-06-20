import qs from 'qs'

import { fetchAPI } from './index' // eslint-disable-line unicorn/import-index

export const getOrganizationList = (query = {}) =>
  fetchAPI(`/organizations?${qs.stringify(query)}`)

export const addAdmins = data =>
  fetchAPI('/organizations/add-admins', {
    body: { ...data },
    method: 'POST',
  })
