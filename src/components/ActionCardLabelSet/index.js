import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ActionCardLabel from 'components/ActionCardLabel'
import media from 'utils/mediaQueryTemplate'

const CardLabelWrap = styled.div`
  display: flex;
  ${media.phone`
    ${props => props.mobileFixedWidth && 'max-width: 285px;'}
  `}
`

const ActionCardLabelSet = props => {
  const { impacts, hideTooltip, mobileFixedWidth } = props
  if (!impacts) return null
  return (
    <CardLabelWrap mobileFixedWidth={mobileFixedWidth}>
      {impacts.footprint &&
        Object.entries(impacts.footprint)
          .filter(([category, timeValue]) => timeValue.minutes > 0)
          .map(([category, timeValue], index) => (
            <ActionCardLabel
              hideTooltip={hideTooltip}
              key={index}
              category={category}
              unit={timeValue.humanReadable.unit}
              value={timeValue.humanReadable.value}
              variant={
                timeValue.humanReadable.value >= 0 ? 'positive' : 'negative'
              }
            />
          ))}
      {impacts.handprint &&
        Object.entries(impacts.handprint)
          .filter(([category, timeValue]) => timeValue.minutes > 0)
          .map(([category, timeValue], index) => (
            <ActionCardLabel
              key={index}
              category={category}
              unit={timeValue.humanReadable.unit}
              value={timeValue.humanReadable.value}
              variant={
                timeValue.humanReadable.value >= 0 ? 'positive' : 'negative'
              }
            />
          ))}
    </CardLabelWrap>
  )
}

ActionCardLabelSet.propTypes = {
  impacts: PropTypes.object.isRequired,
  hideTooltip: PropTypes.bool,
  mobileFixedWidth: PropTypes.bool,
}

export default ActionCardLabelSet
