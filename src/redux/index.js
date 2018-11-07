import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import accountStore from './accountStore'
import rootSaga from './../sagas'

const configureStore = () => {
  const rootReducer = combineReducers({
    account: accountStore,
  })
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
  sagaMiddleware.run(rootSaga)
  return store
}

export default configureStore
