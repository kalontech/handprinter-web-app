import React from 'react'
import { Layout } from 'antd'
import { Route } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'

const RouteWrapper = ({
  component: Component,
  withHeader = true,
  withFooter = true,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (
      <Layout>
        {withHeader && <Header />}
        <Layout.Content>
          <Component {...props} />
        </Layout.Content>
        {withFooter && <Footer />}
      </Layout>
    )}
  />
)

export default RouteWrapper
