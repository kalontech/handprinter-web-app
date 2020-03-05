import React, { Fragment } from 'react'
import qs from 'qs'
import Spinner from 'components/Spinner'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { compose } from 'redux'
import SuggestedIconComponent from 'assets/icons/SuggestedIcon'
import FlagIconComponent from 'assets/icons/FlagIcon'
import ActionsIconComponent from 'assets/icons/HandIcon'
import StatisticsIconComponent from 'assets/icons/StatisticsIcon'

import useCompetition from './useCompetition'
import Header from './header'
import { Content } from './styled'
import renderParticipants from './participants'
import renderActions from './actions'
import renderActivity from './activity'
import renderStatistics from './statistics'
import { COMPETITION_TABS } from './constants'
import Tabs from './tabs'

function renderContent(view, props) {
  return null
  switch (view) {
    case COMPETITION_TABS.actions:
      return renderActions(props)
    case COMPETITION_TABS.participants:
      return renderParticipants(props)
    case COMPETITION_TABS.statistics:
      return renderStatistics(props)
    case COMPETITION_TABS.activity:
      return renderActivity(props)
    default:
      return null
  }
}
function CampaignDashboard(props) {
  const {
    location,
    intl: { formatMessage },
    match,
  } = props
  const query = qs.parse(location.search, { ignoreQueryPrefix: true })
  const competitionId = match.params.competitionId
  const view = query.view || COMPETITION_TABS.actions
  if (!competitionId) return null
  const [competition, loading, participants] = useCompetition(competitionId)
  const sortedParticipants = participants.sort((a, b) =>
    a.user._id === props.user._id ? -1 : 1,
  )
  const me = sortedParticipants && sortedParticipants[0]
  const accomplishedUserActions = me ? me.accomplishedActions : []
  if (loading || !competition) return <Spinner />
  return (
    <Fragment>
      <Header
        participantsCount={participants.length}
        competition={competition}
        accomplishedUserActions={accomplishedUserActions}
      />
      <Tabs
        list={[
          {
            to: `?view=${COMPETITION_TABS.actions}`,
            icon: ActionsIconComponent,
            text: formatMessage({ id: 'app.header.menu.actions' }),
            active: view === COMPETITION_TABS.actions,
          },
          {
            to: `?view=${COMPETITION_TABS.statistics}`,
            icon: StatisticsIconComponent,
            text: formatMessage({ id: 'app.pages.groups.statistics' }),
            active: view === COMPETITION_TABS.statistics,
          },
          {
            to: `?view=${COMPETITION_TABS.participants}`,
            icon: SuggestedIconComponent,
            text: formatMessage({ id: 'app.campaignPage.participants' }),
            active: view === COMPETITION_TABS.participants,
          },
          {
            to: `?view=${COMPETITION_TABS.groups}`,
            icon: SuggestedIconComponent,
            text: formatMessage({ id: 'app.pages.groups.myGroups' }),
            active: view === COMPETITION_TABS.groups,
          },
          {
            to: `?view=${COMPETITION_TABS.activity}`,
            icon: FlagIconComponent,
            text: formatMessage({ id: 'app.pages.groups.activity' }),
            active: view === COMPETITION_TABS.activity,
          },
        ]}
      />
      <Content>
        {renderContent(view, { ...props, competition, loading, participants })}
      </Content>
    </Fragment>
  )
}

CampaignDashboard.propTypes = {
  location: Object,
  match: Object,
  user: Object,
  intl: Object,
}

const mapStateToProps = state => ({
  user: state.user.data,
})

export default compose(
  injectIntl,
  connect(mapStateToProps),
)(CampaignDashboard)
