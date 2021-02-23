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
import PositiveImpacts from './PositiveImpacts'
import MyOrganization from './MyOrganization'
import MyTeam from './MyTeam'
import Campaigns from './Campaigns'
import MyNetwork from './MyNetwork'
import TeamActivity from './TeamActivity'
import TeamStandings from './TeamStandings'
import { fetchGroupsList } from '../../api/groups'
import { GROUPS_SUBSETS } from '../../utils/constants'

function DashboardBrandPage(props) {
  const { user, history } = props

  const [organization, setOrganization] = useState()
  const [dashboardData, setDashboardData] = useState()
  const [teams, setTeams] = useState()

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
        const res = await apiUser.getDashboardData()
        if (res) {
          setDashboardData(res)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetch()
  }, [user._id])

  useEffect(() => {
    async function fetch() {
      try {
        const userGroups = await fetchGroupsList({
          subset: GROUPS_SUBSETS.TEAMS,
        })
        const brandTeams =
          userGroups?.groups?.docs?.filter(
            group =>
              group.belongsToBrand &&
              group.belongsToBrand === user?.belongsToBrand,
          ) || []
        setTeams(
          brandTeams.sort(
            (a, b) => b.netPositiveDays.climate - a.netPositiveDays.climate,
          ),
        )
      } catch (error) {
        console.error(error)
      }
    }
    fetch()
  }, [])

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
          <Campaigns user={user} intl={props.intl} />
          <MyNetwork
            user={user}
            isReturnUser={isReturnUser}
            stats={dashboardData?.stats}
            network={dashboardData?.network}
          />
        </Column>
        <MainColumn>
          {!isReturnUser && <GetStarted />}
          {isReturnUser && <PositiveImpacts user={user} />}
          {!isReturnUser && <TakeAction />}
          {isReturnUser && <TakeCampaignActions />}
          <TeamActivity user={user} history={history} />
        </MainColumn>
        <Column>
          <MyOrganization user={user} />
          <MyTeam user={user} teams={teams} />
          <TeamStandings teams={teams} />
        </Column>
      </Body>
    </>
  )
}

const mapStateToProps = state => ({
  user: state.user.data,
})

export default compose(
  injectIntl,
  connect(mapStateToProps),
)(DashboardBrandPage)
