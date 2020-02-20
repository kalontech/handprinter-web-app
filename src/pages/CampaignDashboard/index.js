import React, { Fragment } from 'react'
import qs from 'qs'
import Spinner from 'components/Spinner'

import useCampaign from './useCampaign'
import {
  DashboardHeaderGreenLine,
  HeaderFingerprintBackground,
} from '../DashboardPage'
import Header from './header'

export default function CampaignDashboard(props) {
  const { location } = props
  const query = qs.parse(location.search, { ignoreQueryPrefix: true })
  const campaignId = query && query.campaignId
  if (!campaignId) return null
  const [campaign, loading] = useCampaign(campaignId)
  if (loading || !campaign) return <Spinner />
  return (
    <Fragment>
      <DashboardHeaderGreenLine>
        <HeaderFingerprintBackground />
      </DashboardHeaderGreenLine>
      <Header
        participantsCount={28} // TODO
        campaign={campaign}
      />
    </Fragment>
  )
}

CampaignDashboard.propTypes = {
  location: Object,
}
