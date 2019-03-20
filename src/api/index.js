import * as Sentry from '@sentry/browser'

import { store } from 'app'
import { getTemporaryToken } from 'utils/temporaryToken'
import colors from 'config/colors'

import errorHandler from './errorHandler'

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
  }

  errorHandler(error)
}

const getCountries = () => fetchAPI('/countries')

const getMe = () => fetchAPI('/users/me')

const logIn = (email, password) =>
  fetchAPI('/auth/login', {
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
  fetchAPI('/auth/register', {
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
  fetchAPI('/auth/password-reset/confirm', {
    body: {
      code,
      password,
    },
    method: 'POST',
  })

const resetPasswordRequest = email =>
  fetchAPI('/auth/password-reset/request', {
    body: {
      email,
      redirectUrl: `${webAppBaseUrl}/account/set-new-password`,
    },
    method: 'POST',
  })

const updateMe = body =>
  fetchAPI('/users/me', {
    body,
    method: 'PUT',
  })

const updateMePhoto = body =>
  fetchAPI('/users/me', {
    body,
    method: 'PUT',
  })

const deleteMe = () =>
  fetchAPI('/users/me', {
    method: 'DELETE',
  })

const shareInvitationCode = body =>
  fetchAPI('/users/me/code/share', {
    body,
    method: 'POST',
  })

const getUser = body =>
  fetchAPI('/users/find_one', {
    body,
    method: 'POST',
  })
const getInvitationsList = () => fetchAPI('/users/invitations')

export const getDashboardData = ({ userId, groupId, subset = 'me' } = {}) => {
  const url =
    userId || groupId
      ? `/users/dashboard_data/${userId || groupId}?for=${subset}`
      : `/users/dashboard_data?for=${subset}`
  return fetchAPI(url)
}

export const getUserInitialAvatar = fullName =>
  `https://ui-avatars.com/api/?background=${colors.gray.slice(
    1,
  )}&color=${colors.darkGray.slice(1)}&length=1&name=${fullName}&size=256`

export default {
  getCountries,
  getMe,
  logIn,
  register,
  getUser,
  updateMe,
  updateMePhoto,
  resetPasswordConfirm,
  resetPasswordRequest,
  deleteMe,
  shareInvitationCode,
  getUserInitialAvatar,
  getInvitationsList,
}
