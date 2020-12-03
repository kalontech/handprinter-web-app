import '@babel/polyfill'
import 'react-app-polyfill/ie11'

import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/browser'
import { hotjar } from 'react-hotjar'

import 'intersection-observer'

import 'react-activity-feed/dist/index.es.css'
import 'react-router-modal/css/react-router-modal.css'
import 'react-circular-progressbar/dist/styles.css'

import './index.less'
import env from 'config/env'

import initAplitude from './amplitude'

import App from './app'
import * as serviceWorker from './serviceWorker'

const {
  NODE_ENV,
  REACT_APP_ENVIRONMENT,
  REACT_APP_HOTJAR_HJID,
  REACT_APP_HOTJAR_HJSV,
} = env

if (NODE_ENV === 'production') {
  Sentry.init({
    dsn:
      'https://f544bf43afeb4940b366dd22cfcd6018@o138408.ingest.sentry.io/5238804',
    environment: REACT_APP_ENVIRONMENT,
  })

  if (REACT_APP_ENVIRONMENT === 'production') {
    hotjar.initialize(REACT_APP_HOTJAR_HJID, REACT_APP_HOTJAR_HJSV)
    initAplitude()
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
