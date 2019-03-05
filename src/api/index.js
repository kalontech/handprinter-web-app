import qs from 'qs'
import * as Sentry from '@sentry/browser'

import { store } from 'app'
import { getTemporaryToken } from 'utils/temporaryToken'
import colors from 'config/colors'

export const webAppBaseUrl = `${window.location.protocol}//${
  window.location.host
}`

export const fetchAPI = async (url, options) => {
  const hasBody = options && Boolean(options.body)
  const isFormData = hasBody && options.body instanceof FormData

  let body

  if (hasBody) {
    body = isFormData ? options.body : JSON.stringify(options.body)
  }

  const { account, user } = store.getState()

  const headers = {
    authorization: `Bearer ${account.token}`,
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...((options && options.headers) || {}),
  }

  const transformedOptions = {
    ...options,
    body,
    headers,
    credentials: 'include',
  }

  const { data, error, success } = await fetch(
    `/api${url}`,
    transformedOptions,
  ).then(response => response.json())

  Sentry.addBreadcrumb({
    category: 'fetch',
    type: 'http',
    level: 'info',
    data: {
      user: user.data,
      url,
      payload: transformedOptions,
      error,
    },
  })

  if (success) {
    return data
  } else {
    throw error
  }
}

const fetchAction = ({ id, slug, ...params }) =>
  fetchAPI(`/actions/find_one/${slug || id}`, params)

const getActions = (query = {}) => fetchAPI(`/actions?${qs.stringify(query)}`)

const getSuggestedActions = (query = {}) =>
  fetchAPI(`/actions/suggested?${qs.stringify(query)}`)

const getActionsHistory = (query = {}) =>
  fetchAPI(`/actions/taken?${qs.stringify(query)}`)

const getActionsMyIdeas = (query = {}) =>
  fetchAPI(`/actions/get_ideas?${qs.stringify(query)}`)

const getTimeValues = () => fetchAPI(`/actions/time_values`)

const getCountries = () => fetchAPI(`/countries`)

const getMe = () => fetchAPI(`/users/me`)

const logIn = (email, password) =>
  fetchAPI(`/auth/login`, {
    body: {
      email,
      password,
      temporaryToken: getTemporaryToken(),
    },
    method: 'POST',
  })

const register = (
  email,
  password,
  fullName,
  country,
  invitationCode,
  belongsToBrand,
) =>
  fetchAPI(`/auth/register`, {
    body: {
      email,
      password,
      fullName,
      country,
      invitationCode,
      belongsToBrand,
      temporaryToken: getTemporaryToken(),
    },
    method: 'POST',
  })

const resetPasswordConfirm = (code, password) =>
  fetchAPI(`/auth/password-reset/confirm`, {
    body: {
      code,
      password,
    },
    method: 'POST',
  })

const resetPasswordRequest = email =>
  fetchAPI(`/auth/password-reset/request`, {
    body: {
      email,
      redirectUrl: `${webAppBaseUrl}/account/set-new-password`,
    },
    method: 'POST',
  })

const takeAction = actionId =>
  fetchAPI(`/actions/take`, {
    body: {
      actionId,
      temporaryToken: getTemporaryToken(),
    },
    method: 'POST',
  })

const updateMe = body =>
  fetchAPI(`/users/me`, {
    body,
    method: 'PUT',
  })

const updateMePhoto = body =>
  fetchAPI(`/users/me`, {
    body,
    method: 'PUT',
  })

const deleteMe = () =>
  fetchAPI(`/users/me`, {
    method: 'DELETE',
  })

const shareInvitationCode = body =>
  fetchAPI(`/users/me/code/share`, {
    body,
    method: 'POST',
  })

const getUser = body =>
  fetchAPI(`/users/find_one`, {
    body,
    method: 'POST',
  })
const getInvitationsList = () => fetchAPI(`/users/invitations`)

export const getDashboardData = ({ userId, groupId, subset = 'me' } = {}) => {
  const url =
    userId || groupId
      ? `/users/dashboard_data/${userId || groupId}?for=${subset}`
      : `/users/dashboard_data?for=${subset}`
  return fetchAPI(url)
}

const engageAction = (action, emails, executorId) =>
  fetchAPI(`/actions/engage`, {
    body: {
      action,
      emails,
      executorId,
    },
    method: 'POST',
  })

export const getUserInitialAvatar = fullName =>
  `https://ui-avatars.com/api/?background=${colors.lightGray.slice(
    1,
  )}&color=${colors.gray.slice(1)}&length=1&name=${fullName}&size=256`

const fetchProposedAction = ({ body, ...params }) =>
  fetchAPI(`/actions/add_idea`, {
    body,
    method: 'POST',
    ...params,
  })

export const getNews = ({ page, range, groupId } = {}) =>
  fetchAPI(`/actions/news?${qs.stringify({ page, range, groupId })}`)

const sendLastTimeReadNewsAt = at =>
  fetchAPI(`/actions/news/read_all`, {
    body: { at },
    method: 'POST',
  })

export default {
  fetchAction,
  getActions,
  getSuggestedActions,
  getActionsHistory,
  getActionsMyIdeas,
  getCountries,
  getTimeValues,
  getMe,
  logIn,
  register,
  getUser,
  takeAction,
  updateMe,
  updateMePhoto,
  resetPasswordConfirm,
  resetPasswordRequest,
  deleteMe,
  shareInvitationCode,
  getUserInitialAvatar,
  engageAction,
  getNews,
  fetchProposedAction,
  sendLastTimeReadNewsAt,
  getInvitationsList,
}
