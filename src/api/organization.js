import qs from 'qs'

import { fetchAPI } from './index' // eslint-disable-line unicorn/import-index

export const getOrganization = id => fetchAPI(`/organizations/${id}`)

export const getOrganizationNetwork = id =>
  fetchAPI(`/organizations/${id}/network`)

export const updateOne = (body, id) =>
  fetchAPI(`/organizations/${id}`, { body, method: 'POST' })

export const getAdmins = id =>
  fetchAPI(`/organizations/${id}/admins`, { method: 'GET' })

export const getMembers = ({ id, page }) =>
  fetchAPI(`/organizations/${id}/members?${qs.stringify({ page })}`)

export const getOrganizationList = (query = {}) =>
  fetchAPI(`/organizations?${qs.stringify(query)}`)

export const addAdmins = data =>
  fetchAPI('/organizations/add-admins', {
    body: { ...data },
    method: 'POST',
  })

export const removeAdmin = (organizationId, adminId) =>
  fetchAPI(`/organizations/${organizationId}/admins/${adminId}`, {
    method: 'DELETE',
  })

export const getInvitationsList = organizationId =>
  fetchAPI(`/organizations/invitations/${organizationId}`)

export const shareInvitationCode = body =>
  fetchAPI('/organizations/code/share', {
    body,
    method: 'POST',
  })

export const getDashboardData = id =>
  fetchAPI(`/organizations/${id}/get-dashboard-data`, { method: 'GET' })

export const search = query =>
  fetchAPI('/organizations/search', {
    body: { query },
    method: 'POST',
  })
