import { delay } from 'redux-saga'
import { put, select, call } from 'redux-saga/effects'
import { updateIntl } from 'react-intl-redux'

import api from 'api'
import env from 'config/env'
import { Creators as AppStoreCreators } from 'redux/appStore'

import { prepareUserProfile } from './helpers'

function* startup(action) {
  window.__CONFIG__ = encodeURIComponent(JSON.stringify(env))
  // Zero-delay at the same beginning (this is workaround)
  yield call(delay, 0)
  // Retrieve state
  const { intl } = yield select()
  // Fetch user's profile
  yield call(prepareUserProfile)
  // Restore saved locale or fallback to default one
  const defaultLocale = intl.locale || Object.keys(intl.locales)[0]
  yield put(
    updateIntl({
      locale: defaultLocale,
      messages: intl.locales[defaultLocale],
    }),
  )
  // Load countries
  const { countries } = yield call(api.getCountries)
  yield put(AppStoreCreators.setCountries(countries))
  // Launch app
  yield put(AppStoreCreators.launchApp())
}

export default {
  startup,
}
