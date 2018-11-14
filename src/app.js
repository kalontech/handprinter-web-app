import React, { Fragment } from 'react'
import { Provider } from 'react-intl-redux'

import AppRouter from './appRouter'
import configureStore from './redux'
import { GlobalStyle } from './components/Styled'

const store = configureStore()

const App = () => (
  <Provider store={store}>
    <Fragment>
      <GlobalStyle />
      <AppRouter />
    </Fragment>
  </Provider>
)

export default App
