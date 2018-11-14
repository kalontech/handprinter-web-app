import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { intlReducer } from 'react-intl-redux'
import { persistStore, persistReducer } from 'redux-persist'

import accountStore from './accountStore'
import appStore from './appStore'
import rootSaga from './../sagas'
import locales from './../locales'
import persistConfig from './../config/persist'

const configureStore = () => {
  const initialState = {
    intl: {
      locales,
    },
  }
  const rootReducer = combineReducers({
    account: persistReducer(persistConfig.account, accountStore),
    app: persistReducer(persistConfig.app, appStore),
    intl: persistReducer(persistConfig.intl, intlReducer),
  })
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware),
  )
  persistStore(store)
  sagaMiddleware.run(rootSaga)
  return store
}

export default configureStore
