import React from 'react'
import { Router, Switch } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import Route from './routeWrapper'

import ActionsPage from './pages/ActionsPage'
import DashboardPage from './pages/DashboardPage'
import FaqPage from './pages/FaqPage'
import ForOrganizationsPage from './pages/ForOrganizationsPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import MeasurementUnitsPage from './pages/MeasurementUnitsPage'
import NotFoundPage from './pages/NotFoundPage'
import OurVisionPage from './pages/OurVisionPage'
import RegisterPage from './pages/RegisterPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import SetNewPasswordPage from './pages/SetNewPasswordPage'

export const history = createBrowserHistory()

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/actions" component={ActionsPage} />
      <Route
        path="/account/dashboard"
        component={DashboardPage}
        requireAuthentication
      />
      <Route path="/pages/faq" component={FaqPage} />
      <Route path="/pages/for-organizations" component={ForOrganizationsPage} />
      <Route
        path="/account/login"
        component={LoginPage}
        withoutHeader
        withoutFooter
      />
      <Route path="/pages/measurement-units" component={MeasurementUnitsPage} />
      <Route path="/pages/our-vision" component={OurVisionPage} />
      <Route
        path="/account/register"
        component={RegisterPage}
        withoutHeader
        withoutFooter
      />
      <Route
        path="/account/reset-password"
        component={ResetPasswordPage}
        withoutHeader
        withoutFooter
      />
      <Route
        path="/account/set-new-password"
        component={SetNewPasswordPage}
        withoutHeader
        withoutFooter
      />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
)

export default AppRouter
