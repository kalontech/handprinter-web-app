import { CookieStorage } from 'redux-persist-cookie-storage'
import Cookies from 'cookies-js'

Cookies.defaults.domain = process.env.REACT_APP_WEB_APP_COOKIES_DOMAIN

const persistConfig = {
  user: {
    key: 'handprinter_user',
    storage: new CookieStorage(Cookies),
    whitelist: [],
  },
  account: {
    key: 'handprinter_account',
    storage: new CookieStorage(Cookies),
    whitelist: ['token'],
  },
  app: {
    key: 'handprinter_app',
    storage: new CookieStorage(Cookies),
    whitelist: [],
  },
  intl: {
    key: 'handprinter_intl',
    storage: new CookieStorage(Cookies),
    whitelist: ['locale'],
  },
}

export default persistConfig
