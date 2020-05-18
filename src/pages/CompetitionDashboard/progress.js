import React from 'react'
import { Progress, Tooltip } from 'antd'
import { injectIntl } from 'react-intl'
import { compose } from 'redux'

import { number } from 'prop-types'
import colors from 'config/colors'

import moment from 'moment'

import { ProgressWrapper, ProgressTextWrapper, ProgressText } from './styled'

function CampaignProgress(props) {
  const { total, accomplished, endDate, expired, tooltipText, isTablet } = props
  const percent = (accomplished / total) * 100
  const daysLeft = props.intl.formatMessage(
    { id: 'app.campaignPage.progress.daysLeft' },
    {
      days: expired ? 0 : moment(endDate).diff(moment(), 'days'),
    },
  )

  return (
    <ProgressWrapper>
      <ProgressTextWrapper style={{ justifyContent: 'flex-end' }}>
        {!isTablet && <ProgressText>{daysLeft}</ProgressText>}
      </ProgressTextWrapper>
      <Tooltip title={tooltipText}>
        <Progress
          percent={percent}
          showInfo={false}
          strokeColor={expired ? colors.darkGray : colors.green}
          strokeWidth={4}
        />
      </Tooltip>
    </ProgressWrapper>
  )
}

CampaignProgress.propTypes = {
  total: number,
  accomplished: number,
  endDate: Date,
  intl: Object,
  expired: Boolean,
  isTablet: Boolean,
  tooltipText: String,
}

export default compose(injectIntl)(CampaignProgress)
