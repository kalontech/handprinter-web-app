import { delay } from 'redux-saga'
import { put, select, call } from 'redux-saga/effects'
import { updateIntl } from 'react-intl-redux'

import { Creators as AppStoreCreators } from './../redux/appStore'

function* startup(action) {
  yield call(delay, 0)
  const { intl } = yield select()
  // Restore saved locale or fallback to default one
  const defaultLocale = intl.locale || Object.keys(intl.locales)[0]
  yield put(
    updateIntl({
      locale: defaultLocale,
      messages: intl.locales[defaultLocale],
    }),
  )
  // Launch app
  yield put(AppStoreCreators.launchApp())
}

export default {
  startup,
}
