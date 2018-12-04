import React from 'react'
import { Layout } from 'antd'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { ModalContainer } from 'react-router-modal'

import Header from './components/Header'
import Footer from './components/Footer'
import Cta from './components/Cta'

import LoadingPage from './pages/LoadingPage'

const renderLoader = props => (
  <Layout>
    <Layout.Content>
      <LoadingPage {...props} />
    </Layout.Content>
  </Layout>
)

const RouteWrapper = ({
  component: Component,
  ready,
  requireAuthentication,
  token,
  headerType,
  unauthorizedOnly,
  useAuthentication,
  user,
  withoutHeader,
  withoutCTA,
  withoutFooter,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (ready) {
        if (requireAuthentication && !token) {
          return <Redirect to="/account/login" />
        } else if (unauthorizedOnly && token) {
          return <Redirect to="/account/dashboard" />
        } else {
          if (requireAuthentication && !user) {
            return renderLoader(props)
          }
          return (
            <Layout>
              {!withoutHeader && (
                <Header
                  type={
                    headerType || useAuthentication
                      ? token
                        ? 'private'
                        : 'public'
                      : false || (requireAuthentication ? 'private' : 'public')
                  }
                />
              )}
              <Layout.Content>
                <Component {...props} />
              </Layout.Content>
              {!withoutCTA && <Cta />}
              {!withoutFooter && <Footer />}
              <ModalContainer />
            </Layout>
          )
        }
      } else {
        return renderLoader(props)
      }
    }}
  />
)

const mapStateToProps = state => ({
  ready: state.app.ready,
  token: state.account.token,
  user: state.user.data,
})

RouteWrapper.propTypes = {
  ready: PropTypes.bool.isRequired,
  token: PropTypes.string,
}

export default connect(mapStateToProps)(RouteWrapper)
