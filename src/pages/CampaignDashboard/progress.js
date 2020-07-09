import React from 'react'
import { Progress, Tooltip } from 'antd'
import { injectIntl } from 'react-intl'
import { compose } from 'redux'

import { number } from 'prop-types'
import colors from 'config/colors'

import moment from 'moment'

import {
  ProgressWrapper,
  ProgressTextWrapper,
  ProgressText,
  ProgressTextMobile,
  StyledIcon,
} from './styled'

function CampaignProgress(props) {
  const {
    total,
    accomplished,
    endDate,
    expired,
    successCount,
    tooltipText,
    isMobile,
    isTablet,
  } = props
  const percent = (accomplished / total) * 100
  const successPercent = (successCount / total) * 100
  const accomplishedLabel = props.intl.formatMessage(
    { id: 'app.campaignPage.progress.accomplished' },
    { accomplished, total },
  )
  const daysLeft = props.intl.formatMessage(
    { id: 'app.campaignPage.progress.daysLeft' },
    {
      days: expired ? 0 : moment(endDate).diff(moment(), 'days'),
    },
  )
  return (
    <Tooltip title={tooltipText}>
      <ProgressWrapper>
        {!isMobile && !isTablet && (
          <>
            <ProgressTextWrapper>
              <ProgressText>{accomplishedLabel}</ProgressText>
              <ProgressText>{daysLeft}</ProgressText>
            </ProgressTextWrapper>
            <Progress
              percent={percent}
              successPercent={Math.min(percent, successPercent)}
              showInfo={false}
              strokeColor={expired ? colors.darkGray : undefined}
              strokeWidth={4}
            />
          </>
        )}
        {(isMobile || isTablet) && (
          <>
            <ProgressTextWrapper>
              <ProgressText>{accomplishedLabel}</ProgressText>
              <Tooltip title={tooltipText} placement="topRight">
                <StyledIcon type="info-circle" />
              </Tooltip>
            </ProgressTextWrapper>
            <Progress
              percent={percent}
              successPercent={Math.min(percent, successPercent)}
              showInfo={false}
              strokeColor={expired ? colors.darkGray : undefined}
              strokeWidth={4}
              trigger="click"
            />
            <ProgressTextWrapper>
              <ProgressTextMobile>{daysLeft}</ProgressTextMobile>
            </ProgressTextWrapper>
          </>
        )}
      </ProgressWrapper>
    </Tooltip>
  )
}

CampaignProgress.propTypes = {
  total: number,
  accomplished: number,
  successCount: number,
  endDate: Date,
  intl: Object,
  expired: Boolean,
  tooltipText: String,
  isMobile: Boolean,
  isTablet: Boolean,
}

export default compose(injectIntl)(CampaignProgress)
