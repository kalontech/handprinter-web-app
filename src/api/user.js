import { fetchAPI } from './index' // eslint-disable-line unicorn/import-index

export const getMe = () => fetchAPI('/users/me')

export const updateMe = body =>
  fetchAPI('/users/me', {
    body,
    method: 'PUT',
  })

export const deleteMe = () =>
  fetchAPI('/users/me', {
    method: 'DELETE',
  })

export const shareInvitationCode = body =>
  fetchAPI('/users/me/code/share', {
    body,
    method: 'POST',
  })

export const getUser = body =>
  fetchAPI('/users/find_one', {
    body,
    method: 'POST',
  })

export const getInvitationsList = () => fetchAPI('/users/invitations')

export const getDashboardData = ({ userId, groupId, subset = 'me' } = {}) => {
  const url =
    userId || groupId
      ? `/users/dashboard_data/${userId || groupId}?for=${subset}`
      : `/users/dashboard_data?for=${subset}`
  return fetchAPI(url)
}

export const getCountryAvarageFootprint = () =>
  fetchAPI('/users/avarage_footprint')
