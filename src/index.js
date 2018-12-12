import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/browser'

import 'react-router-modal/css/react-router-modal.css'
import './index.less'
import App from './app'
import * as serviceWorker from './serviceWorker'

if (process.env.NODE_ENV === 'production') {
  const {
    REACT_APP_DEV_SENTRY_KEY,
    REACT_APP_DEV_SENTRY_PROJECT_ID,
  } = process.env

  Sentry.init({
    dsn: `https://${REACT_APP_DEV_SENTRY_KEY}@sentry.io/${REACT_APP_DEV_SENTRY_PROJECT_ID}`,
  })
}

ReactDOM.render(<App />, document.getElementById('root'))
//
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
