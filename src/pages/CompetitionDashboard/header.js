import React from 'react'
import moment from 'moment'
import { FormattedMessage, injectIntl } from 'react-intl'
import { compose } from 'redux'
import colors from 'config/colors'

import {
  HeaderCamapingDescription,
  CampaignStatusWrapper,
  CampaignStatus,
  DashboardHeaderUserName,
  Banner,
  BreadcrumbStyled,
  BreadcrumbItem,
  HeaderCompetitionButton,
  HeaderCompetitionButtonContainer,
} from './styled'
import {
  DashboardHeaderWhiteLine,
  DashboardHeaderUserPictureWrap,
  DashboardHeaderUserPicture,
  DashboardHeaderUserSince,
} from '../DashboardPage/header'

const Header = props => {
  const { competition, participantsCount, accomplishedUserActions } = props
  const { name, description, dateTo } = competition
  const accomplished = accomplishedUserActions.length
  const expired = moment().isAfter(dateTo)

  const numberToComplete =
    competition.actionsNumberToComplete || competition.actions.length
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
      <BreadcrumbStyled separator=">">
        <BreadcrumbItem
          style={{ color: colors.green }}
          href="/challenges/campaigns"
        >
          <FormattedMessage id="app.pages.challenges" />
        </BreadcrumbItem>
        <BreadcrumbItem
          style={{ color: colors.green }}
          href="/challenges/competitions"
        >
          <FormattedMessage id="app.actionsPage.tabs.competitions" />
        </BreadcrumbItem>
        <BreadcrumbItem>{name}</BreadcrumbItem>
      </BreadcrumbStyled>
      <Banner src={competition.banner.src} />
      <DashboardHeaderUserPictureWrap>
        <DashboardHeaderUserPicture src={competition.logo.src} />
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
      <HeaderCompetitionButtonContainer>
        <HeaderCompetitionButton>
          <FormattedMessage id="app.pages.groups.youAreMember" />
        </HeaderCompetitionButton>
      </HeaderCompetitionButtonContainer>
    </DashboardHeaderWhiteLine>
  )
}

Header.propTypes = {
  competition: Object,
  participantsCount: Number,
  intl: Object,
  accomplishedUserActions: Array,
}

export default compose(injectIntl)(Header)
