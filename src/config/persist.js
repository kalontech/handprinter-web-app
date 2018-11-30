import storage from 'redux-persist/lib/storage'

const persistConfig = {
  user: {
    key: 'user',
    storage,
    whitelist: [],
  },
  account: {
    key: 'account',
    storage,
    whitelist: ['token'],
  },
  app: {
    key: 'app',
    storage,
    whitelist: [],
  },
  intl: {
    key: 'intl',
    storage,
    whitelist: ['locale'],
  },
}

export default persistConfig
