import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import Route from './routeWrapper'

import ActionsPage from './pages/ActionsPage'
import DashboardPage from './pages/DashboardPage'
import FaqPage from './pages/FaqPage'
import ForOrganizationsPage from './pages/ForOrganizationsPage'
import HomePage from './pages/HomePage'
import LogInPage from './pages/LogInPage'
import MeasurementUnitsPage from './pages/MeasurementUnitsPage'
import NotFoundPage from './pages/NotFoundPage'
import OurVisionPage from './pages/OurVisionPage'
import RegisterPage from './pages/RegisterPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import SetNewPasswordPage from './pages/SetNewPasswordPage'

const AppRouter = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/actions" component={ActionsPage} />
      <Route path="/account/dashboard" component={DashboardPage} />
      <Route path="/pages/faq" component={FaqPage} />
      <Route path="/pages/for-organizations" component={ForOrganizationsPage} />
      <Route
        path="/account/login"
        component={LogInPage}
        withHeader={false}
        withFooter={false}
      />
      <Route path="/pages/measurement-units" component={MeasurementUnitsPage} />
      <Route path="/pages/our-vision" component={OurVisionPage} />
      <Route
        path="/account/register"
        component={RegisterPage}
        withHeader={false}
        withFooter={false}
      />
      <Route
        path="/account/reset-password"
        component={ResetPasswordPage}
        withHeader={false}
        withFooter={false}
      />
      <Route
        path="/account/set-new-password"
        component={SetNewPasswordPage}
        withHeader={false}
        withFooter={false}
      />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
)

export default AppRouter
