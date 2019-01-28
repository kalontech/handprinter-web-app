import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/browser'
import { hotjar } from 'react-hotjar'

import 'intersection-observer'

import 'react-router-modal/css/react-router-modal.css'

import './index.less'
import App from './app'
import * as serviceWorker from './serviceWorker'

const {
  NODE_ENV,
  REACT_APP_DEV_SENTRY_KEY,
  REACT_APP_DEV_SENTRY_PROJECT_ID,
  REACT_APP_ENVIRONMENT,
  REACT_APP_HOTJAR_HJID,
  REACT_APP_HOTJAR_HJSV,
} = process.env

if (NODE_ENV === 'production') {
  Sentry.init({
    dsn: `https://${REACT_APP_DEV_SENTRY_KEY}@sentry.io/${REACT_APP_DEV_SENTRY_PROJECT_ID}`,
  })

  if (REACT_APP_ENVIRONMENT === 'production') {
    hotjar.initialize(REACT_APP_HOTJAR_HJID, REACT_APP_HOTJAR_HJSV)
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
