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
import TabsSecondary from 'components/TabsSecondary'

import useCampaign from './useCampaign'
import Header from './header'

function CampaignDashboard(props) {
  const {
    location,
    intl: { formatMessage },
    match,
  } = props
  const query = qs.parse(location.search, { ignoreQueryPrefix: true })
  const campaignId = match.params.campaignId
  const view = query && query.view
  if (!campaignId) return null
  const [campaign, loading, participants] = useCampaign(campaignId)
  const me = participants.find(i => i.user._id === props.user._id)
  const accomplishedUserActions = me ? me.accomplishedActions : []

  if (loading || !campaign) return <Spinner />
  return (
    <Fragment>
      <Header
        participantsCount={participants.length}
        campaign={campaign}
        accomplishedUserActions={accomplishedUserActions}
      />
      <TabsSecondary
        list={[
          {
            to: `?view=actions`,
            icon: ActionsIconComponent,
            text: formatMessage({ id: 'app.header.menu.actions' }),
            active: view === 'actions',
          },
          {
            to: `?view=statistics`,
            icon: StatisticsIconComponent,
            text: formatMessage({ id: 'app.pages.groups.statistics' }),
            active: view === 'statistics',
          },
          {
            to: `?view=participants`,
            icon: SuggestedIconComponent,
            text: formatMessage({ id: 'app.campaignPage.participants' }),
            active: view === 'participants',
          },
          {
            to: `?view=activity`,
            icon: FlagIconComponent,
            text: formatMessage({ id: 'app.pages.groups.activity' }),
            active: view === 'activity',
          },
        ]}
        justify={'center'}
      />
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
