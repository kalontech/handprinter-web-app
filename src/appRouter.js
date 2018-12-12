import React from 'react'
import { Redirect, Router, Switch } from 'react-router-dom'
import { ModalRoute } from 'react-router-modal'
import createBrowserHistory from 'history/createBrowserHistory'
import ErrorCatcher from './utils/errorCatcher'

import Route from './routeWrapper'

import ActionModalPage from './pages/ActionModalPage'
import ActionsPage from './pages/ActionsPage'
import CheckYourEmailPage from './pages/CheckYourEmailPage'
import DashboardPage from './pages/DashboardPage'
import FaqPage from './pages/FaqPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import MeasurementUnitsPage from './pages/MeasurementUnitsPage'
import NotFoundPage from './pages/NotFoundPage'
import OurVisionPage from './pages/OurVisionPage'
import ProfilePage from './pages/ProfilePage'
import RegisterPage from './pages/RegisterPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import SetNewPasswordPage from './pages/SetNewPasswordPage'

export const history = createBrowserHistory()

const handleBackdropClick = ({ parentPath }) =>
  history.length > 1 ? history.goBack() : history.push(parentPath)

const AppRouter = () => (
  <Router history={history}>
    <ErrorCatcher>
      <Switch>
        <Redirect exact from="/" to="/pages/home" />
        <Route path="/pages/home" component={HomePage} />
        <Route path="/actions" component={ActionsPage} useAuthentication />
        <Route
          path="/account/check-your-email"
          component={CheckYourEmailPage}
          withoutHeader
          withoutCTA
          withoutFooter
        />
        <Route
          path="/account/dashboard"
          component={DashboardPage}
          requireAuthentication
        />
        <Route path="/pages/faq" component={FaqPage} withoutCTA />
        <Route
          path="/account/login"
          component={LoginPage}
          headerType="minimal"
          unauthorizedOnly
          withoutHeader
          withoutCTA
          withoutFooter
        />
        <Route
          path="/pages/measurement-units"
          component={MeasurementUnitsPage}
        />
        <Route path="/pages/our-vision" component={OurVisionPage} />
        <Route
          path="/account/profile"
          component={ProfilePage}
          requireAuthentication
        />
        <Route
          path="/account/register"
          component={RegisterPage}
          headerType="minimal"
          unauthorizedOnly
          withoutHeader
          withoutCTA
          withoutFooter
        />
        <Route
          path="/account/reset-password"
          component={ResetPasswordPage}
          headerType="minimal"
          unauthorizedOnly
          withoutHeader
          withoutCTA
          withoutFooter
        />
        <Route
          path="/account/set-new-password/:code"
          component={SetNewPasswordPage}
          headerType="minimal"
          unauthorizedOnly
          withoutHeader
          withoutCTA
          withoutFooter
        />
        <Route component={NotFoundPage} />
      </Switch>
      <ModalRoute
        path="/actions/:actionSlug"
        parentPath="/actions"
        onBackdropClick={() => handleBackdropClick({ parentPath: '/actions' })}
        component={ActionModalPage}
      />
      <ModalRoute
        path="/pages/home/actions/:actionSlug"
        parentPath="/pages/home"
        onBackdropClick={() =>
          handleBackdropClick({ parentPath: '/pages/home' })
        }
        component={ActionModalPage}
      />
      <ModalRoute
        path="/pages/our-vision/actions/:actionSlug"
        parentPath="/pages/our-vision"
        onBackdropClick={() =>
          handleBackdropClick({ parentPath: '/pages/our-vision' })
        }
        component={ActionModalPage}
      />
    </ErrorCatcher>
  </Router>
)

export default AppRouter
