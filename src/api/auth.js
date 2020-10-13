import { getTemporaryToken } from 'utils/temporaryToken'

import { fetchAPI, webAppBaseUrl } from './index' // eslint-disable-line unicorn/import-index

export const logIn = (email, password) =>
  fetchAPI('/auth/login', {
    body: {
      email,
      password,
      temporaryToken: getTemporaryToken(),
    },
    method: 'POST',
  })

export const logInEmail = email =>
  fetchAPI('/auth/login/requestLink', {
    body: {
      email,
      redirectUrl: `${webAppBaseUrl}/account/login`,
    },
    method: 'POST',
  })

export const logInCode = code =>
  fetchAPI('/auth/login/withCode', {
    body: {
      code,
    },
    method: 'POST',
  })

export const register = (
  email,
  password,
  fullName,
  country,
  invitationCode,
  belongsToBrand,
  siloSecureCode,
) =>
  fetchAPI('/auth/register', {
    body: {
      email,
      password,
      fullName,
      country,
      invitationCode,
      belongsToBrand,
      siloSecureCode,
      temporaryToken: getTemporaryToken(),
    },
    method: 'POST',
  })

export const resetPasswordConfirm = (code, password) =>
  fetchAPI('/auth/password-reset/confirm', {
    body: {
      code,
      password,
    },
    method: 'POST',
  })

export const resetPasswordRequest = email =>
  fetchAPI('/auth/password-reset/request', {
    body: {
      email,
      redirectUrl: `${webAppBaseUrl}/account/set-new-password`,
    },
    method: 'POST',
  })
