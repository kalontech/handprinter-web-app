import React, { useEffect, useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import * as apiOrganization from 'api/organization'
import _ from 'lodash'

import Header from './Header'
import { Body, Column, MainColumn } from './styled'
import GetStarted from './GetStarted'

function DashboardBrandPage(props) {
  const { user } = props

  const [organization, setOrganization] = useState()

  useEffect(() => {
    async function fetch() {
      try {
        const res = await apiOrganization.search(user.belongsToBrand)
        if (res && res.organizations) {
          setOrganization(res.organizations[0])
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetch()
  }, [user.belongsToBrand])

  const isReturnUser = _.get(user, 'userImpact.actions.length') > 0
  return (
    <>
      <Header user={user} organization={organization} />
      <Body>
        <Column />
        <MainColumn>{!isReturnUser && <GetStarted />}</MainColumn>
        <Column />
      </Body>
    </>
  )
}

const mapStateToProps = state => ({
  user: state.user.data,
  countries: state.app.countries,
})

export default compose(
  injectIntl,
  connect(mapStateToProps),
)(DashboardBrandPage)
