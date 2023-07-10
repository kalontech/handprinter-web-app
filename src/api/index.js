import * as Sentry from '@sentry/browser'

import { store } from 'app'
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
    ...(account.token ? { authorization: `Bearer ${account.token}` } : {}),
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...((options && options.headers) || {}),
  }

  let cache = 'default'
  if (
    url &&
    (url.includes('groups?subset=teams&limit=100') ||
      url.includes('organizations/5ef4711a4d2be967868e3ec2'))
  ) {
    cache = 'force-cache'
  }
  const transformedOptions = {
    ...options,
    body,
    headers,
    cache,
    // credentials: 'include',
  }

  const { REACT_APP_API_BASE_URL } = process.env

  const { data, error } = await fetch(
    `${REACT_APP_API_BASE_URL}${url}`,
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

  if (data) {
    return data
  }

  error && errorHandler(error)
}

const getCountries = () => fetchAPI('/countries')

export const getUserInitialAvatar = fullName =>
  `https://ui-avatars.com/api/?background=${colors.gray.slice(
    1,
  )}&color=${colors.darkGray.slice(1)}&length=1&name=${fullName}&size=256`

export default {
  getCountries,
  getUserInitialAvatar,
}
