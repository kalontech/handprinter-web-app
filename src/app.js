import React, { Fragment } from 'react'
import { Provider as IntlProvider } from 'react-intl-redux'
import { ThemeProvider } from 'theme-ui'

import AppRouter from './appRouter'
import configureStore from './redux'
import { GlobalStyle } from './components/Styled'
import UiContextSettingsProvider from './context/uiSettingsContext'

export const store = configureStore()

const App = () => (
  <UiContextSettingsProvider>
    <ThemeProvider theme={{}}>
      <IntlProvider store={store}>
        <Fragment>
          <GlobalStyle />
          <AppRouter />
        </Fragment>
      </IntlProvider>
    </ThemeProvider>
  </UiContextSettingsProvider>
)

export default App
