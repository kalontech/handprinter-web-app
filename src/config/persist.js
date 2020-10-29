import { CookieStorage } from 'redux-persist-cookie-storage'
import Cookies from 'cookies-js'
import storage from 'redux-persist/lib/storage'

import env from 'config/env'

Cookies.defaults.domain = env.REACT_APP_WEB_APP_COOKIES_DOMAIN

const persistConfig = {
  user: {
    key: 'handprinter_user',
    storage,
    whitelist: [],
  },
  account: {
    key: 'handprinter_account',
    storage,
    whitelist: ['token'],
  },
  app: {
    key: 'handprinter_app',
    storage,
    whitelist: [],
  },
  intl: {
    key: 'handprinter_intl',
    storage,
    whitelist: ['locale'],
  },
}

export default persistConfig
