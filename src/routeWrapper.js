import React, { useEffect } from 'react'
import { Layout } from 'antd'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { ModalContainer } from 'react-router-modal'

import * as api from './api/user'

import Header from './components/Header'
import Footer from './components/Footer'
import Cta from './components/Cta'
import { getBrandedConfig } from './config/branded'
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
  withoutHeaderContent,
  ...rest
}) => {
  const brandedConfig = getBrandedConfig()

  useEffect(() => {
    if (user && user.firstLogin) {
      api.updateMe({ firstLogin: false }).then(user => user)
    }
  }, [])

  return (
    <>
      <Route
        {...rest}
        render={props => {
          if (ready) {
            if (requireAuthentication && !token) {
              return <Redirect to="/pages/home" />
            } else if (unauthorizedOnly && token) {
              return <Redirect to={'/account/dashboard'} />
            } else {
              if (requireAuthentication && !user) {
                return renderLoader(props)
              }
              return (
                <Layout>
                  {!withoutHeader && (
                    <Header
                      location={props.location}
                      withoutHeaderContent={withoutHeaderContent}
                      type={
                        headerType || useAuthentication
                          ? token
                            ? 'private'
                            : 'public'
                          : requireAuthentication
                          ? 'private'
                          : 'public'
                      }
                      overrides={
                        brandedConfig && {
                          brandName: brandedConfig.brandName,
                          ...brandedConfig.headerOverrides,
                        }
                      }
                    />
                  )}
                  <Layout.Content>
                    <Component
                      {...props}
                      user={user}
                      overrides={
                        brandedConfig && {
                          brandName: brandedConfig.brandName,
                          ...brandedConfig.headerOverrides,
                        }
                      }
                    />
                  </Layout.Content>
                  {!withoutCTA &&
                    !user &&
                    ((brandedConfig && brandedConfig.ctaComponent) || (
                      <Cta
                        overrides={
                          brandedConfig && {
                            brandName: brandedConfig.brandName,
                            ...brandedConfig.headerOverrides,
                          }
                        }
                      />
                    ))}
                  {!withoutFooter &&
                    ((brandedConfig && brandedConfig.footerComponent) || (
                      <Footer brandedConfig={brandedConfig} />
                    ))}
                  <ModalContainer />
                </Layout>
              )
            }
          } else {
            return renderLoader(props)
          }
        }}
      />
    </>
  )
}

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
