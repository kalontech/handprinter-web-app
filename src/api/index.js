import get from 'lodash/get'
import has from 'lodash/has'
import queryString from 'query-string'
import * as Sentry from '@sentry/browser'

import { store } from '../app'

const apiBaseUrl =
  window.location.hostname === 'localhost'
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
  fetchHelper(`${apiBaseUrl}/actions?${queryString.stringify(query)}`)

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
    },
    method: 'POST',
  })

const register = (email, password, fullName, country, invitationCode) =>
  fetchHelper(`${apiBaseUrl}/auth/register`, {
    body: {
      email,
      password,
      fullName,
      country,
      invitationCode,
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

export default {
  findAction,
  getActions,
  getCountries,
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
}
