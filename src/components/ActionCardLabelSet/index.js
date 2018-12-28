import React from 'react'
import PropTypes from 'prop-types'
import ActionCardLabel from '../ActionCardLabel'
import styled from 'styled-components'

const CardLabelWrap = styled.div`
  display: flex;
`

const ActionCardLabelSet = props => {
  const { impacts, hideTooltip } = props
  return (
    <CardLabelWrap>
      {Object.entries(impacts.footprint)
        .filter(([category, timeValue]) => timeValue.minutes > 0)
        .map(([category, timeValue], index) => (
          <ActionCardLabel
            hideTooltip={hideTooltip}
            key={index}
            category={category}
            unit={timeValue.humanReadable.unit}
            value={timeValue.humanReadable.value}
            variant="negative"
          />
        ))}
      {Object.entries(impacts.handprint)
        .filter(([category, timeValue]) => timeValue.minutes > 0)
        .map(([category, timeValue], index) => (
          <ActionCardLabel
            key={index}
            category={category}
            unit={timeValue.humanReadable.unit}
            value={timeValue.humanReadable.value}
            variant="positive"
          />
        ))}
    </CardLabelWrap>
  )
}

ActionCardLabelSet.propTypes = {
  impacts: PropTypes.array.isRequired,
  hideTooltip: PropTypes.bool,
}

export default ActionCardLabelSet
