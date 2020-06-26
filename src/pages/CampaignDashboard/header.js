import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { FormattedMessage, injectIntl } from 'react-intl'
import { compose } from 'redux'
import colors from 'config/colors'
import { sizes } from 'utils/mediaQueryTemplate'
import styled from 'styled-components'
import { Icon } from 'antd'

import {
  HeaderCamapingDescription,
  CampaignStatusWrapper,
  CampaignStatus,
  DashboardHeaderUserName,
  Banner,
  BreadcrumbStyled,
  BreadcrumbItem,
  BreadcrumbStyledMobile,
} from './styled'
import {
  DashboardHeaderWhiteLine,
  DashboardHeaderUserPictureWrap,
  DashboardHeaderUserPicture,
  DashboardHeaderUserSince,
} from '../DashboardPage/header'
import Progress from './progress'

const StyledArrowIcon = styled(Icon)`
  svg {
    width: 15px;
    height: 15px;
    color: ${colors.gray};
    margin-right: 15px;
  }
`

const Header = props => {
  const [width, setWidth] = useState(window.innerWidth)
  const { campaign, participantsCount, accomplishedUserActions } = props
  const { name, description, dateTo } = campaign
  const accomplished = accomplishedUserActions.length
  const expired = moment().isAfter(dateTo)

  const isTablet = width < sizes.largeDesktop
  const isMobile = width < sizes.tablet

  const total = campaign.actions.length
  const numberToComplete =
    campaign.actionsNumberToComplete || campaign.actions.length
  const finished = accomplished >= numberToComplete
  let statusLabelId
  if (expired) statusLabelId = 'app.campaignPage.finished'
  if (finished) statusLabelId = 'app.campaignPage.completed'
  const membersCount = props.participantsLoading
    ? ''
    : props.intl.formatMessage(
        { id: 'app.pages.groups.membersCount' },
        { count: participantsCount },
      )

  const tooltipText =
    accomplished >= numberToComplete
      ? props.intl.formatMessage({
          id: 'app.competitions.you.reached.challenge',
        })
      : props.intl.formatMessage(
          { id: 'app.competitions.you.need.take' },
          {
            numberToComplete: numberToComplete - accomplished,
          },
        )

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth)
  }

  return (
    <DashboardHeaderWhiteLine organization>
      {isTablet && (
        <BreadcrumbStyledMobile separator=">">
          <StyledArrowIcon type="left" />
          <BreadcrumbItem style={{ color: colors.darkGray }} href="/challenges">
            <FormattedMessage id="app.pages.challenges" />
          </BreadcrumbItem>
        </BreadcrumbStyledMobile>
      )}
      {!isMobile && !isTablet && (
        <BreadcrumbStyled separator=">">
          <BreadcrumbItem style={{ color: colors.green }} href="/challenges">
            <FormattedMessage id="app.pages.challenges" />
          </BreadcrumbItem>
          <BreadcrumbItem>{name}</BreadcrumbItem>
        </BreadcrumbStyled>
      )}
      <Banner src={campaign.banner.src} />
      <DashboardHeaderUserPictureWrap>
        <DashboardHeaderUserPicture src={campaign.logo.src} />
      </DashboardHeaderUserPictureWrap>
      {!isTablet && !isMobile && (
        <DashboardHeaderUserName statusLabel={!!statusLabelId}>
          {name}
          <DashboardHeaderUserSince>{membersCount}</DashboardHeaderUserSince>
          {!!statusLabelId && (
            <CampaignStatusWrapper inactive={expired}>
              <CampaignStatus inactive={expired}>
                <FormattedMessage id={statusLabelId} />
              </CampaignStatus>
            </CampaignStatusWrapper>
          )}
        </DashboardHeaderUserName>
      )}
      {(isTablet || isMobile) && (
        <DashboardHeaderUserName statusLabel={!!statusLabelId}>
          {name}
          <DashboardHeaderUserSince>{membersCount}</DashboardHeaderUserSince>
          {!!statusLabelId && (
            <CampaignStatusWrapper inactive={expired}>
              <CampaignStatus inactive={expired}>
                <FormattedMessage id={statusLabelId} />
              </CampaignStatus>
            </CampaignStatusWrapper>
          )}
        </DashboardHeaderUserName>
      )}
      <HeaderCamapingDescription>{description}</HeaderCamapingDescription>
      <Progress
        total={total}
        successCount={numberToComplete}
        accomplished={accomplished}
        endDate={dateTo}
        expired={expired}
        tooltipText={tooltipText}
        isMobile={isMobile}
        isTablet={isTablet}
      />
    </DashboardHeaderWhiteLine>
  )
}

Header.propTypes = {
  campaign: Object,
  participantsCount: Number,
  intl: Object,
  accomplishedUserActions: Array,
  participantsLoading: Boolean,
}

export default compose(injectIntl)(Header)
