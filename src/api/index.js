import get from 'lodash/get'
import has from 'lodash/has'

const apiBaseUrl =
  window.location.hostname === 'localhost'
    ? process.env.REACT_APP_API_BASE_URL
    : `${window.location.protocol}//${window.location.host}/api`
const webAppBaseUrl = `${window.location.protocol}//${window.location.host}`

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
  if (success) {
    return data
  } else {
    throw error
  }
}

const getCountries = () => fetchHelper(`${apiBaseUrl}/countries`)

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

const getMe = token =>
  fetchHelper(`${apiBaseUrl}/users/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: 'GET',
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

const updateMe = (data, token) =>
  fetchHelper(`${apiBaseUrl}/users/me`, {
    body: data,
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: 'PUT',
  })

export default {
  getCountries,
  logIn,
  register,
  getMe,
  updateMe,
  updateMePhoto,
  resetPasswordConfirm,
  resetPasswordRequest,
}
