import get from 'lodash/get'
import has from 'lodash/has'
import qs from 'qs'
import * as Sentry from '@sentry/browser'

import { store } from '../app'
import { ACTIONS_SUBSETS } from '../utils/constants'
import { getTemporaryToken } from './../utils/temporaryToken'
import colors from '../config/colors';

const apiBaseUrl = window.location.hostname.includes('localhost')
  ? process.env.REACT_APP_API_BASE_URL
  : `${window.location.protocol}//${window.location.host}/api`
export const webAppBaseUrl = `${window.location.protocol}//${
  window.location.host
}`

const fetchHelper = async (url, options) => {
  const body = has(options, 'body')
    ? { body: JSON.stringify(options.body) }
    : {}
  const headers = get(options, 'headers', {})
  const transformedOptions = {
    ...options,
    ...body,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  }
  const { data, error, success } = await (await fetch(
    url,
    transformedOptions,
  )).json()

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

const findAction = ({ actionId, slug }) =>
  fetchHelper(`${apiBaseUrl}/actions/find_one`, {
    body: {
      actionId,
      slug,
    },
    method: 'POST',
  })

const getActions = (query = {}) => 
  fetchHelper(`${apiBaseUrl}/actions?${qs.stringify(query)}`)

const getSuggestedActions = (query = {}, token) => 
  fetchHelper(`${apiBaseUrl}/actions/suggested?${qs.stringify(query)}`, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  }
)

const getTimeValues = (query = {}) =>
  fetchHelper(`${apiBaseUrl}/actions/time_values`)

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
  `https://ui-avatars.com/api/?background=${colors.lightGray.slice(1)}&color=${colors.gray.slice(1)}&length=1&name=${fullName}&size=256`

const getNews = (query = {}, token) =>
  fetchHelper(`${apiBaseUrl}/actions/news?${qs.stringify(query)}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })

export default {
  findAction,
  getActions,
  getSuggestedActions,
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
}
