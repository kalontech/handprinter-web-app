import React, { useEffect, useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import * as apiUser from 'api/user'
import _ from 'lodash'

import { fetchCampaignsList } from '../../api/campaigns'

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

  const [dashboardData, setDashboardData] = useState()
  const [teams, setTeams] = useState()
  const [campaigns, setCampaigns] = useState()

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
        const {
          campaigns: { docs: campaigns },
        } = await fetchCampaignsList({
          userId: user._id,
        })
        const filteredCampaigns = campaigns.filter(
          c => new Date(c.dateFrom) > new Date(new Date().getFullYear(), 0, 1),
        )
        setCampaigns(filteredCampaigns)
      } catch (error) {
        console.error(error)
      }
    }

    fetch()
  }, [user])

  useEffect(() => {
    async function fetch() {
      try {
        const userGroups = await fetchGroupsList({
          subset: GROUPS_SUBSETS.TEAMS,
          limit: 100,
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
    setTimeout(() => fetch(), 1000)
  }, [])

  const takenActions = _.get(dashboardData, 'takenActions', [])
  const actionsTakenCount =
    takenActions.length || _.get(user, 'userImpact.actions.length')
  const isReturnUser = actionsTakenCount > 0
  return (
    <>
      <Body>
        <Column>
          <UserName
            user={user}
            ratio={dashboardData?.ratio}
            calendar={dashboardData?.calendar}
            isReturnUser={isReturnUser}
            actionsTakenCount={actionsTakenCount}
            personalStats={dashboardData?.stats?.personal}
          />
          <Calendar
            isReturnUser={isReturnUser}
            calendar={dashboardData?.calendar}
          />
          <NetPositiveDays user={user} ratio={dashboardData?.ratio} />

          <Campaigns user={user} campaigns={campaigns} intl={props.intl} />
          <MyNetwork
            user={user}
            isReturnUser={isReturnUser}
            stats={dashboardData?.stats}
            network={dashboardData?.network}
          />
        </Column>
        <MainColumn>
          {!isReturnUser && <GetStarted />}
          {isReturnUser && actionsTakenCount < 3 && (
            <PositiveImpacts user={user} takenActions={takenActions} />
          )}
          {!isReturnUser && <TakeAction />}
          {isReturnUser && (
            <TakeCampaignActions
              user={user}
              campaigns={campaigns}
              takenActions={takenActions}
              intl={props.intl}
            />
          )}
          <TeamActivity user={user} history={history} />
        </MainColumn>
        {user.belongsToBrand === 'humanscale' && (
          <Column>
            <MyOrganization organization={user.organization} />
            <MyTeam user={user} teams={teams} />
            <TeamStandings teams={teams} />
          </Column>
        )}
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
