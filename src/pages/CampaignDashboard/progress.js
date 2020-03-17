import React from 'react'
import { Progress, Tooltip } from 'antd'
import { injectIntl } from 'react-intl'
import { compose } from 'redux'

import { number } from 'prop-types'
import colors from 'config/colors'

import moment from 'moment'

import { ProgressWrapper, ProgressTextWrapper, ProgressText } from './styled'

function CampaignProgress(props) {
  const {
    total,
    accomplished,
    endDate,
    expired,
    successCount,
    tooltipText,
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
    <ProgressWrapper>
      <ProgressTextWrapper>
        <ProgressText>{accomplishedLabel}</ProgressText>
        <ProgressText>{daysLeft}</ProgressText>
      </ProgressTextWrapper>
      <Tooltip title={tooltipText}>
        <Progress
          percent={percent}
          successPercent={Math.min(percent, successPercent)}
          showInfo={false}
          strokeColor={expired ? colors.darkGray : undefined}
          strokeWidth={4}
        />
      </Tooltip>
    </ProgressWrapper>
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
}

export default compose(injectIntl)(CampaignProgress)
