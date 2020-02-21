import React from 'react'
import moment from 'moment'
import { FormattedMessage, injectIntl } from 'react-intl'
import { compose } from 'redux'

import {
  HeaderCamapingDescription,
  CampaignStatusWrapper,
  CampaignStatus,
  DashboardHeaderUserName,
  Banner,
} from './styled'
import {
  DashboardHeaderWhiteLine,
  DashboardHeaderUserPictureWrap,
  DashboardHeaderUserPicture,
  DashboardHeaderUserSince,
} from '../DashboardPage/header'
import Progress from './progress'

const Header = props => {
  const { campaign, participantsCount, accomplishedUserActions } = props
  const { name, description, dateTo } = campaign
  const accomplished = accomplishedUserActions.length
  const expired = moment().isAfter(dateTo)

  const total = campaign.actions.length
  const numberToComplete =
    campaign.actionsNumberToComplete || campaign.actions.length
  const finished = accomplished >= numberToComplete
  let statusLabelId
  if (expired) statusLabelId = 'app.campaignPage.finished'
  if (finished) statusLabelId = 'app.campaignPage.completed'
  const membersCount = props.intl.formatMessage(
    { id: 'app.pages.groups.membersCount' },
    { count: participantsCount },
  )
  return (
    <DashboardHeaderWhiteLine organization>
      <Banner src={campaign.banner.src} />
      <DashboardHeaderUserPictureWrap>
        <DashboardHeaderUserPicture src={campaign.logo.src} />
      </DashboardHeaderUserPictureWrap>
      <DashboardHeaderUserName statusLabel={!!statusLabelId}>
        {name}
        {!!statusLabelId && (
          <CampaignStatusWrapper inactive={expired}>
            <CampaignStatus inactive={expired}>
              <FormattedMessage id={statusLabelId} />
            </CampaignStatus>
          </CampaignStatusWrapper>
        )}
      </DashboardHeaderUserName>
      <DashboardHeaderUserSince>{membersCount}</DashboardHeaderUserSince>
      <HeaderCamapingDescription>{description}</HeaderCamapingDescription>
      <Progress
        total={total}
        accomplished={accomplished}
        endDate={dateTo}
        expired={expired}
      />
    </DashboardHeaderWhiteLine>
  )
}

Header.propTypes = {
  campaign: Object,
  participantsCount: Number,
  intl: Object,
  accomplishedUserActions: Array,
}

export default compose(injectIntl)(Header)
