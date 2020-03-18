import React, { Fragment, useState } from 'react'
import qs from 'qs'
import Spinner from 'components/Spinner'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { compose } from 'redux'
import SuggestedIconComponent from 'assets/icons/SuggestedIcon'
import FlagIconComponent from 'assets/icons/FlagIcon'
import ActionsIconComponent from 'assets/icons/HandIcon'
import StatisticsIconComponent from 'assets/icons/StatisticsIcon'

import useCampaign from './useCampaign'
import Header from './header'
import { Content } from './styled'
import renderParticipants from './participants'
import renderActions from './actions'
import renderActivity from './activity'
import renderStatistics from './statistics'
import { CAPMAIGN_TABS } from './constants'
import Tabs from './tabs'

function renderContent(view, props) {
  switch (view) {
    case CAPMAIGN_TABS.actions:
      return renderActions(props)
    case CAPMAIGN_TABS.participants:
      return renderParticipants(props)
    case CAPMAIGN_TABS.statistics:
      return renderStatistics(props)
    case CAPMAIGN_TABS.activity:
      return renderActivity(props)
    default:
      return null
  }
}
function CampaignDashboard(props) {
  let [showPhysicalValues, setShowPhysicalValues] = useState(false)
  const {
    location,
    intl: { formatMessage },
    match,
  } = props
  const query = qs.parse(location.search, { ignoreQueryPrefix: true })
  const campaignId = match.params.campaignId
  const view = query.view || CAPMAIGN_TABS.actions
  if (!campaignId) return null
  const [campaign, loading, participants] = useCampaign(campaignId)
  const sortedParticipants = participants.sort((a, b) =>
    a.user._id === props.user._id ? -1 : 1,
  )
  const me = sortedParticipants && sortedParticipants[0]
  const accomplishedUserActions = me ? me.accomplishedActions : []

  const toggleUnits = evt => {
    if (evt.key === 'PhysicalUnits') {
      setShowPhysicalValues(true)
    } else if (evt.key === 'TimeUnits') {
      setShowPhysicalValues(false)
    }
  }

  if (loading || !campaign) return <Spinner />
  return (
    <Fragment>
      <Header
        participantsCount={participants.length}
        campaign={campaign}
        accomplishedUserActions={accomplishedUserActions}
      />
      <Tabs
        list={[
          {
            to: `?view=${CAPMAIGN_TABS.actions}`,
            icon: ActionsIconComponent,
            text: formatMessage({ id: 'app.header.menu.actions' }),
            active: view === CAPMAIGN_TABS.actions,
          },
          {
            to: `?view=${CAPMAIGN_TABS.statistics}`,
            icon: StatisticsIconComponent,
            text: formatMessage({ id: 'app.pages.groups.statistics' }),
            active: view === CAPMAIGN_TABS.statistics,
          },
          {
            to: `?view=${CAPMAIGN_TABS.participants}`,
            icon: SuggestedIconComponent,
            text: formatMessage({ id: 'app.campaignPage.participants' }),
            active: view === CAPMAIGN_TABS.participants,
          },
          {
            to: `?view=${CAPMAIGN_TABS.activity}`,
            icon: FlagIconComponent,
            text: formatMessage({ id: 'app.pages.groups.activity' }),
            active: view === CAPMAIGN_TABS.activity,
          },
        ]}
      />
      <Content>
        {renderContent(view, {
          ...props,
          campaign,
          loading,
          participants,
          toggleUnits,
          showPhysicalValues,
        })}
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
