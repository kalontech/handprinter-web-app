import qs from 'qs'

import { fetchAPI } from './index' // eslint-disable-line unicorn/import-index

export const fetchGroupsList = (query = {}) =>
  fetchAPI(`/groups?${qs.stringify(query)}`)

export const fetchFeaturedGroup = (id, type = 'star') =>
  fetchAPI(`/groups/${id}/${type}`, { method: 'POST' })

export const fetchJoinGroup = id =>
  fetchAPI(`/groups/${id}/join`, { method: 'POST' })

export const fetchLeaveGroup = id =>
  fetchAPI(`/groups/${id}/leave`, { method: 'POST' })

export const fetchJoinGroupByInvite = id =>
  fetchAPI(`/groups/${id}/invitation/approve`, { method: 'POST' })

export const fetchDenyGroupByInvite = id =>
  fetchAPI(`/groups/${id}/invitation/deny`, { method: 'POST' })

export const fetchInviteInGroup = (id, body) =>
  fetchAPI(`/groups/${id}/invitation`, { method: 'POST', body })

export const fetchCreateGroup = body =>
  fetchAPI('/groups', { method: 'POST', body })

export const fetchDeleteGroup = id =>
  fetchAPI(`/groups/${id}`, { method: 'DELETE' })

export const fetchGroupById = id => fetchAPI(`/groups/${id}`)

export const fetchUpdateGroup = (id, body) =>
  fetchAPI(`/groups/${id}`, { method: 'PUT', body })

export const fetchGroupMembers = ({ groupId, page, status }) =>
  fetchAPI(`/groups/${groupId}/members?${qs.stringify({ page, status })}`)

export const fetchUpdateGroupMember = ({ id, memberId, body }) =>
  fetchAPI(`/groups/${id}/members/${memberId}`, { method: 'PUT', body })

export const fetchInvitationRequest = ({ id, memberId, type = 'deny' }) =>
  fetchAPI(`/groups/${id}/request/${memberId}/${type}`, { method: 'POST' })
