import qs from 'qs'

import { fetchAPI } from './index' // eslint-disable-line unicorn/import-index

export const getOrganization = id => fetchAPI(`/organizations/${id}`)

export const updateOne = (body, id) =>
  fetchAPI(`/organizations/${id}`, { body, method: 'POST' })

export const getAdmins = id =>
  fetchAPI(`/organizations/${id}/admins`, { method: 'GET' })

export const getOrganizationList = (query = {}) =>
  fetchAPI(`/organizations?${qs.stringify(query)}`)

export const addAdmins = data =>
  fetchAPI('/organizations/add-admins', {
    body: { ...data },
    method: 'POST',
  })

export const removeAdmin = adminId =>
  fetchAPI(`/organizations/admins/${adminId}`, {
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
