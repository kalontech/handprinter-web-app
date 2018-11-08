import React from 'react'
import { Layout } from 'antd'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Header from './components/Header'
import Footer from './components/Footer'

import LoadingPage from './pages/LoadingPage'

const RouteWrapper = ({
  component: Component,
  withHeader = true,
  withFooter = true,
  ready,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (
      <Layout>
        {ready ? (
          <React.Fragment>
            {withHeader && <Header />}
            <Layout.Content>
              <Component {...props} />
            </Layout.Content>
            {withFooter && <Footer />}
          </React.Fragment>
        ) : (
          <LoadingPage {...props} />
        )}
      </Layout>
    )}
  />
)

const mapStateToProps = state => ({
  ready: state.app.ready,
})

RouteWrapper.propTypes = {
  ready: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps)(RouteWrapper)
