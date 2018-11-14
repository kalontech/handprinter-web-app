import React from 'react'
import { Layout } from 'antd'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Header from './components/Header'
import Footer from './components/Footer'

import LoadingPage from './pages/LoadingPage'

const RouteWrapper = ({
  component: Component,
  ready,
  requireAuthentication,
  token,
  withoutHeader,
  withoutFooter,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (ready) {
        if (requireAuthentication && !token) {
          return <Redirect to="/account/login" />
        } else {
          return (
            <Layout>
              {!withoutHeader && <Header />}
              <Layout.Content>
                <Component {...props} />
              </Layout.Content>
              {!withoutFooter && <Footer />}
            </Layout>
          )
        }
      } else {
        return (
          <Layout>
            <Layout.Content>
              <LoadingPage {...props} />
            </Layout.Content>
          </Layout>
        )
      }
    }}
  />
)

const mapStateToProps = state => ({
  ready: state.app.ready,
  token: state.account.token,
})

RouteWrapper.propTypes = {
  ready: PropTypes.bool.isRequired,
  token: PropTypes.string,
}

export default connect(mapStateToProps)(RouteWrapper)
