import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { intlReducer } from 'react-intl-redux'
import { persistStore, persistReducer } from 'redux-persist'
import * as Sentry from '@sentry/browser'
import createSentryMiddleware from 'redux-sentry-middleware'

import persistConfig from 'config/persist'
import rootSaga from 'sagas'
import locales from 'locales'

import accountStore from './accountStore'
import appStore from './appStore'
import userStore from './userStore'
import groupsStore from './groups'
import actionsStore from './actions'

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const configureStore = () => {
  const initialState = {
    intl: {
      locales,
    },
  }
  const rootReducer = combineReducers({
    account: persistReducer(persistConfig.account, accountStore),
    user: persistReducer(persistConfig.user, userStore),
    app: persistReducer(persistConfig.app, appStore),
    intl: persistReducer(persistConfig.intl, intlReducer),
    groups: groupsStore,
    actions: actionsStore,
  })
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(sagaMiddleware, createSentryMiddleware(Sentry)),
    ),
  )
  persistStore(store)
  sagaMiddleware.run(rootSaga)
  return store
}

export default configureStore
