import React from 'react'
import { Redirect, Router, Switch } from 'react-router-dom'
import { ModalRoute } from 'react-router-modal'
import createBrowserHistory from 'history/createBrowserHistory'
import GoogleAnalytics from 'react-ga'

import env from 'config/env'

import ErrorCatcher from './utils/errorCatcher'
import { getBrandedConfig } from './config/branded'

import Route from './routeWrapper'

import ActionModalPage from './pages/ActionModalPage'
import ActionsPage from './pages/ActionsPage'
import GroupsListPage from './pages/GroupsList'
import ChallengesListPage from './pages/ChallengesList'
import CampaignDashboardPage from './pages/CampaignDashboard'
import CompetitionDashboardPage from './pages/CompetitionDashboard'
import GroupViewPage from './pages/GroupView'
import CheckYourEmailPage from './pages/CheckYourEmailPage'
import DashboardPage from './pages/DashboardPage'
import DashboardBrandPage from './pages/DashboardBrandPage'
import FaqPage from './pages/FaqPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import MeasurementUnitsPage from './pages/MeasurementUnitsPage'
import NotFoundPage from './pages/NotFoundPage'
import OurVisionPage from './pages/OurVisionPage'
import RegisterPage from './pages/RegisterPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import CurrentActionPage from './pages/CurrentAction'
import SetNewPasswordPage from './pages/SetNewPasswordPage'
import ProfilePage from './pages/ProfilePage'
import IncreaseHandprintPage from './pages/IncreaseHandprintPage'
import PrivacyPolicyTermsPages from './pages/PrivacyPolicyTermsPages'
import CreateOrganizationPage from './pages/CreateOrganizationPage'
import CreateOrganizationSuccessPage from './pages/CreateOrganizationSuccessPage'
import ForOrganizationsPage from './pages/ForOrganizationsPage'
import DonationPage from './pages/DonationPage'
import OrganizationList from './pages/OrganizationList'
import AddAdminsModalPage from './pages/AddAdminsModalPage'
import OrganizationDashboardPage from './pages/OrganizationDashboardPage'
import IncreaseOrganizationHandprintPage from './pages/IncreaseOrganizationHandprintPage'

const { REACT_APP_ENVIRONMENT, REACT_APP_GA_TRACKING_CODE } = env

export const history = createBrowserHistory()
export const BRANDS_WITH_OWN_DASHBOARD = ['Humanscale', 'Stantec']

if (REACT_APP_ENVIRONMENT === 'production') {
  GoogleAnalytics.initialize(REACT_APP_GA_TRACKING_CODE)

  history.listen(location => {
    // Track GA page view
    const page = location.pathname + location.search
    GoogleAnalytics.set({ page })
    GoogleAnalytics.pageview(page)
  })
}

