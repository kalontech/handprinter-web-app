import React from 'react'
import { Provider } from 'react-intl-redux'

import AppRouter from './appRouter'
import configureStore from './redux'

const store = configureStore()

const App = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

export default App
