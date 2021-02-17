import React, { useEffect, useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import * as apiOrganization from 'api/organization'
import * as apiUser from 'api/user'
import _ from 'lodash'

import Header from './Header'
import { Body, Column, MainColumn } from './styled'
import GetStarted from './GetStarted'
import UserName from './UserName'
import NetPositiveDays from './NetPositiveDays'
import Calendar from './Calendar'
import TakeAction from './TakeAction'
import TakeCampaignActions from './TakeCampaignActions'

function DashboardBrandPage(props) {
  const { user } = props

  const [organization, setOrganization] = useState()
  const [dashboardData, setDashboardData] = useState()

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

  useEffect(() => {
    async function fetch() {
      try {
        const res = await apiUser.getDashboardData({
          userId: user._id,
          subset: 'user',
        })
        if (res) {
          setDashboardData(res)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetch()
  }, [user._id])

  const actionsTakenCount = _.get(user, 'userImpact.actions.length')
  const isReturnUser = actionsTakenCount > 0
  return (
    <>
      <Header user={user} organization={organization} />
      <Body>
        <Column>
          <UserName
            user={user}
            isReturnUser={isReturnUser}
            actionsTakenCount={actionsTakenCount}
            personalStats={dashboardData?.stats?.personal}
          />
          <NetPositiveDays user={user} ratio={dashboardData?.ratio} />
          <Calendar
            isReturnUser={isReturnUser}
            calendar={dashboardData?.calendar}
          />
        </Column>
        <MainColumn>
          {!isReturnUser && <GetStarted />}
          {!isReturnUser && <TakeAction />}
          {isReturnUser && <TakeCampaignActions />}
        </MainColumn>
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
