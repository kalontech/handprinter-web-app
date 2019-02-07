import get from 'lodash/get'
import has from 'lodash/has'
import qs from 'qs'
import * as Sentry from '@sentry/browser'

import { store } from 'app'
import { getTemporaryToken } from 'utils/temporaryToken'
import colors from 'config/colors'

const { REACT_APP_API_BASE_URL, REACT_APP_WEB_APP_COOKIES_DOMAIN } = process.env

const apiBaseUrl = window.location.hostname.includes(
  REACT_APP_WEB_APP_COOKIES_DOMAIN || 'localhost',
)
  ? REACT_APP_API_BASE_URL
  : `${window.location.protocol}//${window.location.host}/api`
export const webAppBaseUrl = `${window.location.protocol}//${
  window.location.host
}`

const fetchHelper = async (url, options) => {
  const hasBody = has(options, 'body')
  const isFormData = hasBody && options.body instanceof FormData

  let body

  if (hasBody) {
    body = isFormData ? options.body : JSON.stringify(options.body)
  }

  const headers = isFormData
    ? get(options, 'headers', {})
    : {
        'Content-Type': 'application/json',
        ...get(options, 'headers', {}),
      }

  const transformedOptions = {
    ...options,
    body,
    headers,
  }

  const { data, error, success } = await fetch(url, transformedOptions).then(
    response => response.json(),
  )

  const user = store.getState().user.data
  Sentry.addBreadcrumb({
    category: 'fetch',
    type: 'http',
    level: 'info',
    data: {
      user: user && user,
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

const fetchAction = ({ id, slug, token, ...params }) =>
  fetchHelper(`${apiBaseUrl}/actions/find_one/${slug || id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: 'GET',
    ...params,
  })

const getActions = (query = {}, token) =>
  fetchHelper(`${apiBaseUrl}/actions?${qs.stringify(query)}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })

const getSuggestedActions = (query = {}, token) =>
  fetchHelper(`${apiBaseUrl}/actions/suggested?${qs.stringify(query)}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })

const getActionsHistory = (query = {}, token) =>
  fetchHelper(`${apiBaseUrl}/actions/taken?${qs.stringify(query)}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })

const getActionsMyIdeas = (query = {}, token) =>
  fetchHelper(`${apiBaseUrl}/actions/get_ideas?${qs.stringify(query)}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })

const getTimeValues = () => fetchHelper(`${apiBaseUrl}/actions/time_values`)

const getCountries = () => fetchHelper(`${apiBaseUrl}/countries`)

const getMe = token =>
  fetchHelper(`${apiBaseUrl}/users/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: 'GET',
  })

const logIn = (email, password) =>
  fetchHelper(`${apiBaseUrl}/auth/login`, {
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
  fetchHelper(`${apiBaseUrl}/auth/register`, {
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
  fetchHelper(`${apiBaseUrl}/auth/password-reset/confirm`, {
    body: {
      code,
      password,
    },
    method: 'POST',
  })

const resetPasswordRequest = email =>
  fetchHelper(`${apiBaseUrl}/auth/password-reset/request`, {
    body: {
      email,
      redirectUrl: `${webAppBaseUrl}/account/set-new-password`,
    },
    method: 'POST',
  })

const takeAction = (actionId, token) =>
  fetchHelper(`${apiBaseUrl}/actions/take`, {
    body: {
      actionId,
      temporaryToken: getTemporaryToken(),
    },
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: 'POST',
  })

const updateMe = (data, token) =>
  fetchHelper(`${apiBaseUrl}/users/me`, {
    body: data,
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: 'PUT',
  })

const updateMePhoto = async (payload, token) => {
  const options = {
    method: 'PUT',
    body: new FormData(),
    headers: {
      authorization: `Bearer ${token}`,
    },
  }
  options.body.append('file', payload.file)
  const { data, error, success } = await (await fetch(
    `${apiBaseUrl}/users/me`,
    options,
  )).json()
  if (success) {
    return data
  } else {
    throw error
  }
}

const deleteMe = token =>
  fetchHelper(`${apiBaseUrl}/users/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: 'DELETE',
  })

const shareInvitationCode = (data, token) =>
  fetchHelper(`${apiBaseUrl}/users/me/code/share`, {
    body: data,
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: 'POST',
  })

const getUser = (data, token) =>
  fetchHelper(`${apiBaseUrl}/users/find_one`, {
    body: data,
    method: 'POST',
  })

const getDashboardData = token =>
  fetchHelper(`${apiBaseUrl}/users/me/dashboard_data`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })

const engageAction = (action, emails, token) =>
  fetchHelper(`${apiBaseUrl}/actions/engage`, {
    body: {
      action,
      emails,
    },
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: 'POST',
  })

const getUserInitialAvatar = fullName =>
  `https://ui-avatars.com/api/?background=${colors.lightGray.slice(
    1,
  )}&color=${colors.gray.slice(1)}&length=1&name=${fullName}&size=256`

const fetchProposedAction = ({ body, token, ...params }) =>
  fetchHelper(`${apiBaseUrl}/actions/add_idea`, {
    body,
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: 'POST',
    ...params,
  })

const getNews = (query = {}, token) =>
  fetchHelper(`${apiBaseUrl}/actions/news?${qs.stringify(query)}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })

const sendLastTimeReadNewsAt = (at, token) =>
  fetchHelper(`${apiBaseUrl}/actions/news/read_all`, {
    body: { at },
    headers: {
      authorization: `Bearer ${token}`,
    },
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
  getDashboardData,
  getUserInitialAvatar,
  engageAction,
  getNews,
  fetchProposedAction,
  sendLastTimeReadNewsAt,
}