const AppRouter = () => {
  const brandedConfig = getBrandedConfig()
  return (
    <Router history={history}>
      <ErrorCatcher>
        <Switch>
          <Redirect exact from="/" to="/account/dashboard" />
          <Route
            path="/pages/home"
            component={
              (brandedConfig && brandedConfig.homePageComponent) || HomePage
            }
            useAuthentication
          />
          <Redirect exact from="/actions" to="/actions/discover" />
          <Route
            path="/actions/:subset/:slug?"
            component={ActionsPage}
            useAuthentication
            withoutCTA
          />
          <Route
            path="/groups/view/:id/:subset"
            component={GroupViewPage}
            useAuthentication
            withoutCTA
            requireAuthentication
          />
          <Route
            path="/groups/:subset"
            component={GroupsListPage}
            useAuthentication
            withoutCTA
            requireAuthentication
          />
          <Route
            path="/account/check-your-email"
            component={CheckYourEmailPage}
            withoutHeader
            withoutCTA
            withoutFooter
            withoutHeaderContent
          />
          <Route
            path="/account/dashboard/:subset?"
            component={DashboardBrandPage}
            requireAuthentication
            withoutCTA
          />
          <Route
            path="/account/code"
            component={IncreaseHandprintPage}
            requireAuthentication
            withoutCTA
          />
          <Route
            path="/pages/faq"
            component={FaqPage}
            withoutCTA
            useAuthentication
          />
          {!brandedConfig && (
            <Route
              path="/pages/for-organizations"
              component={ForOrganizationsPage}
              useAuthentication
              withoutCTA
            />
          )}
          <Route
            path="/account/login"
            component={LoginPage}
            headerType="minimal"
            unauthorizedOnly
            withoutHeaderContent
            withoutCTA
            withoutFooter
          />
          <Route
            path="/pages/measurement-units"
            component={MeasurementUnitsPage}
            useAuthentication
          />
          <Route
            path="/pages/privacy-policy"
            component={PrivacyPolicyTermsPages}
            useAuthentication
            withoutCTA
          />
          {!brandedConfig && (
            <Route
              path="/pages/donations"
              component={DonationPage}
              withoutCTA
              useAuthentication
            />
          )}
          <Route
            path="/organizations/:organizationId/dashboard/:subset"
            component={OrganizationDashboardPage}
            useAuthentication
          />
          <Route
            path="/pages/our-vision"
            component={OurVisionPage}
            useAuthentication
          />
          <Route
            path="/account/profile"
            component={ProfilePage}
            requireAuthentication
            withoutCTA
          />
          <Route
            path="/account/register/:invitationCode?/:eatonCode?"
            component={RegisterPage}
            headerType="minimal"
            unauthorizedOnly
            withoutHeaderContent
            withoutCTA
            withoutFooter
          />
          <Route
            path="/account/reset-password"
            component={ResetPasswordPage}
            headerType="minimal"
            unauthorizedOnly
            withoutHeaderContent
            withoutCTA
            withoutFooter
          />
          <Route
            path="/account/set-new-password/:code"
            component={SetNewPasswordPage}
            headerType="minimal"
            unauthorizedOnly
            withoutHeaderContent
            withoutCTA
            withoutFooter
          />
          <Route
            path="/account/actions/:type(preview|edit|create|success)/:slug?"
            component={CurrentActionPage}
            headerType="minimal"
            requireAuthentication
            withoutHeaderContent
            withoutCTA
            withoutFooter
          />
          <Route
            path="/account/create-organization/success"
            component={CreateOrganizationSuccessPage}
            headerType="minimal"
            withoutHeaderContent
            withoutCTA
            withoutFooter
            useAuthentication
          />
          <Route
            path="/account/create-organization"
            component={CreateOrganizationPage}
            headerType="minimal"
            withoutHeaderContent
            withoutCTA
            withoutFooter
            useAuthentication
          />
          <Route
            path="/account/:personId/:subset?"
            component={DashboardPage}
            useAuthentication
            withoutCTA
          />
          <Route
            path="/organizations/invite"
            component={IncreaseOrganizationHandprintPage}
            requireAuthentication
            withoutCTA
          />
          <Route
            path="/organizations/:subset"
            component={OrganizationList}
            useAuthentication
            requireAuthentication
            withoutCTA
          />
          <Route
            path="/challenges/campaigns/dashboard/:campaignId"
            component={CampaignDashboardPage}
            useAuthentication
            withoutCTA
            requireAuthentication
          />
          <Route
            path="/challenges/competitions/dashboard/:competitionId"
            component={CompetitionDashboardPage}
            useAuthentication
            withoutCTA
            requireAuthentication
          />
          <Route
            path="/challenges"
            component={ChallengesListPage}
            useAuthentication
            withoutCTA
            requireAuthentication
          />
          <Route component={NotFoundPage} useAuthentication withoutCTA />
        </Switch>

        <Switch>
          <ModalRoute
            path="/actions/:subset/:slug"
            parentPath={({ params }) => `/actions/${params.subset}`}
            onBackdropClick={() => {}}
            component={ActionModalPage}
          />

          <ModalRoute
            path="/pages/:page/actions/:slug"
            parentPath={({ params }) => `/pages/${params.page}`}
            component={ActionModalPage}
          />

          <ModalRoute
            path="/account/news/actions/:slug"
            parentPath="/account/news"
            component={ActionModalPage}
          />

          <ModalRoute
            path="/groups/view/:id/:subset/:slug"
            parentPath={({ params }) =>
              `/groups/view/${params.id}/${params.subset}`
            }
            component={ActionModalPage}
          />

          <ModalRoute
            path="/account/dashboard/organizations/add-admins/:organizationId"
            parentPath={({ params }) =>
              `/account/dashboard?organizationId=${params.organizationId}`
            }
            component={AddAdminsModalPage}
          />
        </Switch>
      </ErrorCatcher>
    </Router>
  )
}

export default AppRouter
