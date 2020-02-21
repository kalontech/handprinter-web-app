import React, { Fragment } from 'react'
import qs from 'qs'
import Spinner from 'components/Spinner'
import { connect } from 'react-redux'

import useCampaign from './useCampaign'
import Header from './header'

function CampaignDashboard(props) {
  const { location } = props
  const query = qs.parse(location.search, { ignoreQueryPrefix: true })
  const campaignId = query && query.campaignId
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
    </Fragment>
  )
}

CampaignDashboard.propTypes = {
  location: Object,
  user: Object,
}

const mapStateToProps = state => ({
  user: state.user.data,
})

export default connect(mapStateToProps)(CampaignDashboard)
